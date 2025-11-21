'use client';

import { memo } from 'react';
import { Drumstick, Pizza, ForkKnife, Utensils, Flame } from 'lucide-react';

function RestaurantLoader() {
  // Icons arranged in circular orbit with colors
  const icons = [
    { Icon: Drumstick, color: '#DC2626', angle: 0 },      // Red
    { Icon: Pizza, color: '#F97316', angle: 72 },         // Orange
    { Icon: ForkKnife, color: '#F59E0B', angle: 144 },    // Gold
    { Icon: Utensils, color: '#DC2626', angle: 216 },     // Red
    { Icon: Flame, color: '#F97316', angle: 288 },        // Orange
  ];

  const radius = 35; // Small circular orbit radius

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent pointer-events-none">
      <div 
        className="relative w-20 h-20"
        style={{
          animation: 'restaurantOrbit 4s linear infinite',
        }}
      >
        {/* Icons in circular orbit */}
        {icons.map(({ Icon, color, angle }, index) => {
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div
                style={{
                  animation: `restaurantFloat 2.5s ease-in-out infinite`,
                  animationDelay: `${index * 0.15}s`,
                  display: 'inline-block',
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={2}
                  style={{
                    color: color,
                    filter: `drop-shadow(0 0 6px ${color}CC) drop-shadow(0 0 10px ${color}80)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes restaurantOrbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes restaurantFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-3px) rotate(4deg);
          }
          50% {
            transform: translateY(-2px) rotate(0deg);
          }
          75% {
            transform: translateY(-3px) rotate(-4deg);
          }
        }
      `}</style>
    </div>
  );
}

export default memo(RestaurantLoader);

