import React, { useState, useRef, useEffect } from "react";

const SUGERENCIAS = [
  "Hola, quería sacar un turno",
  "Cuánto sale la consulta particular?",
  "Atienden PAMI?",
  "Me hago una densitometría, cómo me tengo que preparar?",
  "Hace tres días me duele el pecho, qué puede ser?",
];

const horaActual = () =>
  new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

export default function App() {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);
  const [ficha, setFicha] = useState(null);
  const [error, setError] = useState(null);
  const finRef = useRef(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, escribiendo]);

  async function extraerFicha(historial) {
    try {
      const r = await fetch("/api/ficha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ historial }),
      });
      const data = await r.json();
      if (r.ok) setFicha(data.ficha);
    } catch (e) {
      // Si falla la extracción, la conversación sigue igual.
    }
  }

  async function enviar(contenido) {
    const limpio = (contenido ?? texto).trim();
    if (!limpio || escribiendo) return;

    const historial = [...mensajes, { role: "user", content: limpio, hora: horaActual() }];
    setMensajes(historial);
    setTexto("");
    setEscribiendo(true);
    setError(null);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: historial.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Error");

      const nuevo = [...historial, { role: "assistant", content: data.respuesta, hora: horaActual() }];
      setMensajes(nuevo);
      extraerFicha(nuevo);
    } catch (e) {
      setError("No se pudo enviar el mensaje. Probá de nuevo.");
    } finally {
      setEscribiendo(false);
    }
  }

  function reiniciar() {
    setMensajes([]);
    setFicha(null);
    setError(null);
    setTexto("");
  }

  const campos = [
    ["Nombre", ficha?.nombre],
    ["DNI", ficha?.dni],
    ["Especialidad", ficha?.especialidad],
    ["Profesional", ficha?.profesional],
    ["Franja horaria", ficha?.preferencia_horaria],
    ["Obra social", ficha?.obra_social],
  ];
  const completos = campos.filter(([, v]) => v).length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
              Nexo AI · Demostración
            </p>
            <h1 className="text-xl font-bold text-slate-800">
              Asistente de WhatsApp — El Portal Salud
            </h1>
          </div>
          <button
            onClick={reiniciar}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            Empezar de nuevo
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_300px]">
          {/* Chat */}
          <div className="flex h-[600px] flex-col overflow-hidden rounded-xl shadow-lg">
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#128C7E] text-sm font-semibold text-white">
                EP
              </div>
              <div>
                <p className="text-sm font-semibold text-white">El Portal Salud</p>
                <p className="text-xs text-teal-100">
                  {escribiendo ? "escribiendo..." : "en línea"}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto bg-[#ECE5DD] p-4">
              {mensajes.length === 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-center text-sm text-slate-500">
                    Escribí como si fueras un paciente, o probá con alguna de estas:
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    {SUGERENCIAS.map((s) => (
                      <button
                        key={s}
                        onClick={() => enviar(s)}
                        className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {mensajes.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[78%] rounded-lg px-3 py-2 text-[15px] leading-snug shadow-sm ${
                      m.role === "user" ? "bg-[#DCF8C6] text-slate-800" : "bg-white text-slate-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                    <p className="mt-1 text-right text-[10px] text-slate-400">{m.hora}</p>
                  </div>
                </div>
              ))}

              {escribiendo && (
                <div className="flex justify-start">
                  <div className="rounded-lg bg-white px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      {[0, 150, 300].map((d) => (
                        <span
                          key={d}
                          className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                          style={{ animationDelay: `${d}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={finRef} />
            </div>

            {error && (
              <p className="bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
            )}

            <div className="flex items-center gap-2 bg-[#F0F0F0] px-3 py-3">
              <input
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && enviar()}
                placeholder="Escribí un mensaje"
                className="flex-1 rounded-full border-none bg-white px-4 py-2 text-[15px] text-slate-800 outline-none focus:ring-2 focus:ring-teal-600"
              />
              <button
                onClick={() => enviar()}
                disabled={escribiendo || !texto.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#128C7E] text-white disabled:opacity-40"
                aria-label="Enviar"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Panel de recepción */}
          <div className="h-[600px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Lo que ve recepción
            </p>
            <h2 className="mt-1 text-base font-bold text-slate-800">Solicitud de turno</h2>
            <p className="mt-1 text-xs text-slate-500">
              Se arma sola mientras el paciente conversa.
            </p>

            <div className="mt-4 space-y-3">
              {campos.map(([etiqueta, valor]) => (
                <div key={etiqueta} className="border-b border-slate-100 pb-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">{etiqueta}</p>
                  <p
                    className={`text-sm ${valor ? "font-medium text-slate-800" : "text-slate-300"}`}
                  >
                    {valor || "—"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 px-3 py-2">
              <p className="text-xs text-slate-600">
                {completos} de 6 datos cargados
              </p>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-200">
                <div
                  className="h-1.5 rounded-full bg-teal-600 transition-all duration-500"
                  style={{ width: `${(completos / 6) * 100}%` }}
                />
              </div>
            </div>

            {ficha?.requiere_humano && (
              <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                  Requiere una persona
                </p>
                <p className="mt-1 text-sm text-amber-900">
                  {ficha.motivo_derivacion || "El paciente necesita atención del equipo."}
                </p>
              </div>
            )}

            <p className="mt-6 text-[11px] leading-relaxed text-slate-400">
              Solo se registran nombre, DNI, especialidad, obra social y horario. Ningún dato
              clínico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
