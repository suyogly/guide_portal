---
name: design-system
description: >-
  Design system reference for TrekGuide Hub (guide_portal). Documents the complete
  visual language: colors, typography, spacing, borders, glassmorphism, shadows, motion,
  and component patterns. Use when building new components, reviewing UI consistency,
  asking about colors/fonts/spacing, or auditing design decisions in this project.
---

# TrekGuide Hub — Design System

## Color Palette

### Brand Tokens (defined in `app/globals.css` `@theme inline`)

| Token | Hex | Usage |
|---|---|---|
| `nepal-orange` | `#FF671F` | CTAs, active states, highlights, accents, glow color |
| `himalayan-blue` | `#003893` | Gradients, deep UI elements, SmartSearch glow |

### Background Scale

| Class | Role |
|---|---|
| `bg-slate-950` / `#020617` | Page-level background (body, `<main>`, Footer) |
| `bg-slate-900` | Elevated surfaces, card backgrounds, Navbar (scrolled) |
| `bg-slate-900/50` | Semi-transparent form sections |
| `bg-white/5` – `bg-white/10` | Glass layers on dark backgrounds |

### Text Scale

| Class | Role |
|---|---|
| `text-white` | Primary headings, strong body copy |
| `text-gray-300` | Secondary body copy |
| `text-gray-400` – `text-gray-500` | Supporting / muted text |
| `text-white/40` | Footer fine print, disabled states |
| `text-nepal-orange` | Inline accent text, active nav links |

### Gradient Text

```tsx
// Heading gradient — hero accent words
className="bg-gradient-to-r from-nepal-orange to-orange-400 bg-clip-text text-transparent"
```

### Overlays

- `bg-gradient-to-t from-slate-950` — fade-to-black at bottom of hero images and cards
- `bg-blue-950/40` — blue tint overlay on hero backgrounds
- `bg-black/90` — heavy overlay on bento-grid card text areas

---

## Typography

### Font Families (loaded in `app/layout.tsx`)

| Variable | Font | Role |
|---|---|---|
| `--font-outfit` → `font-display` | **Outfit** | All headings (`h1`–`h6`) via global CSS rule |
| `--font-geist-sans` → `font-sans` | **Geist Sans** | Body text (default `font-family` on `body`) |
| `--font-geist-mono` → `font-mono` | **Geist Mono** | Code / monospace |

> `globals.css` sets `h1–h6 { font-family: var(--font-display) }` globally.  
> Always use `font-display` on headings and `font-sans` on body — never hardcode font names.

### Type Scale Patterns

| Context | Classes |
|---|---|
| Hero / page title | `text-5xl md:text-7xl font-display font-bold tracking-tight` |
| Section heading | `text-4xl font-display font-bold text-white mb-4` |
| Sub-heading | `text-2xl md:text-3xl font-display font-bold` |
| Body | `text-gray-400 max-w-2xl mx-auto` (centered descriptions) |
| Label / Eyebrow | `uppercase tracking-widest text-xs text-gray-500` |
| Small caps badge | `uppercase tracking-wider text-[10px]` |

---

## Spacing & Layout

- **Section vertical padding:** `py-20` (standard), `py-16` (compact)
- **Container:** centered `div` with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section intro block:** `text-center mb-16 px-4` with `h2` + `p` description
- **Gap between grid items:** `gap-6` (cards), `gap-4` (form fields), `gap-8` (large grids)

---

## Border Radius

| Value | When to use |
|---|---|
| `rounded-full` | Buttons (pill), search inputs, avatar circles, icon containers |
| `rounded-3xl` | Large cards (OrganicGrid), bento tiles |
| `rounded-2xl` | Form sections, medium cards, modals |
| `rounded-xl` | Small cards, dropdowns, input fields |
| `rounded-lg` | Navbar logo icon, small UI chips |
| `rounded-[2.5rem]` | ContactForm success state (one-off, avoid elsewhere) |

---

## Borders

- **Default surface border:** `border border-white/10`
- **Subtle / footer border:** `border-t border-white/5`
- **Hover highlight:** `hover:border-nepal-orange` (cards) or `hover:border-orange-500`
- **Focus ring:** `focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange`
- **Glass card border:** `border border-white/10 hover:border-white/20`
- **Success / accent border:** `border-nepal-orange/20`

---

## Glassmorphism

The signature effect for cards, overlays, search, and modals:

