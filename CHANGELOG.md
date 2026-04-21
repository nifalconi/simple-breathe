# Changelog

All notable changes to **Breathe** after forking from
[`simple-app-template`](https://github.com/nifalconi/simple-app-template).

Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [SemVer](https://semver.org/).

---

## [0.1.0] — 2026-04-20

First public build. Live at
[nifalconi.github.io/simple-breathe](https://nifalconi.github.io/simple-breathe/).

### Added

- **Breathing session** on the home screen — scaling orb, phase label
  with fade-up, pattern picker (Calm 4·7·8, Box 4·4·4·4, Soft 5·5),
  Begin/End controls, and an elapsed-time readout.
- **Tap orb to toggle** — the orb itself is a click target; starts the
  session when idle, ends it when running.
- **Settings → Session card** — default pattern segmented control and
  a haptics toggle.
- **Settings → Reminders card** — daily-reminder toggle (stub; wire up
  the Notifications API to fulfill).
- **Light haptic pulse** on each phase change when haptics are enabled.
- **Persisted prefs** — pattern, haptics, reminder saved to
  `localStorage` alongside accent + theme mode.

### Changed

- **Rebranded** to `breathe` (name, short name, description, purpose,
  audience) and locked orientation to portrait.
- **Orb easing** swapped from `cubic-bezier(0.4, 0, 0.4, 1)` (front-
  loaded) to `cubic-bezier(0.45, 0, 0.55, 1)` (sine ease-in-out) so the
  inhale/exhale motion spreads evenly across the phase.
- **Stopping a session** now resets `phaseIdx` and `elapsed` — the next
  idle screen opens pristine (00:00, pattern sub-label shown).
- **Settings footer** copy → `v1.0 · take it slow`.

### Kept from template

- Splash, theme resolver (light / dark / auto), accent palette
  (sage / blue / lavender / beige), PWA install flow, service worker,
  hidden dev panel, GitHub Pages deploy workflow.

---

## Commit log

| SHA       | Type            | Subject                                           |
| --------- | --------------- | ------------------------------------------------- |
| `837073f` | feat(home)      | tap orb to toggle session; stop resets state      |
| `43c42b7` | fix(home)       | smooth out orb scale easing                       |
| `86e9eab` | feat(settings)  | session and reminders cards                       |
| `7d6e812` | feat(home)      | breathing orb session with phase loop             |
| `7ade878` | feat(constants) | add breathing patterns and session prefs          |
| `b6ea3b5` | chore           | rebrand to Breathe                                |

[0.1.0]: https://github.com/nifalconi/simple-breathe/releases/tag/v0.1.0
