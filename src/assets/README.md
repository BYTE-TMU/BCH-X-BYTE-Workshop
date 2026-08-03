# src/assets/

Static assets imported directly by React components via ES module imports.

---

## Contents

| Path | Usage |
|---|---|
| `Team Images/*.jpg` `.jpeg` `.png` | Six team member photos, imported by `data/teamData.js` and rendered on the Contact page |
| `Logos/business_career_hub.png` | BCH logo, imported by `data/orgs.js` |
| `Logos/BYTE-Logo.png` | BYTE logo, imported by `data/orgs.js` |

---

## Notes

- Assets imported here are processed by Vite at build time (hashed filenames).
- Assets that should be served as-is (without hashing) belong in `public/` instead — e.g. `favicon.svg`.
- **Team photos are not currently optimised.** Several are 1.5–2.4 MB straight from a phone camera and dominate the production bundle. Resizing them to roughly 600px on the long edge before committing would cut page weight by well over 90% with no visible difference at the size they render.
- `Contact.jsx` renders initials in a circle if an image fails to load, so a missing or renamed file degrades gracefully rather than breaking the page.
