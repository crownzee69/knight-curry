'use client';

import { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Flame, Moon } from 'lucide-react';
import OrderRedirectModal from './OrderRedirectModal';

function Header() {
  const [navbarActive, setNavbarActive] = useState(false);
  const [headerActive, setHeaderActive] = useState(false);
  const [backTopActive, setBackTopActive] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const pathname = usePathname();

  const ORDER_URL = 'https://online.skytab.com/dfea7884072bca160af82d415c72f7bf';

  const handleOrderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowOrderModal(true);
  };

  const handleOrderConfirm = () => {
    setShowOrderModal(false);
    window.location.href = ORDER_URL;
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollPercentage = (scrollY + windowHeight) / documentHeight;
          
          // Check if page is actually scrollable
          const isScrollable = documentHeight > windowHeight;
          
          // Check if user is near the bottom (within 200px or 95% scrolled)
          const nearBottom = scrollY + windowHeight >= documentHeight - 200 || scrollPercentage >= 0.95;

          // Show header when scrolled a bit
          if (scrollY >= 50) {
            setHeaderActive(true);
          } else {
            setHeaderActive(false);
          }

          // Show back-to-top button only when:
          // 1. Page is scrollable
          // 2. User has scrolled down at least 200px (to avoid showing on short pages at top)
          // 3. AND either scrolled 60% or more OR scrolled at least 300px
          const hasScrolledEnough = scrollY >= 200;
          const shouldShow = isScrollable && hasScrolledEnough && (scrollPercentage >= 0.6 || scrollY >= 300);
          
          if (shouldShow) {
            setBackTopActive(true);
            setIsNearBottom(nearBottom);
          } else {
            setBackTopActive(false);
            setIsNearBottom(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
    document.body.classList.toggle('nav-active');
  };

  const closeNavbar = () => {
    setNavbarActive(false);
    setMenuDropdown(false);
    document.body.classList.remove('nav-active');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[1001] transition-all duration-300 overflow-visible ${headerActive
          ? 'premium-navbar-active' // Premium gradient with shadow on scroll
          : 'premium-navbar-transparent' // Premium gradient with translucency
          }`}
        data-header
      >
        {/* Main Header Bar */}
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 flex justify-between items-center gap-2 sm:gap-4 py-1.5 sm:py-2 overflow-visible">
          {/* Left Section: Logo + Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-visible">
            {/* Logo - Bigger Size */}
            <Link
              href="/"
              className="z-[1002] transition-all duration-300 active:scale-95 flex items-center -my-2 sm:-my-3 md:-my-4"
              onClick={closeNavbar}
            >
              <Image
                src="/assets/images/logo.svg"
                alt="Knights Curry Express"
                width={400}
                height={120}
                priority
                className="h-20 sm:h-28 md:h-32 w-auto"
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </Link>
          </div>

          {/* Desktop Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              href="/" 
              className={`font-bold text-sm lg:text-base transition-all duration-300 relative group ${
                pathname === '/' 
                  ? 'text-primary' 
                  : 'text-neutral-800 hover:text-primary'
              }`}
            >
              Home
              {pathname === '/' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/menu/signature-partition-platters" 
              className={`font-bold text-sm lg:text-base transition-all duration-300 relative group flex items-center gap-1.5 ${
                pathname.startsWith('/menu') && !pathname.startsWith('/menu/item') 
                  ? 'text-primary' 
                  : 'text-neutral-800 hover:text-primary'
              }`}
            >
              <Flame 
                size={16} 
                className={`transition-all duration-300 ${
                  pathname.startsWith('/menu') && !pathname.startsWith('/menu/item')
                    ? 'text-primary drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]' 
                    : 'text-neutral-600 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.4)]'
                }`}
              />
              View Our Menu
              {pathname.startsWith('/menu') && !pathname.startsWith('/menu/item') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/late-night-specials" 
              className={`font-bold text-sm lg:text-base transition-all duration-300 relative group flex items-center gap-1.5 ${
                pathname === '/late-night-specials' 
                  ? 'text-primary' 
                  : 'text-neutral-800 hover:text-primary'
              }`}
            >
              <Moon 
                size={16} 
                className={`transition-all duration-300 ${
                  pathname === '/late-night-specials'
                    ? 'text-primary drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]' 
                    : 'text-neutral-600 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.4)]'
                }`}
              />
              Late Night Specials
              {pathname === '/late-night-specials' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/location-and-hours" 
              className={`font-bold text-sm lg:text-base transition-all duration-300 relative group ${
                pathname === '/location-and-hours' 
                  ? 'text-primary' 
                  : 'text-neutral-800 hover:text-primary'
              }`}
            >
              Location and Hours
              {pathname === '/location-and-hours' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Section: Call Us Button + Order Button + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3 z-[1002]">
            {/* Desktop Call Us Button (Hidden on mobile) */}
            <a
              href="tel:+14072032499"
              className="hidden md:flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base font-bold bg-secondary text-white rounded-full transition-all duration-300 hover:bg-secondary-dark hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105 active:scale-100"
            >
              <ion-icon name="call-outline" className="text-lg"></ion-icon>
              <span>Call Us</span>
            </a>

            {/* Desktop Order Button (Hidden on mobile) - Premium Red Pill */}
            <button
              onClick={handleOrderClick}
              className="hidden md:flex flex-col items-center px-6 lg:px-8 py-2.5 lg:py-3 text-sm lg:text-base font-bold bg-primary text-white rounded-full transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-100 premium-order-button"
            >
              <span>Order Now</span>
              <span className="text-xs font-normal opacity-95">(Pick-up/Delivery)</span>
            </button>

            {/* Mobile Call Us Button (Visible only on mobile) - Left of Order Now */}
            <a
              href="tel:+14072032499"
              className="md:hidden flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold bg-secondary text-white rounded-full transition-all duration-300 hover:bg-secondary-dark hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] active:scale-95"
              onClick={closeNavbar}
            >
              <ion-icon name="call-outline" className="text-base sm:text-lg"></ion-icon>
              <span>Call Us</span>
            </a>

            {/* Mobile Order Now Button (Visible only on mobile) */}
            <button
              onClick={(e) => {
                handleOrderClick(e);
                closeNavbar();
              }}
              className="md:hidden flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold bg-primary text-white rounded-full transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] active:scale-95 premium-order-button"
            >
              <ion-icon name="cart-outline" className="text-base sm:text-lg"></ion-icon>
              <span>Order Now</span>
            </button>

            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              className="w-9 h-9 flex md:hidden flex-col justify-center items-center gap-1 cursor-pointer z-[1002] bg-transparent border-none active:scale-95"
              aria-label="Toggle menu"
              onClick={toggleNavbar}
              aria-expanded={navbarActive}
            >
              <span className={`w-6 h-0.5 rounded transition-all duration-300 bg-neutral-800 ${navbarActive ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 rounded transition-all duration-300 bg-neutral-800 ${navbarActive ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 rounded transition-all duration-300 bg-neutral-800 ${navbarActive ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel (Pulldown) - Premium Styling */}
        <nav className={`absolute top-full left-0 w-full h-auto premium-mobile-nav z-[999] shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${navbarActive ? 'translate-y-0' : '-translate-y-[150%]'
          }`}>
          {/* We don't need the top bar with close button, menu items are in MobileNav.tsx now */}
          {/* This panel is for the *pulldown* menu from the hamburger */}
          <ul className="list-none p-0">
            <li className="border-b border-neutral-200/50">
              <Link
                href="/"
                className={`block px-5 py-4 text-base font-bold transition-all duration-300 ${
                  pathname === '/' 
                    ? 'text-primary bg-primary/10' 
                    : 'text-neutral-800 hover:bg-primary/5 hover:text-primary'
                }`}
                onClick={closeNavbar}
              >
                Home
              </Link>
            </li>
            <li className="border-b border-neutral-200/50">
              <button
                className={`w-full flex justify-between items-center px-5 py-4 text-base font-bold transition-all duration-300 text-left ${
                  pathname?.startsWith('/menu') && !pathname?.startsWith('/menu/item')
                    ? 'text-primary bg-primary/10' 
                    : 'text-neutral-800 hover:bg-primary/5 hover:text-primary'
                }`}
                onClick={() => setMenuDropdown(!menuDropdown)}
              >
                <span className="flex items-center gap-2">
                  <Flame 
                    size={18} 
                    className={pathname?.startsWith('/menu') && !pathname?.startsWith('/menu/item') ? 'text-primary drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]' : 'text-neutral-600'} 
                  />
                  View Our Menu
                </span>
                <ion-icon name={menuDropdown ? "chevron-up-outline" : "chevron-down-outline"} className="text-xl"></ion-icon>
              </button>
              {menuDropdown && (
                <ul className="list-none bg-neutral-50/80 backdrop-blur-sm">
                  <li><Link href="/menu/signature-partition-platters" className="block px-8 py-3 text-sm font-medium text-neutral-700 hover:bg-primary/10 hover:text-primary transition-all duration-300" onClick={closeNavbar}>Signature Platters</Link></li>
                  <li><Link href="/menu/biryani" className="block px-8 py-3 text-sm font-medium text-neutral-700 hover:bg-primary/10 hover:text-primary transition-all duration-300" onClick={closeNavbar}>Biryani</Link></li>
                  <li><Link href="/menu/snacks-sides" className="block px-8 py-3 text-sm font-medium text-neutral-700 hover:bg-primary/10 hover:text-primary transition-all duration-300" onClick={closeNavbar}>Snacks & Sides</Link></li>
                  <li><Link href="/menu/street-classics" className="block px-8 py-3 text-sm font-medium text-neutral-700 hover:bg-primary/10 hover:text-primary transition-all duration-300" onClick={closeNavbar}>Street Classics</Link></li>
                  {/* Add more links as needed */}
                  <li><Link href="/menu" className="block px-8 py-3 text-sm font-bold text-primary hover:bg-primary/15 transition-all duration-300" onClick={closeNavbar}>View All Items</Link></li>
                </ul>
              )}
            </li>
            <li className="border-b border-neutral-200/50">
              <Link
                href="/late-night-specials"
                className={`flex items-center gap-2 px-5 py-4 text-base font-bold transition-all duration-300 ${
                  pathname === '/late-night-specials' 
                    ? 'text-primary bg-primary/10' 
                    : 'text-neutral-800 hover:bg-primary/5 hover:text-primary'
                }`}
                onClick={closeNavbar}
              >
                <Moon 
                  size={18} 
                  className={pathname === '/late-night-specials' ? 'text-primary drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]' : 'text-neutral-600'} 
                />
                Late Night Specials
              </Link>
            </li>
            <li className="border-b border-neutral-200/50">
              <Link
                href="/location-and-hours"
                className={`block px-5 py-4 text-base font-bold transition-all duration-300 ${
                  pathname === '/location-and-hours' 
                    ? 'text-primary bg-primary/10' 
                    : 'text-neutral-800 hover:bg-primary/5 hover:text-primary'
                }`}
                onClick={closeNavbar}
              >
                Location and Hours
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Back to Top Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`fixed bottom-32 md:bottom-8 right-4 sm:right-6 md:right-8 group z-[999] transition-all duration-300 ${backTopActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        aria-label="back to top"
        data-back-top-btn
        disabled={!backTopActive}
      >
        <div className="flex flex-col items-center gap-2 relative">
          {/* Tooltip/Message - Always shows when button is active */}
          {backTopActive && (
            <div className="relative bg-primary text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap mb-2 animate-bounceUp">
              Go to the top
              {/* Arrow pointing down to button */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-primary"></div>
            </div>
          )}
          
          {/* Button with continuous up animation */}
          <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 hover:bg-secondary-dark animate-bounceUpContinuous">
            <ion-icon name="chevron-up" aria-hidden="true" className="text-2xl"></ion-icon>
          </div>
        </div>
      </button>

      {/* Order Redirect Modal */}
      <OrderRedirectModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onConfirm={handleOrderConfirm}
      />
    </>
  );
}

export default memo(Header);