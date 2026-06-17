'use client';

import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav'; // This is the bottom bar for mobile
import FloatingSocialIcons from './FloatingSocialIcons';

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    // If navigating between menu categories, don't trigger scroll
    const isMenuTabChange = pathname?.startsWith('/menu/') && prevPath?.startsWith('/menu/');
    
    if (!isMenuTabChange) {
      // Scroll to top on route change
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant', // Instant scroll, no animation
      });
      setPrevPath(pathname);
    }
    
    setPrevPath(pathname);
  }, [pathname, prevPath]);

  return (
    // Added 'pt-16' (approx header height) to main content to prevent overlap with fixed header
    // The 'pb-16' (mobile nav height) is now on the <body> tag in globals.css
    <div id="top" className="min-h-screen flex flex-col opacity-100">
      <Header />
      <FloatingSocialIcons />
      <main className={`flex-1 w-full pt-12 md:pt-16 relative ${isHomePage ? 'min-h-screen' : ''}`}>
        {/* The pt-16/pt-20 pushes content down from under the fixed header */}
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default memo(Layout);