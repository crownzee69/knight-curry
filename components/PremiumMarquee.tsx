'use client';
import { memo } from 'react';
import Image from 'next/image';

function PremiumMarquee() {
  const fireIcon = '/assets/images/fire.png';

  const text =
    'Late Night Food • Halal • Affordable • Open Late • Biryani Lovers Welcome • Hungry Knights Eat Here';

  return (
    <section className="relative w-full overflow-hidden py-2 sm:py-2.5 lg:py-3">
      {/* CONTAINER - Increased Width */}
      <div
        className="relative mx-2 sm:mx-3 lg:mx-4 rounded-xl sm:rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(185, 28, 28, 0.2) 50%, rgba(249, 115, 22, 0.15) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Enhanced SHINE Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 30%, transparent 70%)',
          }}
        />
        
        {/* Subtle Inner Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 69, 0, 0.15) 0%, transparent 70%)',
          }}
        />

        {/* Premium Gradient Fade Overlays for Elegant Edges */}
        <div 
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: '120px',
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.5), transparent)',
          }}
        ></div>
        <div 
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: '120px',
            background: 'linear-gradient(to left, rgba(255, 255, 255, 0.5), transparent)',
          }}
        ></div>

        {/* TRUE PERFECT MARQUEE */}
        <div className="relative flex overflow-hidden">
          <div className="flex whitespace-nowrap py-2.5 sm:py-3 lg:py-3.5 animate-marquee">

            {[...Array(2)].map((_, i) => (
              <div 
                key={i}
                className="flex items-center gap-3 sm:gap-4 lg:gap-5 mx-4 sm:mx-6 lg:mx-8"
              >
                
                {/* LEFT FIRE */}
                <Image
                  src={fireIcon}
                  alt="Fire"
                  width={32}
                  height={32}
                  priority
                  className="flex-shrink-0 select-none"
                  style={{
                    width: 'clamp(24px, 2.5vw, 32px)',
                    height: 'clamp(24px, 2.5vw, 32px)',
                  }}
                />

                {/* TEXT — ANTON EXTRA-BOLD STYLING */}
                <span
                  style={{
                    fontFamily: 'var(--font-anton), Anton, sans-serif',
                    fontSize: 'clamp(0.875rem, 1.5vw + 0.125rem, 1.25rem)',
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    color: '#8B0000',
                  }}
                >
                  {text}
                </span>

                {/* RIGHT FIRE */}
                <Image
                  src={fireIcon}
                  alt="Fire"
                  width={32}
                  height={32}
                  priority
                  className="flex-shrink-0 select-none"
                  style={{
                    width: 'clamp(24px, 2.5vw, 32px)',
                    height: 'clamp(24px, 2.5vw, 32px)',
                  }}
                />

                {/* BIG GAP BETWEEN REPEATS */}
                <div className="w-32 sm:w-40 md:w-48 lg:w-64"></div>
              </div>
            ))}

          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 18s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
      `}</style>
    </section>
  );
}

export default memo(PremiumMarquee);