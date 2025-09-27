# DogWalk Agent Guide

## Project snapshot (September 2025 mock UI)
- **Purpose:** Interactive prototype of "Walkies", a mobile-first dog walking client app. Everything is front-end only; there is no build tooling or backend.
- **Tech stack:** Static `index.html` that loads Tailwind via CDN, custom CSS in `assets/css/styles.css`, and vanilla JavaScript in `assets/js/app.js`.
- **State & data:** Mock dog, walker, walk-history, inbox, and payment data live at the top of `app.js`. Functions mutate in-memory arrays to drive UI flows (booking, dog management, chat, etc.).
- **Navigation model:** Pages are `<section class="page">` elements toggled by `goToPage`. The bottom nav highlights the active page unless `goToPage` flags a full-screen flow.
- **Booking flow:** Injected template string `fullBookingFlowHTML` (see `app.js`) renders the multi-step modal-style booking experience. `fullInitBookingFlow()` wires up listeners.

## Working in this repository
- Keep the experience mobile-first (max width ~420px). Test changes at small viewport widths.
- Avoid introducing build steps. Stick with static assets unless you also update this guide.
- When editing JavaScript:
  - Continue using plain modules defined in `app.js` (no bundlers/ESM). Keep new helpers pure where possible and group related functions together.
  - Update mock data consistently (e.g., if you add a walker that appears in history, ensure dependent arrays reference the same object shape).
  - Preserve the `goToPage` navigation contract; new pages should use the existing `.page` pattern and register rendering logic in the `switch` statement.
- When editing CSS:
  - Respect the existing glassmorphism aesthetic and color variables defined in `:root`.
  - Favor utility-like class patterns (e.g., `space-y-*`, `grid-cols-*`) to match the Tailwind-inspired markup.
- Accessibility:
  - Maintain button semantics and ensure interactive elements remain reachable for keyboard users.
  - Keep sufficient color contrast against the gradient background.

## Running & testing
- There is no build process. Open `index.html` in a browser or serve the directory with a simple static server (e.g., `python3 -m http.server`).
- No automated tests exist; verify user flows manually (onboarding, booking, navigation, dog management, chat, payments).

## Documentation hygiene
- Update this file whenever the tech stack, data model, or workflows change in a meaningful way.
- If you add deeper documentation (e.g., design system notes), cross-link it here for quick discovery.
