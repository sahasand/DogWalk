# Walkies Mobile App

Walkies is the production-ready React + Capacitor port of the original Walkies prototype. The app reproduces the HTML, CSS, and JavaScript experience pixel-for-pixel while enabling native builds for iOS and Android.

## Tech Stack
- React with functional components and React Router
- Vanilla JavaScript interaction layer adapted from the original prototype (`src/appLogic.js`)
- Tailwind CDN + original `styles.css` for styling (loaded unchanged)
- Capacitor 7 for native builds (iOS and Android)

## Getting Started

```bash
npm install
npm start
```

The development server runs at [http://localhost:3000](http://localhost:3000). The original DOM-driven flows are initialized automatically.

## Building the Web App

```bash
npm run build
```

The optimized production bundle is output to the `build/` directory. Capacitor uses this directory as its `webDir`.

## Capacitor Workflow

This repository keeps the Capacitor configuration and web assets source-controlled, while the generated native projects (`android/`, `ios/`) are intentionally excluded to avoid committing binary resources. Regenerate them locally with the provided scripts when you are ready to build or run on a device.

| Command | Purpose |
| --- | --- |
| `npm run build` | Produce the latest web assets |
| `npm run cap:add` | Generate fresh iOS and Android projects |
| `npm run cap:copy` | Copy the current build into native shells |
| `npm run cap:sync` | Copy the build and refresh native dependencies |
| `npm run cap:update` | Update installed Capacitor plugins |

### First-time native setup
1. `npm install`
2. `npm run build`
3. `npm run cap:add`
4. `npm run cap:sync`

The `npm run cap:add` helper is safe to re-run; Capacitor skips platforms that are already registered.

### iOS
1. `npm run build`
2. `npm run cap:sync`
3. Open `ios/App/App.xcworkspace` in Xcode.
4. Configure signing, then build/run on a simulator or device.

### Android
1. `npm run build`
2. `npm run cap:sync`
3. Open `android` in Android Studio.
4. Let Gradle sync, then build/run on an emulator or device.

### Plugins
The app pre-installs and configures:
- `@capacitor/status-bar`
- `@capacitor/splash-screen`
- `@capacitor/haptics`

## Testing
The project currently relies on manual QA. Focus on verifying navigation, booking flows, and interactive states across the bottom navigation destinations.

## Project Structure Highlights
- `src/screens/` — React wrappers for each original page section
- `src/appLogic.js` — Ported vanilla JS logic that drives data, flows, and modals
- `public/assets/css/styles.css` — Original stylesheet served unchanged
- `capacitor.config.json` — Capacitor configuration (`appId`: `com.walkies.app`)
- `android/` and `ios/` — Generated native projects (ignored in Git); run `npm run cap:add` then `npm run cap:sync`

## License
Internal project. All rights reserved.
