import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import MenuCategoriesHero from '@/components/MenuCategoriesHero';
import About from '@/components/About';
import HomepageBackground from '@/components/HomepageBackground';
import SplashAnimation from '@/components/SplashAnimation';

// Keywords: Indian food near UCF, halal food Orlando, halal restaurants near UCF,
// restaurants near UCF, best food near UCF, food delivery near UCF
export const metadata: Metadata = {
  title: {
    absolute: 'Knights Curry Express — Halal Indian Food Near UCF, Orlando FL',
  },
  description:
    'Halal Indian food near UCF in Orlando. Curries, biryani & platters from $5.49. Open late Fri & Sat. Takeout, dine-in & delivery on major apps.',
  alternates: {
    canonical: 'https://www.knightscurryexpress.com',
  },
  openGraph: {
    title: 'Knights Curry Express — Halal Indian Food Near UCF, Orlando FL',
    description:
      'Halal curries, biryani & platters near UCF. Open late. Takeout & delivery available.',
    url: 'https://www.knightscurryexpress.com',
    siteName: 'Knights Curry Express',
    type: 'website',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': 'https://www.knightscurryexpress.com/#restaurant',
    name: 'Knights Curry Express',
    image: 'https://www.knightscurryexpress.com/assets/images/hero-icon.png',
    url: 'https://www.knightscurryexpress.com',
    telephone: '+14072032499',
    priceRange: '$$',
    servesCuisine: ['Indian'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11565 University Blvd #4',
      addressLocality: 'Orlando',
      addressRegion: 'FL',
      postalCode: '32817',
      addressCountry: 'US'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Sunday'],
        opens: '12:00',
        closes: '22:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
        opens: '11:00',
        closes: '01:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '11:00',
        closes: '02:30'
      }
    ],
    sameAs: [
      'https://www.instagram.com/knightscurryexpress'
    ]
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SplashAnimation />
      {/* Homepage Background - Repeating Wallpaper */}
      <HomepageBackground />

      <article className="relative min-h-screen z-10">
        <Hero />

        <MenuCategoriesHero />
        <About />
      </article>
    </Layout>
  );
}