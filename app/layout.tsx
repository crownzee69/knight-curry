import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Poppins, DM_Sans, Anton } from 'next/font/google'
import '../styles/globals.css'
import '../styles/menuItemDetail.css'
import React from 'react'; // Added React import

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '900'], // Added 900 for black headings
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
  adjustFontFallback: true,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Added 500 and 700 for more options
  display: 'swap',
  variable: '--font-dm-sans',
  preload: true, // Preload body font too
  adjustFontFallback: true,
})

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'], // Anton only has one weight (regular, which is extra-bold)
  display: 'swap',
  variable: '--font-anton',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "Knights Curry Express - Hot, Fresh & Spicy Indian Food",
  description: "Knights Curry Express - Authentic Indian flavors, delivered fast & fresh. Order your favorite curries, biryanis, and platters today!",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#DC2626', // Red theme color
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSans.variable} ${anton.variable}`}>
      <head>
        {/* Preload your main food image from the new Hero */}
        <link rel="preload" as="image" href="/assets/menu/Signature_Partition_Platters/1-1.png" fetchPriority="high" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
      </head>
      {/* Body tag is where globals.css applies bg-neutral-50 and pb-16 */}
      <body>
        {children}
        <Script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          strategy="lazyOnload"
          defer
        />
        <Script
          noModule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
          strategy="lazyOnload"
          defer
        />
        {/* Service Worker Registration - Register early for better caching */}
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                // Register immediately, don't wait for load event
                navigator.serviceWorker.register('/sw.js', { scope: '/' })
                  .then((registration) => {
                    console.log('Service Worker registered:', registration.scope);
                    
                    // Ensure service worker is active
                    if (registration.installing) {
                      console.log('Service Worker installing...');
                    } else if (registration.waiting) {
                      console.log('Service Worker waiting...');
                    } else if (registration.active) {
                      console.log('Service Worker active');
                    }
                    
                    // Check for updates periodically
                    setInterval(() => {
                      registration.update();
                    }, 60 * 60 * 1000); // Check every hour
                    
                    // Handle updates
                    registration.addEventListener('updatefound', () => {
                      const newWorker = registration.installing;
                      if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('New service worker available. Reload to update.');
                          }
                        });
                      }
                    });
                  })
                  .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                  });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}