# Complete Code Structure Documentation

## 📁 Project Overview

This is a Next.js 14+ restaurant menu application for "Knights Curry Express" built with TypeScript, React, and Tailwind CSS.

---

## 🗂️ Directory Structure

```
knight/
├── app/                          # Next.js App Router (Pages)
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── menu/
│   │   ├── page.tsx              # Menu redirect page
│   │   ├── [category]/
│   │   │   └── page.tsx          # Category-specific menu page
│   │   └── item/
│   │       └── [itemId]/
│   │           └── page.tsx     # Individual menu item detail page
│   ├── late-night-specials/
│   │   └── page.tsx              # Late night specials page
│   └── ...                       # Other pages
│
├── components/                   # React Components
│   ├── Menu.tsx                  # Main menu component
│   ├── Layout.tsx                # Page layout wrapper
│   ├── Header.tsx                # Navigation header
│   └── ...                       # Other components
│
├── data/
│   └── menuDetails.ts            # ⭐ MAIN DATA SOURCE
│
├── public/                        # Static Assets
│   └── assets/
│       ├── menu/                 # Menu item images
│       ├── category/             # Category icons
│       └── images/               # General images
│
└── styles/                       # CSS Files
    ├── globals.css
    └── menuItemDetail.css
```

---

## 📊 Data Structure

### 1. **Main Data Source: `data/menuDetails.ts`**

This is the **single source of truth** for all menu items.

#### Data Interface:
```typescript
interface MenuItemDetail {
  id: string;                    // Unique identifier (e.g., 'butter-chicken')
  name: string;                  // Display name (e.g., 'Butter Chicken')
  category: string;               // Category display name
  categoryId: string;            // Category ID for routing (e.g., 'curries-non-veg')
  price: string;                 // Price (e.g., '$13.99')
  description: string;           // Item description
  image: string;                 // Image path (e.g., '/assets/menu/Biryani/2-1.png')
  ingredients: string[];         // Array of ingredients
  allergens?: string[];          // Optional allergens
  spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Very Hot';
  preparationTime: string;       // e.g., '20-25 minutes'
  servingSize: string;           // e.g., '1 Person'
  calories?: string;             // Optional calories
  nutritionalInfo?: {            // Optional nutrition data
    protein?: string;
    carbs?: string;
    fat?: string;
    fiber?: string;
  };
  tags?: string[];              // Optional tags (e.g., ['Popular', 'Non-Vegetarian'])
  dietaryInfo?: string[];        // Optional dietary info
  chefNotes?: string;           // Optional chef notes
}
```

#### Helper Functions:
```typescript
// Get item by ID
export function getMenuItemById(id: string): MenuItemDetail | undefined

// Get all items in a category
export function getMenuItemsByCategory(categoryId: string): MenuItemDetail[]
```

---

## 🖼️ Image Storage System

### Image Path Structure:
```
public/assets/menu/
├── Biryani/
│   ├── 2-1.png
│   └── 2-2.png
├── curries_veg/
│   ├── 5-1.png (Paneer Tikka Masala)
│   ├── 5-2.png (Chole)
│   └── ...
├── currries_non_veg/
│   ├── 6-1.png (Chicken Tikka Masala)
│   ├── 6-2.png (Butter Chicken)
│   └── ...
├── Signature_Partition_Platters/
│   ├── 1-1.png
│   └── ...
├── Snacks_&_Sides/
│   ├── 3-1.png
│   └── ...
├── Street_Classics/
│   └── 4-1.png
├── drinks/
│   └── 8-1.png
└── sweets/
    └── 7-1.png
```

### How Images Are Referenced:

1. **In `menuDetails.ts`**: Images are stored as relative paths
   ```typescript
   {
     id: 'butter-chicken',
     name: 'Butter Chicken',
     image: '/assets/menu/Biryani/2-1.png',  // ← Path from public folder
     // ...
   }
   ```

2. **In Components**: Next.js `Image` component is used
   ```tsx
   <Image
     src={item.image}  // Uses the path from data
     alt={item.name}
     fill
     className="object-cover"
   />
   ```

