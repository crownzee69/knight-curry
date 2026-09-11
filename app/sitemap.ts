import { MetadataRoute } from 'next';
import { menuItemDetails } from '@/data/menuDetails';
import { getCategoriesSorted } from '@/data/menuCategories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.knightscurryexpress.com';

  const staticRoutes = [
    '',
    '/about',
    '/location-and-hours',
    '/privacy-policy',
    '/menu',
    '/late-night-specials',
    '/late-night-wall-of-fame',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const categories = getCategoriesSorted();
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/menu/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const itemRoutes = menuItemDetails.map((item) => ({
    url: `${baseUrl}/menu/item/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...itemRoutes];
}
