# Menu.tsx Refactoring Plan

## Current Problem

The `Menu.tsx` component has **hardcoded menu data** that duplicates what's already in `menuDetails.ts`. This causes:

1. **Data Duplication**: Same items exist in two places
2. **Maintenance Issues**: Updates must be made in two places
3. **Sync Problems**: Data can get out of sync
4. **More Code**: ~350 lines of hardcoded data

## Solution

Refactor `Menu.tsx` to:
1. Use `getMenuItemsByCategory()` to get items dynamically from `menuDetails.ts`
2. Use `categoryMetadata` for category display info (icons, names)
3. Eliminate all hardcoded item data

## Benefits

✅ **Single Source of Truth**: All data comes from `menuDetails.ts`
✅ **Easier Maintenance**: Update once, works everywhere
✅ **Less Code**: Remove ~350 lines of hardcoded data
✅ **Always in Sync**: Impossible for data to be out of sync
✅ **Type Safe**: Uses TypeScript interfaces

## Implementation

### Step 1: Create Category Metadata File
✅ Created `data/menuCategories.ts` with category display info

### Step 2: Refactor Menu.tsx
- Import `getMenuItemsByCategory` and `categoryMetadata`
- Generate categories dynamically
- Use actual data from `menuDetails.ts`

### Step 3: Update Component Logic
- `currentCategory.items` will come from `getMenuItemsByCategory(activeCategory)`
- Category metadata from `categoryMetadata` array
- No hardcoded items needed

## Example Refactored Code

```typescript
// OLD (Hardcoded):
const menuCategories = [
  {
    id: 'curries-veg',
    items: [
      { name: 'Paneer Tikka Masala', price: '$12.99', ... },
      // ... hardcoded items
    ]
  }
];

// NEW (Dynamic):
import { getMenuItemsByCategory } from '@/data/menuDetails';
import { categoryMetadata } from '@/data/menuCategories';

// Generate categories dynamically
const menuCategories = categoryMetadata.map(cat => ({
  ...cat,
  items: getMenuItemsByCategory(cat.id) // ← Real data from menuDetails.ts
}));
```

## Migration Notes

- All existing functionality remains the same
- URLs and routing unchanged
- Display logic unchanged
- Only data source changes

