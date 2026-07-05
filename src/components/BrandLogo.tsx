/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({ className = '', iconOnly = false, size = 'md' }: BrandLogoProps) {
  const dimensions = {
    sm: { box: 'w-8 h-10', text: 'text-xs', subtext: 'text-[8px]', gap: 'gap-1.5' },
    md: { box: 'w-12 h-14', text: 'text-lg font-extrabold', subtext: 'text-[9px]', gap: 'gap-2.5' },
    lg: { box: 'w-24 h-28', text: 'text-2xl font-black', subtext: 'text-xs', gap: 'gap-4' }
  }[size];

  return (
    <div className={`flex items-center ${dimensions.gap} ${className}`}>
      {/* Dynamic SVG recreating the phone, gears, and screwdriver logo in Vivid Charcoal */}
      <div className={`relative ${dimensions.box} text-zinc-900 shrink-0`}>
        <svg
          viewBox="0 0 100 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* Phone Body Outline */}
          <path d="M 25,10 A 10,10 0 0,0 15,20 L 15,40 M 15,55 L 15,100 A 10,10 0 0,0 25,110 L 75,110 A 10,10 0 0,0 85,100 L 85,45 M 85,25 A 10,10 0 0,0 75,10 L 55,10 M 45,10 L 35,10" />
          
          {/* Phone Ear Speaker and Home Button */}
          <line x1="40" y1="18" x2="60" y2="18" strokeWidth="4" />
          <circle cx="50" cy="100" r="5" fill="currentColor" strokeWidth="1" />

          {/* Screwdriver (Right hand overlay) */}
          {/* Handle */}
          <rect x="76" y="52" width="12" height="30" rx="4" fill="currentColor" stroke="currentColor" strokeWidth="2" />
          {/* Shaft & Tip */}
          <line x1="82" y1="52" x2="82" y2="18" strokeWidth="4" />
          <line x1="78" y1="18" x2="86" y2="18" strokeWidth="4" />

          {/* Large Gear (Bottom-Left) */}
          <circle cx="36" cy="54" r="14" strokeWidth="5" />
          {/* Gear Teeth */}
          <path d="M 36,35 L 36,40" strokeWidth="5" />
          <path d="M 36,68 L 36,73" strokeWidth="5" />
          <path d="M 17,54 L 22,54" strokeWidth="5" />
          <path d="M 50,54 L 55,54" strokeWidth="5" />
          <path d="M 23,41 L 27,45" strokeWidth="5" />
          <path d="M 45,63 L 49,67" strokeWidth="5" />
          <path d="M 23,67 L 27,63" strokeWidth="5" />
          <path d="M 45,45 L 49,41" strokeWidth="5" />

          {/* Small Gear (Top-Right) */}
          <circle cx="56" cy="36" r="9" strokeWidth="4" />
          <path d="M 56,23 L 56,27" strokeWidth="4" />
          <path d="M 56,45 L 56,49" strokeWidth="4" />
          <path d="M 43,36 L 47,36" strokeWidth="4" />
          <path d="M 65,36 L 69,36" strokeWidth="4" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-tight select-none">
          <span className={`${dimensions.text} tracking-tight font-sans text-zinc-900 uppercase`}>
            IE <span className="text-zinc-600">&amp; F</span> SHOP
          </span>
          <span className={`${dimensions.subtext} font-sans font-medium tracking-widest text-zinc-500 uppercase`}>
            Ian Electronics &amp; Fashion
          </span>
        </div>
      )}
    </div>
  );
}
