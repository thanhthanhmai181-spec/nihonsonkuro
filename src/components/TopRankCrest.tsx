import React from "react";

interface TopRankCrestProps {
  rank: 1 | 2 | 3;
}

/**
 * Custom Escalating Japanese Vinh Danh Rank Medallions for Top 3 Leaderboard
 * Rank 1: Hoàng Kim Vương Miện & Nguyệt Quế (Imperial Gold + Crown + Laurel + "1")
 * Rank 2: Bạch Ngân Á Quân (Platinum Silver + Azure Ribbon + Crescent Wreath + "2")
 * Rank 3: Thanh Đồng Quý Quân (Burnished Bronze + Vermilion Ribbon + Kamon Crest + "3")
 */
export function TopRankCrest({ rank }: TopRankCrestProps) {
  if (rank === 1) {
    return (
      <div className="relative flex flex-col items-center justify-center shrink-0 select-none">
        {/* Warm golden aura behind medal */}
        <div
          className="absolute inset-0 rounded-full bg-amber-400/25 dark:bg-amber-400/20 blur-md scale-110 pointer-events-none"
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 80 84"
          className="relative w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_4px_10px_rgba(217,119,6,0.45)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Hạng 1"
        >
          <defs>
            <linearGradient id="rank1-gold-outer" x1="12" y1="8" x2="68" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF9C3" />
              <stop offset="35%" stopColor="#FBBF24" />
              <stop offset="75%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
            <radialGradient id="rank1-gold-core" cx="50%" cy="38%" r="58%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="45%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>
            <linearGradient id="rank1-crimson" x1="25" y1="60" x2="55" y2="82" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
          </defs>

          {/* Imperial Crimson V-Ribbons at Base */}
          <path d="M27 60L20 79L30 74L35 79L39 62Z" fill="url(#rank1-crimson)" stroke="#7F1D1D" strokeWidth="1" />
          <path d="M53 60L60 79L50 74L45 79L41 62Z" fill="url(#rank1-crimson)" stroke="#7F1D1D" strokeWidth="1" />

          {/* Imperial Crown Seated on Top */}
          <path
            d="M25 22L28 9L35 16L40 6L45 16L52 9L55 22Z"
            fill="url(#rank1-gold-outer)"
            stroke="#92400E"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="5.5" r="2.3" fill="#EF4444" stroke="#FEF9C3" strokeWidth="0.8" />
          <circle cx="28" cy="8.5" r="1.7" fill="#FEF08A" />
          <circle cx="52" cy="8.5" r="1.7" fill="#FEF08A" />
          <rect x="24.5" y="21" width="31" height="4" rx="2" fill="#FDE047" stroke="#92400E" strokeWidth="1.2" />

          {/* Golden Laurel Arcs Flanking Medallion */}
          <path
            d="M18 32C11 40 11 54 20 62M62 32C69 40 69 54 60 62"
            stroke="#FBBF24"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {[33, 41, 49, 57].map((y, idx) => (
            <React.Fragment key={y}>
              <ellipse
                cx={14 - (idx === 1 || idx === 2 ? 1.5 : 0)}
                cy={y}
                rx="3.2"
                ry="1.8"
                transform={`rotate(${-25 + idx * 14} ${14} ${y})`}
                fill="#FDE047"
                stroke="#B45309"
                strokeWidth="0.6"
              />
              <ellipse
                cx={66 + (idx === 1 || idx === 2 ? 1.5 : 0)}
                cy={y}
                rx="3.2"
                ry="1.8"
                transform={`rotate(${25 - idx * 14} ${66} ${y})`}
                fill="#FDE047"
                stroke="#B45309"
                strokeWidth="0.6"
              />
            </React.Fragment>
          ))}

          {/* Main Gold Medallion */}
          <circle cx="40" cy="45" r="22" fill="url(#rank1-gold-outer)" stroke="#78350F" strokeWidth="1.6" />
          <circle cx="40" cy="45" r="17.5" fill="url(#rank1-gold-core)" stroke="#FEF9C3" strokeWidth="1.2" />
          <circle cx="40" cy="45" r="14.5" stroke="#B45309" strokeWidth="0.8" strokeDasharray="2.5 2" strokeOpacity="0.6" />

          {/* Crisp Embossed "1" */}
          <text
            x="40"
            y="53"
            textAnchor="middle"
            fill="#5C2804"
            fontSize="22"
            fontWeight="900"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            1
          </text>
          <text
            x="39.5"
            y="52.3"
            textAnchor="middle"
            fill="#78350F"
            fontSize="22"
            fontWeight="900"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            1
          </text>

          {/* Subtle Sparkle Accents */}
          <path d="M12 20L13.2 22.5L15.7 23.7L13.2 24.9L12 27.4L10.8 24.9L8.3 23.7L10.8 22.5L12 20Z" fill="#FEF08A" />
          <path d="M68 18L69 20L71 21L69 22L68 24L67 22L65 21L67 20L68 18Z" fill="#FEF08A" />
        </svg>
        <span className=" -mt-1 text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
          Hạng 1
        </span>
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div className="relative flex flex-col items-center justify-center shrink-0 select-none">
        <div
          className="absolute inset-0 rounded-full bg-sky-300/20 dark:bg-slate-300/15 blur-md pointer-events-none"
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 80 80"
          className="relative w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_3px_8px_rgba(100,116,139,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Hạng 2"
        >
          <defs>
            <linearGradient id="rank2-silver-outer" x1="14" y1="12" x2="66" y2="68" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#CBD5E1" />
              <stop offset="75%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <radialGradient id="rank2-silver-core" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </radialGradient>
            <linearGradient id="rank2-ribbon" x1="20" y1="8" x2="60" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>

          {/* Azure Top Ribbon Mount */}
          <path d="M23 10H36L40 24H30L23 10Z" fill="url(#rank2-ribbon)" stroke="#1E3A8A" strokeWidth="1" />
          <path d="M57 10H44L40 24H50L57 10Z" fill="url(#rank2-ribbon)" stroke="#1E3A8A" strokeWidth="1" />
          <rect x="33" y="21" width="14" height="4" rx="1.5" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />

          {/* Silver Flanking Laurel Arcs */}
          <path
            d="M18 35C13 42 13 54 21 62M62 35C67 42 67 54 59 62"
            stroke="#CBD5E1"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Main Platinum Silver Medallion */}
          <circle cx="40" cy="46" r="21" fill="url(#rank2-silver-outer)" stroke="#334155" strokeWidth="1.5" />
          <circle cx="40" cy="46" r="16.5" fill="url(#rank2-silver-core)" stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="40" cy="46" r="13.5" stroke="#64748B" strokeWidth="0.8" strokeDasharray="3 2" strokeOpacity="0.55" />

          {/* Top Silver Star Crest */}
          <path d="M40 21.5L41.6 25L45.4 25.5L42.6 28L43.3 31.6L40 29.8L36.7 31.6L37.4 28L34.6 25.5L38.4 25L40 21.5Z" fill="#38BDF8" stroke="#1E3A8A" strokeWidth="0.8" />

          {/* Crisp Embossed "2" */}
          <text
            x="40"
            y="54.5"
            textAnchor="middle"
            fill="#0F172A"
            fontSize="21"
            fontWeight="900"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            2
          </text>
        </svg>
        <span className="-mt-1 text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
          Hạng 2
        </span>
      </div>
    );
  }

  // Rank 3: Burnished Copper-Bronze Medallion with Vermilion Ribbon & "3"
  return (
    <div className="relative flex flex-col items-center justify-center shrink-0 select-none">
      <div
        className="absolute inset-0 rounded-full bg-orange-500/20 dark:bg-orange-500/15 blur-md pointer-events-none"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 80 80"
        className="relative w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_3px_8px_rgba(180,83,9,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Hạng 3"
      >
        <defs>
          <linearGradient id="rank3-bronze-outer" x1="14" y1="14" x2="66" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="40%" stopColor="#EA580C" />
            <stop offset="78%" stopColor="#9A3412" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>
          <radialGradient id="rank3-bronze-core" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFEDD5" />
            <stop offset="52%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#9A3412" />
          </radialGradient>
          <linearGradient id="rank3-ribbon" x1="20" y1="10" x2="60" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>

        {/* Vermilion Top Ribbon */}
        <path d="M24 11H36L40 24H30L24 11Z" fill="url(#rank3-ribbon)" stroke="#7F1D1D" strokeWidth="1" />
        <path d="M56 11H44L40 24H50L56 11Z" fill="url(#rank3-ribbon)" stroke="#7F1D1D" strokeWidth="1" />
        <rect x="33.5" y="21.5" width="13" height="3.8" rx="1.4" fill="#FDBA74" stroke="#7C2D12" strokeWidth="1" />

        {/* Main Burnished Copper-Bronze Medallion */}
        <circle cx="40" cy="46" r="20.5" fill="url(#rank3-bronze-outer)" stroke="#7C2D12" strokeWidth="1.5" />
        <circle cx="40" cy="46" r="16" fill="url(#rank3-bronze-core)" stroke="#FED7AA" strokeWidth="1.1" />
        <circle cx="40" cy="46" r="13" stroke="#7C2D12" strokeWidth="0.8" strokeDasharray="2.5 2.5" strokeOpacity="0.55" />

        {/* Crisp Embossed "3" */}
        <text
          x="40"
          y="54"
          textAnchor="middle"
          fill="#431407"
          fontSize="21"
          fontWeight="900"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          3
        </text>
      </svg>
      <span className="-mt-1 text-[10px] font-black uppercase tracking-wider text-orange-800 dark:text-orange-300">
        Hạng 3
      </span>
    </div>
  );
}
