'use client';

import { useState, useEffect, memo, useMemo, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getMenuItemsByCategory, menuItemDetails } from '@/data/menuDetails';
import { getCategoriesSorted } from '@/data/menuCategories';

// Helper function to get item ID from name and category
function getItemId(itemName: string, categoryId: string): string {
  // Find the matching item in menuItemDetails by name and categoryId
  const matchingItem = menuItemDetails.find(
    (item) => item.name === itemName && item.categoryId === categoryId
  );
  
  if (matchingItem) {
    return matchingItem.id;
  }
  
  // Fallback: generate ID from name if not found (shouldn't happen)
  return itemName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Helper function to get "perfect for" text from name and category
function getPerfectFor(itemName: string, categoryId: string): string | undefined {
  const matchingItem = menuItemDetails.find(
    (item) => item.name === itemName && item.categoryId === categoryId
  );
  
  return matchingItem?.perfectFor;
}

function Menu({ initialCategory }: { initialCategory?: string }) {
  const pathname = usePathname();
  
  // Dynamically generate menu categories from data files
  // This ensures categories and items are always in sync with menuDetails.ts
  // Compute this first before using in useState
  const menuCategories = useMemo(() => {
    const categories = getCategoriesSorted();
    return categories.map(category => ({
      ...category,
      items: getMenuItemsByCategory(category.id).map(item => ({
        image: item.image,
        name: item.name,
        price: item.price,
        description: item.description,
      })),
    }));
  }, []); // Empty dependency array since data is static
  
  // Get default category from first category in sorted list
  const defaultCategory = useMemo(() => {
    return menuCategories[0]?.id || 'signature-partition-platters';
  }, [menuCategories]);

  // Determine active category from URL or initialCategory
  const getCategoryFromPath = useCallback((path: string | null): string => {
    if (!path) return defaultCategory;
    if (path.startsWith('/menu/')) {
      const categoryFromUrl = path.split('/menu/')[1]?.split('/')[0];
      if (categoryFromUrl && menuCategories.some(cat => cat.id === categoryFromUrl)) {
        return categoryFromUrl;
      }
    }
    return defaultCategory;
  }, [menuCategories, defaultCategory]);

  // Initialize active category - compute menuCategories first
  const initialMenuCategories = getCategoriesSorted().map(category => ({
    ...category,
    items: getMenuItemsByCategory(category.id).map(item => ({
      image: item.image,
      name: item.name,
      price: item.price,
      description: item.description,
    })),
  }));

  const [activeCategory, setActiveCategory] = useState(() => {
    if (initialCategory) return initialCategory;
    if (pathname) {
      const categoryFromUrl = pathname.startsWith('/menu/') 
        ? pathname.split('/menu/')[1]?.split('/')[0]
        : null;
      if (categoryFromUrl && initialMenuCategories.some(cat => cat.id === categoryFromUrl)) {
        return categoryFromUrl;
      }
    }
    return initialMenuCategories[0]?.id || 'signature-partition-platters';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync state with URL when pathname changes
  useEffect(() => {
    const categoryFromUrl = getCategoryFromPath(pathname);
    setActiveCategory(prevCategory => {
      // Only update if different to avoid unnecessary re-renders
      if (categoryFromUrl && categoryFromUrl !== prevCategory) {
        return categoryFromUrl;
      }
      // Handle initialCategory on /menu page
      if (initialCategory && pathname === '/menu' && initialCategory !== prevCategory) {
        return initialCategory;
      }
      return prevCategory;
    });
  }, [pathname, initialCategory]);

  const currentCategory = useMemo(() => {
    const found = menuCategories.find(cat => cat.id === activeCategory);
    if (found && found.items && found.items.length > 0) {
      return found;
    }
    // Fallback to first category with items
    const firstWithItems = menuCategories.find(cat => cat.items && cat.items.length > 0);
    return firstWithItems || menuCategories[0] || { id: '', name: 'No Category', shortName: 'No Category', icon: '', items: [] };
  }, [activeCategory, menuCategories]);

  // Refs for category container and active item to handle smooth scrolling
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const activeCategoryRef = useRef<HTMLAnchorElement>(null);

  // Check if content is scrollable and calculate scroll progress
  const checkScrollPosition = () => {
    if (categoryContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setIsScrollable(true);
        // Calculate scroll progress (0 to 1)
        const progress = scrollLeft / maxScroll;
        setScrollProgress(progress);
      } else {
        setIsScrollable(false);
        setScrollProgress(0);
      }
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = categoryContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      // Check on mount and after a delay to ensure DOM is ready
      setTimeout(checkScrollPosition, 100);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [activeCategory, menuCategories]);

  // Smooth scroll to active category without jumping to start
  useEffect(() => {
    if (activeCategoryRef.current && categoryContainerRef.current) {
      const container = categoryContainerRef.current;
      const activeItem = activeCategoryRef.current;
      const containerRect = container.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      // Only scroll if item is not fully visible
      const isFullyVisible =
        itemRect.left >= containerRect.left &&
        itemRect.right <= containerRect.right;

      if (!isFullyVisible) {
        // Calculate scroll position to center the item
        const scrollLeft = activeItem.offsetLeft - (container.offsetWidth / 2) + (activeItem.offsetWidth / 2);

        // Smooth scroll without jumping
        container.scrollTo({
          left: Math.max(0, Math.min(scrollLeft, container.scrollWidth - container.offsetWidth)),
          behavior: 'smooth'
        });
      }
    }
  }, [activeCategory]);

  return (
    <section className="py-8 sm:py-12 lg:py-16" aria-label="menu" id="menu">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 relative">
          <div className="relative inline-block px-4 sm:px-6">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight"
              style={{
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(220, 38, 38, 0.4), 0 0 40px rgba(220, 38, 38, 0.2)',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
              }}
            >
              Delicious Food
            </h2>
            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2">
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <div className="relative">
                <ion-icon name="restaurant" className="text-primary text-xl sm:text-2xl drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 8px rgba(220, 38, 38, 0.5))' }}></ion-icon>
              </div>
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Categories Selector - Single Horizontal Bar */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div
            className="rounded-2xl p-4 sm:p-6"
            style={{
              overflow: 'visible',
              background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.92) 50%, rgba(240, 224, 200, 0.90) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: `
                0 12px 40px rgba(0, 0, 0, 0.18),
                0 4px 16px rgba(0, 0, 0, 0.12),
                0 2px 8px rgba(220, 38, 38, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.8),
                inset 0 -2px 8px rgba(0, 0, 0, 0.08)
              `,
              border: '2px solid rgba(220, 38, 38, 0.2)',
              transform: 'translateZ(0)',
            }}
          >
            <div 
              className="flex gap-2 sm:gap-3 lg:gap-4 pb-3 scrollbar-hide lg:justify-center overflow-x-auto" 
              style={{
                overflowY: 'visible',
                paddingLeft: '8px',
                paddingRight: '8px',
                paddingTop: '8px',
                paddingBottom: '12px',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
              }} 
              ref={categoryContainerRef}
            >
              {menuCategories && menuCategories.length > 0 ? menuCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/menu/${category.id}`}
                  className={`premium-category-button flex flex-col items-center justify-center min-w-[85px] sm:min-w-[100px] lg:min-w-[110px] w-[85px] sm:w-[100px] lg:w-[110px] p-3 sm:p-4 lg:p-4 rounded-xl transition-all duration-300 active:scale-95 relative ${activeCategory === category.id
                      ? 'premium-category-active'
                      : 'premium-category-inactive'
                    }`}
                  style={{
                    margin: activeCategory === category.id ? '3px' : '2px',
                    boxSizing: 'border-box',
                    overflow: 'visible',
                    background: activeCategory === category.id
                      ? 'linear-gradient(135deg, rgba(255, 248, 240, 0.98) 0%, rgba(250, 240, 230, 0.95) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.92) 100%)',
                    border: activeCategory === category.id
                      ? '2px solid rgba(220, 38, 38, 0.4)'
                      : '2px solid rgba(220, 38, 38, 0.15)',
                    boxShadow: activeCategory === category.id
                      ? '0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(220, 38, 38, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05)'
                      : '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.03)',
                    transform: 'translateZ(0)',
                  }}
                  ref={activeCategory === category.id ? activeCategoryRef : null}
                  onClick={(e) => {
                    e.preventDefault();
                    if (category.id !== activeCategory) {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setActiveCategory(category.id);
                        setTimeout(() => {
                          setIsTransitioning(false);
                        }, 150);
                      }, 150);
                    }
                    window.history.pushState({}, '', `/menu/${category.id}`);
                  }}
                  scroll={false}
                  prefetch={false}
                >
                  {/* Premium Icon Badge */}
                  <div className="w-full flex items-center justify-center mb-1.5 sm:mb-2">
                    <div
                      className={`premium-category-icon relative w-14 h-14 sm:w-16 sm:h-16 lg:w-16 lg:h-16 rounded-full overflow-hidden transition-all duration-300 ${activeCategory === category.id
                          ? 'premium-icon-active'
                          : 'premium-icon-inactive'
                        }`}
                    >
                      <div className="absolute inset-0 rounded-full" style={{
                        background: activeCategory === category.id
                          ? 'radial-gradient(circle at 30% 30%, rgba(255, 140, 0, 0.3), rgba(220, 38, 38, 0.2))'
                          : 'radial-gradient(circle at 30% 30%, rgba(255, 248, 240, 0.6), rgba(245, 230, 211, 0.4))',
                        boxShadow: activeCategory === category.id
                          ? 'inset 0 2px 8px rgba(255, 140, 0, 0.3), 0 4px 12px rgba(220, 38, 38, 0.3)'
                          : 'inset 0 1px 4px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.1)',
                      }}></div>
                      <Image
                        src={category.icon}
                        width={64}
                        height={64}
                        alt={category.name}
                        className="relative z-10 w-full h-full object-cover"
                        loading="lazy"
                        sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 64px"
                        quality={85}
                      />
                      {activeCategory === category.id && (
                        <div className="absolute inset-0 rounded-full z-20" style={{
                          background: 'radial-gradient(circle, rgba(255, 140, 0, 0.2) 0%, transparent 70%)',
                          animation: 'premiumPulse 2s ease-in-out infinite',
                        }}></div>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs sm:text-sm lg:text-base font-bold text-center transition-all duration-300 leading-tight ${activeCategory === category.id
                      ? 'text-primary'
                      : 'text-neutral-800'
                    }`} style={{
                      textShadow: activeCategory === category.id ? '0 1px 3px rgba(220, 38, 38, 0.3)' : 'none',
                    }}>
                    {category.shortName}
                  </span>
                  {activeCategory === category.id && (
                    <ion-icon name="checkmark-circle" className="absolute top-2 right-2 text-primary text-base sm:text-lg" style={{
                      filter: 'drop-shadow(0 0 6px rgba(220, 38, 38, 0.5))',
                    }}></ion-icon>
                  )}
                </Link>
              )) : (
                <div className="text-center py-8 text-neutral-600">
                  <p>No categories available</p>
                </div>
              )}
            </div>
            
            {/* Dynamic Scroll Indicator - Red dot that moves with scroll */}
            {isScrollable && (
              <div className="flex justify-center mt-3 relative px-4">
                {/* Track line */}
                <div className="w-full max-w-[120px] h-1 bg-neutral-300 rounded-full relative overflow-hidden">
                  {/* Progress fill */}
                  <div 
                    className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-150"
                    style={{ width: `${scrollProgress * 100}%` }}
                  ></div>
                </div>
                {/* Moving red dot */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg transition-all duration-150"
                  style={{ 
                    left: `calc(50% - 60px + ${scrollProgress * 120}px)`,
                    transform: 'translateY(-50%)',
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Content Area */}
        <div className="flex-1 min-h-[400px]">
            {/* Category Title with Decorative Elements */}
            <div className={`mb-6 sm:mb-8 lg:mb-10 transition-all duration-200 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}>
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/30"></div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900 text-center">
                  {currentCategory.name}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 via-primary/30 to-transparent"></div>
              </div>
              <p className="text-center text-sm sm:text-base text-neutral-600">
                {currentCategory.items.length} {currentCategory.items.length === 1 ? 'item' : 'items'} available
              </p>
              
              {/* Notice for Curries */}
              {(activeCategory === 'curries-veg' || activeCategory === 'curries-non-veg') && (
                <div className="mt-4 sm:mt-6 flex justify-center">
                  <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-300 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md inline-block">
                    <div className="flex items-center gap-3">
                      <ion-icon name="information-circle" className="text-green-600 text-2xl sm:text-3xl flex-shrink-0"></ion-icon>
                      <p className="text-sm sm:text-base font-semibold text-green-800 whitespace-nowrap flex items-center gap-2">
                        All curries come with a side of rice. 🍚
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notice for Sandwiches, Burgers & Pizzas */}
              {activeCategory === 'sandwiches-burgers-pizzas' && (
                <div className="mt-4 sm:mt-6 flex justify-center">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-2 border-orange-300 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md inline-block">
                    <div className="flex items-center gap-3">
                      <ion-icon name="information-circle" className="text-orange-600 text-2xl sm:text-3xl flex-shrink-0"></ion-icon>
                      <p className="text-sm sm:text-base font-semibold text-orange-800 whitespace-nowrap flex items-center gap-2">
                        All of these come with a side of Knights Fries 🍟 or Chips 🥔.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actual Content */}
            {currentCategory && currentCategory.items && currentCategory.items.length > 0 ? (
            <ul className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}>
              {currentCategory.items.map((item, index) => (
                <li
                  key={`${activeCategory}-${item.name}-${index}`}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <Link
                    href={`/menu/item/${getItemId(item.name, activeCategory)}`}
                    className="premium-food-card group block rounded-xl sm:rounded-2xl overflow-hidden hover:scale-105 hover:-translate-y-2 active:scale-100 transition-all duration-300 relative"
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
                        fill
                        loading="lazy"
                        alt={item.name}
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        quality={85}
                        style={{
                          borderRadius: '0.75rem 0.75rem 0 0',
                        }}
                      />
                      {/* Shine effect on hover - removed white overlay */}
                      {/* Overlay gradient - removed white overlay */}
                      {/* Top-right badge */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 transform translate-x-2 group-hover:translate-x-0">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg" style={{
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                        }}>
                          <ion-icon name="arrow-forward" className="text-primary text-lg"></ion-icon>
                        </div>
                      </div>
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
                        {item.name}
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

                      <p className="text-xs sm:text-sm text-neutral-700 line-clamp-2 leading-relaxed mb-2">
                        {item.description}
                      </p>
                      {getPerfectFor(item.name, activeCategory) && (
                        <p className="text-xs sm:text-sm text-green-600 font-semibold italic leading-tight">
                          Perfect for: {getPerfectFor(item.name, activeCategory)}
                        </p>
                      )}
                    </div>

                    {/* Premium Glow Effect */}
                    <div
                      className="absolute -inset-1 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.3) 0%, rgba(255, 140, 0, 0.25) 50%, rgba(220, 38, 38, 0.3) 100%)',
                        filter: 'blur(12px)',
                        boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)',
                      }}
                    ></div>

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
                </li>
              ))}
            </ul>
            ) : (
              <div className="text-center py-12 text-neutral-600">
                <p className="text-lg">No items available in this category</p>
              </div>
            )}
          </div>

        {/* Allergy Notice */}
        <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-md">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 sm:mb-4 text-center">
                Allergy Notice
              </h3>
              <p className="text-sm sm:text-base text-neutral-800 text-center leading-relaxed">
                Many of our items contain or may come into contact with common allergens such as dairy, nuts, wheat, soy, eggs, and sesame. Ingredients can change and cross-contact may occur. Please read menu descriptions carefully and speak with a team member about your allergies before placing your order.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(Menu);
