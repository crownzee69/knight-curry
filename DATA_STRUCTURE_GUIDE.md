# Complete Data Structure Guide

## 🎯 Single Source of Truth: `menuDetails.ts`

All menu items and late night specials are now managed in **ONE file**: `data/menuDetails.ts`

---

## 📝 How to Add/Edit/Delete Products

### ✅ Add a New Product

1. Open `data/menuDetails.ts`
2. Add a new object to the `menuItemDetails` array:

```typescript
{
  id: 'unique-item-id',                    // URL-friendly (lowercase, hyphens)
  name: 'Product Name',
  category: 'Category Display Name',
  categoryId: 'category-id',               // Must match existing category
  price: '$12.99',
  description: 'Product description...',
  image: '/assets/menu/category/X-Y.png',  // Path to image
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
  isLateNightSpecial: true,                // Set to true for late night specials
  lateNightDisplayName: 'Custom Name',     // Optional custom name for late night page
}
```

3. **That's it!** The product will automatically appear:
   - In the menu (if category exists)
   - On the late night page (if `isLateNightSpecial: true`)
   - On the detail page (`/menu/item/{id}`)

---

### ✏️ Edit a Product

1. Open `data/menuDetails.ts`
2. Find the item by `id` or `name`
3. Update any field (price, description, etc.)
4. **That's it!** Changes appear everywhere automatically

---

### ❌ Delete a Product

1. Open `data/menuDetails.ts`
2. Find the item object
3. Delete the entire object `{ ... }`
4. **That's it!** Product removed from all pages

---

## 🌙 Late Night Specials

### Mark Item as Late Night Special

Add these fields to any item:

```typescript
{
  // ... other fields
  isLateNightSpecial: true,              // Required
  lateNightDisplayName: 'Custom Name',   // Optional - custom name for late night page
}
```

### Example:

```typescript
{
  id: 'butter-chicken',
  name: 'Butter Chicken',
  // ... other fields
  isLateNightSpecial: true,
  lateNightDisplayName: 'Butter Chicken Curry',  // Shows as "Butter Chicken Curry" on late night page
}
```

---

## 📂 Category IDs

Use these `categoryId` values:

- `signature-partition-platters` - Platters
- `student-favorites` - Student Favorites
- `biryani` - Biryani
- `snacks-sides` - Snacks & Sides
- `street-classics` - Street Classics
- `curries-veg` - Vegetarian Curries
- `curries-non-veg` - Non-Vegetarian Curries
- `desserts` - Desserts
- `drinks` - Drinks
- `bread` - Bread

---

## 🖼️ Image Paths

Images are stored in: `public/assets/menu/{category}/`

### Image Naming:
- Format: `{category-number}-{item-number}.png`
- Example: `5-1.png` = Category 5, Item 1

### Image Path in Data:
```typescript
image: '/assets/menu/curries_veg/5-1.png'
```

---

## 🔧 Helper Functions

All available in `data/menuDetails.ts`:

```typescript
// Get item by ID
getMenuItemById('butter-chicken')

// Get all items in a category
getMenuItemsByCategory('curries-veg')

// Get all late night specials
getLateNightSpecials()

// Get all unique categories
getAllCategories()
```

---

## ✅ Benefits

1. **Single Source of Truth**: Edit once, works everywhere
2. **No Duplication**: No hardcoded data in components
3. **Easy Management**: Add/edit/delete in one place
4. **Type Safe**: TypeScript ensures correct structure
5. **Automatic Updates**: Changes reflect everywhere automatically

---

## 📋 Complete Item Template

```typescript
{
  id: 'item-id',
  name: 'Item Name',
  category: 'Category Name',
  categoryId: 'category-id',
  price: '$12.99',
  description: 'Description...',
  image: '/assets/menu/category/X-Y.png',
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  allergens: ['Dairy'],
  spiceLevel: 'Medium',
  preparationTime: '20-25 minutes',
  servingSize: '1 Person',
  calories: '400-500 cal',
  nutritionalInfo: {
    protein: '30-35g',
    carbs: '40-50g',
    fat: '15-20g',
    fiber: '3-5g',
  },
  tags: ['Popular'],
  dietaryInfo: ['Vegetarian'],
  chefNotes: 'Chef notes...',
  isLateNightSpecial: false,              // Set to true for late night
  lateNightDisplayName: undefined,        // Optional custom name
}
```

---

## 🚀 Quick Start Examples

### Add a New Curry:
```typescript
{
  id: 'new-curry',
  name: 'New Curry',
  category: 'Curries (Vegetarian)',
  categoryId: 'curries-veg',
  price: '$12.99',
  description: 'Delicious new curry...',
  image: '/assets/menu/curries_veg/5-8.png',
  ingredients: ['Paneer', 'Tomatoes'],
  spiceLevel: 'Medium',
  preparationTime: '20-25 minutes',
  servingSize: '1 Person',
}
```

### Make Existing Item a Late Night Special:
```typescript
// Find the item and add:
isLateNightSpecial: true,
lateNightDisplayName: 'Custom Late Night Name',  // Optional
```

### Update Price:
```typescript
// Find the item and change:
price: '$14.99',  // Old: '$12.99'
```

---

**That's it!** Everything is managed in `menuDetails.ts` - no need to edit components or other files! 🎉

