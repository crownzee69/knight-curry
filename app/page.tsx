import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import MenuCategoriesHero from '@/components/MenuCategoriesHero';
import About from '@/components/About';
import HomepageBackground from '@/components/HomepageBackground';
import SplashAnimation from '@/components/SplashAnimation';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Knights Curry Express',
    image: 'https://www.knightscurryexpress.com/assets/images/hero-icon.png',
    '@id': 'https://www.knightscurryexpress.com',
    url: 'https://www.knightscurryexpress.com',
    telephone: '+14072032499',
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
    menu: 'https://www.knightscurryexpress.com/menu',
    servesCuisine: 'Indian'
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