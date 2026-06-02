"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const MOODS = {
  calm: {
    faceColor: "#F5C842",
    borderColor: "#C89A1A",
    blush: "rgba(220,100,80,0.18)",
    mouthD: "M10 22 Q40 34 70 22",
    browRotL: -6,
    browRotR: 6,
    browTop: "-mt-4", // converted to Tailwind spacing utility
    headline: "I see you, everywhere you go",
    sub: "Move your cursor around. I watch, calmly.",
    tag: "😌 calm",
    moodColor: "bg-blue-400 text-blue-400", // mapped to Tailwind color primitives
    moodPct: "w-1/4",
  },
  happy: {
    faceColor: "#FFD93D",
    borderColor: "#E5B800",
    blush: "rgba(255,120,80,0.28)",
    mouthD: "M10 24 Q40 44 70 24",
    browRotL: -10,
    browRotR: 10,
    browTop: "-mt-5",
    headline: "Oh hi! You found me 👋",
    sub: "I love when you move around! Keep going!",
    tag: "😄 happy",
    moodColor: "bg-emerald-400 text-emerald-400",
    moodPct: "w-[65%]",
  },
  excited: {
    faceColor: "#FF9F43",
    borderColor: "#E0821A",
    blush: "rgba(255,80,60,0.35)",
    mouthD: "M8 28 Q40 50 72 28",
    browRotL: -14,
    browRotR: 14,
    browTop: "-mt-[22px]",
    headline: "WHOA slow down!! 😵",
    sub: "You're moving so fast — I can barely keep up!",
    tag: "🤩 excited",
    moodColor: "bg-amber-50 text-amber-500",
    moodPct: "w-[90%]",
  },
  scared: {
    faceColor: "#A8D8EA",
    borderColor: "#6BAFC4",
    blush: "rgba(100,160,220,0.18)",
    mouthD: "M10 32 Q40 18 70 32",
    browRotL: 10,
    browRotR: -10,
    browTop: "-mt-[22px]",
    headline: "P-please don't click me...",
    sub: "You're moving really erratically. I'm nervous.",
    tag: "😰 scared",
    moodColor: "bg-indigo-400 text-indigo-400",
    moodPct: "w-3/4",
  },
  sleepy: {
    faceColor: "#D0C4F7",
    borderColor: "#9B86E8",
    blush: "rgba(160,140,220,0.2)",
    mouthD: "M10 22 Q40 28 70 22",
    browRotL: 0,
    browRotR: 0,
    browTop: "-mt-3",
    headline: "zzz... oh, you're here",
    sub: "Stop moving around, I'm trying to sleep...",
    tag: "😴 sleepy",
    moodColor: "bg-purple-400 text-purple-400",
    moodPct: "w-[10%]",
  },
};

function Eye({ eyeRef, pupilRef, blinking }) {
  return (
    <div
      ref={eyeRef}
      className={`relative flex items-center justify-center rounded-full bg-white border-[2.5px] border-[#333] overflow-hidden -mt-2.5 w-15 transition-[height] duration-100 ${
        blinking ? "h-1.5" : "h-15"
      }`}
    >
      <div
        ref={pupilRef}
        className="absolute rounded-full w-6.5 h-6.5 bg-zinc-900 transition-transform duration-500 ease-out will-change-transform"
      >
        <div className="absolute rounded-full bg-white w-2 h-2 top-1 left-1" />
      </div>
    </div>
  );
}

