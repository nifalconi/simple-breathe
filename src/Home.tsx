// Breathing session — idle (pick pattern, Begin) and running (phase loop, End session).

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  PATTERNS,
  type PatternKey,
  type PhaseName,
  type Theme,
} from "./constants.ts";
import { pulse } from "./lib/haptics.ts";

interface HomeScreenProps {
  accent: string;
  wordmark: string;
  theme: Theme;
  pattern: PatternKey;
  setPattern: (p: PatternKey) => void;
  haptics: boolean;
  onOpenSettings: () => void;
  onBegin: () => void;
}

interface NavIconBtnProps {
  onClick: () => void;
  children: ReactNode;
  isDark: boolean;
}

function NavIconBtn({ onClick, children, isDark }: NavIconBtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40, height: 40, borderRadius: 999,
        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.55)",
        border: isDark ? "0.5px solid rgba(255,255,255,0.08)" : "0.5px solid rgba(0,0,0,0.05)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", padding: 0,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >{children}</button>
  );
}

type PhaseLabel = PhaseName | "Breathe";

interface OrbProps {
  phase: PhaseLabel;
  phaseDuration: number;
  accent: string;
  running: boolean;
}

function Orb({ phase, phaseDuration, accent, running }: OrbProps) {
  const targetScale =
    phase === "Inhale" ? 1.4 :
    phase === "Exhale" ? 0.55 :
    undefined;

  const [scale, setScale] = useState<number>(0.7);

  useEffect(() => {
    if (!running) { setScale(0.7); return; }
    if (targetScale !== undefined) {
      requestAnimationFrame(() => setScale(targetScale));
    }
  }, [phase, running, targetScale]);

  const idleAnim = running ? "none" : "orbIdle 6s ease-in-out infinite";
  const transition = running
    ? `transform ${phaseDuration}s cubic-bezier(0.45, 0, 0.55, 1)`
    : "transform 1.2s ease";

  return (
    <div style={{
      position: "relative", width: 260, height: 260,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: `radial-gradient(circle at 50% 45%, ${accent}33 0%, ${accent}00 70%)`,
        transform: `scale(${scale * 1.25})`,
        transition,
        animation: idleAnim,
      }} />
      <div style={{
        position: "relative", width: 200, height: 200, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${accent} 65%, ${accent}cc 100%)`,
        boxShadow: `0 20px 50px -10px ${accent}55, inset 0 -8px 20px rgba(0,0,0,0.04), inset 4px 6px 20px rgba(255,255,255,0.6)`,
        transform: `scale(${scale})`,
        transition,
      }} />
    </div>
  );
}

export default function HomeScreen({
  accent, wordmark, theme, pattern: patternKey, setPattern, haptics,
  onOpenSettings,
}: HomeScreenProps) {
  const isDark = theme === "dark";
  const fg = isDark ? "#E9E4D7" : "#3A3A36";
  const muted = isDark ? "rgba(233,228,215,0.5)" : "#3A3A3680";
  const subtle = isDark ? "rgba(233,228,215,0.35)" : "#3A3A3666";

  const pattern = PATTERNS[patternKey];

  const [running, setRunning] = useState<boolean>(false);
  const [phaseIdx, setPhaseIdx] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setPhaseIdx(0); }, [patternKey]);

  useEffect(() => {
    if (!running) return;
    const [, dur] = pattern.phases[phaseIdx];
    if (haptics) pulse("light");
    timerRef.current = setTimeout(() => {
      setPhaseIdx(i => (i + 1) % pattern.phases.length);
    }, dur * 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [running, phaseIdx, pattern, haptics]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const start = (): void => {
    setPhaseIdx(0);
    setElapsed(0);
    setRunning(true);
  };
  const stop = (): void => {
    setRunning(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const [currentPhase, currentDuration]: [PhaseLabel, number] = running
    ? pattern.phases[phaseIdx]
    : ["Breathe", 0];

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "0 28px",
      color: fg,
      fontFamily: '"Geist", -apple-system, system-ui, sans-serif',
      fontFeatureSettings: '"ss01"',
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: 62, paddingBottom: 4,
      }}>
        <div style={{ width: 40 }} />
        <div style={{
          fontSize: 13, letterSpacing: 2, textTransform: "lowercase",
          color: subtle, fontWeight: 500,
        }}>{wordmark}</div>
        <NavIconBtn onClick={onOpenSettings} isDark={isDark}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="3" r="1.2" fill={fg} fillOpacity="0.7"/>
            <circle cx="7" cy="7" r="1.2" fill={fg} fillOpacity="0.7"/>
            <circle cx="7" cy="11" r="1.2" fill={fg} fillOpacity="0.7"/>
          </svg>
        </NavIconBtn>
      </div>

      <div style={{
        flex: "0 0 auto", paddingTop: 32, textAlign: "center",
        minHeight: 80,
      }}>
        <div
          key={currentPhase}
          style={{
            fontSize: 34, fontWeight: 400, letterSpacing: -0.8,
            color: fg,
          }}
        >
          <span className="phase-fade">{currentPhase}</span>
        </div>
        <div style={{
          marginTop: 8, fontSize: 14, color: muted,
          letterSpacing: 0.2, fontVariantNumeric: "tabular-nums",
          minHeight: 20,
        }}>
          {running ? `${currentDuration}s` : pattern.sub}
        </div>
      </div>

      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Orb
          phase={currentPhase}
          phaseDuration={currentDuration || 4}
          accent={accent}
          running={running}
        />
      </div>

      {!running ? (
        <div style={{
          display: "flex", gap: 8, justifyContent: "center",
          paddingBottom: 18,
        }}>
          {(Object.entries(PATTERNS) as Array<[PatternKey, typeof PATTERNS[PatternKey]]>).map(([key, p]) => (
            <button
              key={key}
              onClick={() => setPattern(key)}
              style={{
                opacity: key === patternKey ? 1 : 0.45,
                border: "none", background: "transparent",
                padding: "6px 10px",
                fontFamily: "inherit", fontSize: 13,
                color: fg, letterSpacing: 0.2,
                cursor: "pointer",
                transition: "opacity 200ms ease",
              }}
            >
              <div style={{ fontWeight: 500 }}>{p.label}</div>
              <div style={{
                fontSize: 11, color: muted,
                fontVariantNumeric: "tabular-nums",
              }}>{p.sub}</div>
            </button>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: "center", paddingBottom: 18,
          fontSize: 13, color: muted, letterSpacing: 2,
          fontVariantNumeric: "tabular-nums",
        }}>
          {mm}:{ss}
        </div>
      )}

      <div style={{ paddingBottom: 44, display: "flex", justifyContent: "center" }}>
        {!running ? (
          <button
            onClick={start}
            style={{
              width: "100%", maxWidth: 320, height: 56,
              borderRadius: 999, border: "none",
              background: isDark ? "#E9E4D7" : "#3A3A36",
              color: isDark ? "#1F1E1A" : "#F6F1E8",
              fontFamily: "inherit", fontSize: 16, fontWeight: 500,
              letterSpacing: 0.3, cursor: "pointer",
              boxShadow: isDark
                ? "0 6px 20px -6px rgba(0,0,0,0.5)"
                : "0 6px 20px -6px rgba(58,58,54,0.4)",
              transition: "transform 200ms ease, box-shadow 200ms ease",
            }}
            onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            Begin
          </button>
        ) : (
          <button
            onClick={stop}
            style={{
              width: "100%", maxWidth: 320, height: 56,
              borderRadius: 999,
              background: "transparent",
              border: isDark ? "1px solid rgba(233,228,215,0.2)" : "1px solid rgba(58,58,54,0.18)",
              color: fg,
              fontFamily: "inherit", fontSize: 16, fontWeight: 500,
              letterSpacing: 0.3, cursor: "pointer",
            }}
          >
            End session
          </button>
        )}
      </div>
    </div>
  );
}
