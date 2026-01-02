'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoriesSorted } from '@/data/menuCategories';

// Dynamically get categories from data file
const menuCategories = getCategoriesSorted();

function MenuCategoriesHero() {
  return (
    <section className="pb-0 pt-0" style={{ marginTop: '0', paddingTop: '0' }}>
      <div className="max-w-[1400px] mx-auto px-1 sm:px-2 lg:px-3">
        <div className="mb-0 relative rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] p-2 sm:p-4 lg:p-6 pb-6 sm:pb-8 lg:pb-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_0_3px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.5)] transform perspective-1000 overflow-hidden" style={{
          backgroundColor: '#2a2a2a',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(2deg)',
          borderRadius: '1.5rem',
        }}>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white text-center mb-6 sm:mb-8 leading-tight">
            <span className="relative inline-block px-6 sm:px-10 md:px-12 py-4 sm:py-6 md:py-8">
              <span className="relative z-10">
                OUR MENU
              </span>
              <span className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
            </span>
          </h2>

          {/* Grid for categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 lg:gap-3" role="list">
            {menuCategories.map((category, index) => (
              <Link
                key={category.id}
                href={`/menu/${category.id}`}
                className="group flex flex-col items-center justify-center bg-transparent p-2 sm:p-3 lg:p-4 active:scale-95 transition-all duration-300 animate-fadeInUp"
                prefetch={false}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-full flex items-center justify-center mb-2 sm:mb-3">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 transition-transform duration-300 group-active:scale-95 group-hover:scale-110">
                    <Image
                      src={category.icon}
                      width={280}
                      height={280}
                      alt={category.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      sizes="(max-width: 640px) 128px, (max-width: 767px) 144px, (max-width: 1023px) 160px, 176px"
                      quality={85}
                    />
                  </div>
                </div>
                <span 
                  className="font-semibold text-white text-center transition-colors duration-300 group-hover:text-primary leading-tight"
                  style={{ 
                    fontSize: 'clamp(0.975rem, 1.3vw + 0.5rem, 1.3rem)',
                  }}
                >
                  {category.shortName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(MenuCategoriesHero);