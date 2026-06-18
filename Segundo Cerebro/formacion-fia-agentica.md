# Formación: FIA Agéntica — Seguimiento

Programa de 8 semanas · Cohorte 1 · Axel Jutoran

---

## Estado actual

**Fecha de última actualización:** 18 de junio de 2026  
**Semana activa:** Semana 3 (en curso)

---

## Progreso por semana

### Semana 1 — Fundamentos + Primer sistema funcionando ✅ COMPLETA (8/9)
Setup del stack completo y primer deploy.

- ✅ Las 3 herramientas que Claude Code necesita
- ✅ Instalá VS Code + extensión Claude Code
- ✅ Conectá GitHub a Claude Code
- ✅ Conectá Vercel para publicar tus creaciones
- ✅ Conectá Supabase como base de datos
- ✅ Checklist de setup
- ✅ Setup no arrancó: FAQ y soluciones
- ✅ Fundamentos + Primer sistema funcionando (En vivo · 28 de mayo)
- ○ Memoria de Claude: CLAUDE.md y Agents.md — pendiente

### Semana 2 — Skills, repos y primera integración ✅ COMPLETA (6/6)
Habilidades de Claude Code. Git workflow. Primera conexión con API externa.

### Semana 3 — Dominá Claude Code y tu primer toolkit (5/7 en curso)
Modelos, modos, niveles de esfuerzo y segundo cerebro.

- ✅ Presentate a la comunidad — perfil publicado en la cohorte
- ✅ Niveles de esfuerzo (Low / Medium / High / Extra High / Ultracode)
- ✅ Modos de Claude Code (Preguntar / Editar / Plan / Auto / Bypass)
- ✅ Modelos de Claude (Haiku / Sonnet / Opus / Fable)
- ✅ Carga tu segundo cerebro en Claude Code — hecho, repo `Angel-sales-brain-`
- ○ Networking de la cohorte (En vivo · 10 de junio)
- ○ Dominá Claude Code y tu primer toolkit (En vivo · 11 de junio) — asistido

### Semana 4 — Tu agente conectado (en proceso)
APIs, MCPs, loop prompting.

Clase 4 cursada el 18 de junio. Tareas pendientes:
- ○ Conectar API de Kommo (CRM) — setup iniciado, falta API key
- ○ Instalar un MCP nuevo (candidato: Playwright)
- ○ Loop prompting real — 20 min sin intervenir

---

## Lo que construí hasta ahora

### Repositorio principal
`github.com/angelookrios/Angel-sales-brain-`

### Archivos clave en el repo
- `Segundo Cerebro/identidad.md` — quién soy, historia, valores
- `Segundo Cerebro/negocio.md` — rol de setter, ecosistema Axel Jutoran
- `Segundo Cerebro/estrategia.md` — marca personal, FODA, objetivos SMART
- `Segundo Cerebro/procesos/setter-intel.md` — SOP completo de prospección
- `Segundo Cerebro/memoria-ia.md` — memoria exportada de ChatGPT
- `.claude/skills/setter-intel.md` — skill que Claude carga automáticamente
- `.gitignore` — protege claves y .env.local

### Infraestructura conectada
- GitHub — historial y colaboración ✅
- Vercel — deploy frontend ✅
- Supabase — base de datos ✅
- Kommo CRM — en proceso (falta API key)

---

## Conceptos clave aprendidos

### Semana 3
- **Skill**: archivo `.md` en `.claude/skills/` que le enseña a Claude cómo hacer algo. Se carga automático en cada sesión.
- **Plugin** = Skill + MCP connector (agente especializado)
- **Niveles de esfuerzo**: no cambian el modelo, cambian cuánto piensa antes de responder
- **Modos**: definen cuánta autonomía le das a Claude para actuar
- **Modelos**: cerebros distintos. Sonnet = por defecto (90% de los casos). Opus = decisiones difíciles. Haiku = rápido y barato. Fable = el más nuevo y potente.

### Semana 4
- **Ciclo del agente**: Percibe → Decide → Actúa → Observa → repite
- **API**: REST + JSON + key en `.env.local`. Nunca en el código ni en GitHub.
- **MCP**: protocolo estándar para que Claude hable con herramientas externas (Resources / Tools / Prompts)
- **Seguridad de APIs**: scopes mínimos, reintentos con backoff, try/catch en cada llamada externa
- **Loop prompting**: definir criterios de aprobación explícitos para que Claude trabaje solo 20-60 min

### Plantilla de loop prompting
```
Quiero que hagas X, Y y Z.
Esto está listo cuando: [criterio 1], [criterio 2], [criterio 3].
Si no se cumplen todos, corregí y volvé a evaluar.
Avisame solo cuando todos pasen.
```

---

## Próximos pasos inmediatos

1. Conseguir API key de Kommo (Settings → Integrations → API) y completar la conexión
2. Instalar MCP de Playwright (agente que navega la web)
3. Armar primer loop prompting sobre pipeline de Kommo
4. Completar ítem 9 de Semana 1: CLAUDE.md y Agents.md

---

## Próxima clase
Semana 4 — domingo 21 de junio (en vivo)
