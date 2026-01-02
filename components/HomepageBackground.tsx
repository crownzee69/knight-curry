'use client';

import { useEffect, useState } from 'react';

export default function HomepageBackground() {
  const [height, setHeight] = useState('100vh');

  useEffect(() => {
    const updateHeight = () => {
      // Get the full document height
      const contentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.scrollHeight,
        document.body.offsetHeight
      );
      setHeight(`${contentHeight}px`);
    };

    // Initial height calculation with delay to ensure DOM is ready
    const timer = setTimeout(updateHeight, 100);
    updateHeight();

    // Update on scroll and resize
    window.addEventListener('scroll', updateHeight, { passive: true });
    window.addEventListener('resize', updateHeight);

    // Use MutationObserver to watch for content changes
    const observer = new MutationObserver(updateHeight);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', updateHeight);
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Homepage Background Container - Repeating Wallpaper */}
      <div 
        className="fixed top-0 left-0 right-0 -z-10"
        style={{
          backgroundImage: "url('/assets/background/1.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '600px auto',
          backgroundPosition: 'center top',
          backgroundAttachment: 'scroll',
          height: height,
          minHeight: '100vh',
          width: '100%',
        }}
      ></div>
      
      {/* Light Faded White Overlay for Readability */}
      <div 
        className="fixed top-0 left-0 right-0 -z-[9] pointer-events-none"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          height: height,
          minHeight: '100vh',
        }}
      ></div>
    </>
  );
}

