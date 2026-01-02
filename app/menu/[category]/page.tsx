import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import HomepageBackground from '@/components/HomepageBackground';

const Menu = dynamic(() => import('@/components/Menu'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});

export default async function MenuCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  
  return (
    <Layout>
      {/* Menu Page Background - Repeating Wallpaper */}
      <HomepageBackground />
      
      <article className="relative z-10">
        <Menu initialCategory={category} />
      </article>
    </Layout>
  );
}
