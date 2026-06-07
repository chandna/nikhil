"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface FeatureCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[];
}

export const FeatureCarousel = React.forwardRef<HTMLDivElement, FeatureCarouselProps>(
  ({ images, className, ...props }, ref) => {
    const [current, setCurrent] = React.useState(0);
    const [direction, setDirection] = React.useState(1);

    const go = React.useCallback((idx: number, dir: number) => {
      setDirection(dir);
      setCurrent(idx);
    }, []);

    const next = React.useCallback(() => {
      go((current + 1) % images.length, 1);
    }, [current, images.length, go]);

    const prev = () => go((current - 1 + images.length) % images.length, -1);

    React.useEffect(() => {
      const t = setInterval(next, 4000);
      return () => clearInterval(t);
    }, [next]);

    const image = images[current];
    const isMobile = image.width / image.height < 1;

    return (
      <div
        ref={ref}
        className={cn('relative w-full h-full flex items-center justify-center', className)}
        {...props}
      >
        {/* Full-size image with crossfade */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={image.src}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              padding: isMobile ? '5rem 4rem' : '5rem 3rem',
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: isMobile ? '28px' : '16px',
                boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.06)',
                display: 'block',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom controls — prev, dots, next */}
        <div style={{
          position: 'absolute', bottom: '1.25rem', left: 0, right: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: '0.75rem', zIndex: 20,
        }}>
          <button
            onClick={prev}
            style={{
              width: '2rem', height: '2rem', borderRadius: '50%',
              background: 'var(--paper)', border: '1px solid var(--ink-faint)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', flexShrink: 0,
            }}
          >
            <ChevronLeft size={14} color="var(--ink)" />
          </button>

          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                style={{
                  width: i === current ? '1.5rem' : '0.4rem',
                  height: '0.4rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', padding: 0,
                  background: i === current ? 'var(--ink)' : 'var(--ink-faint)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            style={{
              width: '2rem', height: '2rem', borderRadius: '50%',
              background: 'var(--paper)', border: '1px solid var(--ink-faint)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', flexShrink: 0,
            }}
          >
            <ChevronRight size={14} color="var(--ink)" />
          </button>
        </div>

        {/* Slide counter */}
        <div style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 20,
          fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em',
          color: 'var(--ink-muted)', fontFamily: 'var(--sans)',
        }}>
          {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>
      </div>
    );
  }
);

FeatureCarousel.displayName = 'FeatureCarousel';
