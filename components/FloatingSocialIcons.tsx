'use client';

import { memo } from 'react';

function FloatingSocialIcons() {
  return (
    <div className="fixed right-3 sm:right-4 md:right-6 bottom-60 sm:bottom-64 md:bottom-36 z-[998] flex flex-col gap-3 sm:gap-4">
      {/* Instagram Icon */}
      <a
        href="https://instagram.com/knightscurryexpress"
        target="_blank"
        rel="noopener noreferrer"
        className="premium-social-icon rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Follow us on Instagram"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 100%)',
          boxShadow: '0 4px 16px rgba(220, 38, 38, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          border: '1px solid rgba(220, 38, 38, 0.15)',
          width: 'clamp(48px, 12vw, 56px)',
          height: 'clamp(48px, 12vw, 56px)',
        }}
      >
        <ion-icon
          name="logo-instagram"
          className="transition-all duration-300"
          style={{
            fontSize: 'clamp(24px, 6vw, 28px)',
            color: '#E4405F',
            filter: 'drop-shadow(0 0 8px rgba(228, 64, 95, 0.5))',
          }}
        ></ion-icon>
      </a>

      {/* WhatsApp Icon */}
      <a
        href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="premium-social-icon rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Join our WhatsApp group"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 100%)',
          boxShadow: '0 4px 16px rgba(220, 38, 38, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          border: '1px solid rgba(220, 38, 38, 0.15)',
          width: 'clamp(48px, 12vw, 56px)',
          height: 'clamp(48px, 12vw, 56px)',
        }}
      >
        <ion-icon
          name="logo-whatsapp"
          className="transition-all duration-300"
          style={{
            fontSize: 'clamp(24px, 6vw, 28px)',
            color: '#25D366',
            filter: 'drop-shadow(0 0 8px rgba(37, 211, 102, 0.5))',
          }}
        ></ion-icon>
      </a>
    </div>
  );
}

export default memo(FloatingSocialIcons);