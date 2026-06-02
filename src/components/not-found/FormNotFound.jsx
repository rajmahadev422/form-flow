import { Link } from "react-router-dom"; // Adjust import to "next/link" if using Next.js

export default function FormNotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-(--bg)">
      
      {/* Main Feedback Container Card */}
      <div className="w-full max-w-5xl bg-(--surface) border border-(--border) rounded-xl p-8 md:p-10 shadow-sm border-t-8 border-t-(--danger) fade-up text-center flex flex-col items-center">
        
        {/* Status Icon Indicator */}
        <div className="flex items-center font-bold justify-center p-5 rounded-2xl bg-red-500/10 text-(--danger) text-5xl mb-6 select-none">
          404
        </div>

        {/* Heading Title */}
        <h1 className="font-['DM_Serif_Display',serif] text-2xl md:text-3xl text-(--text) mb-3 tracking-wide">
          Form Not Found
        </h1>

        {/* Detailed Explanation Copy */}
        <p className="text-(--text-2) text-sm md:text-base leading-relaxed m-0 mb-8 max-w-md">
          The form you are looking for does not exist or has been permanently deleted by its owner. Please double-check the URL link configuration or return to your dashboard workspace.
        </p>

        {/* Action Button Navigation Footer */}
        <div className="flex items-center gap-3 border-t border-(--border)/40 pt-6 w-full justify-center flex-wrap">
          <Link 
            to="/form" 
            className="btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2 no-underline"
          >
            📋 Back to My Forms
          </Link>
          <Link 
            to="/" 
            className="btn-ghost text-sm text-(--text-3) hover:text-(--text) px-4 py-2.5 no-underline transition-colors"
          >
            Go Home
          </Link>
        </div>

      </div>

      {/* Google Forms-Style Fine-Print Disclaimer Footer */}
      <div className="mt-8 text-center text-[11px] text-(--text-3) max-w-4xl leading-relaxed opacity-80 select-none">
        Powered via <span className="font-semibold font-['DM_Serif_Display',serif] text-(--accent)">FormFlow</span> Engine.
      </div>

    </div>
  );
}