import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function RefreshPage({ 
  errorMessage = "The connection to the FormFlow database instance timed out.",
  errorCode = "ERR_CONNECTION_TIMED_OUT"
}) {
  const [countdown, setCountdown] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  // Handle manual or automatic page reload execution
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate a brief network check latency before reloading the window
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }, 800);
  };

  // Automatic self-healing countdown timer logic loop
  useEffect(() => {
    if (countdown <= 0) {
      handleRefresh();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 bg-(--bg) select-none">
      
      {/* Main Card Wrapper Container */}
      <div className="w-full max-w-5xl bg-(--surface) border border-(--border) rounded-2xl p-6 md:p-8 shadow-sm border-t-8 border-t-(--danger) text-center flex flex-col items-center fade-up relative overflow-hidden">
        
        {/* Status Animated Icon Grid */}
        <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-(--danger) text-2xl mb-6 transition-transform duration-700 ${
          isRefreshing ? "animate-spin" : "animate-pulse"
        }`}>
          {isRefreshing ? "⏳" : "📡"}
        </div>

        {/* Primary Alert Header */}
        <h1 className="font-['DM_Serif_Display',serif] text-2xl md:text-3xl text-(--text) mb-2.5 tracking-wide">
          {isRefreshing ? "Reconnecting..." : "Connection Interrupted"}
        </h1>

        {/* Detailed Error Description Context */}
        <p className="text-(--text-2) text-sm md:text-base leading-relaxed m-0 mb-6 max-w-sm">
          {errorMessage}
        </p>

        {/* System Error Logs Code Block Tag */}
        <div className="bg-(--bg-2) border border-(--border)/60 rounded-xl px-4 py-2 text-xs font-mono text-(--text-3) mb-8 tracking-wide">
          Code: {errorCode}
        </div>

        {/* Core Operational Button Trigger Layer */}
        <div className="w-full flex flex-col gap-3 border-t border-(--border)/40 pt-6">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full bg-(--accent) text-white font-semibold text-sm px-5 py-3 rounded-xl no-underline text-center shadow-xs hover:brightness-110 transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className={`inline-block ${isRefreshing ? "animate-spin" : ""}`}>
              🔄
            </span>
            {isRefreshing ? "Retrying Connection..." : "Refresh Page"}
          </button>

          {/* Secondary Workstation Fallback Escape Links */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <button 
              onClick={() => navigate(-1)}
              className="text-xs font-medium text-(--text-3) hover:text-(--text) bg-transparent border-none cursor-pointer transition-colors"
            >
              ← Go Back
            </button>
            <span className="text-zinc-600 select-none text-xs">·</span>
            <Link 
              to="/dashboard"
              className="text-xs font-medium text-(--text-3) hover:text-(--text) no-underline transition-colors"
            >
              Workspace Dashboard
            </Link>
          </div>
        </div>

        {/* Automated Background Countdown Slider Progress Banner */}
        {!isRefreshing && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-(--border)/30 overflow-hidden">
            <div 
              className="h-full bg-(--danger) transition-all duration-1000 linear"
              style={{ width: `${(countdown / 10) * 100}%` }}
            />
          </div>
        )}

      </div>

      {/* Under-card Auto-Retry Status Note Text */}
      {!isRefreshing && (
        <p className="mt-5 text-center text-xs text-(--text-3) tracking-wide animate-fade-in font-medium">
          Auto-refreshing sequence initiating in <span className="font-bold font-mono text-(--text-2) bg-(--surface) border border-(--border) px-1.5 py-0.5 rounded-md mx-0.5">{countdown}s</span>
        </p>
      )}

    </div>
  );
}