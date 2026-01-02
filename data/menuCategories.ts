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
    id: 'platters',
    name: 'Platters',
    shortName: 'Platters',
    icon: '/assets/categor/1.png',
    displayOrder: 1,
  },
  {
    id: 'appetizers',
    name: 'Appetizers',
    shortName: 'Appetizers',
    icon: '/assets/categor/2.png',
    displayOrder: 2,
  },
  {
    id: 'street-food',
    name: 'Street Food',
    shortName: 'Street Food',
    icon: '/assets/categor/3.png',
    displayOrder: 3,
  },
  {
    id: 'biryani-rice-specials',
    name: 'Biryani & Rice Specials',
    shortName: 'Biryani & Rice',
    icon: '/assets/categor/4.png',
    displayOrder: 4,
  },
  {
    id: 'curries-veg',
    name: 'Vegetarian Curries( 16 oz box)',
    shortName: 'Veg Curries',
    icon: '/assets/categor/5.png',
    displayOrder: 5,
  },
  {
    id: 'curries-non-veg',
    name: 'Non Vegetarian Curries(16 oz box)',
    shortName: 'Non-Veg Curries',
    icon: '/assets/categor/6.png',
    displayOrder: 6,
  },
  {
    id: 'sandwiches-burgers-pizzas',
    name: 'Sandwiches-Burgers-Pizzas',
    shortName: 'Sandwiches & Burgers',
    icon: '/assets/categor/7.png',
    displayOrder: 7,
  },
  {
    id: 'south-indian-breads',
    name: 'South indian/ Breads',
    shortName: 'South Indian / Breads',
    icon: '/assets/categor/8.png',
    displayOrder: 8,
  },
  {
    id: 'desserts-drinks',
    name: 'Desserts/Drinks',
    shortName: 'Desserts & Drinks',
    icon: '/assets/categor/9.png',
    displayOrder: 9,
  },
];

// Helper function to get category metadata by ID
export function getCategoryMetadata(categoryId: string): CategoryMetadata | undefined {
  return categoryMetadata.find((cat) => cat.id === categoryId);
}

// Helper function to get all categories sorted by display order
export function getCategoriesSorted(): CategoryMetadata[] {
  return [...categoryMetadata].sort((a, b) => a.displayOrder - b.displayOrder);
}
