# Demo — Asistente de WhatsApp El Portal Salud

Demo interactiva de **Brenda**, el agente de IA para el WhatsApp de El Portal Salud (Gualeguay, Entre Ríos). Simula el chat del paciente y muestra en paralelo la ficha de turno que se arma sola para recepción.

Hecha para la propuesta comercial de Nexo AI — Etapa 1 (asistente sobre WhatsApp existente, sin tocar el sistema de turnos).

## Estructura

- `src/App.jsx` — interfaz (chat estilo WhatsApp + panel de recepción)
- `api/chat.js` — function serverless que llama a la API de Claude con el prompt de Brenda
- `api/ficha.js` — function serverless que extrae la ficha de turno (nombre, DNI, especialidad, etc.) de la conversación
- `api/_prompt.js` — system prompt de Brenda

La API key de Anthropic vive solo del lado del servidor (variable de entorno), nunca se expone en el navegador.

## Correr en local

```bash
npm install
```

Para que las funciones de `/api` respondan en local hace falta el CLI de Vercel:

```bash
npm i -g vercel
vercel dev
```

Configurá la variable de entorno antes de levantar el server:

```bash
cp .env.example .env
# completá ANTHROPIC_API_KEY=sk-ant-...
```

## Deploy en Vercel

1. Importá este directorio (`demo-portal-salud/`) como proyecto en Vercel.
2. Agregá la variable de entorno `ANTHROPIC_API_KEY` en la configuración del proyecto.
3. Deploy. Vercel detecta Vite automáticamente y las funciones en `api/` quedan expuestas solas.

## Qué NO hace esta demo

No toca el sistema de turnos real ni la web de El Portal Salud. Es una simulación de la conversación para mostrar cómo suena y se comporta el agente antes de integrarlo al WhatsApp real del centro.