```tsx
// Standard glass card
className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl"

// Heavy glass (search bar, success screens)
className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl"

// Form section glass
className="bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-2xl"
```

**Rules:**
- Always pair `backdrop-blur` with a semi-transparent `bg-*/*` value
- Always add a thin `border border-white/10` to distinguish from the background
- `backdrop-blur-md` for cards, `backdrop-blur-xl` for foreground hero elements

---

## Shadows & Glows

| Pattern | Usage |
|---|---|
| `shadow-lg shadow-nepal-orange/20` | Primary CTA buttons |
| `shadow-xl shadow-orange-500/20` | ContactForm submit button |
| `shadow-2xl` | Navbar dropdown, elevated modals |
| `shadow-[0_0_30px_rgba(255,103,31,0.4)]` | Button hover mega-glow (MatchmakerForm) |
| `shadow-[0_0_60px_rgba(255,103,31,0.15)]` | SmartSearch outer glow ring |

> Colored glows are reserved for nepal-orange CTAs. Avoid adding orange glow to non-interactive elements.

---

## Motion (Framer Motion)

### Entrance animations

```tsx
// Standard fade-up (sections)
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: index * 0.1 }}  // stagger with index

// Hero text / above-fold
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
```

### Hover interactions

```tsx
// Card image zoom
whileHover={{ scale: 1.05 }}
transition={{ duration: 0.6 }}

// CTA button lift
hover:scale-[1.02]  // or whileHover={{ scale: 1.02 }}
hover:-translate-y-1

// Icon nudge
group-hover:translate-x-1 transition-transform
```

### Parallax (Hero)

```tsx
const { scrollY } = useScroll();
const bgY = useTransform(scrollY, [0, 500], [0, 150]);     // background moves slower
const textY = useTransform(scrollY, [0, 500], [0, 80]);    // text moves medium
```

### Dropdown / overlay

```tsx
// Navbar dropdowns & mobile menu
<AnimatePresence>
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  />
</AnimatePresence>
```

**Rules:**
- Use `viewport={{ once: true }}` on all `whileInView` — don't repeat on scroll-back
- Stagger card/grid items with `delay: index * 0.1`
- Keep entrance durations 0.5–0.8s; hover transitions 0.2–0.3s

---

## Button Patterns

### Primary CTA
```tsx
className="rounded-full bg-nepal-orange px-6 py-3 font-semibold text-white
           shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] hover:-translate-y-0.5
           transition-all duration-200"
```

### Gradient CTA (forms)
```tsx
className="w-full rounded-2xl bg-gradient-to-r from-nepal-orange to-orange-600
           py-4 font-semibold text-white hover:shadow-[0_0_30px_rgba(255,103,31,0.4)]
           hover:-translate-y-1 transition-all duration-300"
```

### Ghost / Secondary
```tsx
className="rounded-full border border-white/20 px-6 py-3 text-white
           hover:border-white/40 hover:bg-white/10 transition-all duration-200"
```

---

## Form Inputs

```tsx
// Text input
className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 text-white
           placeholder:text-gray-500 focus:border-nepal-orange focus:ring-1
           focus:ring-nepal-orange focus:outline-none transition-colors"

// Label
className="block uppercase tracking-widest text-xs text-gray-400 mb-2"
```

---

## Image Handling

- **Source:** All remote images from `images.unsplash.com` (configured in `next.config.ts`)
- **Always use** `next/image` with explicit `width`/`height` or `fill`
- **Hover zoom:** wrap in `overflow-hidden` container + `whileHover={{ scale: 1.05 }}` on `<motion.div>`
- **Overlay:** gradient `from-black/90` or `from-slate-950` for text legibility

---

## Known Inconsistencies (to fix)

1. **Double chrome on `/guides`:** `app/guides/page.tsx` imports `<Navbar>` and `<Footer>` directly, but `app/layout.tsx` already wraps all pages — causes duplicate nav/footer.
2. **Contact form is UI-only:** simulates success but never POSTs — should match MatchmakerForm's real FormSubmit integration or be clearly labelled as a placeholder.
3. **Missing `/public/guides/*` assets:** `lib/guides.ts` references local image paths that aren't committed — add real images or switch to Unsplash URLs.
4. **Hardcoded machine path:** One itinerary's `mapImage` uses an absolute local path — replace with a `/public` relative path.
5. **Package name mismatch:** `package.json` name is `nepal-trek-itinerary`; metadata title is `TrekGuide Hub` — align these.
