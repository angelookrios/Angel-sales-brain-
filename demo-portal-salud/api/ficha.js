export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { historial } = req.body ?? {};
  if (!Array.isArray(historial) || historial.length === 0) {
    res.status(400).json({ error: "historial es requerido" });
    return;
  }

  const prompt = `Analizá esta conversación entre un paciente y la recepción de un centro médico.

Devolvé SOLO un objeto JSON, sin markdown, sin explicaciones, con estas claves exactas:
nombre, dni, especialidad, profesional, preferencia_horaria, obra_social, requiere_humano, motivo_derivacion

Reglas:
- Si un dato no aparece en la conversación, poné null.
- requiere_humano es true solo si el paciente pidió hablar con una persona, hizo un reclamo, planteó una consulta clínica o algo que suena urgente.
- motivo_derivacion es un texto muy breve si requiere_humano es true, si no null.
- No incluyas nunca síntomas, diagnósticos ni información clínica en ningún campo.

CONVERSACIÓN:
${historial.map((m) => `${m.role === "user" ? "Paciente" : "Brenda"}: ${m.content}`).join("\n")}`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: data?.error?.message || "Error del asistente" });
      return;
    }

    const bruto = (data.content ?? [])
      .map((i) => (i.type === "text" ? i.text : ""))
      .join("")
      .replace(/```json|```/g, "")
      .trim();

    res.status(200).json({ ficha: JSON.parse(bruto) });
  } catch (e) {
    res.status(500).json({ error: "No se pudo extraer la ficha" });
  }
}
