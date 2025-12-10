'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { href: '/menu', label: 'Menu', icon: 'restaurant-outline', activeIcon: 'restaurant' },
  { href: '/late-night-specials', label: 'Late Night', icon: 'moon-outline', activeIcon: 'moon' },
  { href: '/location-and-hours', label: 'Hours', icon: 'time-outline', activeIcon: 'time' },
] as const;

const NavItem = memo(({ 
  item, 
  isActive 
}: { 
  item: typeof navItems[number]; 
  isActive: boolean;
}) => {
  return (
    <Link
      href={item.href}
      className="flex flex-col items-center justify-center flex-1 min-w-0"
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Icon Circle */}
      <div
        className={`flex items-center justify-center mb-1 transition-all duration-300 rounded-full w-12 h-12 ${
          isActive ? 'bg-red-600 shadow-lg shadow-red-300/40' : 'bg-gray-100'
        }`}
      >
        <ion-icon
          name={isActive ? item.activeIcon : item.icon}
          style={{
            color: isActive ? '#FFFFFF' : '#6B7280',
            fontSize: '22px',
          }}
        />
      </div>
      {/* Label */}
      <span
        className={`text-[11px] font-medium transition-all duration-300 text-white`}
      >
        {item.label}
      </span>
    </Link>
  );
});

NavItem.displayName = 'NavItem';

export default function MobileNav() {
  const pathname = usePathname();
  
  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <nav 
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 md:hidden rounded-3xl shadow-xl border border-green-300/50 w-[92%] px-3 py-2"
      aria-label="Mobile Navigation"
      style={{ 
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 4px)',
        backgroundColor: '#7F1D1D',
        background: '#7F1D1D'
      }}
    >
      <div className="flex items-center justify-between">
        {navItems.map((item) => (
          <NavItem 
            key={item.href} 
            item={item} 
            isActive={isActive(item.href)} 
          />
        ))}
      </div>
    </nav>
  );
}
