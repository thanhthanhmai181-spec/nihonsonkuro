import React from "react";

export type CourseTierId = "N5" | "N4" | "N3" | "N2";

interface CourseTierIconProps {
  tier: CourseTierId;
  className?: string;
}

/**
 * 4-Stage Cohesive Japanese Kamon & Katana Crest Progression (N5 -> N4 -> N3 -> N2)
 * Unified Theme: "Kiếm Đạo & Gia Huy Anh Đào" (The Blade & Sakura Kamon of Mastery)
 */
export function CourseTierIcon({ tier, className = "w-16 h-16" }: CourseTierIconProps) {
  if (tier === "N5") {
    // STAGE 1: SƠ KHỞI — Single Kamon Ring + Novice Wooden Blade (Bokken) + Sakura Bud
    return (
      <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="n5-ring" x1="16" y1="16" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F9A8D4" />
            <stop offset="100%" stopColor="#BE185D" />
          </linearGradient>
          <linearGradient id="n5-blade" x1="48" y1="18" x2="48" y2="74" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="n5-petal" x1="36" y1="36" x2="60" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
        </defs>

        {/* Subtle single Kamon circle */}
        <circle cx="48" cy="48" r="32" stroke="url(#n5-ring)" strokeWidth="2.2" strokeOpacity="0.85" />
        <circle cx="48" cy="48" r="26" stroke="#F472B6" strokeWidth="0.9" strokeOpacity="0.35" strokeDasharray="3 3" />

        {/* Single upright wooden training blade (Bokken) */}
        <path d="M48 16L50.8 22V62H45.2V22L48 16Z" fill="url(#n5-blade)" stroke="#92400E" strokeWidth="1" />
        {/* Minimal Tsuba & Tsuka hilt */}
        <rect x="42" y="61" width="12" height="3" rx="1.5" fill="#D97706" />
        <rect x="45.8" y="64" width="4.4" height="12" rx="1.5" fill="#78350F" />

        {/* Simple 5-petal Sakura bud */}
        <g transform="translate(48 45)">
          {[0, 72, 144, 216, 288].map((angle) => (
            <path
              key={angle}
              d="M0 -3C4 -9 6.5 -14 0 -17C-6.5 -14 -4 -9 0 -3Z"
              transform={`rotate(${angle})`}
              fill="url(#n5-petal)"
              stroke="#9D174D"
              strokeWidth="0.9"
            />
          ))}
          <circle cx="0" cy="0" r="3.5" fill="#FEF08A" stroke="#BE185D" strokeWidth="1" />
        </g>
      </svg>
    );
  }

  if (tier === "N4") {
    // STAGE 2: RÈN GIŨA — Double Kamon Ring + Twin Crossed Steel Katanas + Blooming Sakura
    return (
      <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="n4-ring" x1="12" y1="12" x2="84" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="n4-steel" x1="24" y1="20" x2="72" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="55%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="n4-sakura" x1="34" y1="34" x2="62" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Double concentric Kamon ring + 4 cardinal ticks */}
        <circle cx="48" cy="48" r="36" stroke="url(#n4-ring)" strokeWidth="2.4" />
        <circle cx="48" cy="48" r="29" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.55" />
        {[0, 90, 180, 270].map((deg) => (
          <rect
            key={deg}
            x="46.5"
            y="9"
            width="3"
            height="6"
            rx="1.5"
            fill="#7DD3FC"
            transform={`rotate(${deg} 48 48)`}
          />
        ))}

        {/* Twin Crossed Tempered Steel Katanas */}
        <g transform="rotate(-40 48 48)">
          <path d="M48 13L50.8 19V63H45.2V19L48 13Z" fill="url(#n4-steel)" stroke="#334155" strokeWidth="0.9" />
          <rect x="41" y="62.5" width="14" height="3.2" rx="1.2" fill="#38BDF8" stroke="#0369A1" strokeWidth="0.8" />
          <rect x="45.8" y="65.7" width="4.4" height="12.5" rx="1.2" fill="#1E293B" />
        </g>
        <g transform="rotate(40 48 48)">
          <path d="M48 13L50.8 19V63H45.2V19L48 13Z" fill="url(#n4-steel)" stroke="#334155" strokeWidth="0.9" />
          <rect x="41" y="62.5" width="14" height="3.2" rx="1.2" fill="#38BDF8" stroke="#0369A1" strokeWidth="0.8" />
          <rect x="45.8" y="65.7" width="4.4" height="12.5" rx="1.2" fill="#1E293B" />
        </g>

        {/* Blooming 5-petal Azure-Silver Sakura Crest */}
        <g transform="translate(48 48)">
          {[0, 72, 144, 216, 288].map((angle) => (
            <path
              key={angle}
              d="M0 -3.5C6 -8 8 -16 2.5 -19.5L0 -16.8L-2.5 -19.5C-8 -16 -6 -8 0 -3.5Z"
              transform={`rotate(${angle})`}
              fill="url(#n4-sakura)"
              stroke="#0369A1"
              strokeWidth="1"
            />
          ))}
          <circle cx="0" cy="0" r="4.8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="2" fill="#FEF08A" />
        </g>
      </svg>
    );
  }

  if (tier === "N3") {
    // STAGE 3: TINH LUYỆN — Sun-Moon Halo + Torii Gate + Master Katana + Amethyst Crystal Sakura
    return (
      <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="n3-halo" x1="10" y1="10" x2="86" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
          <linearGradient id="n3-blade" x1="48" y1="10" x2="48" y2="82" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#D8B4FE" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
          <linearGradient id="n3-petal" x1="30" y1="28" x2="66" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5D0FE" />
            <stop offset="60%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>
          <radialGradient id="n3-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient mystic aura */}
        <circle cx="48" cy="48" r="42" fill="url(#n3-glow)" />

        {/* Octagonal/12-point Engraved Kamon Ring */}
        <circle cx="48" cy="48" r="39" stroke="url(#n3-halo)" strokeWidth="2.4" />
        <circle cx="48" cy="48" r="32.5" stroke="#C084FC" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="6 3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <path
            key={deg}
            d="M48 6L50 11H46L48 6Z"
            fill={deg % 90 === 0 ? "#FDE047" : "#C084FC"}
            transform={`rotate(${deg} 48 48)`}
          />
        ))}

        {/* Sacred Torii Gate Silhouette inside Kamon */}
        <path
          d="M27 32C36 34.5 60 34.5 69 32L71 29.5C60 31.5 36 31.5 25 29.5L27 32Z"
          fill="#E9D5FF"
          fillOpacity="0.7"
        />
        <rect x="30" y="38" width="36" height="2.4" rx="1" fill="#C084FC" fillOpacity="0.75" />
        <rect x="34" y="32" width="3" height="33" rx="1" fill="#C084FC" fillOpacity="0.5" />
        <rect x="59" y="32" width="3" height="33" rx="1" fill="#C084FC" fillOpacity="0.5" />

        {/* Upright Master Silver-Amethyst Katana */}
        <path d="M48 11L51.5 18V66H44.5V18L48 11Z" fill="url(#n3-blade)" stroke="#4C1D95" strokeWidth="1" />
        <rect x="40" y="65" width="16" height="3.8" rx="1.8" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
        <rect x="45.5" y="68.8" width="5" height="13.5" rx="1.5" fill="#3B0764" stroke="#FBBF24" strokeWidth="0.6" />

        {/* Multi-layered Blooming Amethyst Sakura + Faceted Gem Core */}
        <g transform="translate(48 49)">
          {[0, 72, 144, 216, 288].map((angle) => (
            <path
              key={angle}
              d="M0 -4C7 -9 9.5 -18.5 3 -22L0 -18.5L-3 -22C-9.5 -18.5 -7 -9 0 -4Z"
              transform={`rotate(${angle})`}
              fill="url(#n3-petal)"
              stroke="#F5D0FE"
              strokeWidth="0.9"
            />
          ))}
          {[36, 108, 180, 252, 324].map((angle) => (
            <path
              key={angle}
              d="M0 -2.5C3.2 -6.5 4.5 -11.5 0 -13.5C-4.5 -11.5 -3.2 -6.5 0 -2.5Z"
              transform={`rotate(${angle})`}
              fill="#FDE68A"
              fillOpacity="0.85"
            />
          ))}
          {/* Faceted Crystal Core */}
          <polygon points="0,-6 5.5,0 0,6 -5.5,0" fill="#FDE047" stroke="#6B21A8" strokeWidth="1" />
          <polygon points="0,-3.2 2.8,0 0,3.2 -2.8,0" fill="#FFFFFF" fillOpacity="0.85" />
        </g>

        {/* Orbiting Sakura Petals */}
        <path d="M22 61C24 58 27 59 26 62C25 65 21 63 22 61Z" fill="#F5D0FE" />
        <path d="M72 34C74 31 77 32 76 35C75 38 71 36 72 34Z" fill="#FDE68A" />
      </svg>
    );
  }

  // STAGE 4 (N2): ĐỈNH CAO — IMPERIAL GOLDEN DRAGON-KATANA & CROWNED SAKURA MEDALLION (Most Beautiful!)
  return (
    <svg viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="n2-sun-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.65" />
          <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="n2-gold-rim" x1="10" y1="8" x2="94" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="30%" stopColor="#FBBF24" />
          <stop offset="65%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#FDE047" />
        </linearGradient>
        <linearGradient id="n2-gold-blade" x1="52" y1="8" x2="52" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="n2-sakura-imperial" x1="28" y1="30" x2="76" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="45%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
        <linearGradient id="n2-ruby-core" x1="46" y1="47" x2="58" y2="59" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>

      {/* Imperial Celestial Aura */}
      <circle cx="52" cy="53" r="48" fill="url(#n2-sun-aura)" />

      {/* 16-Ray Imperial Sunburst Halo */}
      <g opacity="0.9">
        {Array.from({ length: 16 }).map((_, idx) => {
          const deg = idx * 22.5;
          const isMajor = idx % 2 === 0;
          return (
            <path
              key={deg}
              d={isMajor ? "M52 5L54.2 15H49.8L52 5Z" : "M52 10L53.2 16H50.8L52 10Z"}
              fill={isMajor ? "#FDE047" : "#F59E0B"}
              transform={`rotate(${deg} 52 53)`}
            />
          );
        })}
      </g>

      {/* Outer Gilded Wreath & Double Filigree Kamon Rings */}
      <circle cx="52" cy="53" r="39" stroke="url(#n2-gold-rim)" strokeWidth="2.8" />
      <circle cx="52" cy="53" r="33.5" stroke="#FEF08A" strokeWidth="1.1" strokeOpacity="0.85" />
      <circle cx="52" cy="53" r="28" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 2.5" strokeOpacity="0.65" />

      {/* Twin Flanking Golden Katanas (Crossed) */}
      <g transform="rotate(-38 52 53)">
        <path d="M52 14L54.5 20V69H49.5V20L52 14Z" fill="url(#n2-gold-blade)" stroke="#92400E" strokeWidth="0.9" />
        <rect x="45.5" y="68" width="13" height="3.2" rx="1.4" fill="#FDE047" stroke="#78350F" strokeWidth="0.8" />
        <rect x="49.8" y="71.2" width="4.4" height="12" rx="1.4" fill="#7F1D1D" stroke="#FBBF24" strokeWidth="0.6" />
      </g>
      <g transform="rotate(38 52 53)">
        <path d="M52 14L54.5 20V69H49.5V20L52 14Z" fill="url(#n2-gold-blade)" stroke="#92400E" strokeWidth="0.9" />
        <rect x="45.5" y="68" width="13" height="3.2" rx="1.4" fill="#FDE047" stroke="#78350F" strokeWidth="0.8" />
        <rect x="49.8" y="71.2" width="4.4" height="12" rx="1.4" fill="#7F1D1D" stroke="#FBBF24" strokeWidth="0.6" />
      </g>

      {/* Center Master Imperial Dragon-Hilt Katana (3rd Supreme Blade) */}
      <path d="M52 8L56 17V72H48V17L52 8Z" fill="url(#n2-gold-blade)" stroke="#78350F" strokeWidth="1.1" />
      <line x1="52" y1="15" x2="52" y2="66" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />
      {/* Winged Dragon Tsuba Guard */}
      <path d="M39 71C44 68 60 68 65 71L62 74.5H42L39 71Z" fill="#FDE047" stroke="#92400E" strokeWidth="1" />
      <rect x="49" y="74.5" width="6" height="15" rx="2" fill="#7F1D1D" stroke="#FDE047" strokeWidth="0.9" />
      <circle cx="52" cy="91" r="2.8" fill="#FDE047" stroke="#92400E" strokeWidth="0.8" />

      {/* Imperial Crown Crest above Medallion */}
      <path
        d="M41 25L45 18L52 22.5L59 18L63 25L59.5 28.5H44.5L41 25Z"
        fill="url(#n2-gold-rim)"
        stroke="#78350F"
        strokeWidth="1"
      />
      <circle cx="52" cy="23.5" r="2" fill="#EF4444" stroke="#FEF9C3" strokeWidth="0.7" />

      {/* Grand Multi-Layered Imperial Lotus-Sakura Emblem */}
      <g transform="translate(52 53)">
        {/* Outer Golden Guard Petals */}
        {[36, 108, 180, 252, 324].map((angle) => (
          <path
            key={angle}
            d="M0 -5C7 -11 10 -20.5 2.5 -24.5L0 -21L-2.5 -24.5C-10 -20.5 -7 -11 0 -5Z"
            transform={`rotate(${angle})`}
            fill="url(#n2-gold-rim)"
            stroke="#92400E"
            strokeWidth="0.9"
          />
        ))}
        {/* Inner Crimson-Gold Sakura Petals */}
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M0 -4C7.5 -9.5 10 -19.5 3 -23.5L0 -19.5L-3 -23.5C-10 -19.5 -7.5 -9.5 0 -4Z"
            transform={`rotate(${angle})`}
            fill="url(#n2-sakura-imperial)"
            stroke="#FEF08A"
            strokeWidth="1"
          />
        ))}
        {/* Radiant Faceted Ruby-Gold Imperial Core */}
        <circle cx="0" cy="0" r="8.2" fill="#FEF08A" stroke="#B45309" strokeWidth="1.2" />
        <polygon points="0,-6 5.5,0 0,6 -5.5,0" fill="url(#n2-ruby-core)" stroke="#FEF9C3" strokeWidth="0.8" />
        <circle cx="-1.5" cy="-1.5" r="1.4" fill="#FFFFFF" fillOpacity="0.9" />
      </g>

      {/* Floating Golden Sakura Petals & Imperial Sparkles */}
      <path d="M18 42C20.5 38.5 24 39.5 23 43C22 46.5 17 44.5 18 42Z" fill="#FEF08A" />
      <path d="M84 62C86.5 58.5 90 59.5 89 63C88 66.5 83 64.5 84 62Z" fill="#FCA5A5" />
      <path d="M24 72L25.5 75L28.5 76.5L25.5 78L24 81L22.5 78L19.5 76.5L22.5 75L24 72Z" fill="#FEF08A" />
      <path d="M82 28L83.2 30.8L86 32L83.2 33.2L82 36L80.8 33.2L78 32L80.8 30.8L82 28Z" fill="#FEF08A" />
    </svg>
  );
}

