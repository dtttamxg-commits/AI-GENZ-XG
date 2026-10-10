import React from 'react';

export const GameController3DIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ctrlBody" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="60%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
      <linearGradient id="ctrlOrange" x1="60" y1="20" x2="110" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <filter id="shadow3D" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#4338ca" floodOpacity="0.3" />
      </filter>
      <linearGradient id="glowTop" x1="30" y1="30" x2="90" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Base shadow */}
    <ellipse cx="60" cy="98" rx="42" ry="10" fill="#1e1b4b" fillOpacity="0.15" />
    {/* Gamepad body */}
    <g filter="url(#shadow3D)">
      <path
        d="M32 42C24 42 16 50 16 64C16 78 26 92 40 92C48 92 53 82 60 82C67 82 72 92 80 92C94 92 104 78 104 64C104 50 96 42 88 42C74 42 66 50 60 50C54 50 46 42 32 42Z"
        fill="url(#ctrlBody)"
      />
      {/* 3D highlight bevel */}
      <path
        d="M32 44C26 44 20 50 19 62C24 53 32 48 42 46C49 45 55 49 60 51C65 49 71 45 78 46C88 48 96 53 101 62C100 50 94 44 88 44C74 44 67 52 60 52C53 52 46 44 32 44Z"
        fill="url(#glowTop)"
      />
    </g>
    {/* D-Pad */}
    <rect x="33" y="58" width="6" height="18" rx="2" fill="#312e81" />
    <rect x="27" y="64" width="18" height="6" rx="2" fill="#312e81" />
    <circle cx="36" cy="67" r="2.5" fill="#c7d2fe" />
    {/* Action buttons (Orange Accent) */}
    <circle cx="84" cy="62" r="5" fill="url(#ctrlOrange)" />
    <circle cx="76" cy="70" r="5" fill="#f97316" />
    <circle cx="92" cy="70" r="5" fill="#fbbf24" />
    <circle cx="84" cy="78" r="5" fill="#ea580c" />
    {/* Button shine */}
    <circle cx="83" cy="60" r="1.5" fill="#ffffff" fillOpacity="0.8" />
    {/* Floating math symbols: Vector & Sigma */}
    <g transform="translate(76, 20) scale(0.7)">
      <circle cx="20" cy="20" r="14" fill="#fb923c" />
      <path d="M14 16H26L18 24H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

export const Simulation3DIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="simGrad" x1="15" y1="20" x2="105" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="60%" stopColor="#0369a1" />
        <stop offset="100%" stopColor="#0c4a6e" />
      </linearGradient>
      <linearGradient id="neonCurve" x1="25" y1="75" x2="95" y2="25" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
      <linearGradient id="cubeFace1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="60" cy="98" rx="40" ry="10" fill="#0369a1" fillOpacity="0.16" />
    {/* Grid Backdrop Card */}
    <rect x="20" y="24" width="80" height="70" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
    {/* Coordinate grid lines */}
    <line x1="28" y1="42" x2="92" y2="42" stroke="#e0f2fe" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="28" y1="59" x2="92" y2="59" stroke="#7dd3fc" strokeWidth="2" />
    <line x1="28" y1="76" x2="92" y2="76" stroke="#e0f2fe" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="45" y1="28" x2="45" y2="90" stroke="#e0f2fe" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="60" y1="28" x2="60" y2="90" stroke="#7dd3fc" strokeWidth="2" />
    <line x1="75" y1="28" x2="75" y2="90" stroke="#e0f2fe" strokeWidth="1.5" strokeDasharray="3 3" />
    {/* Dynamic Function Curve (Parabola / Sine wave) */}
    <path
      d="M26 80C38 80 48 35 60 35C72 35 82 80 94 80"
      stroke="url(#neonCurve)"
      strokeWidth="5"
      strokeLinecap="round"
    />
    {/* Coordinate Axis Arrows */}
    <path d="M60 26L57 31H63L60 26Z" fill="#0284c7" />
    <path d="M94 59L89 56V62L94 59Z" fill="#0284c7" />
    {/* Key mathematical Vertex Point */}
    <circle cx="60" cy="35" r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
    {/* Floating 3D Geometric Tetrahedron Accent */}
    <g transform="translate(74, 14)">
      <polygon points="18,4 32,24 6,24" fill="#38bdf8" fillOpacity="0.9" />
      <polygon points="18,4 24,28 6,24" fill="#0284c7" fillOpacity="0.8" />
    </g>
  </svg>
);

