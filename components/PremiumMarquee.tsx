'use client';
import { memo } from 'react';
import Image from 'next/image';

function PremiumMarquee() {
  const fireIcon = '/assets/images/fire.png';

  const text =
    'Late Night Food • Halal • Affordable • Open Late • Biryani Lovers Welcome • Hungry Knights Eat Here';

  return (
    <section className="relative w-full overflow-hidden py-3 sm:py-4 lg:py-5">
      {/* CONTAINER - Increased Width */}
      <div
        className="relative mx-2 sm:mx-3 lg:mx-4 rounded-2xl sm:rounded-3xl overflow-hidden"
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
          <div className="flex whitespace-nowrap py-4 sm:py-5 lg:py-6 animate-marquee">

            {[...Array(2)].map((_, i) => (
              <div 
                key={i}
                className="flex items-center gap-5 sm:gap-7 lg:gap-8 mx-8 sm:mx-12 lg:mx-16"
              >
                
                {/* LEFT FIRE */}
                <Image
                  src={fireIcon}
                  alt="Fire"
                  width={48}
                  height={48}
                  priority
                  className="flex-shrink-0 select-none"
                  style={{
                    width: 'clamp(32px, 3.5vw, 48px)',
                    height: 'clamp(32px, 3.5vw, 48px)',
                  }}
                />

                {/* TEXT — ANTON EXTRA-BOLD STYLING */}
                <span
                  style={{
                    fontFamily: 'var(--font-anton), Anton, sans-serif',
                    fontSize: 'clamp(1.125rem, 2vw + 0.25rem, 1.75rem)',
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
                  width={48}
                  height={48}
                  priority
                  className="flex-shrink-0 select-none"
                  style={{
                    width: 'clamp(32px, 3.5vw, 48px)',
                    height: 'clamp(32px, 3.5vw, 48px)',
                  }}
                />

                {/* BIG GAP BETWEEN REPEATS */}
                <div className="w-56 sm:w-72 md:w-96 lg:w-[28rem]"></div>
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