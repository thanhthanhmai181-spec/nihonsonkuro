import React, { useState, useEffect } from "react";

interface DuySonLogoProps {
  className?: string;
  size?: number;
}

export const DuySonLogo: React.FC<DuySonLogoProps> = ({ className = "", size = 48 }) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(
    "https://lh3.googleusercontent.com/d/1JGbBv1-PXcjJYnocNFXFcOwjPTGoOQfL"
  );

  useEffect(() => {
    // Check if user has uploaded/provided a custom logo link in localStorage
    const savedUrl = localStorage.getItem("duy_son_custom_logo_url");
    if (savedUrl) {
      setCustomLogoUrl(savedUrl);
    } else {
      setCustomLogoUrl("https://lh3.googleusercontent.com/d/1JGbBv1-PXcjJYnocNFXFcOwjPTGoOQfL");
    }

    // Listen for custom storage changes to update logo in real-time
    const handleStorageChange = (e: any) => {
      if (e.detail?.key === "duy_son_custom_logo_url") {
        setCustomLogoUrl(e.detail.value || "https://lh3.googleusercontent.com/d/1JGbBv1-PXcjJYnocNFXFcOwjPTGoOQfL");
      }
    };
    window.addEventListener("local-storage-changed" as any, handleStorageChange);
    return () => {
      window.removeEventListener("local-storage-changed" as any, handleStorageChange);
    };
  }, []);

  if (customLogoUrl) {
    return (
      <div 
        className={`rounded-2xl overflow-hidden bg-white flex items-center justify-center border border-gray-100 shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <img 
          src={customLogoUrl} 
          alt="Duy Son Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={() => {
            console.warn("Failed to load custom logo URL, falling back to SVG");
            setCustomLogoUrl(null);
          }}
        />
      </div>
    );
  }

  // High-fidelity handcrafted SVG logo matching the user's design:
  // Wolf head in profile facing up-right, framed by a delicate leaf wreath, and "DUY SON" typography.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`bg-white rounded-2xl p-1 shadow-sm border border-gray-100 hover:scale-105 transition-transform duration-300 ${className}`}
    >
      {/* Background soft circle */}
      <circle cx="100" cy="100" r="92" fill="#FAFAFA" />

      {/* Decorative Wreath - Left side branch */}
      <path
        d="M 40 100 C 35 150, 80 180, 100 180"
        stroke="#2D3748"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right side branch */}
      <path
        d="M 160 100 C 165 50, 120 20, 100 20"
        stroke="#2D3748"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Connecting branch bottom to top */}
      <path
        d="M 40 100 C 35 50, 80 20, 100 20"
        stroke="#2D3748"
        strokeWidth="1.5"
        strokeDasharray="2 3"
        fill="none"
      />
      <path
        d="M 160 100 C 165 150, 120 180, 100 180"
        stroke="#2D3748"
        strokeWidth="1.5"
        strokeDasharray="2 3"
        fill="none"
      />

      {/* Handcrafted leaves on the wreath */}
      {/* Top Left Leaf */}
      <path d="M 70 30 Q 60 20 52 32 Q 65 38 70 30 Z" fill="#2D3748" />
      <circle cx="50" cy="22" r="3" fill="#E53E3E" /> {/* Little red berries */}

      {/* Top Right Leaf */}
      <path d="M 130 30 Q 140 20 148 32 Q 135 38 130 30 Z" fill="#4A5568" />
      <circle cx="150" cy="22" r="3" fill="#E53E3E" />

      {/* Middle Left Leaf */}
      <path d="M 33 75 Q 22 75 25 87 Q 38 85 33 75 Z" fill="#2D3748" />
      <circle cx="20" cy="80" r="2.5" fill="#2D3748" />

      {/* Middle Right Leaf */}
      <path d="M 167 125 Q 178 125 175 113 Q 162 115 167 125 Z" fill="#2D3748" />
      <circle cx="180" cy="120" r="2.5" fill="#2D3748" />

      {/* Bottom Left Leaf */}
      <path d="M 60 165 Q 50 175 60 182 Q 70 170 60 165 Z" fill="#4A5568" />
      <circle cx="50" cy="178" r="3" fill="#E53E3E" />

      {/* Bottom Right Leaf */}
      <path d="M 140 165 Q 150 175 140 182 Q 130 170 140 165 Z" fill="#2D3748" />
      <circle cx="150" cy="178" r="3" fill="#E53E3E" />

      {/* Elegant Crescent Moon backdrop */}
      <path
        d="M 135 70 C 135 105, 95 130, 75 115 C 95 115, 120 100, 115 70 C 110 50, 125 45, 135 70 Z"
        fill="#EDF2F7"
      />

      {/* Beautiful Sleek Wolf Silhouette in the Center */}
      <g transform="translate(52, 45) scale(0.95)">
        {/* Wolf Body & Neck */}
        <path
          d="M 15 110 C 10 90, 15 65, 25 50 C 30 40, 35 25, 32 10 C 35 5, 42 0, 45 8 C 48 15, 48 25, 52 30 C 58 20, 68 15, 75 18 C 70 24, 62 26, 60 35 C 70 35, 80 42, 85 52 C 78 54, 70 52, 65 58 C 75 62, 80 72, 78 85 C 70 82, 65 78, 55 85 C 50 95, 45 105, 48 115 C 35 115, 22 115, 15 110 Z"
          fill="#2D3748"
        />
        {/* Wolf Nose and Snout line detail */}
        <path
          d="M 75 18 C 78 19, 82 22, 85 22 C 83 24, 78 25, 75 25 Z"
          fill="#1A202C"
        />
        {/* Sleek Wolf Eye */}
        <path
          d="M 50 34 C 53 34, 55 36, 54 38 C 52 38, 50 36, 50 34 Z"
          fill="#FFFFFF"
        />
        {/* Dynamic Fur Tufts (highlights) */}
        <path d="M 22 75 Q 28 72 26 80 Q 20 83 22 75 Z" fill="#FAFAFA" opacity="0.8" />
        <path d="M 32 90 Q 38 88 35 96 Q 28 98 32 90 Z" fill="#FAFAFA" opacity="0.8" />
        <path d="M 42 55 Q 46 52 45 58 Q 40 60 42 55 Z" fill="#FAFAFA" opacity="0.8" />
      </g>

      {/* 'DUY SON' Typography - Styled elegantly curving across the bottom area */}
      <defs>
        <path id="textPath" d="M 35 155 A 72 72 0 0 0 165 155" />
      </defs>
      <text fill="#1A202C" fontSize="19" fontWeight="900" letterSpacing="5" fontFamily="'Noto Serif JP', serif, Georgia">
        <textPath href="#textPath" startOffset="50%" textAnchor="middle">
          DUY SON
        </textPath>
      </text>

      {/* Tiny decorative flowers near letters */}
      <g transform="translate(45, 140) scale(0.6)">
        <circle cx="5" cy="5" r="4" fill="#E53E3E" />
        <circle cx="2" cy="2" r="2.5" fill="#FC8181" />
        <circle cx="8" cy="2" r="2.5" fill="#FC8181" />
        <circle cx="2" cy="8" r="2.5" fill="#FC8181" />
        <circle cx="8" cy="8" r="2.5" fill="#FC8181" />
      </g>
      <g transform="translate(145, 140) scale(0.6)">
        <circle cx="5" cy="5" r="4" fill="#E53E3E" />
        <circle cx="2" cy="2" r="2.5" fill="#FC8181" />
        <circle cx="8" cy="2" r="2.5" fill="#FC8181" />
        <circle cx="2" cy="8" r="2.5" fill="#FC8181" />
        <circle cx="8" cy="8" r="2.5" fill="#FC8181" />
      </g>
    </svg>
  );
};
