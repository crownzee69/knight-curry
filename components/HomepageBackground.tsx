'use client';

import { useEffect, useRef } from 'react';

export default function HomepageBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const setHeight = () => {
      const h = document.documentElement.scrollHeight + 'px';
      if (bgRef.current) bgRef.current.style.height = h;
      if (overlayRef.current) overlayRef.current.style.height = h;
    };

    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(setHeight);
    };

    setHeight();

    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={bgRef}
        className="fixed top-0 left-0 right-0 -z-10"
        style={{
          backgroundImage: "url('/assets/background/1.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '600px auto',
          backgroundPosition: 'center top',
          backgroundAttachment: 'scroll',
          minHeight: '100vh',
          width: '100%',
        }}
      />
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 right-0 -z-[9] pointer-events-none"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          minHeight: '100vh',
        }}
      />
    </>
  );
}
