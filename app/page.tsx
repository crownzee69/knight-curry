import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import MenuCategoriesHero from '@/components/MenuCategoriesHero';
import About from '@/components/About';
import HomepageBackground from '@/components/HomepageBackground';
import SplashAnimation from '@/components/SplashAnimation';

export default function Home() {
  return (
    <Layout>
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