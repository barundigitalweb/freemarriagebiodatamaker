import React from 'react';

/**
 * Islamic Arch with 3 Hanging Lanterns (Fanous) & Geometric Lattice
 * Matches authentic Islamic Nikah biodata cards (Image 1 style)
 */
export function IslamicArchHeader() {
  return (
    <div className="w-full relative overflow-hidden pt-1 pb-3 text-center">
      <svg
        viewBox="0 0 500 95"
        className="w-full h-auto max-h-24 mx-auto text-amber-300 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Decorative Top Moroccan Geometric Lattice */}
        <path
          d="M0 0 H500 V30 C450 30 420 10 375 25 C330 40 300 20 250 45 C200 20 170 40 125 25 C80 10 50 30 0 30 Z"
          fill="currentColor"
          fillOpacity="0.08"
        />

        {/* Main Scalloped Islamic Arch */}
        <path
          d="M5 0 V42 Q40 45 75 35 T155 35 T220 50 Q250 78 280 50 T345 35 T425 35 Q460 45 495 42 V0"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M10 0 V38 Q40 40 75 30 T155 30 T220 44 Q250 70 280 44 T345 30 T425 30 Q460 40 490 38 V0"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="3 3"
          fill="none"
        />

        {/* Left Hanging Lantern */}
        <g transform="translate(60, 0)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
          <path d="M-6 40 L6 40 L8 45 L5 58 L0 63 L-5 58 L-8 45 Z" fill="#fef08a" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="50" r="2.5" fill="#f59e0b" />
          <line x1="0" y1="63" x2="0" y2="68" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* Center Main Lantern */}
        <g transform="translate(250, 0)">
          <line x1="0" y1="0" x2="0" y2="28" stroke="currentColor" strokeWidth="1.2" />
          {/* Crescent Moon & Star at apex */}
          <path
            d="M-7 14 A6 6 0 1 0 5 18 A4.5 4.5 0 0 1 -7 14 Z"
            fill="currentColor"
          />
          <path d="M-8 28 L8 28 L10 35 L6 50 L0 57 L-6 50 L-10 35 Z" fill="#fef08a" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="0" cy="42" r="3.5" fill="#f59e0b" />
          <line x1="0" y1="57" x2="0" y2="64" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="0" cy="65" r="1.5" fill="currentColor" />
        </g>

        {/* Right Hanging Lantern */}
        <g transform="translate(440, 0)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
          <path d="M-6 40 L6 40 L8 45 L5 58 L0 63 L-5 58 L-8 45 Z" fill="#fef08a" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="50" r="2.5" fill="#f59e0b" />
          <line x1="0" y1="63" x2="0" y2="68" stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Islamic Floral Border for Bottom of Biodata (Image 1 style)
 */
export function IslamicFloralFooter() {
  return (
    <div className="w-full relative overflow-hidden -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 pt-3 mt-4">
      <svg
        viewBox="0 0 500 55"
        className="w-full h-auto max-h-16 text-emerald-800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft garden foliage base */}
        <path
          d="M0 45 C40 35 70 50 110 40 C150 30 190 48 230 38 C270 28 310 45 350 35 C390 25 430 46 470 38 L500 45 V55 H0 Z"
          fill="#064e3b"
          fillOpacity="0.4"
        />
        {/* Soft floral blossoms */}
        <g fill="#fbcfe8" stroke="#be185d" strokeWidth="0.5">
          <circle cx="45" cy="38" r="5" />
          <circle cx="105" cy="34" r="6" />
          <circle cx="170" cy="38" r="5.5" />
          <circle cx="230" cy="32" r="6.5" />
          <circle cx="295" cy="36" r="5" />
          <circle cx="360" cy="32" r="6.5" />
          <circle cx="425" cy="37" r="5.5" />
          <circle cx="475" cy="35" r="5" />
        </g>
        {/* Golden flower centers */}
        <g fill="#f59e0b">
          <circle cx="45" cy="38" r="2" />
          <circle cx="105" cy="34" r="2.5" />
          <circle cx="170" cy="38" r="2" />
          <circle cx="230" cy="32" r="2.5" />
          <circle cx="295" cy="36" r="2" />
          <circle cx="360" cy="32" r="2.5" />
          <circle cx="425" cy="37" r="2" />
          <circle cx="475" cy="35" r="2" />
        </g>
        {/* Delicate green vine line */}
        <path
          d="M0 48 Q125 35 250 48 T500 48"
          stroke="#10b981"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * Lord Ganesha Silhouette Watermark
 * Matches traditional Vedic / Hindu biodata format (Image 3 style)
 */
export function GaneshaWatermark() {
  return (
    <div
      className="absolute bottom-2 right-2 w-56 h-72 pointer-events-none select-none z-0 opacity-[0.14]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 240"
        className="w-full h-full text-amber-700"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Traditional Auspicious Ganesha Line Silhouette */}
        {/* Mukut / Crown */}
        <path d="M100 15 L108 35 L118 38 L100 20 L82 38 L92 35 Z" />
        <path d="M96 35 L104 35 L107 48 L93 48 Z" />
        <circle cx="100" cy="30" r="2" />

        {/* Tilak on Forehead */}
        <path d="M98 52 Q100 48 102 52 L103 62 Q100 64 97 62 Z" />
        <path d="M94 56 Q100 54 106 56" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="100" cy="60" r="1.5" />

        {/* Ears (Supadakara Karna) */}
        {/* Left Ear */}
        <path
          d="M85 58 C65 52 48 68 45 88 C42 108 55 120 72 122 C78 123 82 118 84 112"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Ear */}
        <path
          d="M115 58 C135 52 152 68 155 88 C158 108 145 120 128 122 C122 123 118 118 116 112"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Head Contour & Curved Trunk (Vakratunda) */}
        <path
          d="M88 65 Q100 62 112 65 Q115 80 110 98 Q106 115 108 135 Q110 152 118 165 Q126 178 138 180 Q148 181 150 172 Q151 163 142 160 Q132 158 130 166"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Single Tusk (Ekadanta) */}
        <path d="M92 98 L85 106 L91 106 Z" />

        {/* Modak in Hand / Trunk Tip */}
        <ellipse cx="140" cy="165" rx="5" ry="4" />

        {/* Belly Contour (Lambodara) */}
        <path
          d="M75 130 C60 148 62 178 78 200 C92 218 120 222 145 210 C165 200 175 180 172 155"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Blessing Hand (Abhaya Mudra) */}
        <path
          d="M62 145 Q50 155 58 168 Q68 178 75 170"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * Traditional Hindu Top Flourish with Shree Ganesh Calligraphy Ornament
 */
