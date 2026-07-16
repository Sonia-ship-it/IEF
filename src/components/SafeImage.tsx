"use client";

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src?: string | null;
  fallback: string;
}

export function SafeImage({ src, fallback, alt, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(
    src && src.trim() !== '' ? src : fallback
  );

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => setCurrentSrc(fallback)}
    />
  );
}

interface SafeImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  fallback: string;
}

export function SafeImg({ src, fallback, alt, ...props }: SafeImgProps) {
  const [currentSrc, setCurrentSrc] = useState(
    src && src.trim() !== '' ? src : fallback
  );

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt ?? ''}
      referrerPolicy="no-referrer"
      onError={() => setCurrentSrc(fallback)}
    />
  );
}
