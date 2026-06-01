import { Link } from "react-router-dom";

export default function FormDeadline({ formTitle = "Formflow form" }) {
  return (
    <div className="min-h-[80vh] mx-auto max-w-5xl flex flex-col items-center justify-center px-4 py-12 bg-(--bg)">
      {/* Main Feedback Container Card */}
      <div className="w-full bg-(--surface) border border-(--border) rounded-xl p-8 md:p-10 shadow-sm border-t-8 border-t-(--danger) fade-up">
        {/* Status Icon Indicator */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-(--danger) text-3xl mb-6">
          ⏰
        </div>

        {/* Heading Title */}
        <h1 className="font-['DM_Serif_Display',serif] text-2xl md:text-3xl text-(--text) mb-3 tracking-wide">
          Form Deadline Exceeded
        </h1>

        {/* Targeted Form Header Meta */}
        <div className="inline-block px-3 py-1 bg-(--bg-2) border border-(--border) rounded-md text-xs font-medium text-(--text-2) mb-6 max-w-full truncate">
          Form: <span className="font-semibold text-(--text)">{formTitle}</span>
        </div>

        {/* Detailed Explanation Copy */}
        <p className="text-(--text-2) text-sm md:text-base leading-relaxed m-0 mb-8">
          The creator of this form is no longer accepting new submissions for
          this document because the scheduled cutoff time or submission cap
          limit has passed. If you think this is a mistake, please contact the
          form owner directly.
        </p>

        {/* Action Button Navigation Footer */}
        <div className="flex items-center gap-3 border-t border-(--border) pt-6 flex-wrap">
          <Link
            to="/"
            className="btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2"
          >
            📋 Create your own Forms
          </Link>
        </div>
      </div>

      {/* Google Forms-Style Fine-Print Disclaimer Footer */}
      <div className="mt-8 text-center text-sm text-(--text-3) leading-relaxed opacity-80">
        This document was generated safely via{" "}
        <span className="font-semibold font-['DM_Serif_Display',serif] text-(--accent)">
          FormFlow
        </span>
        . Never enter passwords or login credentials into unverified forms.
      </div>
    </div>
  );
}
