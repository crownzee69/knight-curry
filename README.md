# Knights Curry Express - Restaurant Website

A fully responsive restaurant website for Knights Curry Express, built with Next.js, React, and TypeScript. Features a dynamic menu system where all items and categories are managed through data files.

## Features

- 🎨 Modern and responsive design
- ⚡ Built with Next.js 14 and React 18
- 📱 Fully responsive for all devices (mobile-first approach)
- 🍽️ Dynamic menu system - add/edit items by updating data files
- 🎭 Interactive hero slider with special offers
- 🖼️ Optimized images with Next.js Image component
- 🎯 TypeScript for type safety
- 🎨 Custom CSS with Tailwind CSS
- 📋 Late Night Specials page
- 🗺️ Location and Hours page
- 🎯 Single source of truth for menu data

## Prerequisites

Before you begin, ensure you have met the following requirements:

* Node.js 18.0 or higher installed
* npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd knight-curry
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Development

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

```
knight-curry/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── menu/               # Menu pages
│   │   ├── [category]/     # Category pages
│   │   └── item/[itemId]/  # Item detail pages
│   ├── late-night-specials/ # Late night specials page
│   └── location-and-hours/  # Location and hours page
├── components/             # React components
│   ├── About.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Menu.tsx            # Dynamic menu component
│   ├── MenuCategoriesHero.tsx
│   ├── MobileNav.tsx
│   ├── PremiumMarquee.tsx
│   └── SpecialDish.tsx
├── data/                   # Data files (Single source of truth)
│   ├── menuDetails.ts      # All menu items
│   └── menuCategories.ts   # Category metadata
├── public/                 # Static assets
│   └── assets/
│       ├── menu/           # Menu item images
│       ├── category/       # Category icons
│       └── images/         # Other images
├── styles/                 # CSS files
│   └── globals.css         # Global styles
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Technologies Used

- **Next.js 14** - React framework (App Router)
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Next.js Image** - Optimized image loading

## Features Included

- 🏠 **Homepage** with hero slider and special offers
- 🍽️ **Dynamic Menu System** - Fully data-driven menu
- 📱 **Mobile Navigation** - Bottom navigation bar for mobile
- 🌙 **Late Night Specials** - Dedicated page for special offers
- 📍 **Location & Hours** - Contact information and operating hours
- 🎨 **Responsive Design** - Works perfectly on all devices
- ⚡ **Performance Optimized** - Fast loading with Next.js optimizations

## Menu Management

The menu system is **fully data-driven**. To add, edit, or remove menu items:

1. **Add/Edit Items**: Edit `data/menuDetails.ts`
2. **Add/Edit Categories**: Edit `data/menuCategories.ts`

That's it! Changes automatically appear everywhere:
- Menu category pages
- Item detail pages
- Late night specials (if marked)
- Category selectors

See `HOW_TO_ADD_ITEMS.md` for detailed instructions.

## Available Routes

- `/` - Homepage
- `/menu` - Redirects to default menu category
- `/menu/[category]` - Menu category page (e.g., `/menu/platters`)
- `/menu/item/[itemId]` - Individual menu item detail page
- `/late-night-specials` - Late night specials page
- `/location-and-hours` - Location and hours page

## Development Notes

- All menu data is centralized in `data/menuDetails.ts`
- Category metadata is in `data/menuCategories.ts`
- Components automatically fetch and display data from these files
- No need to edit components when adding menu items

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

For questions or support, please contact the restaurant directly.
