# Amelia Gardens Website

A static landing page for Amelia Gardens — a family-oriented residential community in Km 25, carretera Villa Mella–Yamasá, Santo Domingo Norte, Dominican Republic.

## How to run

The site is a static HTML/CSS/JS project with no build step.

**Preview locally:**
```
python3 -m http.server 5000
```
Then open `http://localhost:5000`.

**Production:** Deploy directly to Cloudflare Pages (root directory `/`, no build command, build output `.`).

## Project structure

| File | Purpose |
|---|---|
| `index.html` | Main page — all sections |
| `styles.css` | All styles (tokens, layout, components, responsive) |
| `script.js` | WhatsApp links, Instagram/Maps links, form, animations |
| `config.js` | Central config (phone, Instagram URL, Google Maps URL, canonical URL) |
| `robots.txt` | SEO robots directives |
| `sitemap.xml` | SEO sitemap |
| `assets/` | Static assets (favicon) |

## Configuration

Edit `config.js` to update key values without touching other files:

```js
window.AMELIA_CONFIG = {
  whatsappNumber: "18496264949",   // WhatsApp number (digits only)
  canonicalUrl: "",                 // Set once domain is live (e.g. "https://ameliagardensrd.com")
  formEndpoint: "",                 // Unused — form sends via WhatsApp
  instagramUrl: "https://instagram.com/ameliagardensrd",
  instagramHandle: "@ameliagardensrd",
  googleMapsUrl: "https://maps.app.goo.gl/K3VM1j5qKnEGbSj4A?g_st=ic"
};
```

## Sections (in order)

1. **Hero** — Full-screen background, headline "Construye el futuro de tu familia"
2. **Stats bar** — Price, deposit, financing, location
3. **El Proyecto** — Two-column intro
4. **Por qué Amelia Gardens** — 6 emoji benefit cards
5. **Imagina tu nueva vida** — 6 lifestyle image cards (new)
6. **Galería** — 6-photo hover grid (new)
7. **Proceso** — 4-step purchase process
8. **CTA Banner** — Full-width background image CTA (new)
9. **Ubicación** — Premium location card + Google Maps button (new)
10. **Síguenos** — Instagram section (new)
11. **Contacto** — Channel cards + WhatsApp form
12. **FAQ** — Accordion
13. **Final CTA** — Green gradient banner
14. **Footer** — Social icons (Instagram, WhatsApp, Maps)

## User preferences

- Keep existing architecture — no framework migrations, no build tools
- Only improve and polish; do not replace design or branding
- All contact actions route through WhatsApp; form sends via `wa.me` deep link
- Branding: deep green palette (`#1f5a3f` primary), cream accent, Inter font
- Tone: emotional, premium, family-oriented, Dominican lifestyle