export function HinduCalligraphyHeader({ headerText }: { headerText: string }) {
  return (
    <div className="text-center pb-2 pt-1 border-b-2 border-amber-500/40 relative">
      {/* Auspicious Trishul / Kalash Motif */}
      <div className="flex items-center justify-center gap-2 mb-1 text-amber-700">
        <span className="text-sm">✦</span>
        <span className="text-base sm:text-lg font-black tracking-widest text-amber-900 font-serif">
          {headerText || '॥ श्री गणेशाय नमः ॥'}
        </span>
        <span className="text-sm">✦</span>
      </div>
      <div className="flex items-center justify-center gap-1.5 opacity-60">
        <span className="h-[1px] w-12 bg-amber-600"></span>
        <span className="text-[10px] text-amber-800">ॐ</span>
        <span className="h-[1px] w-12 bg-amber-600"></span>
      </div>
    </div>
  );
}

/**
 * Royal Mandala Filigree Ring for Portrait Photo (Image 2 style)
 */
export function RoyalMandalaRing({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex items-center justify-center p-2 rounded-full mx-auto">
      {/* Shimmering Golden Mandala Border */}
      <div className="absolute inset-0 rounded-full border-2 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.3)] pointer-events-none"></div>
      <div className="absolute -inset-1 rounded-full border border-dashed border-amber-300/60 animate-spin-slow pointer-events-none"></div>

      {/* Circular Masked Content */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-amber-200 shadow-xl bg-amber-950/40 shrink-0 relative z-10">
        {children}
      </div>
    </div>
  );
}

/**
 * Elegant Golden Corner Flourishes
 */
export function CornerFiligree() {
  return (
    <>
      {/* Top Left */}
      <div className="absolute top-2 left-2 w-8 h-8 pointer-events-none opacity-40 text-amber-500">
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 38 V12 Q2 2 12 2 H38" />
          <circle cx="10" cy="10" r="3" fill="currentColor" />
        </svg>
      </div>
      {/* Top Right */}
      <div className="absolute top-2 right-2 w-8 h-8 pointer-events-none opacity-40 text-amber-500">
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M38 38 V12 Q38 2 28 2 H2" />
          <circle cx="30" cy="10" r="3" fill="currentColor" />
        </svg>
      </div>
      {/* Bottom Left */}
      <div className="absolute bottom-2 left-2 w-8 h-8 pointer-events-none opacity-40 text-amber-500">
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 2 V28 Q2 38 12 38 H38" />
          <circle cx="10" cy="30" r="3" fill="currentColor" />
        </svg>
      </div>
      {/* Bottom Right */}
      <div className="absolute bottom-2 right-2 w-8 h-8 pointer-events-none opacity-40 text-amber-500">
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M38 2 V28 Q38 38 28 38 H2" />
          <circle cx="30" cy="30" r="3" fill="currentColor" />
        </svg>
      </div>
    </>
  );
}
