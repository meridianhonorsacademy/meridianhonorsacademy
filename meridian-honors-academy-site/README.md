# Meridian Honors Academy Website

A responsive, accessible static website concept for Meridian Honors Academy.

## Preview locally

Open `index.html` in a modern browser. For the most reliable preview, run a simple local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Files

- `index.html` — page structure and content
- `styles.css` — responsive visual design
- `script.js` — mobile navigation, reveal animation, FAQ, and prototype interest form
- `assets/meridian-logo.png` — supplied school logo
- `assets/favicon.png` — favicon created from the supplied logo

## Before publishing

1. Connect the interest form to an approved form or admissions platform. The current prototype saves data only to the visitor's browser using `localStorage`.
2. Confirm the final school authorization status, opening year, campus address, admissions timeline, and eligibility language.
3. Replace “design and approval phase” language when the school is authorized.
4. Add approved contact information, privacy notice, accessibility statement, and required district/authorizer language.
5. Run a final content review before public launch.

## Design system

- Navy: `#05245C`
- Coral: `#FF5D49`
- Warm cream: `#F8F4ED`
- Light blue: `#EAF2FB`
- Display type: Georgia
- Body type: system sans-serif

The website is dependency-free and can be hosted on GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a standard web server.
