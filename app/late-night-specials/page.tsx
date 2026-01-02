'use client';

import Layout from '@/components/Layout';
import HomepageBackground from '@/components/HomepageBackground';
import Link from 'next/link';
import Image from 'next/image';
import { getLateNightSpecials } from '@/data/menuDetails';
import WallOfFameGallery from '@/components/WallOfFameGallery';


export default function LateNightSpecialsPage() {
  const lateNightSpecials = getLateNightSpecials();

  return (
    <Layout>
      <HomepageBackground />
      
      <article className="relative z-10">
        {/* Hero Section */}
        <section className="pt-8 sm:pt-10 md:pt-12 lg:pt-16 xl:pt-20 pb-4 sm:pb-6 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] font-display font-black text-neutral-900 mb-4">
  Late Night Food for Hungry Knights
</h2>

            
            {/* Highlighted Box */}
            <div 
              className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-4 border-2 shadow-2xl relative overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.12) 0%, rgba(255, 248, 240, 0.98) 30%, rgba(245, 230, 211, 0.95) 70%, rgba(220, 38, 38, 0.1) 100%)',
                borderColor: 'rgba(220, 38, 38, 0.4)',
                boxShadow: '0 12px 40px rgba(220, 38, 38, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(220, 38, 38, 0.1)',
              }}
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 rounded-br-full transform -translate-x-4 -translate-y-4"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/8 rounded-tl-full transform translate-x-4 translate-y-4"></div>
              
              <div className="relative z-10">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-primary mb-4 leading-tight">
                  Big Platters. Fresh Ingredients. Bold Flavors. Small Prices.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-neutral-800 font-semibold leading-relaxed">
                  Halal Indian platters and street food, just minutes from UCF — perfect for late-night cravings.
            </p>
              </div>
            </div>
          </div>
        </section>

        {/* Late Night Hours Block */}
        <section className="py-4 sm:py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 shadow-xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 50%, rgba(250, 240, 230, 0.92) 100%)',
                borderColor: 'rgba(220, 38, 38, 0.25)',
                boxShadow: '0 8px 32px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              }}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transform translate-x-8 -translate-y-8"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-display font-black text-neutral-900 mb-4 text-center">
                  Late Night Hours
                </h3>
                
                {/* Hours Grid - 2x2 Layout */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4">
                  {/* Monday - Thursday: 11pm-1:30am */}
                  <div 
                    className="group flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 lg:p-5 border-2 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.98) 100%)',
                      borderColor: 'rgba(148, 163, 184, 0.25)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Enhanced stars background - fewer on mobile */}
                    <div className="absolute inset-0 opacity-30 sm:opacity-40">
                      {[
                        { left: '15%', top: '20%', delay: '0s', size: '1px' },
                        { left: '85%', top: '15%', delay: '0.5s', size: '1.5px' },
                        { left: '25%', top: '45%', delay: '1s', size: '1px' },
                        { left: '75%', top: '50%', delay: '1.5s', size: '1px' },
                        { left: '10%', top: '70%', delay: '0.3s', size: '1.5px' },
                        { left: '90%', top: '75%', delay: '0.8s', size: '1px' },
                        { left: '50%', top: '10%', delay: '1.2s', size: '1px' },
                        { left: '40%', top: '80%', delay: '0.7s', size: '1.5px' },
                      ].map((star, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-white"
                          style={{
                            width: star.size,
                            height: star.size,
                            left: star.left,
                            top: star.top,
                            animation: `twinkle ${2 + (i % 3)}s infinite`,
                            animationDelay: star.delay,
                            boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Enhanced Moon icon with glow - smaller on mobile */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-200/30 rounded-full blur-lg"></div>
                        <ion-icon name="moon" className="text-2xl sm:text-3xl md:text-4xl text-yellow-200 relative z-10 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]"></ion-icon>
                      </div>
                    </div>
                    
                    {/* Clock Icon Container - smaller on mobile */}
                    <div className="flex-shrink-0 relative z-10 mb-1 sm:mb-2">
                      <div className="relative">
                        {/* Glow effect behind clock */}
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110"></div>
                        {/* Clock SVG for 11pm-1am - Enhanced Night theme */}
                        <svg width="70" height="70" viewBox="0 0 100 100" className="w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[100px] md:h-[100px] drop-shadow-[0_4px_20px_rgba(220,38,38,0.4)]">
                          {/* Clock circle - darker with better contrast */}
                          <circle cx="50" cy="50" r="45" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="2.5"/>
                          {/* Filled arc from 11pm to 1am */}
                          <path
                            d="M 50 50 L 27.5 11.03 A 45 45 0 0 1 72.5 11.03 L 50 50 Z"
                            fill="rgba(220, 38, 38, 0.5)"
                            stroke="rgba(220, 38, 38, 0.8)"
                            strokeWidth="1.5"
                          />
                          {/* Clock center with glow */}
                          <circle cx="50" cy="50" r="3.5" fill="rgba(220, 38, 38, 1)" filter="url(#glow)"/>
                          <defs>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          {/* Hour markers - enhanced */}
                          <line x1="50" y1="5" x2="50" y2="11" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="2.5"/>
                          <line x1="95" y1="50" x2="89" y2="50" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="2.5"/>
                          <line x1="50" y1="95" x2="50" y2="89" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="2.5"/>
                          <line x1="5" y1="50" x2="11" y2="50" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="2.5"/>
                          {/* Clock hands - enhanced */}
                          <line x1="50" y1="50" x2="27.5" y2="11.03" stroke="rgba(220, 38, 38, 1)" strokeWidth="3" strokeLinecap="round" filter="url(#glow)"/>
                          <line x1="50" y1="50" x2="72.5" y2="11.03" stroke="rgba(220, 38, 38, 1)" strokeWidth="3" strokeLinecap="round" filter="url(#glow)"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center z-10 space-y-1 sm:space-y-1.5 md:space-y-2">
                      <p className="font-bold text-yellow-50 text-xs sm:text-sm md:text-lg lg:text-xl tracking-tight leading-tight">Monday – Thursday</p>
                      <p className="text-primary font-black text-sm sm:text-base md:text-xl lg:text-2xl tracking-tight leading-tight" style={{ textShadow: '0 0 12px rgba(220, 38, 38, 0.5)' }}>11:00 PM – 1:00 AM</p>
                      <p className="text-[10px] sm:text-xs md:text-sm text-slate-300 font-medium">Late Night Specials</p>
                    </div>
                  </div>

                  {/* Friday & Saturday: 11pm-2:30am */}
                  <div 
                    className="group flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 lg:p-5 border-2 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.98) 100%)',
                      borderColor: 'rgba(148, 163, 184, 0.25)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Enhanced stars background - fewer on mobile */}
                    <div className="absolute inset-0 opacity-30 sm:opacity-40">
                      {[
                        { left: '15%', top: '20%', delay: '0s', size: '1px' },
                        { left: '85%', top: '15%', delay: '0.5s', size: '1.5px' },
                        { left: '25%', top: '45%', delay: '1s', size: '1px' },
                        { left: '75%', top: '50%', delay: '1.5s', size: '1px' },
                        { left: '10%', top: '70%', delay: '0.3s', size: '1.5px' },
                        { left: '90%', top: '75%', delay: '0.8s', size: '1px' },
                        { left: '50%', top: '10%', delay: '1.2s', size: '1px' },
                        { left: '40%', top: '80%', delay: '0.7s', size: '1.5px' },
                      ].map((star, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-white"
                          style={{
                            width: star.size,
                            height: star.size,
                            left: star.left,
                            top: star.top,
                            animation: `twinkle ${2 + (i % 3)}s infinite`,
                            animationDelay: star.delay,
                            boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Enhanced Moon icon with glow - smaller on mobile */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-200/30 rounded-full blur-lg"></div>
                        <ion-icon name="moon" className="text-2xl sm:text-3xl md:text-4xl text-yellow-200 relative z-10 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]"></ion-icon>
                      </div>
                    </div>
                    
                    {/* Clock Icon Container - smaller on mobile */}
                    <div className="flex-shrink-0 relative z-10 mb-1 sm:mb-2">
                      <div className="relative">
                        {/* Glow effect behind clock */}
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110"></div>
                        {/* Clock SVG for 11pm-2:30am - Enhanced Night theme */}
                        <svg width="70" height="70" viewBox="0 0 100 100" className="w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[100px] md:h-[100px] drop-shadow-[0_4px_20px_rgba(220,38,38,0.4)]">
                          {/* Clock circle - darker with better contrast */}
                          <circle cx="50" cy="50" r="45" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="2.5"/>
                          {/* Filled arc from 11pm to 2:30am */}
                          <path
                            d="M 50 50 L 27.5 11.03 A 45 45 0 0 1 93.47 38.34 L 50 50 Z"
                            fill="rgba(220, 38, 38, 0.5)"
                            stroke="rgba(220, 38, 38, 0.8)"
                            strokeWidth="1.5"
                          />
                          {/* Clock center with glow */}
                          <circle cx="50" cy="50" r="3.5" fill="rgba(220, 38, 38, 1)" filter="url(#glow2)"/>
                          <defs>
                            <filter id="glow2">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          {/* Hour markers - enhanced */}
                          <line x1="50" y1="5" x2="50" y2="11" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="2.5"/>
                          <line x1="95" y1="50" x2="89" y2="50" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="2.5"/>
                          <line x1="50" y1="95" x2="50" y2="89" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="2.5"/>
                          <line x1="5" y1="50" x2="11" y2="50" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="2.5"/>
                          {/* Clock hands - enhanced */}
                          <line x1="50" y1="50" x2="27.5" y2="11.03" stroke="rgba(220, 38, 38, 1)" strokeWidth="3" strokeLinecap="round" filter="url(#glow2)"/>
                          <line x1="50" y1="50" x2="93.47" y2="38.34" stroke="rgba(220, 38, 38, 1)" strokeWidth="3" strokeLinecap="round" filter="url(#glow2)"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center z-10 space-y-1 sm:space-y-1.5 md:space-y-2">
                      <p className="font-bold text-yellow-50 text-xs sm:text-sm md:text-lg lg:text-xl tracking-tight leading-tight">Friday & Saturday</p>
                      <p className="text-primary font-black text-sm sm:text-base md:text-xl lg:text-2xl tracking-tight leading-tight" style={{ textShadow: '0 0 12px rgba(220, 38, 38, 0.5)' }}>11:00 PM – 2:30 AM</p>
                      <p className="text-[10px] sm:text-xs md:text-sm text-slate-300 font-medium">Extended Late Night</p>
                    </div>
                  </div>
                </div>
                
                {/* <p className="text-sm text-neutral-600 text-center italic pt-4 border-t border-neutral-200/50">
                  Walk in grad a table.
                </p> */}
              </div>
            </div>
          </div>
        </section>

        {/* Late Night Top 10 Specials Grid */}
        <section className="py-6 sm:py-8">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl md:text-4xl font-display font-black text-neutral-900 mb-4 sm:mb-6 text-center">
            Late Night Top 10 – Specials
</h2>


            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {lateNightSpecials.map((item) => {
                const displayName = item.lateNightDisplayName || item.name;
                return (
              <Link
                key={item.id}
                href={`/menu/item/${item.id}`}
                className="premium-food-card group block rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 relative cursor-pointer hover:scale-105 hover:-translate-y-2 active:scale-100"
                prefetch={false}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(250, 240, 230, 0.92) 100%)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                  border: '2px solid rgba(220, 38, 38, 0.15)',
                }}
              >
                <figure
                  className="w-full aspect-square relative overflow-hidden"
                  style={{
                    borderRadius: '0.75rem 0.75rem 0 0',
                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={displayName}
                    fill
                    loading="lazy"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    style={{
                      borderRadius: '0.75rem 0.75rem 0 0',
                    }}
                  />
                </figure>

                {/* Premium Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

                <div
                  className="p-4 sm:p-5 relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.98) 0%, rgba(250, 240, 230, 0.95) 100%)',
                  }}
                >
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 mb-2 sm:mb-3 transition-all duration-300 group-hover:text-primary line-clamp-2 leading-tight" style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  }}>
                    {displayName}
                  </h3>

                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span
                      className="text-sm sm:text-base lg:text-lg font-medium text-green-600"
                    >
                      {item.price}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-500 group-hover:text-primary transition-colors font-medium">
                      View Details →
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-700 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {item.perfectFor && (
                  <p className="text-xs sm:text-sm text-green-600 font-semibold italic leading-tight">
                      Perfect for: {item.perfectFor}
                  </p>
                  )}
                </div>

                {/* Simple hover glow effect */}
                <div
                  className="absolute -inset-1 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(255, 140, 0, 0.15) 50%, rgba(220, 38, 38, 0.2) 100%)',
                    filter: 'blur(12px)',
                    boxShadow: '0 0 30px rgba(220, 38, 38, 0.3)',
                  }}
                ></div>

                {/* Simple hover border */}
                <div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    border: '2px solid rgba(220, 38, 38, 0.4)',
                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
                  }}
                ></div>

              </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Full Menu Button */}
        <section className="py-4 sm:py-6 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white font-bold text-base sm:text-lg rounded-full shadow-lg hover:bg-primary-dark hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <ion-icon name="restaurant-outline" className="text-xl sm:text-2xl"></ion-icon>
              <span>We also have full menu</span>
              <ion-icon name="arrow-forward" className="text-lg sm:text-xl"></ion-icon>
            </Link>
          </div>
        </section>

        {/* Allergy Notice */}
        <section className="py-6 sm:py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-md">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 sm:mb-4 text-center">
                Allergy Notice
              </h3>
              <p className="text-sm sm:text-base text-neutral-800 text-center leading-relaxed">
                Many of our items contain or may come into contact with common allergens such as dairy, nuts, wheat, soy, eggs, and sesame. Ingredients can change and cross-contact may occur. Please read menu descriptions carefully and speak with a team member about your allergies before placing your order.
              </p>
            </div>
          </div>
        </section>

        {/* How Late Night Ordering Works */}
        <section className="py-6 sm:py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="p-6 sm:p-8 rounded-xl border"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(250, 240, 230, 0.92) 100%)',
                borderColor: 'rgba(220, 38, 38, 0.15)',
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-neutral-900 mb-4 text-center">
              How to Order Late Night
            </h2>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-baseline gap-3">
                  <span className="text-primary text-xl font-bold leading-none">•</span>
                  <div className="flex-1">
                    <strong className="text-neutral-900 font-bold text-base sm:text-lg">Dine-In:</strong>
                    <span className="text-neutral-700 ml-2">Walk in, grab a table.</span>
                  </div>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-primary text-xl font-bold leading-none">•</span>
                  <div className="flex-1">
                    <strong className="text-neutral-900 font-bold text-base sm:text-lg">Takeout:</strong>
                    <span className="text-neutral-700 ml-2">Order at the counter or call ahead.</span>
                  </div>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-primary text-xl font-bold leading-none">•</span>
                  <div className="flex-1">
                    <strong className="text-neutral-900 font-bold text-base sm:text-lg">Delivery:</strong>
                    <span className="text-neutral-700 ml-2">Available on major apps.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Late Night Wall of Fame */}
        <section className="py-6 sm:py-8">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center gap-3 mb-4">
                <ion-icon name="camera" className="text-4xl text-primary"></ion-icon>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-neutral-900">
                  Late Night Wall of Fame
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-700 mb-6 max-w-2xl mx-auto">
                Follow us on Instagram <a href="https://instagram.com/knightscurryexpress" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">@knightscurryexpress</a> for real late-night pics from UCF student and you might get featured (or win a free platter).
              </p>
              <p className="text-xl sm:text-2xl font-bold text-neutral-900">
                Real Knights. Real Platters. Real Late Nights.
              </p>
            </div>
            
            {/* Wall of Fame Gallery - Shows 4 images */}
            <div className="mb-8">
              <WallOfFameGallery limit={4} />
            </div>
            
            {/* View More Button */}
            <div className="text-center">
              <Link
                href="/late-night-wall-of-fame"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold text-lg rounded-full shadow-xl hover:bg-primary-dark hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <ion-icon name="images-outline" className="text-2xl"></ion-icon>
                <span>View More Late-Night Pics</span>
                <ion-icon name="arrow-forward" className="text-xl"></ion-icon>
              </Link>
            </div>
          </div>
        </section>

      </article>
    </Layout>
  );
}

