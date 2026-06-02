import { Link } from "react-router-dom"; // Change to "next/link" if utilizing Next.js layout structures

export default function Unauthorized() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-(--bg)">
      
      {/* Main Feedback Container Card */}
      <div className="w-full max-w-5xl bg-(--surface) border border-(--border) rounded-xl p-8 md:p-10 shadow-sm border-t-8 border-t-(--danger) fade-up">
        
        {/* Status Icon Indicator */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-(--danger) text-3xl mb-6 select-none">
          🔒
        </div>

        {/* Heading Title */}
        <h1 className="font-['DM_Serif_Display',serif] text-2xl md:text-3xl text-(--text) mb-3 tracking-wide">
          Access Denied
        </h1>

        {/* Detailed Explanation Copy */}
        <p className="text-(--text-2) text-sm md:text-base leading-relaxed m-0 mb-8">
          This data dashboard belongs to an external administrator account. You do not have permission to view or manage the incoming submissions for this document configuration. Please check your login credentials or switch accounts.
        </p>

        {/* Action Button Navigation Footer */}
        <div className="flex items-center gap-3 border-t border-(--border)/40 pt-6 flex-wrap">
          <Link 
            to="/form" // Adjust route string destination to match your routing setups
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
        Secured via <span className="font-semibold font-['DM_Serif_Display',serif] text-(--accent)">FormFlow</span> Account Management Systems.
      </div>

    </div>
  );
}