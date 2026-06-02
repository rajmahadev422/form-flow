import { Link } from "react-router-dom"; // Use "next/link" if you are using Next.js

export default function Feedback() {
  const feedbackUrl = 'https://form-flow-ashen.vercel.app/view/63XkBh1642VRBqyNVTII'

  return (
    <div className="w-full max-w-5xl mx-auto my-10 px-4 no-print">
      <div className="bg-(--surface) border border-(--border) rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-xs relative overflow-hidden group hover:border-(--accent)/30 transition-all">
        
        {/* Subtle Decorative Background Aura */}
        <div className="absolute -right-16 -bottom-16 w-44 h-44 bg-(--accent)/5 rounded-full blur-2xl pointer-events-none select-none" />

        {/* Left Side: Scannable QR Code Panel */}
        <div className="flex flex-col items-center shrink-0 text-center select-none w-full max-w-2xl sm:max-w-none sm:w-auto">
          <div className="w-40 h-40 p-2 rounded-lg border border-(--border)/40 flex items-center justify-center shadow-xs">
            <img 
              src='/feedback-qr.png' 
              alt="Scan for feedback form link" 
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <span className="text-[11px] font-bold text-(--text-3) uppercase tracking-wider mt-3 inline-flex items-center gap-1">
            📱 Scan on Mobile
          </span>
        </div>

        {/* Right Side: Copywriting & Actions Content Panel */}
        <div className="flex-1 text-center md:text-left">
          <span className="text-[10px] font-bold text-(--accent) uppercase tracking-widest bg-(--accent)/10 px-2.5 py-1 rounded-md inline-block mb-3">
            Share Your Thoughts
          </span>
          <h3 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-2.5 tracking-wide">
            Help us improve your experience
          </h3>
          <p className="text-(--text-2) text-sm md:text-base leading-relaxed m-0 mb-6 max-w-xl">
            Your insights matter immensely. Take 60 seconds to let us know what is working perfectly or what features you would love to see built next in our system ecosystem.
          </p>

          {/* Action Row */}
          <div className="flex justify-center items-center gap-3.5 flex-wrap">
            <a
              href={feedbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-style"
            >
              ✍️ Open Feedback Form
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}