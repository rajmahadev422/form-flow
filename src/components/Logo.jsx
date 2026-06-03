function FormFlowLogoInfinite({ className = "w-10 h-10" }) {
  return (
    <svg 
      className={`${className}`} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />   {/* Tech Orange */}
          <stop offset="50%" stopColor="#a855f7" />  {/* Deep Violet */}
          <stop offset="100%" stopColor="#4f46e5" /> {/* Brand Indigo */}
        </linearGradient>
        <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Dynamic interlocking flow path */}
      <path 
        d="M25 30C25 18.9543 33.9543 10 45 10H75C77.7614 10 80 12.2386 80 15C80 17.7614 77.7614 20 75 20H45C39.4772 20 35 24.4772 35 30V45C35 47.7614 37.2386 50 40 50H65C67.7614 50 70 52.2386 70 55C70 57.7614 67.7614 60 65 60H40C37.2386 60 35 62.2386 35 65V85C35 87.7614 32.7614 90 30 90C27.2386 90 25 87.7614 25 85V30Z" 
        fill="url(#flowGradient)"
        filter="url(#softGlow)"
      />
      <circle cx="70" cy="20" r="5" fill="#4f46e5" className="animate-pulse" />
    </svg>
  );
};

export function FormFlowLogoHex({ className = "w-12 h-12" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hexGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" /> 
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      
      {/* Outer Tech Hexagon Shield */}
      <polygon 
        points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" 
        stroke="url(#hexGrad)" 
        strokeWidth="4" 
        strokeLinejoin="round"
        className="opacity-40"
      />
      
      {/* Inner Flow Segments representing dynamic form rows */}
     <FormFlowLogoInfinite />
    </svg>
  );
}