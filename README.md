# Breathe

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

A calm, single-purpose breathing PWA. Pick a pattern, tap the orb, follow
it in and out. No sign-up, no tracking, no backend.

**Live:** [nifalconi.github.io/simple-breathe](https://nifalconi.github.io/simple-breathe/)

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

## Install as a PWA

Open the live URL on a phone:

- **iOS Safari** — Share → **Add to Home Screen**.
- **Android Chrome / Desktop Chrome / Edge** — tap **Install** in the
  Settings screen, or use the browser's install menu.

Once installed, it runs offline and in its own window.

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