export const Infographic3DIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sheetGrad" x1="20" y1="20" x2="95" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>
      <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="bar3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="60" cy="100" rx="38" ry="8" fill="#0f172a" fillOpacity="0.12" />
    {/* 3D Slanted Board / Poster */}
    <rect x="24" y="20" width="72" height="82" rx="14" fill="url(#sheetGrad)" stroke="#cbd5e1" strokeWidth="2" />
    <path d="M78 20L96 38H84C80.7 38 78 35.3 78 32V20Z" fill="#e2e8f0" />
    {/* Colorful Infographic Bars */}
    <rect x="34" y="66" width="10" height="24" rx="4" fill="url(#bar1)" />
    <rect x="48" y="52" width="10" height="38" rx="4" fill="url(#bar2)" />
    <rect x="62" y="42" width="10" height="48" rx="4" fill="url(#bar3)" />
    {/* Pie Chart Widget in Infographic */}
    <circle cx="44" cy="38" r="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
    <path d="M44 38L52 32A10 10 0 0 0 44 28V38Z" fill="#f59e0b" />
    <path d="M44 38L44 28A10 10 0 0 0 35 43L44 38Z" fill="#10b981" />
    {/* Infographic mini text lines */}
    <rect x="34" y="28" width="18" height="3" rx="1.5" fill="#94a3b8" />
    <rect x="58" y="28" width="16" height="3" rx="1.5" fill="#cbd5e1" />
    <line x1="30" y1="92" x2="90" y2="92" stroke="#e2e8f0" strokeWidth="2" />
  </svg>
);

export const MindMap3DIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="centerNode" x1="45" y1="45" x2="75" y2="75" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="nodeBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="nodePurple" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#9333ea" />
      </linearGradient>
      <linearGradient id="nodeGreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="nodeRose" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fb7185" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>
    </defs>
    {/* Connecting Curved Mindmap Branches */}
    <path d="M60 60C45 60 38 38 28 36" stroke="#fcd34d" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M60 60C75 60 84 38 92 36" stroke="#c084fc" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M60 60C45 60 38 82 28 84" stroke="#6ee7b7" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M60 60C75 60 84 82 92 84" stroke="#fda4af" strokeWidth="3.5" strokeLinecap="round" />
    {/* Secondary micro-branches */}
    <path d="M28 36C22 35 18 26 15 24" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
    <path d="M92 36C98 35 102 26 105 24" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
    {/* Outer Branch Nodes */}
    <circle cx="28" cy="36" r="10" fill="url(#nodeBlue)" />
    <circle cx="92" cy="36" r="10" fill="url(#nodePurple)" />
    <circle cx="28" cy="84" r="10" fill="url(#nodeGreen)" />
    <circle cx="92" cy="84" r="10" fill="url(#nodeRose)" />
    {/* Central Core Idea Node */}
    <circle cx="60" cy="60" r="16" fill="url(#centerNode)" />
    <circle cx="60" cy="60" r="13" fill="#ffffff" fillOpacity="0.25" />
    {/* Central symbol */}
    <path d="M54 60L58 64L66 56" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AiRobot3DIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="robotBody" x1="25" y1="20" x2="95" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="50%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4338ca" />
      </linearGradient>
      <linearGradient id="robotFace" x1="30" y1="35" x2="90" y2="75" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e1b4b" />
      </linearGradient>
      <linearGradient id="eyeGlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    {/* Floating Shadow */}
    <ellipse cx="60" cy="104" rx="34" ry="7" fill="#312e81" fillOpacity="0.2" />
    {/* Antenna */}
    <line x1="60" y1="26" x2="60" y2="34" stroke="#a5b4fc" strokeWidth="3" strokeLinecap="round" />
    <circle cx="60" cy="22" r="6" fill="#38bdf8" />
    <circle cx="58" cy="20" r="2" fill="#ffffff" />
    {/* Robot Head Shape with 3D Bevel */}
    <rect x="25" y="34" width="70" height="56" rx="20" fill="url(#robotBody)" />
    {/* Visor Screen */}
    <rect x="33" y="42" width="54" height="38" rx="14" fill="url(#robotFace)" />
    {/* Glowing Friendly Eyes */}
    <ellipse cx="46" cy="58" rx="6" ry="8" fill="url(#eyeGlow)" />
    <ellipse cx="74" cy="58" rx="6" ry="8" fill="url(#eyeGlow)" />
    {/* Eye sparkles */}
    <circle cx="44" cy="55" r="2.5" fill="#ffffff" />
    <circle cx="72" cy="55" r="2.5" fill="#ffffff" />
    {/* Cheerful Smile */}
    <path d="M53 68C56 71 64 71 67 68" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    {/* Floating Math Symbols */}
    <g transform="translate(86, 26)">
      <circle cx="12" cy="12" r="12" fill="#818cf8" />
      <text x="12" y="16" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">π</text>
    </g>
    <g transform="translate(10, 68)">
      <circle cx="10" cy="10" r="10" fill="#38bdf8" />
      <text x="10" y="14" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Δ</text>
    </g>
  </svg>
);
