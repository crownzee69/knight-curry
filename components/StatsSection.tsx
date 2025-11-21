import React from 'react';

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-neutral-50 text-center" aria-label="statistics">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

          {/* Card 1: Locations */}
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 rounded-lg bg-white border border-neutral-200 active:scale-95 hover:shadow-md transition-all duration-300">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-secondary mb-2 sm:mb-3">
              120+
            </h2>
            <p className="text-base sm:text-xl font-semibold text-neutral-800">
              Locations
            </p>
          </div>

          {/* Card 2: Halal Food */}
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 rounded-lg bg-white border border-neutral-200 active:scale-95 hover:shadow-md transition-all duration-300">
            <div className="mb-2 sm:mb-3 text-secondary">
              <ion-icon name="restaurant-outline" className="text-4xl sm:text-6xl lg:text-7xl"></ion-icon>
            </div>
            <p className="text-base sm:text-xl font-semibold text-neutral-800">
              Authentic Halal Food
            </p>
          </div>

          {/* Card 3: Experience */}
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 rounded-lg bg-white border border-neutral-200 active:scale-95 hover:shadow-md transition-all duration-300">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-secondary mb-2 sm:mb-3">
              30+
            </h2>
            <p className="text-base sm:text-xl font-semibold text-neutral-800">
              Years Experience
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}