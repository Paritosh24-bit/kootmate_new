import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  // Dimensions based on size
  const dimensions = {
    sm: { width: 140, height: 44 },
    md: { width: 220, height: 70 },
    lg: { width: 340, height: 110 },
    xl: { width: 440, height: 140 },
  };

  const { width, height } = dimensions[size];

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 560 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-[1.03]"
      >
        <defs>
          {/* Shadow Filter for 3D/Sticker look */}
          <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="3" dy="5" stdDeviation="0" floodColor="#fbb017" floodOpacity="1" />
          </filter>
          
          {/* Subtle glow filter for pencil */}
          <filter id="pencil-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g filter="url(#logo-shadow)">
          {/* Letters: "c l e v e r" */}
          <text
            x="20"
            y="110"
            fill="#111111"
            fontSize="105"
            fontWeight="900"
            fontFamily='system-ui, -apple-system, "Segoe UI", Roboto, "Inter", "Fredoka One", sans-serif'
            letterSpacing="-4"
          >
            clever
          </text>

          {/* Letter: "l" as a Pencil */}
          <g transform="translate(390, -5) rotate(12)" filter="url(#pencil-glow)">
            {/* Eraser Cap (Top) */}
            <path
              d="M 12 25 L 34 25 C 34 14, 12 14, 12 25 Z"
              fill="#ff8e75"
              stroke="#e64c3c"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            
            {/* Silver Metal Band */}
            <rect
              x="11"
              y="25"
              width="24"
              height="12"
              rx="2"
              fill="#bdc3c7"
              stroke="#7f8c8d"
              strokeWidth="3.5"
            />
            <line x1="12" y1="31" x2="34" y2="31" stroke="#95a5a6" strokeWidth="2" />

            {/* Pencil Body (Orange Segments) */}
            <path
              d="M 12 37 L 33 37 L 33 115 L 12 115 Z"
              fill="#f39c12"
              stroke="#d35400"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Pencil Inner Ridges */}
            <line x1="19" y1="37" x2="19" y2="115" stroke="#d35400" strokeWidth="2.5" />
            <line x1="26" y1="37" x2="26" y2="115" stroke="#e67e22" strokeWidth="2.5" />

            {/* Sharpened Wood Cone */}
            <path
              d="M 12 115 L 33 115 L 22.5 138 Z"
              fill="#f5d6a7"
              stroke="#d35400"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Lead Tip (Orange-Black Graphic) */}
            <path
              d="M 18.5 127 L 26.5 127 L 22.5 138 Z"
              fill="#d35400"
            />
          </g>

          {/* Letter: "y" */}
          <text
            x="455"
            y="110"
            fill="#111111"
            fontSize="105"
            fontWeight="900"
            fontFamily='system-ui, -apple-system, "Segoe UI", Roboto, "Inter", "Fredoka One", sans-serif'
            letterSpacing="-4"
          >
            y
          </text>
        </g>
      </svg>
    </div>
  );
}
