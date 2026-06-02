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
