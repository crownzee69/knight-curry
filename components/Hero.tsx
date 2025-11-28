'use client';

import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PremiumMarquee from './PremiumMarquee';

// Offer images from public/assets/offers folder
const offerImages = [
  '/assets/offers/1.webp',
  '/assets/offers/2.webp',
  '/assets/offers/3.webp',
];

function Hero() {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  // Auto-rotate offers every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offerImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
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

          {/* Premium Scrolling Marquee - Between View Menu and Banners */}
          <PremiumMarquee />

          {/* Offers Carousel */}
          <div className="relative w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mt-2 sm:mt-3 lg:mt-4 mb-2 sm:mb-3 lg:mb-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-2 sm:ring-4 ring-primary/20 hover:ring-primary/40 transition-all duration-500">
              {offerImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentOfferIndex
                    ? 'opacity-100 z-10 scale-100'
                    : 'opacity-0 z-0 scale-110'
                    }`}
                  style={{
                    animation: index === currentOfferIndex ? 'fadeInScale 0.7s ease-in-out' : 'none'
                  }}
                >
                  <Image
                    src={image}
                    alt={`Special Offer ${index + 1}`}
                    fill
                    priority={index === 0}
                    quality={95}
                    className="object-cover transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1400px"
                  />
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              ))}

              {/* Enhanced Carousel Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {offerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentOfferIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${index === currentOfferIndex
                      ? 'w-10 bg-primary shadow-[0_0_15px_rgba(220,38,38,0.8)] scale-110'
                      : 'w-2.5 bg-white/70 hover:bg-white hover:scale-110'
                      }`}
                    aria-label={`Go to offer ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default memo(Hero);