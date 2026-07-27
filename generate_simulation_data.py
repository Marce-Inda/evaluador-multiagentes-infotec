import csv
import random
from datetime import datetime

# 6 CISOs (Perfiles técnicos/operativos) y 6 Profesionales de Derecho (Perfiles jurídicos/regulaciones)
# Total: 12 participantes (múltiplo de 3 para balancear perfectamente la matriz de contrabalanceo de 3x3)
participants = [
    # (ID, StartingGroup, Experience, Profile)
    ("CISO-01", "A", "Intermedio", "CISO"),
    ("CISO-02", "A", "Avanzado", "CISO"),
    ("CISO-03", "B", "Experto", "CISO"),
    ("CISO-04", "B", "Avanzado", "CISO"),
    ("CISO-05", "C", "Experto", "CISO"),
    ("CISO-06", "C", "Intermedio", "CISO"),
    
    ("DER-01", "A", "Intermedio", "DERECHO"),
    ("DER-02", "A", "Avanzado", "DERECHO"),
    ("DER-03", "B", "Avanzado", "DERECHO"),
    ("DER-04", "B", "Experto", "DERECHO"),
    ("DER-05", "C", "Experto", "DERECHO"),
    ("DER-06", "C", "Intermedio", "DERECHO"),
]

scenarios = {
    "1": "Caso 1: Brecha Financiera (Uruguay)",
    "2": "Caso 2: Filtración de Expedientes (México)",
    "3": "Caso 3: Data Breach (Brasil / Chile)"
}

group_names = {
    "A": "Grupo A: Búsqueda Manual",
    "B": "Grupo B: IA Básica",
    "C": "Grupo C: Motor Multi-Agente"
}

def get_params(starting_group, run_num):
    if starting_group == 'A':
        if run_num == 1: return 'A', '1'
        if run_num == 2: return 'B', '2'
        if run_num == 3: return 'C', '3'
    elif starting_group == 'B':
        if run_num == 1: return 'B', '2'
        if run_num == 2: return 'C', '3'
        if run_num == 3: return 'A', '1'
    elif starting_group == 'C':
        if run_num == 1: return 'C', '3'
        if run_num == 2: return 'A', '1'
        if run_num == 3: return 'B', '2'
    return 'A', '1'

csv_rows = []

# Mapeos de Ground Truth para Q3 y Culturas
correct_q3_answers = {"1": "B", "2": "A", "3": "B"}

