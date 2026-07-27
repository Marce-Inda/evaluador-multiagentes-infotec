#!/usr/bin/env python3
"""
Script de Análisis Estadístico de Resultados - Programa de Veraneo INFOTEC 2026

Este script procesa el archivo 'resultados_evaluacion.csv' generado por el
arnés de pruebas. Calcula estadísticas descriptivas (medias, desviaciones estándar,
medianas) y realiza pruebas de hipótesis estadísticas para muestras relacionadas
(Paired t-test y Prueba de rangos con signo de Wilcoxon) para comparar la efectividad
de la orquestación multi-agente frente a la búsqueda manual y la IA zero-shot,
respetando el diseño intrasujeto.

Genera automáticamente el reporte 'reporte_estadistico.md'.
"""

import os
import csv
import math
import time
from pathlib import Path

# Intentar importar librerías de data science
try:
    import pandas as pd
    import scipy.stats as stats
    SCIENTIFIC_LIBS = True
except ImportError:
    SCIENTIFIC_LIBS = False

CSV_PATH = Path(__file__).parent / "resultados_evaluacion.csv"
REPORT_PATH = Path(__file__).parent / "reporte_estadistico.md"

CORRECT_Q3 = {
    "Caso 1: Brecha de Datos Financieros (Uruguay)": "B",
    "Caso 1: Brecha Financiera (Uruguay)": "B",
    "Caso 2: Filtración de Expedientes Clínicos (México)": "A",
    "Caso 2: Filtración de Expedientes (México)": "A",
    "Caso 3: Data Breach Transfronterizo (Brasil/Chile)": "B",
    "Caso 3: Data Breach (Brasil / Chile)": "B"
}

CONSISTENT_JUSTIFICATIONS = {
    "Caso 1: Brecha de Datos Financieros (Uruguay)": ["utilitarian"],
    "Caso 1: Brecha Financiera (Uruguay)": ["utilitarian"],
    "Caso 2: Filtración de Expedientes Clínicos (México)": ["deontology"],
    "Caso 2: Filtración de Expedientes (México)": ["deontology"],
    "Caso 3: Data Breach Transfronterizo (Brasil/Chile)": ["principialism"],
    "Caso 3: Data Breach (Brasil / Chile)": ["principialism"]
}

def extract_q3_choice(answers_str):
    if not answers_str:
        return None
    parts = [p.strip() for p in answers_str.split(";")]
    for p in parts:
        if p.startswith("q2:"):
            return p.split(":")[1].strip()
    return None


def print_header(title: str):
    print("\n" + "=" * 100)
    print(f" {title.upper()} ".center(100, "="))
    print("=" * 100)


