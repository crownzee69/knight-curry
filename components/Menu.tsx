'use client';

import { useState, useEffect, memo, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItemDetails } from '@/data/menuDetails';

// Helper function to get item ID from name and category
function getItemId(itemName: string, categoryId: string): string {
  // Find the matching item in menuItemDetails by name and categoryId
  const matchingItem = menuItemDetails.find(
    (item) => item.name === itemName && item.categoryId === categoryId
  );
  
  if (matchingItem) {
    return matchingItem.id;
  }
  
  // Fallback: generate ID from name if not found (shouldn't happen)
  return itemName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const menuCategories = [
  {
    id: 'student-favorites',
    name: 'Student Favorites',
    shortName: 'Student Favorites',
    icon: '/assets/category/1.png', // Using existing icon, can be updated later
    items: [
      {
        image: '/assets/menu/Biryani/2-1.png', // Using existing images as placeholders
        name: 'Butter Chicken',
        price: '$13.99',
        description: 'The ultimate comfort food! Creamy, dreamy tomato curry that hugs your soul. Perfect for when you need a warm hug in a bowl! 🍛',
      },
      {
        image: '/assets/menu/currries_non_veg/6-1.png',
        name: 'Tandoori Chicken',
        price: '$14.99',
        description: 'Smoky, spicy, and absolutely addictive! Marinated for hours and grilled to perfection. One bite and you\'ll be hooked! 🔥',
      },
      {
        image: '/assets/menu/Biryani/2-1.png',
        name: 'Chicken Biryani',
        price: '$12.99',
        description: 'A flavor explosion in every bite! Aromatic basmati rice meets tender chicken in a dance of spices. Your taste buds will thank you! 🌶️',
      },
      {
        image: '/assets/menu/Biryani/2-1.png',
        name: 'Chicken Fried Rice',
        price: '$11.99',
        description: 'Quick, satisfying, and packed with flavor! Perfect for when you\'re running between classes but still want something amazing! ⚡',
      },
      {
        image: '/assets/menu/Snacks_&_Sides/3-5.png',
        name: 'Dosa',
        price: '$9.99',
        description: 'Crispy on the outside, soft on the inside! This golden beauty is a breakfast champion that works any time of day! ✨',
      },
      {
        image: '/assets/menu/Snacks_&_Sides/3-1.png',
        name: 'Mango Lassi',
        price: '$4.99',
        description: 'Sweet, creamy, and refreshing! Like a tropical vacation in a glass. Perfect to cool down after spicy food! 🥭',
      },
      {
        image: '/assets/menu/Signature_Partition_Bowls/1-1.png',
        name: 'Gulab Jamun',
        price: '$3.99',
        description: 'Sweet, syrupy, and absolutely heavenly! These golden dumplings are pure dessert magic. One is never enough! 🍡',
      },
    ]
  },
  {
    id: 'signature-partition-bowls',
    name: 'Platters',
    shortName: 'Platters',
    icon: '/assets/category/1.png',
    items: [
      {
        image: '/assets/menu/Signature_Partition_Bowls/1-1.png',
        name: 'Build-Your-Own Partition Platter (2 Veg Curries)',
        price: '$11.99',
        description: 'Your canvas, your masterpiece! Mix and match two veg curries with fluffy rice, buttery naan, and one sweet. Pure customization magic! 🎨',
      },
      {
        image: '/assets/menu/Signature_Partition_Bowls/1-2.png',
        name: 'Build-Your-Own Partition Platter (1 Veg + 1 Chicken)',
        price: '$12.99',
        description: 'The perfect balance! One veg curry, one chicken curry, plus rice, naan, and dessert. Best of both worlds in one epic platter! ⚖️',
      },
      {
        image: '/assets/menu/Signature_Partition_Bowls/1-3.png',
        name: 'Build-Your-Own Partition Platter (2 Chicken Curries)',
        price: '$13.99',
        description: 'Double the chicken, double the fun! Two amazing chicken curries with all the fixings. For the true chicken lovers out there! 🐔',
      },
      {
        image: '/assets/menu/Signature_Partition_Bowls/1-4.png',
        name: 'Build-Your-Own Partition Platter (Any with 1 Lamb)',
        price: '$14.99',
        description: 'Lamb lovers rejoice! One premium lamb curry plus your choice of another curry. Rich, tender, and absolutely irresistible! 🐑',
      },
      {
        image: '/assets/menu/Signature_Partition_Bowls/1-5.png',
        name: 'Build-Your-Own Partition Platter (2 Lamb Curries)',
        price: '$16.99',
        description: 'The ultimate lamb experience! Two luxurious lamb curries that melt in your mouth. Worth every penny for the premium taste! 👑',
      },
    ]
  },
  {
    id: 'biryani',
    name: 'Biryani',
    shortName: 'Biryani',
    icon: '/assets/category/2.png',
    items: [
      {
        image: '/assets/menu/Biryani/2-1.png',
        name: 'Chicken Biryani',
        price: '$12.99',
        description: 'The king of biryanis! Layers of fragrant rice, tender chicken, and secret spices. One whiff and you\'ll be transported to food heaven! 👑',
      },
      {
        image: '/assets/menu/Biryani/2-2.png',
        name: 'Veg Biryani',
        price: '$11.49',
        description: 'Veggie power packed with flavor! Colorful vegetables meet aromatic rice in this vegetarian masterpiece. So good, even meat lovers order it! 🌱',
      },
    ]
  },
  {
    id: 'snacks-sides',
    name: 'Snacks & Sides',
    shortName: 'Snacks & Sides',
    icon: '/assets/category/3.png',
    items: [
      {
        image: '/assets/menu/Snacks_&_Sides/3-1.png',
        name: 'Samosa (2 pcs)',
        price: '$4.99',
        description: 'Golden triangles of pure joy! Crispy outside, spicy potato magic inside. The perfect snack that disappears way too fast! 🔺',
      },
      {
        image: '/assets/menu/Snacks_&_Sides/3-2.png',
        name: 'Mix Veg Pakoda',
        price: '$6.99',
        description: 'A veggie party in crispy batter! Every bite is a surprise mix of flavors and textures. So addictive, you\'ll order seconds! 🎉',
      },
      {
        image: '/assets/menu/Snacks_&_Sides/3-3.png',
        name: 'Chicken Tikka Bites',
        price: '$7.99',
        description: 'Little bites of heaven! Tender, juicy chicken with that perfect smoky char. Pop one, pop them all - we won\'t judge! 🍢',
      },
      {
        image: '/assets/menu/Snacks_&_Sides/3-4.png',
        name: 'Idly (2 pcs)',
        price: '$5.99',
        description: 'Soft, fluffy, and oh-so-comforting! These steamed beauties are like clouds you can eat. Perfect for a light, satisfying snack! ☁️',
      },
      {
        image: '/assets/menu/Snacks_&_Sides/3-5.png',
        name: 'Dosas',
        price: '$9.99',
        description: 'The crispy champion! Golden, crunchy, and absolutely massive. One dosa = one happy stomach. Breakfast, lunch, or dinner - it works! 🌟',
      },
      {
        image: '/assets/menu/Snacks_&_Sides/3-6.png',
        name: 'Gobi Manchurian',
        price: '$9.49',
        description: 'Cauliflower never tasted this good! Crispy florets meet tangy, spicy sauce. Sweet, sour, and totally irresistible! 🥦',
      },
      {
        image: '/assets/menu/Snacks_&_Sides/3-7.png',
        name: 'Knights Fries',
        price: '$5.49',
        description: 'Not your average fries! Seasoned with our secret spice blend that makes them absolutely legendary. Perfect sidekick to any meal! 🍟',
      },
    ]
  },
  {
    id: 'street-classics',
    name: 'Street Classics',
    shortName: 'Street Food',
    icon: '/assets/category/4.png',
    items: [
      {
        image: '/assets/menu/Street_Classics/4-1.png',
        name: 'Samosa Chaat',
        price: '$8.99',
        description: 'Street food royalty! Crushed samosas meet cool yogurt, tangy chutneys, and a sprinkle of magic. Every spoonful is a flavor adventure! 🎪',
      },
    ]
  },
  {
    id: 'curries-veg',
    name: 'Curries (Vegetarian)',
    shortName: 'Vegetarian Curries',
    icon: '/assets/category/5.png',
    items: [
      {
        image: '/assets/menu/curries_veg/5-1.png',
        name: 'Paneer Tikka Masala',
        price: '$12.99',
        description: 'Grilled paneer cubes swimming in creamy, dreamy tomato gravy. So rich and satisfying, you\'ll forget it\'s vegetarian! 🧀',
      },
      {
        image: '/assets/menu/curries_veg/5-2.png',
        name: 'Chole',
        price: '$12.99',
        description: 'Spiced chickpeas that pack a flavor punch! Hearty, satisfying, and absolutely delicious. The ultimate comfort curry! 🥘',
      },
      {
        image: '/assets/menu/curries_veg/5-3.png',
        name: 'Dal Tadka',
        price: '$12.99',
        description: 'Simple lentils, extraordinary taste! Tempered with aromatic spices that make this humble dish absolutely irresistible! 🌿',
      },
      {
        image: '/assets/menu/curries_veg/5-4.png',
        name: 'Palak Paneer',
        price: '$12.99',
        description: 'Popeye would approve! Creamy spinach meets soft paneer in this green goodness. Healthy never tasted this amazing! 💪',
      },
      {
        image: '/assets/menu/curries_veg/5-5.png',
        name: 'Paneer Makhani',
        price: '$12.99',
        description: 'Buttery, creamy, and absolutely luxurious! Paneer in a rich tomato-cream sauce that\'s pure indulgence. Worth every calorie! 🧈',
      },
      {
        image: '/assets/menu/curries_veg/5-6.png',
        name: 'Aloo Gobi',
        price: '$12.99',
        description: 'The classic combo! Potatoes and cauliflower in perfect harmony. Simple ingredients, incredible flavor. A timeless favorite! 🥔',
      },
      {
        image: '/assets/menu/curries_veg/5-7.png',
        name: 'Mix Veg Curry (Navratan Korma)',
        price: '$12.99',
        description: 'Nine veggies, one amazing curry! Rich, creamy cashew gravy makes every vegetable taste like a celebration! 🎊',
      },
    ]
  },
  {
    id: 'curries-non-veg',
    name: 'Curries (Non-Vegetarian)',
    shortName: 'Non-Vegetarian Curries',
    icon: '/assets/category/6.png',
    items: [
      {
        image: '/assets/menu/currries_non_veg/6-1.png',
        name: 'Chicken Tikka Masala',
        price: '$13.99',
        description: 'The crowd favorite! Tender grilled chicken in creamy, spiced tomato gravy. So good, it might just become your new addiction! 🍗',
      },
      {
        image: '/assets/menu/currries_non_veg/6-2.png',
        name: 'Butter Chicken',
        price: '$13.99',
        description: 'Smooth, buttery, and absolutely dreamy! Mild enough for everyone, delicious enough to make you want more. Pure comfort in a curry! 🧈',
      },
      {
        image: '/assets/menu/currries_non_veg/6-3.png',
        name: 'Chicken Curry',
        price: '$13.99',
        description: 'Classic done right! Traditional spices meet tender chicken in this aromatic masterpiece. Simple, authentic, and absolutely perfect! 🍛',
      },
      {
        image: '/assets/menu/currries_non_veg/6-4.png',
        name: 'Lamb Tikka Masala',
        price: '$13.99',
        description: 'Premium lamb in rich, spicy masala! Tender, flavorful, and absolutely luxurious. For when you want to treat yourself! 🐑',
      },
      {
        image: '/assets/menu/currries_non_veg/6-5.png',
        name: 'Mango Chicken',
        price: '$13.99',
        description: 'Sweet meets savory in the most delicious way! Fresh mango adds a tropical twist to tender chicken. Unexpectedly amazing! 🥭',
      },
    ]
  },
  {
    id: 'desserts-drinks',
    name: 'Desserts & Drinks',
    shortName: 'Desserts & Drinks',
    icon: '/assets/category/7.png',
    items: [
      // Desserts
      {
        image: '/assets/menu/sweets/7-1.png',
        name: 'Gulab Jamun (2 pcs)',
        price: '$3.99',
        description: 'Golden balls of pure happiness! Soaked in sweet rose syrup, these melt-in-your-mouth dumplings are dessert perfection! 🍡',
      },
      {
        image: '/assets/menu/sweets/7-2.png',
        name: 'Kulfi',
        price: '$2.99',
        description: 'Ice cream, but make it Indian! Rich, creamy, and denser than regular ice cream. One lick and you\'ll be hooked! 🍦',
      },
      {
        image: '/assets/menu/sweets/7-3.png',
        name: 'Rasmalai',
        price: '$4.99',
        description: 'Soft, pillowy paneer dumplings floating in sweet, flavored milk. Light, refreshing, and absolutely divine! ☁️',
      },
      // Drinks
      {
        image: '/assets/menu/drinks/8-1.png',
        name: 'Mango Lassi',
        price: '$4.59',
        description: 'Tropical vibes in a glass! Creamy yogurt meets sweet mango in this refreshing drink. Perfect to cool down after spicy food! 🥭',
      },
      {
        image: '/assets/menu/drinks/8-2.png',
        name: 'Salt Lassi',
        price: '$3.49',
        description: 'The savory superstar! Cool, tangy yogurt with a pinch of salt and spices. Refreshing and surprisingly addictive! 🧂',
      },
      {
        image: '/assets/menu/drinks/8-3.png',
        name: 'Masala Chai',
        price: '$3.49',
        description: 'Warm hugs in a cup! Spiced tea that awakens your senses and soothes your soul. The perfect pick-me-up any time! ☕',
      },
      {
        image: '/assets/menu/drinks/8-4.png',
        name: 'Indian Coffee',
        price: '$3.99',
        description: 'Bold, strong, and absolutely invigorating! Brewed the traditional way for that authentic kick. Coffee lovers, this one\'s for you! ☕',
      },
      {
        image: '/assets/menu/drinks/8-5.png',
        name: 'Karak Tea',
        price: '$3.49',
        description: 'Strong, concentrated, and full of character! This intense tea will wake you up and keep you going. Not for the faint-hearted! 💪',
      },
      {
        image: '/assets/menu/drinks/8-6.png',
        name: 'Iced Tea',
        price: '$2.49',
        description: 'Cool, refreshing, and perfectly chilled! The classic drink that never goes out of style. Simple, satisfying, and always good! 🧊',
      },
      {
        image: '/assets/menu/drinks/8-7.png',
        name: 'Sodas',
        price: '$1.99',
        description: 'Classic fizzy favorites! Assorted soft drinks to quench your thirst. Sometimes, the classics are all you need! 🥤',
      },
    ]
  },
  {
    id: 'bread',
    name: 'Bread',
    shortName: 'Bread',
    icon: '/assets/category/9.png',
    items: [
      {
        image: '/assets/menu/Bread/9-1.png',
        name: 'Butter Naan',
        price: '$1.99',
        description: 'Soft, fluffy, and buttery perfection! Fresh from the tandoor, this bread is the perfect companion to any curry. So good, you\'ll want extra! 🧈',
      },
      {
        image: '/assets/menu/Bread/9-2.png',
        name: 'Garlic Naan',
        price: '$2.99',
        description: 'Garlic lovers unite! Buttery naan meets aromatic garlic and herbs. One bite and you\'ll understand why it\'s legendary! 🧄',
      },
    ]
  },
];

function Menu({ initialCategory }: { initialCategory?: string }) {
  const pathname = usePathname();
  const defaultCategory = 'signature-partition-bowls';

  // Determine active category from URL or initialCategory
  const getCategoryFromPath = (path: string | null): string => {
    if (!path) return defaultCategory;
    if (path.startsWith('/menu/')) {
      const categoryFromUrl = path.split('/menu/')[1]?.split('/')[0];
      if (categoryFromUrl && menuCategories.some(cat => cat.id === categoryFromUrl)) {
        return categoryFromUrl;
      }
    }
    return defaultCategory;
  };

  const [activeCategory, setActiveCategory] = useState(() =>
    initialCategory || getCategoryFromPath(pathname) || defaultCategory
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync state with URL when pathname changes
  useEffect(() => {
    const categoryFromUrl = getCategoryFromPath(pathname);
    setActiveCategory(prevCategory => {
      // Only update if different to avoid unnecessary re-renders
      if (categoryFromUrl && categoryFromUrl !== prevCategory) {
        return categoryFromUrl;
      }
      // Handle initialCategory on /menu page
      if (initialCategory && pathname === '/menu' && initialCategory !== prevCategory) {
        return initialCategory;
      }
      return prevCategory;
    });
  }, [pathname, initialCategory]);

  const currentCategory = useMemo(() =>
    menuCategories.find(cat => cat.id === activeCategory) || menuCategories[0],
    [activeCategory]
  );

  // Refs for category container and active item to handle smooth scrolling
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const activeCategoryRef = useRef<HTMLAnchorElement>(null);

  // Check if content is scrollable and calculate scroll progress
  const checkScrollPosition = () => {
    if (categoryContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setIsScrollable(true);
        // Calculate scroll progress (0 to 1)
        const progress = scrollLeft / maxScroll;
        setScrollProgress(progress);
      } else {
        setIsScrollable(false);
        setScrollProgress(0);
      }
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = categoryContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      // Check on mount and after a delay to ensure DOM is ready
      setTimeout(checkScrollPosition, 100);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [activeCategory, menuCategories]);

  // Smooth scroll to active category without jumping to start
  useEffect(() => {
    if (activeCategoryRef.current && categoryContainerRef.current) {
      const container = categoryContainerRef.current;
      const activeItem = activeCategoryRef.current;
      const containerRect = container.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      // Only scroll if item is not fully visible
      const isFullyVisible =
        itemRect.left >= containerRect.left &&
        itemRect.right <= containerRect.right;

      if (!isFullyVisible) {
        // Calculate scroll position to center the item
        const scrollLeft = activeItem.offsetLeft - (container.offsetWidth / 2) + (activeItem.offsetWidth / 2);

        // Smooth scroll without jumping
        container.scrollTo({
          left: Math.max(0, Math.min(scrollLeft, container.scrollWidth - container.offsetWidth)),
          behavior: 'smooth'
        });
      }
    }
  }, [activeCategory]);

  return (
    <section className="py-8 sm:py-12 lg:py-16" aria-label="menu" id="menu">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 relative">
          <div className="relative inline-block px-4 sm:px-6">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight"
              style={{
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(220, 38, 38, 0.4), 0 0 40px rgba(220, 38, 38, 0.2)',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
              }}
            >
              Delicious Food
            </h2>
            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2">
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <div className="relative">
                <ion-icon name="restaurant" className="text-primary text-xl sm:text-2xl drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 8px rgba(220, 38, 38, 0.5))' }}></ion-icon>
              </div>
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
          {/* Premium Category Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div
              className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:sticky lg:top-24"
              style={{
                overflow: 'visible',
                background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.92) 50%, rgba(240, 224, 200, 0.90) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: `
                  0 12px 40px rgba(0, 0, 0, 0.18),
                  0 4px 16px rgba(0, 0, 0, 0.12),
                  0 2px 8px rgba(220, 38, 38, 0.15),
                  inset 0 1px 0 rgba(255, 255, 255, 0.8),
                  inset 0 -2px 8px rgba(0, 0, 0, 0.08)
                `,
                border: '2px solid rgba(220, 38, 38, 0.2)',
                transform: 'translateZ(0)',
              }}
            >
              <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900 mb-4 sm:mb-6 hidden lg:block" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
                Categories
              </h3>
              <div 
                className="flex lg:flex-col gap-2 sm:gap-3 pb-3 lg:pb-0 scrollbar-hide" 
                style={{
                  overflowX: 'auto',
                  overflowY: 'visible',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                  paddingTop: '8px',
                  paddingBottom: '12px',
                }} 
                ref={categoryContainerRef}
              >
                {menuCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/menu/${category.id}`}
                    className={`premium-category-button flex flex-col lg:flex-row lg:items-center lg:justify-start items-center justify-center min-w-[85px] sm:min-w-[100px] w-[85px] sm:w-[100px] lg:w-full p-3.5 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 active:scale-95 lg:gap-3 relative ${activeCategory === category.id
                        ? 'premium-category-active'
                        : 'premium-category-inactive'
                      }`}
                    style={{
                      margin: activeCategory === category.id ? '3px' : '2px',
                      boxSizing: 'border-box',
                      overflow: 'visible',
                      background: activeCategory === category.id
                        ? 'linear-gradient(135deg, rgba(255, 248, 240, 0.98) 0%, rgba(250, 240, 230, 0.95) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.92) 100%)',
                      border: activeCategory === category.id
                        ? '2px solid rgba(220, 38, 38, 0.4)'
                        : '2px solid rgba(220, 38, 38, 0.15)',
                      boxShadow: activeCategory === category.id
                        ? '0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(220, 38, 38, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05)'
                        : '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.03)',
                      transform: 'translateZ(0)',
                    }}
                    ref={activeCategory === category.id ? activeCategoryRef : null}
                    onClick={(e) => {
                      e.preventDefault();
                      if (category.id !== activeCategory) {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setActiveCategory(category.id);
                          setTimeout(() => {
                            setIsTransitioning(false);
                          }, 150);
                        }, 150);
                      }
                      window.history.pushState({}, '', `/menu/${category.id}`);
                    }}
                    scroll={false}
                    prefetch={false}
                  >
                    {/* Premium Icon Badge */}
                    <div className="w-full flex items-center justify-center lg:justify-start mb-1.5 sm:mb-2 lg:mb-0">
                      <div
                        className={`premium-category-icon relative w-14 h-14 sm:w-16 sm:h-16 lg:w-16 lg:h-16 rounded-full overflow-hidden transition-all duration-300 ${activeCategory === category.id
                            ? 'premium-icon-active'
                            : 'premium-icon-inactive'
                          }`}
                      >
                        <div className="absolute inset-0 rounded-full" style={{
                          background: activeCategory === category.id
                            ? 'radial-gradient(circle at 30% 30%, rgba(255, 140, 0, 0.3), rgba(220, 38, 38, 0.2))'
                            : 'radial-gradient(circle at 30% 30%, rgba(255, 248, 240, 0.6), rgba(245, 230, 211, 0.4))',
                          boxShadow: activeCategory === category.id
                            ? 'inset 0 2px 8px rgba(255, 140, 0, 0.3), 0 4px 12px rgba(220, 38, 38, 0.3)'
                            : 'inset 0 1px 4px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.1)',
                        }}></div>
                        <Image
                          src={category.icon}
                          width={64}
                          height={64}
                          alt={category.name}
                          className="relative z-10 w-full h-full object-cover"
                          loading="lazy"
                          sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 64px"
                          quality={85}
                        />
                        {activeCategory === category.id && (
                          <div className="absolute inset-0 rounded-full z-20" style={{
                            background: 'radial-gradient(circle, rgba(255, 140, 0, 0.2) 0%, transparent 70%)',
                            animation: 'premiumPulse 2s ease-in-out infinite',
                          }}></div>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs sm:text-sm lg:text-base font-bold text-center lg:text-left transition-all duration-300 leading-tight lg:flex-1 ${activeCategory === category.id
                        ? 'text-primary'
                        : 'text-neutral-800'
                      }`} style={{
                        textShadow: activeCategory === category.id ? '0 1px 3px rgba(220, 38, 38, 0.3)' : 'none',
                      }}>
                      {category.shortName}
                    </span>
                    {activeCategory === category.id && (
                      <ion-icon name="checkmark-circle" className="hidden lg:block text-primary text-lg" style={{
                        filter: 'drop-shadow(0 0 6px rgba(220, 38, 38, 0.5))',
                      }}></ion-icon>
                    )}
                  </Link>
                ))}
              </div>
              
              {/* Dynamic Scroll Indicator - Red dot that moves with scroll */}
              {isScrollable && (
                <div className="flex justify-center mt-3 lg:hidden relative px-4">
                  {/* Track line */}
                  <div className="w-full max-w-[120px] h-1 bg-neutral-300 rounded-full relative overflow-hidden">
                    {/* Progress fill */}
                    <div 
                      className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-150"
                      style={{ width: `${scrollProgress * 100}%` }}
                    ></div>
                  </div>
                  {/* Moving red dot */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg transition-all duration-150"
                    style={{ 
                      left: `calc(50% - 60px + ${scrollProgress * 120}px)`,
                      transform: 'translateY(-50%)',
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Content Area */}
          <div className="flex-1 min-h-[400px]">
            {/* Category Title with Decorative Elements */}
            <div className={`mb-6 sm:mb-8 lg:mb-10 transition-all duration-200 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}>
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/30"></div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900 text-center">
                  {currentCategory.name}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 via-primary/30 to-transparent"></div>
              </div>
              <p className="text-center text-sm sm:text-base text-neutral-600">
                {currentCategory.items.length} {currentCategory.items.length === 1 ? 'item' : 'items'} available
              </p>
              
              {/* Notice for Curries */}
              {(activeCategory === 'curries-veg' || activeCategory === 'curries-non-veg') && (
                <div className="mt-4 sm:mt-6 flex justify-center">
                  <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-300 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md inline-block">
                    <div className="flex items-center gap-3">
                      <ion-icon name="information-circle" className="text-green-600 text-2xl sm:text-3xl flex-shrink-0"></ion-icon>
                      <p className="text-sm sm:text-base font-semibold text-green-800 whitespace-nowrap flex items-center gap-2">
                        All curries come with a side of rice. 🍚
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actual Content */}
            <ul className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}>
              {currentCategory.items.map((item, index) => (
                <li
                  key={`${activeCategory}-${item.name}-${index}`}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <Link
                    href={`/menu/item/${getItemId(item.name, activeCategory)}`}
                    className="premium-food-card group block rounded-xl sm:rounded-2xl overflow-hidden hover:scale-105 hover:-translate-y-2 active:scale-100 transition-all duration-300 relative"
                    prefetch={false}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(250, 240, 230, 0.92) 100%)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                      border: '2px solid rgba(220, 38, 38, 0.15)',
                    }}
                  >
                    <figure
                      className="w-full aspect-square relative overflow-hidden"
                      style={{
                        borderRadius: '0.75rem 0.75rem 0 0',
                        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Image
                        src={item.image}
                        fill
                        loading="lazy"
                        alt={item.name}
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        quality={85}
                        style={{
                          borderRadius: '0.75rem 0.75rem 0 0',
                        }}
                      />
                      {/* Shine effect on hover - removed white overlay */}
                      {/* Overlay gradient - removed white overlay */}
                      {/* Top-right badge */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 transform translate-x-2 group-hover:translate-x-0">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg" style={{
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                        }}>
                          <ion-icon name="arrow-forward" className="text-primary text-lg"></ion-icon>
                        </div>
                      </div>
                    </figure>

                    {/* Premium Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

                    <div
                      className="p-4 sm:p-5 relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.98) 0%, rgba(250, 240, 230, 0.95) 100%)',
                      }}
                    >
                      {/* Top accent line on hover */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 mb-2 sm:mb-3 transition-all duration-300 group-hover:text-primary line-clamp-2 leading-tight" style={{
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                      }}>
                        {item.name}
                      </h3>

                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span
                          className="text-sm sm:text-base lg:text-lg font-medium text-green-600"
                        >
                          {item.price}
                        </span>
                        <span className="text-xs sm:text-sm text-neutral-500 group-hover:text-primary transition-colors font-medium">
                          View Details →
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-700 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Premium Glow Effect */}
                    <div
                      className="absolute -inset-1 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.3) 0%, rgba(255, 140, 0, 0.25) 50%, rgba(220, 38, 38, 0.3) 100%)',
                        filter: 'blur(12px)',
                        boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)',
                      }}
                    ></div>

                    {/* Simple hover glow effect */}
                    <div
                      className="absolute -inset-1 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(255, 140, 0, 0.15) 50%, rgba(220, 38, 38, 0.2) 100%)',
                        filter: 'blur(12px)',
                        boxShadow: '0 0 30px rgba(220, 38, 38, 0.3)',
                      }}
                    ></div>

                    {/* Simple hover border */}
                    <div
                      className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        border: '2px solid rgba(220, 38, 38, 0.4)',
                        boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
                      }}
                    ></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Allergy Notice */}
        <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-neutral-50 border-2 border-neutral-300 rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-md">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 sm:mb-4 text-center">
                Allergy Notice
              </h3>
              <p className="text-sm sm:text-base text-neutral-800 text-center leading-relaxed">
                Many of our items contain or may come into contact with common allergens such as dairy, nuts, wheat, soy, eggs, and sesame. Ingredients can change and cross-contact may occur. Please read menu descriptions carefully and speak with a team member about your allergies before placing your order.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(Menu);
