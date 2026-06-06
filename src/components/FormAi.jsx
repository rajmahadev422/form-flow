import { useState } from "react";
import { useFormBuilder } from "../utils/useFormBuilder";

export default function () {
  const [prompt, setPrompt] = useState("");

  const { addFormByAi, loading } = useFormBuilder();

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <div className="flex flex-col gap-2.5">
        {/* Label with a subtle AI sparkle icon */}
        <label
          htmlFor="prompt"
          className="text-xs font-bold text-(--text-2) uppercase tracking-wider flex items-center gap-1.5 select-none"
        >
          <span>✨ Generate Form with AI</span>
        </label>

        {/* Unified Input + Button Container */}
        <div
          className={`relative flex items-center bg-(--surface) border rounded-2xl p-1.5 transition-all duration-300 shadow-xs focus-within:border-(--accent) focus-within:ring-4 focus-within:ring-(--accent)/10 ${
            loading
              ? "border-(--border) opacity-80 cursor-wait"
              : "border-(--border) hover:border-(--border-2)"
          }`}
        >
          {/* Search/Prompt Input Field */}
          <input
            id="prompt"
            type="text"
            readOnly={loading}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a form for a software engineer job application..."
            className="w-full bg-transparent text-sm text-(--text) placeholder-zinc-400 dark:placeholder-zinc-500 pl-3.5 pr-24 py-3 border-none outline-hidden focus:ring-0 disabled:cursor-wait"
          />

          {/* Floating Action Button inside the input bar */}
          <button
            disabled={loading || !prompt.trim()}
            onClick={() => addFormByAi(prompt, setPrompt)}
            className={`absolute right-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide inline-flex items-center gap-1.5 transition-all duration-200 select-none ${
              loading
                ? "bg-(--bg-2) text-(--text-3) border border-(--border) cursor-wait"
                : !prompt.trim()
                  ? "bg-(--bg-2) text-(--text-3) border border-(--border) cursor-not-allowed opacity-60"
                  : "bg-(--accent) text-white hover:brightness-110 cursor-pointer active:scale-[0.97] shadow-xs"
            }`}
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin text-xs">⏳</span>
                <span>Building...</span>
              </>
            ) : (
              <>
                <span>⚡</span>
                <span>Generate</span>
              </>
            )}
          </button>

          {/* Under-the-hood loading line tracker */}
          {loading && (
            <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-(--border) rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-orange-500 via-purple-500 to-cyan-500 rounded-full w-2/3 animate-[shimmer_1.5s_ease-in-out_infinite]" />
            </div>
          )}
        </div>

        {/* Micro-copy helper hint text beneath the input */}
        {!loading && (
          <span className="text-[11px] text-(--text-3) pl-1 select-none">
            Describe fields, validation rules, or color preferences.
          </span>
        )}
      </div>
    </div>
  );
}
