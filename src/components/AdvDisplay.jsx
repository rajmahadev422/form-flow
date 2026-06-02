import { useState } from "react";

export default function AdvDisplay({
  imageUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  title = "Supercharge Your Workflow",
  description = "Build custom drag-and-drop web forms inside your application in minutes with FormFlow Pro features.",
  ctaText = "Learn More",
  ctaUrl = "https://yourwebsite.com/pro",
  isDismissible = true
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full mx-auto no-print">
      {/* Outer Banner Wrapper */}
      <div className="relative bg-(--surface) overflow-hidden p-4 sm:p-5 flex flex-col md:flex-row items-center gap-5 shadow-xs transition-all hover:shadow-sm hover:border-(--accent)/30 group">
        
        {/* Top Header Badge Row */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5 z-10 select-none">
          <span className="bg-(--bg-2) text-(--text-3) text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-(--border)/60">
            Sponsored
          </span>
        </div>

        {/* Optional Dismiss/Close Button */}
        {isDismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2.5 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-(--surface) md:bg-transparent border border-(--border)/40 md:border-none text-(--text-3) hover:text-(--text) hover:bg-(--bg-2) transition-all cursor-pointer z-10"
            aria-label="Dismiss advertisement"
          >
            ✕
          </button>
        )}

        {/* Ad Media/Visual Panel */}
        <div className="w-full md:w-60 h-40 sm:h-45 md:h- rounded-xl overflow-hidden bg-(--bg-2) shrink-0 relative mt-4 md:mt-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            loading="lazy"
          />
        </div>

        {/* Ad Text Content Panel */}
        <div className="flex-1 min-w-0 text-center md:text-left pt-1 pb-2 md:py-1">
          <h4 className="text-base font-bold text-(--text) tracking-wide truncate mb-1.5 group-hover:text-(--accent) transition-colors mt-1 md:mt-0">
            {title}
          </h4>
          <p className="text-(--text-2) text-sm leading-relaxed m-0 line-clamp-2 md:line-clamp-3 max-w-2xl">
            {description}
          </p>
        </div>

        {/* Ad Call-to-Action (CTA) Action Block */}
        <div className="w-full md:w-auto shrink-0 border-t border-(--border)/40 pt-4 md:pt-0 md:border-t-0">
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center md:w-auto bg-(--accent) text-white font-semibold text-sm px-6 py-3 rounded-xl no-underline transition-all hover:brightness-110 active:scale-[0.98] shadow-xs"
          >
            {ctaText}
          </a>
        </div>

      </div>
    </div>
  );
}