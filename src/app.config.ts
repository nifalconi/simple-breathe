// Fork-point #1: rebrand the app by editing this file.
// Everything downstream (manifest, <title>, theme color) reads from here.

export interface AppConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  accentColor: string;
  purpose: string;
  audience: string;
  display: "standalone" | "fullscreen" | "minimal-ui" | "browser";
  orientation: "any" | "portrait" | "landscape";
  lang: string;
}

export const appConfig: AppConfig = {
  name: "breathe",
  shortName: "breathe",
  description: "A calm, single-purpose breathing PWA. Pick a pattern, tap to begin, follow the orb.",
  themeColor: "#F6F1E8",
  backgroundColor: "#F6F1E8",
  accentColor: "#B8C4A9",

  purpose: "Guide a short breathing session with a gently scaling orb.",
  audience: "Anyone who wants one minute of calm.",

  display: "standalone",
  orientation: "portrait",
  lang: "en",
};