3. **Image Naming Convention**:
   - Organized by category folders
   - Format: `{category-number}-{item-number}.png`
   - Example: `5-1.png` = Category 5, Item 1

---

## 🔄 Data Flow Architecture

### Flow Diagram:
```
┌─────────────────────────────────────────────────────────────┐
│                    data/menuDetails.ts                       │
│              (Single Source of Truth)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ menuItemDetails: MenuItemDetail[]                     │   │
│  │ - All menu items with complete data                  │   │
│  │ - Images, prices, ingredients, etc.                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                        │
                        │ Import
                        ▼
        ┌───────────────────────────────┐
        │   components/Menu.tsx         │
        │   (Menu Display Component)    │
        │                               │
        │   - Hardcoded menu structure  │
        │   - Uses getItemId() helper   │
        │   - Links to detail pages     │
        └───────────────────────────────┘
                        │
                        │ Link
                        ▼
        ┌───────────────────────────────┐
        │ app/menu/item/[itemId]/page.tsx│
        │   (Item Detail Page)           │
        │                               │
        │   - Uses getMenuItemById()    │
        │   - Displays full item info   │
        │   - Shows image, price, etc.  │
        └───────────────────────────────┘
```

---

## 📝 Component Breakdown

### 1. **Menu Component** (`components/Menu.tsx`)

**Purpose**: Displays menu items in a grid layout with category filtering.

**Key Features**:
- Hardcoded menu structure (`menuCategories` array)
- Each category has items with: `image`, `name`, `price`, `description`
- Uses `getItemId()` helper to link to detail pages
- Client-side component (`'use client'`)

**Data Structure**:
```typescript
const menuCategories = [
  {
    id: 'curries-veg',
    name: 'Curries (Vegetarian)',
    items: [
      {
        image: '/assets/menu/curries_veg/5-1.png',
        name: 'Paneer Tikka Masala',
        price: '$12.99',
        description: '...',
      },
      // ...
    ]
  },
  // ...
]
```

**How it works**:
1. User selects a category
2. Component displays items from that category
3. Each item links to `/menu/item/{itemId}`
4. `getItemId()` finds the matching item in `menuItemDetails` by name and categoryId

---

### 2. **Menu Item Detail Page** (`app/menu/item/[itemId]/page.tsx`)

**Purpose**: Shows complete details for a single menu item.

**Key Features**:
- Server-side rendered (async function)
- Uses `getMenuItemById(itemId)` to fetch data
- Displays all item information:
  - Image (large, responsive)
  - Name, price, description
  - Ingredients list
  - Nutritional information
  - Allergens
  - Dietary info
  - Spice level
  - Chef notes

**How it works**:
1. Receives `itemId` from URL parameter
2. Calls `getMenuItemById(itemId)` to get full item data
3. Renders all information from the data object
4. Uses Next.js `Image` component for optimized images

---

### 3. **Late Night Specials Page** (`app/late-night-specials/page.tsx`)

**Purpose**: Special page showcasing late-night menu items.

**Key Features**:
- Maps late-night items to menu items
- Uses `getItemPrice()` helper to find prices
- Displays prices with same styling as menu
- Links to detail pages

**Data Mapping**:
```typescript
const lateNightItemsMap = {
  "Butter Chicken Curry": { 
    name: "Butter Chicken", 
    categoryId: "student-favorites" 
  },
  // ...
}
```

**Helper Functions**:
- `getItemId()`: Finds item ID from name and category
- `getItemPrice()`: Finds price, handles fallbacks

---

## 🔗 Routing Structure

### URL Patterns:

```
/                           → Homepage
/menu                       → Redirects to /menu/signature-partition-platters
/menu/[category]            → Category menu page (e.g., /menu/curries-veg)
/menu/item/[itemId]         → Item detail page (e.g., /menu/item/butter-chicken)
/late-night-specials        → Late night specials page
```

### Dynamic Routes:

1. **`[category]`**: Category ID (e.g., `curries-veg`, `biryani`)
2. **`[itemId]`**: Item ID from `menuItemDetails` (e.g., `butter-chicken`)