export default function EyeFace() {
  const [mood, setMood] = useState("calm");
  const [blinking, setBlinking] = useState(false);

  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const pupilLeftRef = useRef(null);
  const pupilRightRef = useRef(null);

  const smoothSpeed = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const stillTimer = useRef(null);
  const blinkTimer = useRef(null);
  const currentMood = useRef("calm");

  const m = MOODS[mood];

  const applyMood = useCallback((name) => {
    if (currentMood.current === name) return;
    currentMood.current = name;
    setMood(name);
  }, []);

  const movePupil = useCallback((eyeEl, pupilEl, mx, my) => {
    if (!eyeEl || !pupilEl) return;
    const rect = eyeEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(my - cy, mx - cx);
    const maxR = 14;
    pupilEl.style.transform = `translate(${Math.cos(angle) * maxR}px, ${Math.sin(angle) * maxR}px)`;
  }, []);

  // Blink loop hook
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 3000;
      blinkTimer.current = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => {
          setBlinking(false);
          scheduleBlink();
        }, 120);
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(blinkTimer.current);
  }, []);

  // Mouse tracking pipeline hook
  useEffect(() => {
    const handleMove = (e) => {
      const mx = e.clientX ?? e.touches?.[0]?.clientX;
      const my = e.clientY ?? e.touches?.[0]?.clientY;
      if (mx == null) return;

      movePupil(eyeLeftRef.current, pupilLeftRef.current, mx, my);
      movePupil(eyeRightRef.current, pupilRightRef.current, mx, my);

      const dx = mx - lastPos.current.x;
      const dy = my - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastPos.current = { x: mx, y: my };
      smoothSpeed.current = smoothSpeed.current * 0.7 + speed * 0.3;
      const s = smoothSpeed.current;

      clearTimeout(stillTimer.current);
      stillTimer.current = setTimeout(() => applyMood("sleepy"), 4000);

      if (s > 60) applyMood("excited");
      else if (s > 28) applyMood("scared");
      else if (s > 12) applyMood("happy");
      else applyMood("calm");
    };

    const handleLeave = () => {
      stillTimer.current = setTimeout(() => applyMood("sleepy"), 1500);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      clearTimeout(stillTimer.current);
    };
  }, [applyMood, movePupil]);

  return (
    <div className="bg-(--bg) text-(--text) p-6 flex flex-col items-center justify-center gap-6 font-sans select-none">
      {/* Mood Header Tag Status */}
      <span
        className={`text-xs font-semibold tracking-widest uppercase transition-all duration-300 dynamic-text-color ${
          m.moodColor.split(" ")[1]
        }`}
      >
        {m.tag}
      </span>

      {/* Main Interactive Expression Face Frame */}
      <div
        className="relative flex flex-row items-center justify-center gap-7 rounded-full w-60 h-60 border-[3px] transition-all duration-400"
        style={{ backgroundColor: m.faceColor, borderColor: m.borderColor }}
      >
        {/* Left Eye + Dynamic Brow Component container */}
        <div className="relative">
          <div
            className={`absolute left-1/2 rounded-xs bg-[#333] z-10 w-11 h-1.25 -translate-x-1/2 transition-all duration-250 ${m.browTop}`}
            style={{ transform: `translateX(-50%) rotate(${m.browRotL}deg)` }}
          />
          <Eye
            eyeRef={eyeLeftRef}
            pupilRef={pupilLeftRef}
            blinking={blinking}
          />
        </div>

        {/* Right Eye + Dynamic Brow Component container */}
        <div className="relative">
          <div
            className={`absolute left-1/2 rounded-xs bg-[#333] z-10 w-11 h-1.25 -translate-x-1/2 transition-all duration-250 ${m.browTop}`}
            style={{ transform: `translateX(-50%) rotate(${m.browRotR}deg)` }}
          />
          <Eye
            eyeRef={eyeRightRef}
            pupilRef={pupilRightRef}
            blinking={blinking}
          />
        </div>

        {/* Vector SVG Expression Mouth Asset */}
        <svg
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          width="80"
          height="40"
          viewBox="0 0 80 40"
          fill="none"
        >
          <path
            d={m.mouthD}
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            className="transition-[d] duration-300"
          />
        </svg>

        {/* Left Blush Bubble */}
        <div
          className="absolute rounded-full w-8 h-4 bottom-16.5 left-7 transition-colors duration-300"
          style={{ backgroundColor: m.blush }}
        />

        {/* Right Blush Bubble */}
        <div
          className="absolute rounded-full w-8 h-4 bottom-16.5 right-7 transition-colors duration-300"
          style={{ backgroundColor: m.blush }}
        />
      </div>

      {/* Narrative Interactive Copy Header */}
      <h1 className="text-3xl font-semibold text-(--text) text-center leading-snug transition-all duration-300 min-h-[2.6em] max-w-sm text-balance">
        {m.headline}
      </h1>

      {/* Description Context Copy Subtitle */}
      <p className="text-sm text-zinc-400 text-center max-w-xs leading-relaxed transition-all duration-300 min-h-[3em]">
        {m.sub}
      </p>

      {/* Metric Analytics Footer Mood Tracker Bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-zinc-500 w-16 capitalize font-medium">
          {mood}
        </span>
        <div className="w-40 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${m.moodPct} ${m.moodColor.split(" ")[0]}`}
          />
        </div>
      </div>
    </div>
  );
}
