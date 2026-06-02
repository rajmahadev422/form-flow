export function AuraLoader() {
  return (
    <div className="flex flex-col bg-(--bg) items-center justify-center py-12 gap-3 select-none animate-fade-in">
      <div className="relative w-12 h-12">
        {/* Outer Pulsing Aura */}
        <div className="absolute inset-0 rounded-full border-2 border-(--accent)/10 animate-ping duration-1000" />

        {/* Track Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-(--border)/40" />

        {/* High-speed Spinning Segment */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-(--accent) animate-spin duration-750" />

        {/* Secondary Counter-rotating Ring */}
        <div className="absolute inset-1.5 rounded-full border-2 border-transparent border-b-(--accent)/60 animate-[spin_1.2s_linear_infinite_reverse]" />
      </div>
      <span className="text-xs font-semibold text-(--text-3) tracking-widest uppercase">
        Processing
      </span>
    </div>
  );
}
export function BarWaveLoader() {
  return (
    <div className="flex items-center justify-center gap-1.5 py-16">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-1.5 h-7 bg-(--accent) rounded-full animate-[wave_1.2s_ease-in-out_infinite]"
          style={{
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}

      {/* Inject custom timing metrics inside stylesheet */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.3); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; filter: drop-shadow(0 0 4px var(--accent)); }
        }
      `}</style>
    </div>
  );
}