---

## 🎨 Styling System

### CSS Files:
- `styles/globals.css`: Global styles, Tailwind imports
- `styles/menuItemDetail.css`: Specific styles for detail pages

### Tailwind CSS:
- Primary color: Red (`#DC143C` / `primary`)
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Custom font: `font-display` for headings

---

## 🔧 Key Helper Functions

### 1. `getItemId(itemName, categoryId)`
**Location**: `components/Menu.tsx`, `app/late-night-specials/page.tsx`

**Purpose**: Finds the item ID from name and category.

**Logic**:
```typescript
function getItemId(itemName: string, categoryId: string): string {
  const matchingItem = menuItemDetails.find(
    (item) => item.name === itemName && item.categoryId === categoryId
  );
  
  if (matchingItem) {
    return matchingItem.id;  // Returns ID for routing
  }
  
  // Fallback: generate ID from name
  return itemName.toLowerCase().replace(/\s+/g, '-');
}
```

### 2. `getItemPrice(itemName, categoryId)`
**Location**: `app/late-night-specials/page.tsx`

**Purpose**: Finds price for an item, with fallback logic.

**Logic**:
1. Search in specified category
2. If price is "Part of Build-Your-Own Platter", search other categories
3. If still not found, search by name only
4. Use fallback price map if available
5. Return empty string if nothing found

### 3. `getMenuItemById(id)`
**Location**: `data/menuDetails.ts`

**Purpose**: Retrieves a menu item by its ID.

```typescript
export function getMenuItemById(id: string): MenuItemDetail | undefined {
  return menuItemDetails.find(item => item.id === id);
}
```

### 4. `getMenuItemsByCategory(categoryId)`
**Location**: `data/menuDetails.ts`

**Purpose**: Gets all items in a specific category.

```typescript
export function getMenuItemsByCategory(categoryId: string): MenuItemDetail[] {
  return menuItemDetails.filter(item => item.categoryId === categoryId);
}
```

---

## 📦 Data Categories

### Category IDs:
- `student-favorites`
- `signature-partition-platters`
- `snacks-sides`
- `street-classics`
- `biryani`
- `curries-veg`
- `curries-non-veg`
- `desserts`
- `drinks`

### Price Structure:
- **Veg Curries**: `$12.99`
- **Non-Veg Curries**: `$13.99`
- **Other items**: Varies (e.g., `$12.99`, `$14.99`, etc.)

---

## 🚀 How to Add a New Menu Item

### Step 1: Add Image
1. Place image in appropriate folder: `public/assets/menu/{category}/`
2. Follow naming convention: `{category-number}-{item-number}.png`

### Step 2: Add Data
Add to `data/menuDetails.ts`:
```typescript
{
  id: 'new-item-id',                    // Unique, URL-friendly
  name: 'New Item Name',
  category: 'Category Name',
  categoryId: 'category-id',            // Must match category ID
  price: '$12.99',
  description: 'Item description...',
  image: '/assets/menu/category/X-Y.png', // Path to image
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  allergens: ['Dairy'],                  // Optional
  spiceLevel: 'Medium',
  preparationTime: '20-25 minutes',
  servingSize: '1 Person',
  calories: '400-500 cal',               // Optional
  nutritionalInfo: {                    // Optional
    protein: '30-35g',
    carbs: '40-50g',
    fat: '15-20g',
  },
  tags: ['Popular'],                     // Optional
  dietaryInfo: ['Vegetarian'],           // Optional
  chefNotes: 'Chef notes...',            // Optional
}
```

### Step 3: Add to Menu Component (if needed)
If you want it to appear in the menu grid, add to `components/Menu.tsx`:
```typescript
{
  image: '/assets/menu/category/X-Y.png',
  name: 'New Item Name',
  price: '$12.99',
  description: 'Item description...',
}
```

---

## 🔍 Data Lookup Flow

### Example: User clicks "Butter Chicken" in menu

