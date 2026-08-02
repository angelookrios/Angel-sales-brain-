import { SYSTEM_PROMPT } from "./_prompt.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages es requerido" });
    return;
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: data?.error?.message || "Error del asistente" });
      return;
    }

    const respuesta = (data.content ?? [])
      .map((i) => (i.type === "text" ? i.text : ""))
      .join("")
      .trim();

    res.status(200).json({ respuesta });
  } catch (e) {
    res.status(500).json({ error: "No se pudo contactar al asistente" });
  }
}
