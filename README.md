# SquatGym Design System

A comprehensive design system for **SquatGym**, an Argentine gym chain's internal management platform ("Sistema Integrado de Gestión · Módulo Alumnos y Clases"). The platform serves five roles — Admin, Encargado, Secretaria, Profesor, Alumno — across multiple sedes (locations), handling student lifecycle, payments/cuotas, attendance, and health declarations.

## Source Materials

Everything here derives from files attached at the start of the project:

- `TPI_DISEÑO/squatgym_prototype.html` (copied to `sources/`) — the canonical prototype. This IS the design system: a single-file vanilla-JS/CSS prototype with login, dashboard, alumnos list, alta form, declaración jurada, detalle, baja, and estado de cuenta. All tokens in `colors_and_type.css` were lifted directly from its `:root` variables.
- `TPI_DISEÑO/DIAGNOSTICO_UX.md` (copied to `sources/`) — UX diagnostic calling out issues (emoji-as-iconography, ad-hoc spacing, missing a11y) that informed the canonicalization work in this system.
- `TPI_DISEÑO/UX_COPY.md`, `NOTAS_SESION.md`, `WARNIER_LAYOUTS.md` — writing style, session notes, Warnier layouts (information architecture).
- `TPI_DISEÑO/CONTEXTO TPI DS.pdf`, `SquatGym_Documentacion.pdf`, etc — not copied (PDFs; content summarized in context).

## Project Index

| File / Folder | What it is |
|---|---|
| `README.md` | This file — overview, content + visual foundations, iconography |
| `SKILL.md` | Claude Skills manifest — load this system on demand |
| `colors_and_type.css` | Single source of truth for colors, type, spacing, motion tokens |
| `preview/` | HTML cards rendered in the Design System tab (colors, type, components, brand) |
| `sources/` | Original prototype + diagnostic docs (read-only reference) |
| `ui_kits/squatgym_admin/` | Interactive React recreation — login → dashboard → alumnos flows |
| `src/` | Aplicación React modular: datos, componentes, pantallas, estado global y utilidades |
| `index4.html` | Prototipo monolítico original, conservado como respaldo accesible |

## Ejecución local

La entrada principal es `index.html` y usa Vite:

```bash
npm install
npm run dev
```

Para una validación de producción:

```bash
npm run build
```

Cada función de pantalla del prototipo vive en `src/screens/`; los datos demo están en
`src/data/mockData.js`, la navegación en `src/data/roles.js` y los estilos extraídos en
`src/index.css`.

## Content Fundamentals

**Language:** Spanish (Argentine). Voseo is NOT used in the current prototype but is acceptable given the Córdoba audience; current copy uses standard tú-free imperatives ("Revisá", "Mirá") and formal infinitives ("Complete el formulario").

**Tone:** Direct, operational, institutional. No marketing fluff. The product is a utility, not a pitch.

**Voice:** Impersonal/third-person when referring to the user ("El alumno declara..."), second-person for the active operator ("Buscá por DNI..."). No "nosotros / we". No first-person.

**Casing:**
- **UPPERCASE** for page titles ("PANEL PRINCIPAL", "GESTIÓN DE ALUMNOS"), section headers, stat labels, button text, badges, table headers, form labels.
- **Title Case** for named entities (plans: "Full Access", "Musculación"; sedes: "Centro", "Norte").
- **Sentence case** for body copy and error messages.

**Tracked caps** are the visual signature — all caps text has `letter-spacing: 0.08em–0.18em`, never tight.

**Highlight pattern:** Page titles are split with the second word in orange — `<h1>GESTIÓN DE <span class="sg-accent">ALUMNOS</span></h1>`. Always one word, always the last one, always the key noun.

**Emoji in copy:** Used as inline iconography in section headers ("📋 Datos Personales", "🏋️ Plan y Actividad"), alerts ("⚠️ 18 alumnos con cuotas vencidas"), and buttons ("💾 Guardar Alumno"). Diagnostic flags this as a substitution for missing icon system — see ICONOGRAPHY below.

**Examples from the prototype:**
- CTA: "▶ INGRESAR", "💾 Guardar Alumno", "✔ Confirmar Baja"
- Alert (warn): "⚠️ 18 alumnos con cuotas vencidas. Revisá el listado para priorizar cobros."
- Alert (info): "ℹ️ El alumno declara bajo juramento su estado de salud. Información confidencial."
- Empty/placeholder: "— Sin promoción —", "— Seleccionar —"
- Status: "Habilitada" / "Deudor" / "Inactivo" / "Presente" / "Ausente" / "Por vencer"

**Numbers and IDs:** DNI formatted `40.123.456` (dots, 8 digits). Row numbers zero-padded to 3 digits (`001`, `002`). Dates in `DD/MM/YYYY` display, `YYYY-MM-DD` in inputs. Currency in ARS with Argentine grouping.

## Visual Foundations

**Aesthetic:** Aggressive dark athletic — think gym floor at night. Deep blacks, tracked-caps typography lifted from sports/editorial, one bold orange accent, sharp geometric edges.

**Color:**
- Background is near-black `#0A0A0A`, surfaces step up to `#131313` (cards, sidebar) and `#1C1C1C` (nested/inputs).
- Text is off-white `#F0F0F0` (never pure white) on `#777` muted.
- One accent: orange `#FF6B00` paired with a deeper `#FF3A00` for the signature gradient.
- Three semantic colors only: `#22C55E` ok, `#E8343A` error, `#F59E0B` warn. Always used at 12% tint fill + 30% border.
- Hairline borders are `rgba(255,255,255,0.07)`. This single border value appears everywhere.