for p_id, start_group, exp, profile in participants:
    for run in [1, 2, 3]:
        group, scen_id = get_params(start_group, run)
        
        # Balanceo geopolítico según el ID (código ASCII de caracteres del Alias)
        char_sum = sum(ord(c) for c in p_id)
        is_western = char_sum % 2 == 0
        model_ia = "meta-llama/llama-3.3-70b-instruct" if is_western else "deepseek/deepseek-v4-flash"
        
        # Simular respuestas en base al grupo experimental y perfil profesional
        # Q0, Q1, Q2 (donde Q2 es Q3, la decisión de cumplimiento)
        correct_q0 = "B" if scen_id == "1" else ("D" if scen_id == "2" else "A")
        correct_q1 = "A" if scen_id == "1" else ("B" if scen_id == "2" else "C")
        correct_q2 = correct_q3_answers[scen_id]
        
        # 1. Latencias y Respuestas Objetivas (Q0 y Q1)
        if group == 'A': # Búsqueda Manual
            latency_ia = 0.0
            if profile == "CISO":
                latency_human = round(random.uniform(110.0, 160.0), 2)
                # CISOs manuales fallan más en Q0 y Q1
                q0 = random.choice([correct_q0, "A"])
                q1 = random.choice([correct_q1, "D"])
                # Decisión Q2: Tienden a posponer para arreglar técnicamente (infracción en Caso 1 y 3)
                q2 = random.choice(["A", "B"])
            else:
                latency_human = round(random.uniform(180.0, 260.0), 2)
                q0 = correct_q0
                q1 = random.choice([correct_q1, "D"])
                q2 = correct_q2 # Abogados siguen más la ley (menor infracción)
                
        elif group == 'B': # IA Básica (Zero-Shot)
            latency_ia = round(random.uniform(4.5, 7.0), 3)
            if profile == "CISO":
                latency_human = round(random.uniform(80.0, 120.0), 2)
                q0 = correct_q0
                q1 = correct_q1
                q2 = random.choice([correct_q2, "A" if correct_q2 == "B" else "B"]) # Se dejan llevar por la propuesta técnica
            else:
                latency_human = round(random.uniform(120.0, 180.0), 2)
                q0 = correct_q0
                q1 = correct_q1
                q2 = correct_q2 # Abogados corrigen a la IA
                
        else: # Grupo C (Motor Multi-Agente RAG)
            latency_ia = round(random.uniform(12.0, 18.0), 3)
            if profile == "CISO":
                latency_human = round(random.uniform(50.0, 75.0), 2)
            else:
                latency_human = round(random.uniform(65.0, 90.0), 2)
            # Alta precisión en Grupo C para todos
            q0 = correct_q0
            q1 = correct_q1
            q2 = correct_q2
            
        # Calcular score del quiz simulado
        hits = 0
        if q0 == correct_q0: hits += 1
        if q1 == correct_q1: hits += 1
        if q2 == correct_q2: hits += 1
        precision = f"{int((hits / 3.0) * 100)}%"

        # 2. Generación de Justificaciones Coherentes (Pausa de Gobernanza)
        # Caso 1 (Uruguay) -> Cultura: Utilitarista. Consistente: 'utilitarian'.
        # Caso 2 (México)  -> Cultura: Deontológica. Consistente: 'deontology'.
        # Caso 3 (Chile/Br)-> Cultura: Principialista. Consistente: 'principialism'.
        if scen_id == "1":
            if q2 == "A": # Infracción (aprobar postergación)
                justification = random.choice(["utilitarian", "necessity"]) # utilitarian es consistente
            else: # Cumplimiento (rechazar postergación)
                justification = random.choice(["formalism", "deontology"]) # inconsistente con utilitarismo
        elif scen_id == "2":
            if q2 == "A": # Cumplimiento (notificar)
                justification = random.choice(["deontology", "formalism"]) # deontology es consistente
            else: # Infracción (retrasar)
                justification = random.choice(["utilitarian", "pragmatic"]) # inconsistente
        else: # scen_id == "3"
            if q2 == "B": # Cumplimiento (notificar)
                justification = random.choice(["principialism", "cooperation"]) # principialism es consistente
            else: # Infracción (retrasar)
                justification = random.choice(["utilitarian", "technical"]) # inconsistente

        if group == 'C':
            # En Grupo C (Multi-agente), la guía ética orienta al participante a ser coherente
            if scen_id == "1": justification = "utilitarian"
            elif scen_id == "2": justification = "deontology"
            else: justification = "principialism"
            
        # Nivel de confianza percibida (Likert)
        if group == 'A':
            confianza = "N/A"
        elif group == 'B':
            confianza = str(random.choice([4, 5])) if profile == "CISO" else str(random.choice([2, 3]))
        else: # Group C
            confianza = str(random.choice([4, 5]))

        date_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        answers = f"q0:{q0}; q1:{q1}; q2:{q2}"
        
        csv_rows.append({
            "Fecha": date_str,
            "Participante": p_id,
            "Grupo_Experimental": group_names[group],
            "Experiencia_Previa": exp,
            "Escenario": scenarios[scen_id],
            "Modelo_IA": model_ia if group != 'A' else "N/A",
            "Latencia_IA_s": str(latency_ia),
            "Latencia_Humana_s": str(latency_human),
            "Respuestas": answers,
            "Precision": precision,
            "Justificacion": justification,
            "Confianza_Percibida": confianza
        })

with open("resultados_evaluacion.csv", mode="w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=csv_rows[0].keys())
    writer.writeheader()
    writer.writerows(csv_rows)

print("Balanced CISO and LAW mock results (with Realistic Ethics & Answers) generated successfully!")
