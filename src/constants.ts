// Shared data: color palette, breathing patterns, and app defaults.

export type AccentKey = "sage" | "blue" | "lavender" | "beige";
export type ThemeMode = "light" | "dark" | "auto";
export type Theme = "light" | "dark";
export type PatternKey = "calm" | "box" | "soft";

export interface Accent {
  label: string;
  hex: string;
}

export const ACCENTS: Record<AccentKey, Accent> = {
  sage:     { label: "Sage",     hex: "#B8C4A9" },
  blue:     { label: "Blue",     hex: "#A9B6C4" },
  lavender: { label: "Lavender", hex: "#C9BFD3" },
  beige:    { label: "Beige",    hex: "#D4C9B5" },
};

export type PhaseName = "Inhale" | "Hold" | "Exhale";

export interface Pattern {
  label: string;
  sub: string;
  phases: Array<[PhaseName, number]>;
}

export const PATTERNS: Record<PatternKey, Pattern> = {
  calm: { label: "Calm", sub: "4 · 7 · 8",     phases: [["Inhale", 4], ["Hold", 7], ["Exhale", 8]] },
  box:  { label: "Box",  sub: "4 · 4 · 4 · 4", phases: [["Inhale", 4], ["Hold", 4], ["Exhale", 4], ["Hold", 4]] },
  soft: { label: "Soft", sub: "5 · 5",         phases: [["Inhale", 5], ["Exhale", 5]] },
};

export interface Prefs {
  accent: AccentKey;
  themeMode: ThemeMode;
  pattern: PatternKey;
  haptics: boolean;
  reminder: boolean;
}

export const DEFAULTS: Prefs = {
  accent: "sage",
  themeMode: "auto",
  pattern: "calm",
  haptics: true,
  reminder: false,
};
