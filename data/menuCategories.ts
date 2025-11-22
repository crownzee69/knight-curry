// Category metadata configuration
// This defines display information for categories, while actual items come from menuDetails.ts

export interface CategoryMetadata {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  displayOrder: number; // For controlling the order categories appear
}

export const categoryMetadata: CategoryMetadata[] = [
  {
    id: 'signature-partition-platters',
    name: 'Platters',
    shortName: 'Platters',
    icon: '/assets/category/1.png',
    displayOrder: 1,
  },
  {
    id: 'student-favorites',
    name: 'Student Favorites',
    shortName: 'Student Favorites',
    icon: '/assets/category/1.png',
    displayOrder: 2,
  },
  {
    id: 'biryani',
    name: 'Biryani',
    shortName: 'Biryani',
    icon: '/assets/category/2.png',
    displayOrder: 3,
  },
  {
    id: 'snacks-sides',
    name: 'Snacks & Sides',
    shortName: 'Snacks & Sides',
    icon: '/assets/category/3.png',
    displayOrder: 4,
  },
  {
    id: 'street-classics',
    name: 'Street Classics',
    shortName: 'Street Food',
    icon: '/assets/category/4.png',
    displayOrder: 5,
  },
  {
    id: 'curries-veg',
    name: 'Curries (Vegetarian)',
    shortName: 'Vegetarian Curries',
    icon: '/assets/category/5.png',
    displayOrder: 6,
  },
  {
    id: 'curries-non-veg',
    name: 'Curries (Non-Vegetarian)',
    shortName: 'Non-Vegetarian Curries',
    icon: '/assets/category/6.png',
    displayOrder: 7,
  },
  {
    id: 'desserts-drinks',
    name: 'Desserts & Drinks',
    shortName: 'Desserts & Drinks',
    icon: '/assets/category/7.png',
    displayOrder: 8,
  },
  {
    id: 'bread',
    name: 'Bread',
    shortName: 'Bread',
    icon: '/assets/category/9.png',
    displayOrder: 10,
  },
];

// Helper function to get category metadata by ID
export function getCategoryMetadata(categoryId: string): CategoryMetadata | undefined {
  return categoryMetadata.find(cat => cat.id === categoryId);
}

// Helper function to get all categories sorted by display order
export function getCategoriesSorted(): CategoryMetadata[] {
  return [...categoryMetadata].sort((a, b) => a.displayOrder - b.displayOrder);
}

