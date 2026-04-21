# Breathe

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

A calm, single-purpose breathing PWA. Pick a pattern, tap the orb, follow
it in and out. No sign-up, no tracking, no backend.

**Live:** [nifalconi.github.io/simple-breathe](https://nifalconi.github.io/simple-breathe/)

**Installs as a PWA in one tap** — open the live URL on your phone, hit
**Install** (or **Add to Home Screen** on iOS), and Breathe lives on your
home screen like any native app. Offline, full-screen, no App Store.

## What it does

One screen. A soft orb that scales on inhale, holds, and shrinks on
exhale. A phase label fades in with each transition. An elapsed timer
below the orb. A Begin / End button — or tap the orb itself to
toggle. Stop, and the screen resets clean for next time.

A Settings screen handles theme (Light / Dark / Auto), accent color,
default pattern, haptics, and a daily-reminder toggle. Prefs persist
to `localStorage`.

## Patterns

| Pattern | Rhythm (seconds) | Feels like                       |
| ------- | ---------------- | -------------------------------- |
| Calm    | 4 · 7 · 8        | Slow exhale. Drops anxiety fast. |
| Box     | 4 · 4 · 4 · 4    | Even square. Focus reset.        |
| Soft    | 5 · 5            | Two-phase, no hold. Easiest.     |

## Install as a PWA — super easy

No app store, no account, no download dialog. Open the live URL and
install it in one tap:

- **iOS Safari** — Share → **Add to Home Screen**. Done.
- **Android Chrome / Desktop Chrome / Edge** — tap **Install** inside
  the Settings screen (or use the browser's own Install menu). Done.

Once installed, Breathe launches full-screen from your home screen,
works offline (service worker precaches the bundle on first visit),
and takes up about 160 KB.

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serves the production build on :4173
```

Required Node version lives in `.nvmrc`. `nvm use`, `fnm use`, or
`asdf install` picks it up.

## Deploy

Every push to `main` triggers
[.github/workflows/deploy.yml](.github/workflows/deploy.yml), which
builds and publishes to GitHub Pages at
`https://<user>.github.io/<repo>/`. The workflow injects
`VITE_BASE=/<repo>/` so the Vite base path matches the Pages subpath.

## Project structure

```text
src/
  main.tsx          # entry — init(root, appConfig)
  App.tsx           # shell: splash, screen nav, theme resolver
  Home.tsx          # breathing session (orb + patterns + Begin/End)
  Settings.tsx      # theme + session + reminders + install
  constants.ts      # ACCENTS, PATTERNS, Prefs, DEFAULTS
  storage.ts        # localStorage boundary
  usePwaInstall.ts  # beforeinstallprompt hook
  lib/
    haptics.ts      # Vibration API wrapper
    notifications.ts# Notification API wrapper
  style.css         # globals + keyframes
  app.config.ts     # brand (name, colors, description)
public/
  icon.svg          # PWA icon
  favicon.svg
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and commit
references.

## Built on

[`simple-app-template`](https://github.com/nifalconi/simple-app-template)
— the Vite + React + TypeScript + `vite-plugin-pwa` scaffolding that
ships the splash, theme system, install flow, service worker, and
GitHub Pages deploy workflow.

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
— same as the template. Share, adapt, non-commercial, attribute, pass
the license along.