/**
 * Tier-Escalating Corner & Crown Frame Ornaments
 * Ensures outer frame craftsmanship visibly levels up from N5 -> N4 -> N3 -> N2
 */
export function CourseFrameDecor({ tier }: { tier: CourseTierId }) {
  if (tier === "N5") {
    // Tier 1: Simple subtle top corner L-ticks
    return (
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-rose-400/60 dark:border-rose-400/50 rounded-tl-md" />
        <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-rose-400/60 dark:border-rose-400/50 rounded-tr-md" />
      </div>
    );
  }

  if (tier === "N4") {
    // Tier 2: Crisp 4-corner Japanese Kumiko L-brackets
    return (
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-sky-500/80 rounded-tl-lg" />
        <span className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-sky-500/80 rounded-tr-lg" />
        <span className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-sky-500/80 rounded-bl-lg" />
        <span className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-sky-500/80 rounded-br-lg" />
      </div>
    );
  }

  if (tier === "N3") {
    // Tier 3: Ornate 4-corner engraved double brackets + top central diamond crest
    return (
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Top central diamond ornament */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <span className="w-6 h-[1.5px] bg-gradient-to-r from-transparent to-purple-400" />
          <span className="w-2.5 h-2.5 rotate-45 bg-gradient-to-br from-amber-300 to-purple-500 border border-purple-200/80 shadow-sm" />
          <span className="w-6 h-[1.5px] bg-gradient-to-l from-transparent to-purple-400" />
        </div>
        {/* 4 double-stepped corners */}
        <svg className="absolute top-2 left-2 w-6 h-6 text-purple-500 dark:text-purple-300" viewBox="0 0 24 24" fill="none">
          <path d="M2 14V5C2 3.34 3.34 2 5 2H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 11V7C6 6.45 6.45 6 7 6H11" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <svg className="absolute top-2 right-2 w-6 h-6 text-purple-500 dark:text-purple-300 rotate-90" viewBox="0 0 24 24" fill="none">
          <path d="M2 14V5C2 3.34 3.34 2 5 2H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 11V7C6 6.45 6.45 6 7 6H11" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <svg className="absolute bottom-2 right-2 w-6 h-6 text-purple-500 dark:text-purple-300 rotate-180" viewBox="0 0 24 24" fill="none">
          <path d="M2 14V5C2 3.34 3.34 2 5 2H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 11V7C6 6.45 6.45 6 7 6H11" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <svg className="absolute bottom-2 left-2 w-6 h-6 text-purple-500 dark:text-purple-300 -rotate-90" viewBox="0 0 24 24" fill="none">
          <path d="M2 14V5C2 3.34 3.34 2 5 2H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 11V7C6 6.45 6.45 6 7 6H11" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Tier 4 (N2): Imperial Gilded 4-Corner Kamon Filigree + Crown Crest + Metallic Shimmer Sweep
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]" aria-hidden="true">
      {/* Subtle sweeping metallic gold shimmer */}
      <div className="n2-shimmer-beam absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />

      {/* Top Imperial Gilded Centerpiece */}
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        <span className="w-8 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-amber-200" />
        <svg className="w-5 h-5 text-amber-400 drop-shadow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.8 7.5L21 8.5L16.4 12.8L17.6 19L12 16L6.4 19L7.6 12.8L3 8.5L9.2 7.5L12 2Z" />
        </svg>
        <span className="w-8 h-[2px] bg-gradient-to-l from-transparent via-amber-400 to-amber-200" />
      </div>

      {/* 4 Ornate Gilded Lotus-Kamon Corner Filigrees */}
      {[
        "top-2 left-2",
        "top-2 right-2 rotate-90",
        "bottom-2 right-2 rotate-180",
        "bottom-2 left-2 -rotate-90",
      ].map((pos, idx) => (
        <svg key={idx} className={`absolute ${pos} w-8 h-8 text-amber-500 dark:text-amber-300`} viewBox="0 0 32 32" fill="none">
          <path d="M3 20V7C3 4.79 4.79 3 7 3H20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M7 15V8C7 7.45 7.45 7 8 7H15" stroke="#FEF08A" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="7" cy="7" r="2.2" fill="#F59E0B" stroke="#FEF9C3" strokeWidth="0.8" />
          <circle cx="15" cy="7" r="1.2" fill="#FEF08A" />
          <circle cx="7" cy="15" r="1.2" fill="#FEF08A" />
        </svg>
      ))}
    </div>
  );
}
