'use client';

import { memo } from 'react';

function VideoHero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      aria-label="hero video"
      style={{
        // Mobile: 16:9 landscape (works well on mobile too)
        aspectRatio: '16/9',
        width: '100%',
        height: 'auto',
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      >
        <source src="/assets/bg-video/1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
    </section>
  );
}

export default memo(VideoHero);

