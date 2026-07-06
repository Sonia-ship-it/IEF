"use client";

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({ iconOnly = false, size = 'md' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`relative shrink-0 overflow-hidden ${sizeClasses[size]}`}>
        <Image 
          src="/assets/logo.png" 
          alt="IE & F Shop Logo" 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
          priority
        />
      </div>
      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight text-zinc-950 uppercase ${size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-xl' : 'text-sm'}`}>
            IE &amp; F Shop
          </span>
          <span className={`font-semibold tracking-widest text-zinc-400 uppercase ${size === 'lg' ? 'text-sm' : size === 'md' ? 'text-[10px]' : 'text-[8px]'}`}>
            Kigali &bull; Rwanda
          </span>
        </div>
      )}
    </div>
  );
}
