# Agente: Setter Intel

Agente de IA que automatiza la investigación y el copiloto de prospección de Ángel Ríos.
Convierte el proceso manual (`Segundo Cerebro/procesos/setter-intel.md`) en un agente operativo.

## Qué hace

| Entrada | Salida |
|---------|--------|
| URL de perfil, bio, capturas, notas de un prospecto | Análisis completo Setter Intel (hechos, hipótesis, aperturas, preguntas) |
| Historial de conversación con el prospecto | Próxima mejor pregunta + mensaje sugerido listo para enviar |

## Estructura del proyecto

```
agentes/setter-intel/
  ├── README.md              ← este archivo
  ├── system-prompt.md       ← el "cerebro" del agente (su instrucción maestra)
  └── ejemplos/              ← casos de prueba para validar que funciona
```

## Cómo desplegarlo (3 caminos, de más fácil a más técnico)

**Camino 1 — Claude Project / Custom GPT (recomendado para arrancar)**
1. Crear un proyecto en Claude o un Custom GPT en ChatGPT
2. Copiar el contenido de `system-prompt.md` como instrucción del proyecto
3. Adjuntar los archivos de `Segundo Cerebro/` como conocimiento
4. Listo: ya tenés tu agente funcionando sin programar nada

**Camino 2 — API + código (cuando quieras automatizar de verdad)**
Conectar el system-prompt a la API de Claude para que procese prospectos en lote.

**Camino 3 — Integración con CRM/herramientas (avanzado)**
Conectar el agente a tu flujo real (Instagram → análisis → CRM automático).

## Para la FIA

Tu respuesta a "¿qué agente vas a crear?":
> "Un agente de prospección que toma el perfil de un lead y genera el análisis comercial
> completo + las aperturas de conversación, automatizando mi flujo de setter."
