import type { Metadata } from 'next';
import Menu from '@/components/Menu';
import Layout from '@/components/Layout';
import HomepageBackground from '@/components/HomepageBackground';
import { getCategoryMetadata } from '@/data/menuCategories';

// All slugs verified from data/menuCategories.ts
const categoryMeta: Record<string, { title: string; description: string }> = {
// Keywords: Indian food platters near UCF, cheap eats near UCF,
// comfort food near UCF, food under $15 near UCF, group dinner near UCF
  platters: {
    title: 'Indian Food Platters Near UCF — From $11.99',
    description:
      'Cheap eats near UCF — halal Indian platters from $11.99. Big shareable comfort food perfect for group dinners near UCF. Knights Curry Express on University Blvd, Orlando.',
  },
// Keywords: spicy food near UCF, Indian appetizers Orlando
  appetizers: {
    title: 'Spicy Indian Appetizers Near UCF',
    description:
      'Craving spicy food near UCF? Try chicken 65, chilli paneer and masala fries at Knights Curry Express in Orlando. Halal, bold flavours, affordable.',
  },
  'street-food': {
    title: 'Indian Street Food Near UCF',
    description:
      'Bold Indian street food near UCF in Orlando. Explore chaat, rolls and snacks at Knights Curry Express.',
  },
// Keywords: chicken biryani Orlando, veg biryani Orlando, late-night biryani Orlando
  'biryani-rice-specials': {
    title: 'Chicken & Veg Biryani in Orlando Near UCF',
    description:
      'Order chicken biryani or veg biryani near UCF in Orlando. Fresh, halal, made to order — available late night at Knights Curry Express on University Blvd.',
  },
// Keywords: vegetarian food near UCF, vegan food near UCF
  'curries-veg': {
    title: 'Vegetarian & Vegan Food Near UCF',
    description:
      'Vegetarian and vegan food near UCF — dal, chole, paneer curries and more at Knights Curry Express in Orlando. Halal, affordable, 16 oz portions.',
  },
  'curries-non-veg': {
    title: 'Non-Veg Curries Near UCF',
    description:
      'Halal non-vegetarian curries in a 16 oz box near UCF in Orlando. Order at Knights Curry Express.',
  },
  'sandwiches-burgers-pizzas': {
    title: 'Indian-Style Sandwiches, Burgers & Pizzas Near UCF',
    description:
      'Fusion sandwiches, burgers and pizzas with Indian flavors near UCF. Order at Knights Curry Express in Orlando.',
  },
  'south-indian-breads': {
    title: 'South Indian Food & Breads Near UCF',
    description:
      'Dosas, idlis, naan and South Indian breads near UCF in Orlando at Knights Curry Express.',
  },
  'desserts-drinks': {
    title: 'Indian Desserts & Drinks in Orlando',
    description:
      'Finish your meal with Indian desserts and drinks at Knights Curry Express near UCF in Orlando.',
  },
};

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category];
  const canonicalUrl = `https://www.knightscurryexpress.com/menu/${category}`;

  // Graceful fallback — formats slug as a readable title for unknown categories
  const fallbackTitle = category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: meta?.title ?? fallbackTitle,
    description:
      meta?.description ??
      `Explore ${fallbackTitle} at Knights Curry Express near UCF in Orlando.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: meta?.title ?? `${fallbackTitle} | Knights Curry Express`,
      description:
        meta?.description ??
        `Explore ${fallbackTitle} at Knights Curry Express near UCF in Orlando.`,
      url: canonicalUrl,
      siteName: 'Knights Curry Express',
      type: 'website',
    },
  };
}

export default async function MenuCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Build page-specific breadcrumb data
  const catMeta = getCategoryMetadata(category);
  const categoryName = catMeta?.name ?? category;

  return (
    <Layout>
      {/* Menu Page Background - Repeating Wallpaper */}
      <HomepageBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.knightscurryexpress.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Menu',
                item: 'https://www.knightscurryexpress.com/menu/platters',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: categoryName,
                item: `https://www.knightscurryexpress.com/menu/${category}`,
              },
            ],
          }),
        }}
      />

      <article className="relative z-10">
        <Menu initialCategory={category} />
      </article>
    </Layout>
  );
}
