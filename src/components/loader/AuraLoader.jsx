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