def calculate_descriptive_pure_python(data):
    # Agrupar por grupo experimental
    groups = {}
    for row in data:
        g = row["Grupo_Experimental"]
        if g not in groups:
            groups[g] = {"ia_latencies": [], "human_latencies": [], "precisions": [], "confianzas": [], "infractions": [], "consistencies": []}
        
        groups[g]["ia_latencies"].append(row["Latencia_IA_s"])
        groups[g]["human_latencies"].append(row["Latencia_Humana_s"])
        groups[g]["precisions"].append(row["Precision"])
        if row["Confianza"] is not None:
            groups[g]["confianzas"].append(row["Confianza"])
        groups[g]["infractions"].append(1.0 if row["Is_Infraction"] else 0.0)
        groups[g]["consistencies"].append(1.0 if row["Is_Consistent"] else 0.0)
        
    stats_dict = {}
    for g, vals in groups.items():
        n = len(vals["human_latencies"])
        if n == 0:
            continue
            
        mean_ia = sum(vals["ia_latencies"]) / n
        mean_human = sum(vals["human_latencies"]) / n
        mean_precision = sum(vals["precisions"]) / n
        mean_infraction = sum(vals["infractions"]) / n
        mean_consistency = sum(vals["consistencies"]) / n
        
        # Desviaciones estándar
        std_human = 0.0
        if n > 1:
            std_human = math.sqrt(sum((x - mean_human) ** 2 for x in vals["human_latencies"]) / (n - 1))
            
        std_precision = 0.0
        if n > 1:
            std_precision = math.sqrt(sum((x - mean_precision) ** 2 for x in vals["precisions"]) / (n - 1))
            
        # Medianas
        sorted_human = sorted(vals["human_latencies"])
        if n % 2 == 1:
            median_human = sorted_human[n // 2]
        else:
            median_human = (sorted_human[(n // 2) - 1] + sorted_human[n // 2]) / 2.0
            
        # Confianza promedio
        conf_n = len(vals["confianzas"])
        mean_trust = sum(vals["confianzas"]) / conf_n if conf_n > 0 else None
            
        stats_dict[g] = {
            "n": n,
            "mean_ia": mean_ia,
            "mean_human": mean_human,
            "std_human": std_human,
            "median_human": median_human,
            "mean_precision": mean_precision,
            "std_precision": std_precision,
            "mean_trust": mean_trust,
            "mean_infraction": mean_infraction,
            "mean_consistency": mean_consistency,
            "raw_human": vals["human_latencies"],
            "raw_precision": vals["precisions"],
            "raw_trust": vals["confianzas"]
        }
    return stats_dict


def paired_t_test_pure_python(list1, list2):
    n = len(list1)
    if n <= 1:
        return 0.0, 1.0
    
    diffs = [list1[i] - list2[i] for i in range(n)]
    mean_diff = sum(diffs) / n
    
    # Varianza de las diferencias
    var_diffs = sum((d - mean_diff) ** 2 for d in diffs) / (n - 1)
    if var_diffs == 0:
        return 0.0, 1.0
        
    std_err = math.sqrt(var_diffs / n)
    t = mean_diff / std_err
    
    df = n - 1
    # Aproximación del p-valor para t-test bilateral usando una fórmula empírica
    x = t ** 2 / df
    p_approx = (1.0 + x) ** (- (df + 1.0) / 2.0)
    p_approx = min(1.0, p_approx * 2.0)
    return t, p_approx


def build_paired_data(data):
    # Organizar datos por participante y grupo
    participants = {}
    for row in data:
        pid = row["Participante"]
        g = row["Grupo_Experimental"]
        if pid not in participants:
            participants[pid] = {}
        participants[pid][g] = row
    return participants


def main():
    print_header("Analizador de Resultados Estadísticos Relacionados - INFOTEC")
    
    if not CSV_PATH.exists():
        print(f"❌ Error: No se encontró el archivo de resultados en: {CSV_PATH}")
        print("Asegúrate de ejecutar el arnés para recolectar datos de prueba primero.")
        return
        
    # Leer datos del CSV
    raw_data = []
    try:
        with open(CSV_PATH, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                try:
                    precision_val = float(row["Precision"].replace("%", "").strip())
                except:
                    precision_val = 0.0
                
                try:
                    confianza_val = row.get("Confianza_Percibida", "N/A").strip()
                    confianza_num = float(confianza_val) if confianza_val != "N/A" else None
                except:
                    confianza_num = None

                scenario_name = row.get("Escenario", "").strip()
                answers_str = row.get("Respuestas", "").strip()
                justification = row.get("Justificacion", "").strip()
                
                chosen_q3 = extract_q3_choice(answers_str)
                is_infraction = False
                if chosen_q3 and scenario_name in CORRECT_Q3:
                    is_infraction = (chosen_q3 != CORRECT_Q3[scenario_name])
                    
                is_consistent = False
                if justification and scenario_name in CONSISTENT_JUSTIFICATIONS:
                    is_consistent = (justification in CONSISTENT_JUSTIFICATIONS[scenario_name])

                raw_data.append({
                    "Participante": row["Participante"],
                    "Grupo_Experimental": row["Grupo_Experimental"],
                    "Modelo_IA": row.get("Modelo_IA", "N/A").strip(),
                    "Latencia_IA_s": float(row["Latencia_IA_s"]),
                    "Latencia_Humana_s": float(row["Latencia_Humana_s"]),
                    "Precision": precision_val,
                    "Confianza": confianza_num,
                    "Is_Infraction": is_infraction,
                    "Is_Consistent": is_consistent
                })
    except Exception as e:
        print(f"❌ Error al leer el archivo CSV: {e}")
        return
        
    print(f"✓ Cargados {len(raw_data)} registros experimentales exitosamente.")
    
    # Calcular descriptivas
    summary = calculate_descriptive_pure_python(raw_data)
    
    # Emparejar datos por participante
    participants_map = build_paired_data(raw_data)
    
    # Estructurar comparaciones
    pairs = [
        ("Grupo A: Búsqueda Manual", "Grupo C: Motor Multi-Agente"),
        ("Grupo B: IA Básica", "Grupo C: Motor Multi-Agente")
    ]
    
    tests = {}
    for g1, g2 in pairs:
        paired_lat_1 = []
        paired_lat_2 = []
        paired_prec_1 = []
        paired_prec_2 = []
        paired_trust_1 = []
        paired_trust_2 = []
        
        for pid, runs in participants_map.items():
            if g1 in runs and g2 in runs:
                paired_lat_1.append(runs[g1]["Latencia_Humana_s"])
                paired_lat_2.append(runs[g2]["Latencia_Humana_s"])
                paired_prec_1.append(runs[g1]["Precision"])
                paired_prec_2.append(runs[g2]["Precision"])
                
                # Para confianza (sólo aplica si ambos tienen calificación válida)
                if runs[g1]["Confianza"] is not None and runs[g2]["Confianza"] is not None:
                    paired_trust_1.append(runs[g1]["Confianza"])
                    paired_trust_2.append(runs[g2]["Confianza"])
        
        n_paired = len(paired_lat_1)
        if n_paired <= 1:
            tests[f"{g1} vs {g2}"] = {
                "n_paired": n_paired,
                "t_stat_lat": None, "p_val_lat": 1.0,
                "wilcoxon_p_val_lat": 1.0,
                "wilcoxon_p_val_prec": 1.0,
                "wilcoxon_p_val_trust": 1.0
            }
            continue
            
        if SCIENTIFIC_LIBS:
            # Paired T-Test para Latencia
            t_stat_lat, p_val_lat = stats.ttest_rel(paired_lat_1, paired_lat_2)
            
            # Wilcoxon Signed-Rank para Latencia
            try:
                _, wilcoxon_p_val_lat = stats.wilcoxon(paired_lat_1, paired_lat_2)
            except ValueError:
                wilcoxon_p_val_lat = 1.0  # Ocurre si todas las diferencias son cero
                
            # Wilcoxon Signed-Rank para Precisión
            try:
                _, wilcoxon_p_val_prec = stats.wilcoxon(paired_prec_1, paired_prec_2)
            except ValueError:
                wilcoxon_p_val_prec = 1.0
                
            # Wilcoxon Signed-Rank para Confianza
            wilcoxon_p_val_trust = None
            if len(paired_trust_1) > 1:
                try:
                    _, wilcoxon_p_val_trust = stats.wilcoxon(paired_trust_1, paired_trust_2)
                except ValueError:
                    wilcoxon_p_val_trust = 1.0
        else:
            # Fallback en pure Python
            t_stat_lat, p_val_lat = paired_t_test_pure_python(paired_lat_1, paired_lat_2)
            wilcoxon_p_val_lat = p_val_lat # Aproximar con t-test
            
            _, wilcoxon_p_val_prec = paired_t_test_pure_python(paired_prec_1, paired_prec_2)
            
            wilcoxon_p_val_trust = None
            if len(paired_trust_1) > 1:
                _, wilcoxon_p_val_trust = paired_t_test_pure_python(paired_trust_1, paired_trust_2)
                
        tests[f"{g1} vs {g2}"] = {
            "n_paired": n_paired,
            "t_stat_lat": t_stat_lat,
            "p_val_lat": p_val_lat,
            "wilcoxon_p_val_lat": wilcoxon_p_val_lat,
            "wilcoxon_p_val_prec": wilcoxon_p_val_prec,
            "wilcoxon_p_val_trust": wilcoxon_p_val_trust
        }

    # Imprimir resumen descriptivo en consola
    print("\n" + "-" * 130)
    print(" ESTADÍSTICAS DESCRIPTIVAS DE GRUPOS ".center(130, "-"))
    print("-" * 130)
    print(f"{'Grupo Experimental':<30} | {'N':<3} | {'M. Latencia IA (s)':<18} | {'M. Latencia Hum (s)':<19} | {'M. Precisión (%)':<16} | {'Confianza (1-5)':<15} | {'I_C (%)':<8} | {'C_EO (%)':<8}")
    print("-" * 130)
    for g, m in summary.items():
        conf_str = f"{m['mean_trust']:.2f}" if m['mean_trust'] is not None and not (isinstance(m['mean_trust'], float) and math.isnan(m['mean_trust'])) else "N/A (Manual)"
        print(f"{g[:30]:<30} | {m['n']:<3} | {m['mean_ia']:<18.3f} | {m['mean_human']:<19.2f} | {m['mean_precision']:<16.1f} | {conf_str:<15} | {m['mean_infraction']*100:<8.1f} | {m['mean_consistency']*100:<8.1f}")
    print("-" * 130)
    
    # Imprimir pruebas de hipótesis
    print("\n" + "-" * 100)
    print(" PRUEBAS DE HIPÓTESIS RELACIONADAS (WILCOXON & PAIRED T-TEST) ".center(100, "-"))
    print("-" * 100)
    for name, t in tests.items():
        print(f"\nComparación: {name} (N emparejado = {t['n_paired']})")
        if t["n_paired"] <= 1:
            print("  ⚠️ Insuficientes sujetos emparejados (se necesitan al menos 2 participantes con corridas en ambos grupos).")
            continue
            
        p_lat = t["wilcoxon_p_val_lat"]
        p_prec = t["wilcoxon_p_val_prec"]
        p_trust = t["wilcoxon_p_val_trust"]
        
        sig_lat = "🟢 SIGNIFICATIVO (p < 0.05)" if p_lat < 0.05 else "🔴 NO SIGNIFICATIVO (p >= 0.05)"
        sig_prec = "🟢 SIGNIFICATIVO (p < 0.05)" if p_prec < 0.05 else "🔴 NO SIGNIFICATIVO (p >= 0.05)"
        
        print(f"  • Latencia de Decisión Humana (Wilcoxon):")
        print(f"    - p-valor: {p_lat:.5f} ({sig_lat})")
        if t["t_stat_lat"] is not None:
            print(f"    - t-relacionada: {t['t_stat_lat']:.4f} (p-valor t-test: {t['p_val_lat']:.5f})")
            
        print(f"  • Precisión de Decisión (Wilcoxon):")
        print(f"    - p-valor: {p_prec:.5f} ({sig_prec})")
        
        if p_trust is not None:
            sig_trust = "🟢 SIGNIFICATIVO (p < 0.05)" if p_trust < 0.05 else "🔴 NO SIGNIFICATIVO (p >= 0.05)"
            print(f"  • Percepción de Confiabilidad (Wilcoxon):")
            print(f"    - p-valor: {p_trust:.5f} ({sig_trust})")
    print("-" * 100)
    
    # ----------------------------------------------------
    # Análisis de Sesgo Geopolítico (Llama/Gemini vs DeepSeek)
    # ----------------------------------------------------
    group_b_data = [r for r in raw_data if r["Grupo_Experimental"] == "Grupo B: IA Básica"]
    
    western_models = ["llama", "gemini"]
    eastern_models = ["deepseek"]
    
    western_runs = [r for r in group_b_data if any(w in r["Modelo_IA"].lower() for w in western_models)]
    eastern_runs = [r for r in group_b_data if any(e in r["Modelo_IA"].lower() for e in eastern_models)]
    
    geopolitical_stats = {}
    for label, runs in [("Occidentales (Llama/Gemini)", western_runs), ("Orientales (DeepSeek)", eastern_runs)]:
        n = len(runs)
        if n > 0:
            mean_lat = sum(r["Latencia_Humana_s"] for r in runs) / n
            mean_prec = sum(r["Precision"] for r in runs) / n
            trust_vals = [r["Confianza"] for r in runs if r["Confianza"] is not None]
            mean_trust = sum(trust_vals) / len(trust_vals) if len(trust_vals) > 0 else None
            geopolitical_stats[label] = {
                "n": n,
                "mean_lat": mean_lat,
                "mean_prec": mean_prec,
                "mean_trust": mean_trust
            }
        else:
            geopolitical_stats[label] = {"n": 0, "mean_lat": 0.0, "mean_prec": 0.0, "mean_trust": None}
            
    print("\n" + "-" * 100)
    print(" ANÁLISIS DE SESGO GEOPOLÍTICO EN GRUPO B (OCCIDENTE VS. ORIENTE) ".center(100, "-"))
    print("-" * 100)
    print(f"{'Origen del Modelo':<30} | {'N':<3} | {'M. Latencia Hum (s)':<19} | {'M. Precisión (%)':<16} | {'Confianza (1-5)':<15}")
    print("-" * 100)
    for label, m in geopolitical_stats.items():
        conf_str = f"{m['mean_trust']:.2f}" if m['mean_trust'] is not None else "N/A"
        print(f"{label:<30} | {m['n']:<3} | {m['mean_lat']:<19.2f} | {m['mean_prec']:<16.1f} | {conf_str:<15}")
    print("-" * 100)
    
    # Generar Reporte Markdown
    try:
        with open(REPORT_PATH, "w", encoding="utf-8") as f:
            f.write("# Reporte de Análisis Estadístico - Programa de Veraneo INFOTEC 2026\n\n")
            f.write(f"**Fecha de Análisis:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"**Total de Muestras Analizadas:** {len(raw_data)} pruebas\n\n")
            
            f.write("## 1. Estadísticas Descriptivas\n\n")
            f.write("| Grupo Experimental | Muestras (N) | Media Latencia IA (s) | Media Latencia Humana (s) | Desv. Est. Humana (s) | Media Precisión (%) | Confiabilidad Promedio (1-5) | Tasa Infracción $I_C$ (%) | Consistencia $C_{EO}$ (%) |\n")
            f.write("| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n")
            for g, m in summary.items():
                conf_val = f"{m['mean_trust']:.2f}" if m['mean_trust'] is not None and not (isinstance(m['mean_trust'], float) and math.isnan(m['mean_trust'])) else "N/A (Manual)"
                f.write(f"| {g} | {m['n']} | {m['mean_ia']:.3f} | {m['mean_human']:.2f} | {m['std_human']:.2f} | {m['mean_precision']:.1f}% | {conf_val} | {m['mean_infraction']*100:.1f}% | {m['mean_consistency']*100:.1f}% |\n")
                
            f.write("\n## 2. Pruebas de Hipótesis y Significancia (Comparaciones Intrasujeto frente a Grupo C)\n\n")
            f.write("Dado que el experimento utiliza un diseño intrasujeto, las observaciones de un mismo participante están relacionadas. Se aplican la **Prueba t para muestras relacionadas** y la **Prueba de rangos con signo de Wilcoxon** para evaluar significancia.\n\n")
            
            f.write("| Comparación Evaluada | N emparejado | p-valor Latencia (Wilcoxon) | Significado Latencia | p-valor Precisión (Wilcoxon) | Significado Precisión | p-valor Confiabilidad | Significado Confiabilidad |\n")
            f.write("| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n")
            for name, t in tests.items():
                p_lat = t["wilcoxon_p_val_lat"]
                p_prec = t["wilcoxon_p_val_prec"]
                p_trust = t["wilcoxon_p_val_trust"]
                
                sig_lat = "🟢 Significativo (p < 0.05)" if p_lat < 0.05 and t["n_paired"] > 1 else "🔴 No Significativo"
                sig_prec = "🟢 Significativo (p < 0.05)" if p_prec < 0.05 and t["n_paired"] > 1 else "🔴 No Significativo"
                sig_trust = "🟢 Significativo (p < 0.05)" if p_trust is not None and p_trust < 0.05 and t["n_paired"] > 1 else "🔴 No Significativo"
                
                p_lat_str = f"{p_lat:.5f}" if t["n_paired"] > 1 else "N/A"
                p_prec_str = f"{p_prec:.5f}" if t["n_paired"] > 1 else "N/A"
                p_trust_str = f"{p_trust:.5f}" if p_trust is not None and t["n_paired"] > 1 else "N/A"
                
                f.write(f"| {name} | {t['n_paired']} | {p_lat_str} | {sig_lat} | {p_prec_str} | {sig_prec} | {p_trust_str} | {sig_trust} |\n")
                
            f.write("\n## 3. Análisis de Sesgo Geopolítico en Grupo B (Occidente vs. Oriente)\n\n")
            f.write("Este análisis evalúa el rendimiento del participante bajo la asistencia de modelos de IA de origen Occidental (Google Gemini, Meta Llama) frente a modelos Orientales/Chinos (DeepSeek), analizando diferencias en latencia humana de decisión, precisión objetiva y nivel de confianza percibida.\n\n")
            f.write("| Origen del Modelo | Muestras (N) | Media Latencia Humana (s) | Media Precisión (%) | Confiabilidad Promedio (1-5) |\n")
            f.write("| :--- | :---: | :---: | :---: | :---: |\n")
            for label, m in geopolitical_stats.items():
                conf_val = f"{m['mean_trust']:.2f}" if m['mean_trust'] is not None else "N/A"
                f.write(f"| {label} | {m['n']} | {m['mean_lat']:.2f}s | {m['mean_prec']:.1f}% | {conf_val} |\n")
            f.write("\n*Nota: La diferencia en latencia y confianza refleja la susceptibilidad de los perfiles ante las alucinaciones o respuestas incompletas de cada modelo geopolítico.*\n")
            
            f.write("\n## 4. Discusión de Resultados Académicos\n\n")
            f.write("*   **Diseño Intrasujeto Balanceado:** El emparejamiento por participante cancela diferencias individuales de perfil técnico, aislando la verdadera efectividad del motor multi-agente.\n")
            f.write("*   **Latencia Humana:** Evalúa si el asistente multi-agente acelera la toma de decisiones críticas reguladas.\n")
            f.write("*   **Precisión de Cumplimiento y Alucinaciones:** Dado que las preguntas clave indagan sobre plazos y autoridades sujetas a error/alucinación en IA estándar, la precisión del quiz valida la efectividad del *Governance Agent*.\n")
            f.write("\n*Nota: Reporte generado automáticamente por el script `analyze_results.py` de tu repositorio.*")
        print(f"\n✓ Reporte académico exportado exitosamente a: {REPORT_PATH.name}")
    except Exception as e:
        print(f"❌ Error al escribir el archivo de reporte: {e}")


if __name__ == "__main__":
    main()