**Type:** Two families. **Bebas Neue** condensed caps for all display/titles/stat values (always tracked `0.04em`). **Barlow** humanist sans for body, labels, tables, inputs (weights 400/500/600/700). No third family.

**Spacing:** Base-8 scale canonicalized (4/8/12/16/24/32). Screen padding is `1.5rem 2rem`. Grid gaps are `.9rem`. The prototype uses ad-hoc values; the diagnostic flagged this and `colors_and_type.css` locks the system.

**Backgrounds:** Flat. No imagery, no photos, no textures, no repeating patterns. The ONE exception is the **login panel** — a full-height `linear-gradient(135deg, #FF6B00, #FF3A00)` diagonal block with a giant `SG` wordmark at 22rem in 8%-black, clipped to `polygon(16% 0, 100% 0, 100% 100%, 0% 100%)`.

**Animation:** Minimal and fast. `150ms` for hover state changes (color, background tint). `200ms` base, `300ms` slow for rare cases like the quick-action top-bar reveal (`transform: scaleX(0→1)` from left). Standard easing `cubic-bezier(.4, 0, .2, 1)`. No bounces, no springs, no decorative motion.

**Hover states:**
- Sidebar items / buttons: color shifts to orange, `border-left-color` and tint `rgba(255,107,0,.05)` reveal.
- Primary buttons: `filter: brightness(1.15)`.
- Action buttons (edit/view/baja): tint→solid fill.
- Cards (`.qa`): border orange-tinted + animated 2px top bar sweeps in from left.

**Press/active states:** Not explicitly styled in the prototype — inherits browser default. Recommendation: add `transform: translateY(1px)` or a `filter: brightness(0.9)` for CTAs.

**Borders:**
- Everywhere: 1px `rgba(255,255,255,.07)` hairline.
- Stat cards: +3px left-border in `--sg-acc` (orange).
- Confirm-destructive boxes: +3px top-border in `--sg-err` (red).
- Focus: border switches to full `--sg-acc`.

**Shadows:** Very restrained. Default is the hairline border itself. Optional `0 4px 12px rgba(0,0,0,.4)` for modals.

**Corner radii:** **0 everywhere.** The system is sharp/geometric. Only exception: avatars are `50%` (perfect circle). The "rounded" visual identity comes not from radii but from the **signature clip-path bevel**: `polygon(0 0, calc(100% - 7px) 0, 100% 100%, 7px 100%)` — a 7px diagonal cut on all primary/success/danger CTAs, giving a subtle athletic "motion" feel.

**Transparency / blur:** Sparingly. Topbar uses `backdrop-filter: blur(12px)` over `rgba(10,10,10,.97)` for a frosted sticky header. Nowhere else.

**Imagery:** None currently. When photographic imagery is added, recommended treatment: warm/high-contrast, action/athletic, subtle grain.

**Layout rules:**
- Topbar 48px sticky, z-index 100.
- Sidebar 210px fixed, full-height scroll within main.
- Main content max-width: flexible (100% minus sidebar), padding `1.5rem 2rem`.
- `.g4`, `.g3`, `.g2` grid utilities; responsive down to `.g4,.g3 → 1fr 1fr` and `.g2 → 1fr` at 768px.
- Mobile kills the login-right gradient panel and the sidebar.

**Cards:** Flat dark surface (`#131313`) + 1px hairline border. No shadow. No rounded corners. Often gain a 3px accent border on one edge for hierarchy. Interactive cards gain an animated 2px orange top-bar on hover.

## Iconography

**Current state:** Unicode emoji used throughout — section headers (📋 📞 🏋️ 🏥 ✍️), role selectors (🔑 🏠 📋 🏋️ 🎓), sidebar nav (📊 👥 💳 ✅ 📅 🏢 📈), alerts (⚠️ ℹ️ ❌ ✅), actions (▶ ✔ ✗ 💾 🔍 📄).

This is **flagged in the UX diagnostic as a substitution for a proper icon system** — emoji renders inconsistently across OS/browsers, has accessibility issues, and reads as "prototype" rather than "product".

**Recommendation going forward: migrate to [Lucide](https://lucide.dev)** — stroke-based SVG set, 24×24, 2px stroke. Matches the geometric aesthetic. Can be used via CDN or copied locally. Mapping: `key` / `home` / `clipboard-list` / `dumbbell` / `graduation-cap` for roles; `users` / `credit-card` / `check-square` / `calendar-days` / `building` / `trending-up` for nav; `alert-triangle` / `info` / `x-circle` / `check-circle` for alerts.

**No icon font currently embedded.** No custom SVG set exists in the codebase.

**Logos / imagery:** SquatGym has no mark — the logo is a pure wordmark, `SQUAT` + `GYM` (in accent orange), set in Bebas Neue. No separate lockup. No photography used. No illustrations used.

## Caveats & Known Gaps

- **Fonts are CDN-only** (Google Fonts import in CSS). No local `.ttf` / `.woff2` copied into `fonts/`. User should provide font files if offline/licensed build is needed.
- **No icon assets** — the system currently uses emoji. Lucide via CDN is recommended but not yet wired in.
- **Press/active states** are not canonically defined — inherited from browser.
- **Spacing scale** is canonicalized (not in the original prototype); verify against design intent.
- **No imagery / photography** treatment exists — guidelines in "Visual Foundations" are proposed, not extracted from existing assets.
