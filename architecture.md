# Architecture Document

## File Structure and Purpose

| File | Purpose |
|------|---------|
| `index.html` | Main HTML shell, imports all CSS/JS, renders tier selection, registers service worker |
| `architecture.md` | Documents all files with purposes and modification logs |
| `sw.js` | Service worker for offline caching of all local assets |
| `design-tokens.css` | CSS custom properties for colors, spacing, fonts |
| `css/layout.css` | Page structure, grid system, banner positioning logic |
| `css/components.css` | UI components: buttons, cards, pop-up, tier selector, score display |
| `js/problem-generator.js` | Parameterized problem generation per difficulty tier |
| `js/solver.js` | Answer validation, step-by-step reveal, session score tracking |
| `js/ui-controller.js` | DOM manipulation, language toggle, banner state, pop-up management |

## Modification Log

| Date | File | Change Description |
|------|------|-------------------|
| 2025-01-07 | architecture.md | Initial creation - file architecture defined |
| 2025-01-07 | design-tokens.css | Created - CSS custom properties for colors, spacing, fonts |
| 2025-01-07 | css/layout.css | Created - page structure, grid system, banner positioning |
| 2025-01-07 | css/components.css | Created - UI components: buttons, cards, pop-up, tier selector |
| 2025-01-07 | index.html | Created - HTML shell with tier selection and service worker registration |
| 2025-01-07 | sw.js | Created - service worker for offline caching |
| 2025-01-07 | js/problem-generator.js | Created - parameterized problem generation per tier |
| 2025-01-07 | js/solver.js | Created - answer validation, step-by-step reveal, score tracking |
| 2025-01-07 | js/ui-controller.js | Created - DOM manipulation, language toggle, banner state management |

## Design Principles

- Vanilla JavaScript only, zero dependencies
- No camelCase - underscores for JS, hyphens for CSS classes
- Bilingual: Malagasy (primary/default), French (secondary)
- Offline-first via service worker
- Mobile-first responsive design
- High contrast, large text for accessibility
- No eval(), no external scripts, no user data storage
