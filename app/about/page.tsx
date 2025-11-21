import Layout from '@/components/Layout';
import About from '@/components/About';
import HomepageBackground from '@/components/HomepageBackground';

export default function AboutPage() {
  return (
    <Layout>
      {/* About Page Background - Repeating Wallpaper */}
      <HomepageBackground />
      
      <article className="relative z-10">
        <About />
      </article>
    </Layout>
  );
}