1. **Menu Component** (`components/Menu.tsx`):
   ```typescript
   // Item in menuCategories array:
   {
     name: 'Butter Chicken',
     // ...
   }
   
   // getItemId() is called:
   getItemId('Butter Chicken', 'student-favorites')
   // → Searches menuItemDetails
   // → Finds: { id: 'butter-chicken', name: 'Butter Chicken', ... }
   // → Returns: 'butter-chicken'
   ```

2. **Link Created**:
   ```tsx
   <Link href={`/menu/item/butter-chicken`}>
   ```

3. **Detail Page** (`app/menu/item/[itemId]/page.tsx`):
   ```typescript
   const itemId = 'butter-chicken';  // From URL
   const item = getMenuItemById(itemId);
   // → Returns full MenuItemDetail object
   ```

4. **Data Displayed**:
   - Image: `item.image` → `/assets/menu/Biryani/2-1.png`
   - Price: `item.price` → `$13.99`
   - Ingredients: `item.ingredients` → Array of ingredients
   - All other fields from the data object

---

## 🎯 Key Design Patterns

### 1. **Single Source of Truth**
- All menu data in `menuDetails.ts`
- Components import and use this data
- No duplicate data storage

### 2. **ID-Based Routing**
- Items have unique IDs
- URLs use IDs: `/menu/item/{itemId}`
- Easy to maintain and SEO-friendly

### 3. **Helper Functions**
- Reusable functions for common operations
- Centralized logic (e.g., `getItemId`, `getItemPrice`)
- Easy to update and maintain

### 4. **Type Safety**
- TypeScript interfaces for data structure
- Prevents errors and provides autocomplete

### 5. **Image Optimization**
- Next.js `Image` component
- Automatic optimization and lazy loading
- Responsive images with `sizes` prop

---

## 📱 Responsive Design

### Breakpoints:
- Mobile: Default (no prefix)
- Tablet: `sm:` (640px+)
- Desktop: `md:` (768px+)
- Large: `lg:` (1024px+)
- XL: `xl:` (1280px+)

### Example:
```tsx
<h3 className="text-base sm:text-lg lg:text-xl">
  {/* Base: 16px, Tablet: 18px, Desktop: 20px */}
</h3>
```

---

## 🔐 Important Notes

1. **Image Paths**: Always start with `/` (from public folder root)
2. **Category IDs**: Must match exactly between `menuDetails.ts` and `Menu.tsx`
3. **Item IDs**: Must be URL-friendly (lowercase, hyphens)
4. **Price Format**: Always use `$XX.XX` format
5. **Data Consistency**: Keep `Menu.tsx` items in sync with `menuDetails.ts`

---

## 🛠️ Common Operations

### Find an Item:
```typescript
import { menuItemDetails, getMenuItemById } from '@/data/menuDetails';

// By ID
const item = getMenuItemById('butter-chicken');

// By name and category
const item = menuItemDetails.find(
  item => item.name === 'Butter Chicken' && 
          item.categoryId === 'student-favorites'
);
```

### Get All Items in Category:
```typescript
import { getMenuItemsByCategory } from '@/data/menuDetails';

const vegCurries = getMenuItemsByCategory('curries-veg');
```

### Display Image:
```tsx
import Image from 'next/image';

<Image
  src={item.image}
  alt={item.name}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

## 📚 Summary

**Data Flow**:
1. Data stored in `menuDetails.ts` (single source)
2. Components import and use this data
3. Helper functions provide easy access
4. Images stored in `public/assets/menu/`
5. Routing uses item IDs for clean URLs

**Key Files**:
- `data/menuDetails.ts` - All menu data
- `components/Menu.tsx` - Menu display
- `app/menu/item/[itemId]/page.tsx` - Item details
- `app/late-night-specials/page.tsx` - Special page

**Best Practices**:
- Always use helper functions
- Keep data in `menuDetails.ts`
- Use TypeScript interfaces
- Follow naming conventions
- Optimize images with Next.js Image

---

This structure ensures:
✅ Easy maintenance
✅ Type safety
✅ Consistent data
✅ SEO-friendly URLs
✅ Optimized performance
✅ Scalable architecture

