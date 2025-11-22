# How to Add/Remove Menu Items and Categories

## 🎯 Single Source of Truth

**All menu data comes from these two files:**
- `data/menuDetails.ts` - All menu items
- `data/menuCategories.ts` - Category metadata (names, icons, display order)

**Everything else is automatically generated!** No need to edit components or other files.

---

## ➕ Adding a New Menu Item

### Step 1: Add the item to `data/menuDetails.ts`

Add a new object to the `menuItemDetails` array:

```typescript
{
  id: 'unique-item-id',                    // URL-friendly (lowercase, hyphens)
  name: 'Item Name',
  category: 'Category Display Name',       // e.g., 'Curries (Vegetarian)'
  categoryId: 'curries-veg',               // Must match a categoryId from menuCategories.ts
  price: '$12.99',
  description: 'Item description...',
  image: '/assets/menu/curries_veg/5-8.png', // Path to your image
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  allergens: ['Dairy'],                    // Optional
  spiceLevel: 'Medium',                    // 'Mild' | 'Medium' | 'Hot' | 'Very Hot'
  preparationTime: '20-25 minutes',
  servingSize: '1 Person',
  calories: '400-500 cal',                 // Optional
  nutritionalInfo: {                       // Optional
    protein: '30-35g',
    carbs: '40-50g',
    fat: '15-20g',
    fiber: '3-5g',
  },
  tags: ['Popular'],                       // Optional
  dietaryInfo: ['Vegetarian'],              // Optional
  chefNotes: 'Chef notes...',              // Optional
  perfectFor: 'Perfect for description...', // Optional
  isLateNightSpecial: true,                // Optional - set to true for late night specials
  lateNightDisplayName: 'Custom Name',     // Optional - custom name for late night page
}
```

### Step 2: Add the image

Place your image in the appropriate folder:
- `public/assets/menu/{category_folder}/{number}.png`
- Follow naming convention: `{category-number}-{item-number}.png`

### Step 3: That's it!

The item will automatically appear:
- ✅ In the menu category page
- ✅ In the category selector
- ✅ On the item detail page (`/menu/item/{id}`)
- ✅ On the late night specials page (if `isLateNightSpecial: true`)

---

## ➕ Adding a New Category

### Step 1: Add category metadata to `data/menuCategories.ts`

Add a new object to the `categoryMetadata` array:

```typescript
{
  id: 'new-category-id',                  // URL-friendly (lowercase, hyphens)
  name: 'Category Name',                   // Full display name
  shortName: 'Short Name',                 // Short name for buttons/cards
  icon: '/assets/category/X.png',         // Path to category icon
  displayOrder: 11,                       // Order in which categories appear
}
```

### Step 2: Add items to the category

Add menu items to `data/menuDetails.ts` with `categoryId: 'new-category-id'`

### Step 3: That's it!

The category will automatically appear:
- ✅ In the category selector
- ✅ In the menu navigation
- ✅ As a route (`/menu/new-category-id`)

---

## ✏️ Editing an Item

1. Open `data/menuDetails.ts`
2. Find the item by `id` or `name`
3. Update any field (price, description, image, etc.)
4. **That's it!** Changes appear everywhere automatically

---

## ❌ Removing an Item

1. Open `data/menuDetails.ts`
2. Find the item object
3. Delete the entire object `{ ... }`
4. **That's it!** Item is removed from all pages

---

## ❌ Removing a Category

1. Open `data/menuCategories.ts`
2. Remove the category from `categoryMetadata` array
3. (Optional) Remove all items with that `categoryId` from `data/menuDetails.ts`
4. **That's it!** Category disappears from everywhere

---

## 📋 Available Category IDs

Use these `categoryId` values when adding items:

- `signature-partition-platters` - Platters
- `student-favorites` - Student Favorites
- `biryani` - Biryani
- `snacks-sides` - Snacks & Sides
- `street-classics` - Street Classics
- `curries-veg` - Curries (Vegetarian)
- `curries-non-veg` - Curries (Non-Vegetarian)
- `desserts-drinks` - Desserts & Drinks
- `bread` - Bread

---

## 🔄 How It Works

1. **Menu Component** (`components/Menu.tsx`):
   - Automatically fetches categories from `menuCategories.ts`
   - Automatically fetches items from `menuDetails.ts` using `getMenuItemsByCategory()`
   - No hardcoded data!

2. **Category Hero** (`components/MenuCategoriesHero.tsx`):
   - Automatically displays all categories from `menuCategories.ts`
   - No hardcoded categories!

3. **Item Detail Pages** (`app/menu/item/[itemId]/page.tsx`):
   - Automatically finds items by ID from `menuDetails.ts`
   - No hardcoded items!

4. **Late Night Specials** (`app/late-night-specials/page.tsx`):
   - Automatically shows items where `isLateNightSpecial: true`
   - No hardcoded specials!

---

## ✅ Benefits

- **Single Source of Truth**: Edit once, works everywhere
- **No Duplication**: Data exists in only one place
- **Always in Sync**: Impossible for data to be out of sync
- **Easy Maintenance**: Add/edit/delete in one file
- **Type Safe**: TypeScript ensures correct structure
- **Automatic Updates**: Changes reflect everywhere automatically

---

## 🚨 Important Notes

1. **Item IDs**: Must be unique and URL-friendly (lowercase, hyphens)
2. **Category IDs**: Must match exactly between `menuDetails.ts` and `menuCategories.ts`
3. **Image Paths**: Always start with `/` (from public folder root)
4. **Price Format**: Always use `$XX.XX` format
5. **Category Order**: Controlled by `displayOrder` in `menuCategories.ts`

---

## 📝 Example: Adding a New Curry

```typescript
// In data/menuDetails.ts
{
  id: 'paneer-butter-masala',
  name: 'Paneer Butter Masala',
  category: 'Curries (Vegetarian)',
  categoryId: 'curries-veg',
  price: '$12.99',
  description: 'Creamy, buttery paneer in rich tomato gravy.',
  image: '/assets/menu/curries_veg/5-8.png',
  ingredients: ['Paneer', 'Tomato', 'Cream', 'Butter', 'Spices'],
  allergens: ['Dairy'],
  spiceLevel: 'Medium',
  preparationTime: '20-25 minutes',
  servingSize: '1 Person',
  calories: '450-550 cal',
  tags: ['Popular', 'Vegetarian'],
  dietaryInfo: ['Vegetarian', 'Contains Dairy'],
  chefNotes: 'Rich and creamy paneer curry.',
  perfectFor: 'When you want something rich and satisfying.',
}
```

That's it! The item will automatically appear in the menu! 🎉

