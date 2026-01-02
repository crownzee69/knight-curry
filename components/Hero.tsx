'use client';

import { memo } from 'react';
import Link from 'next/link';
import PremiumMarquee from './PremiumMarquee';

function Hero() {
  return (
    <section
      className="relative w-full text-center overflow-hidden"
      aria-label="home"
      id="home"
      style={{
        minHeight: 'auto',
        paddingTop: '20px',
        paddingBottom: '0',
        marginBottom: '0',
      }}
    >
      <div className="relative z-[2] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-2 pb-0 sm:pt-4 sm:pb-0 lg:pt-6 lg:pb-0" style={{ marginBottom: '0', paddingBottom: '0' }}>

        {/* Main Content Wrapper */}
        <div className="w-full max-w-6xl mx-auto">

          {/* Text Content */}
          <div className="animate-fadeInUp mb-2 sm:mb-4 lg:mb-6">
            <h1 className="font-display font-black text-neutral-900 text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3 lg:mb-4 leading-tight drop-shadow-lg">
              Knights Curry Express
            </h1>
            <p className="text-base sm:tedddddddxt-xl md:text-2xl font-bold text-neutral-800 mb-3 sm:mb-4 max-w-3xl mx-auto leading-snug drop-shadow-sm px-2">
              Fresh, Halal & Affordable — Just Minutes from UCF.
            </p>

            {/* Action Button */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-stretch sm:items-center justify-center px-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 bg-primary text-white font-semibold text-sm sm:text-base rounded-md shadow-sm active:scale-95 hover:shadow-md hover:bg-primary-dark transition-all duration-300"
              >
                View Menu
              </Link>
            </div>
          </div>

          {/* Premium Scrolling Marquee */}
          <PremiumMarquee />

        </div>
      </div>
    </section>
  );
}

export default memo(Hero);