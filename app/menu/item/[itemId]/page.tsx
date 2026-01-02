import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getMenuItemById, menuItemDetails } from '@/data/menuDetails';
import Layout from '@/components/Layout';
import HomepageBackground from '@/components/HomepageBackground';
import BackButton from '@/components/BackButton';
import IngredientsList from '@/components/IngredientsList';
import OrderNowButton from '@/components/OrderNowButton';
import ModifiersSelector from '@/components/ModifiersSelector';
import ScrollToTop from '@/components/ScrollToTop';

export async function generateStaticParams() {
  return menuItemDetails.map((item) => ({
    itemId: item.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  const item = getMenuItemById(itemId);
  
  if (!item) {
    return {
      title: 'Item Not Found - Knights Curry Express',
    };
  }

  return {
    title: `${item.name} - ${item.price} | Knights Curry Express`,
    description: item.description,
  };
}

export default async function MenuItemDetailPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  const item = getMenuItemById(itemId);

  if (!item) {
    notFound();
  }

  const getSpiceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'mild':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'medium':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'hot':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'very hot':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-primary/10 text-primary border-primary/30';
    }
  };

  // Check if item is vegetarian
  const isVegetarian = item.dietaryInfo?.includes('Vegetarian') || item.tags?.includes('Vegetarian');

  return (
    <Layout>
      {/* Scroll to top when page loads */}
      <ScrollToTop />
      
      {/* Product Detail Page Background - Repeating Wallpaper */}
      <HomepageBackground />
      
      <article className="relative min-h-screen z-10">
        <section className="pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 lg:pb-12 animate-fadeIn">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <BackButton 
              fallbackHref={`/menu/${item.categoryId}`}
              fallbackText="Back"
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Image Section */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-neutral-100 to-neutral-200 group">
                <Image
                  src={item.image}
                  alt={item.name}
                    fill
                  priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Red accent border on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-2xl sm:rounded-3xl transition-colors duration-500 pointer-events-none"></div>
                </div>
              </div>

              {/* Info Section */}
              <div className="space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="space-y-3 sm:space-y-4 pb-6 sm:pb-8 border-b-2 border-primary/20 animate-fadeInUp">
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-neutral-900 leading-tight flex-1">
                      {item.name}
                    </h1>
                    {/* Vegetarian/Non-Vegetarian Badge */}
                    <span className={`px-4 py-2 text-sm sm:text-base font-bold rounded-lg border-2 flex-shrink-0 ${
                      isVegetarian 
                        ? 'bg-green-100 text-green-700 border-green-400' 
                        : 'bg-red-100 text-red-700 border-red-400'
                    }`}>
                      {isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-lg sm:text-xl md:text-2xl font-medium text-green-600">
                      {item.price}
                    </span>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.filter(tag => tag !== 'Vegetarian').slice(0, 2).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-xs sm:text-sm font-semibold bg-primary/10 text-primary rounded-full border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-red-50/90 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-md border border-primary/20 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Modifiers */}
                {item.modifiers && item.modifiers.length > 0 && (
                  <div style={{ animationDelay: '0.15s' }}>
                    <ModifiersSelector modifiers={item.modifiers} />
                  </div>
                )}

                {/* Chef Notes */}
                {item.chefNotes && (
                  <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-l-4 border-primary shadow-md animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-primary mb-2 sm:mb-3">
                      Chef&apos;s Notes
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
                      {item.chefNotes}
                    </p>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <div className="bg-gradient-to-br from-red-50/80 to-orange-50/80 p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-primary/20">
                    <h3 className="text-xs sm:text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-2">Spice Level</h3>
                    <span className={`inline-block px-3 py-1.5 text-xs sm:text-sm font-bold rounded-full border-2 ${getSpiceColor(item.spiceLevel)}`}>
                        {item.spiceLevel}
                      </span>
                  </div>

                  {item.calories && (
                    <div className="bg-gradient-to-br from-red-50/80 to-orange-50/80 p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-primary/20">
                      <h3 className="text-xs sm:text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-2">Calories</h3>
                      <p className="text-lg sm:text-xl font-display font-bold text-neutral-900">{item.calories}</p>
                    </div>
                  )}
                </div>

                {/* Ingredients */}
                {item.ingredients && item.ingredients.length > 0 && (
                  <IngredientsList ingredients={item.ingredients} />
                )}

                {/* Nutritional Info */}
                {item.nutritionalInfo && (
                  <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/90 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md border border-primary/20 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
                      Nutritional Information
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      {item.nutritionalInfo.protein && (
                        <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100/50 rounded-lg border-l-3 border-neutral-900">
                          <span className="block text-xs sm:text-sm font-semibold text-neutral-600 mb-1">Protein</span>
                          <span className="text-lg sm:text-xl font-display font-bold text-neutral-900">{item.nutritionalInfo.protein}</span>
                        </div>
                      )}
                      {item.nutritionalInfo.carbs && (
                        <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100/50 rounded-lg border-l-3 border-neutral-900">
                          <span className="block text-xs sm:text-sm font-semibold text-neutral-600 mb-1">Carbs</span>
                          <span className="text-lg sm:text-xl font-display font-bold text-neutral-900">{item.nutritionalInfo.carbs}</span>
                        </div>
                      )}
                      {item.nutritionalInfo.fat && (
                        <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100/50 rounded-lg border-l-3 border-neutral-900">
                          <span className="block text-xs sm:text-sm font-semibold text-neutral-600 mb-1">Fat</span>
                          <span className="text-lg sm:text-xl font-display font-bold text-neutral-900">{item.nutritionalInfo.fat}</span>
                        </div>
                      )}
                      {item.nutritionalInfo.fiber && (
                        <div className="px-4 py-3 bg-gradient-to-r from-neutral-50 to-neutral-100/50 rounded-lg border-l-3 border-neutral-900">
                          <span className="block text-xs sm:text-sm font-semibold text-neutral-600 mb-1">Fiber</span>
                          <span className="text-lg sm:text-xl font-display font-bold text-neutral-900">{item.nutritionalInfo.fiber}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-900 mt-4 sm:mt-5">
                      Nutritional values are estimates only and may vary based on preparation, portion size, and ingredients.
                    </p>
                  </div>
                )}

                {/* Allergens */}
                {item.allergens && item.allergens.length > 0 && (
                  <div className="bg-gradient-to-br from-red-50/90 to-pink-50/90 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md border border-primary/20 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
                      Allergens
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {item.allergens.map((allergen, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-red-100 text-red-700 border-2 border-red-300 rounded-full text-sm sm:text-base font-semibold"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dietary Info */}
                {item.dietaryInfo && item.dietaryInfo.length > 0 && (
                  <div className="bg-gradient-to-br from-green-50/90 to-emerald-50/90 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md border border-primary/20 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
                      Dietary Information
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {item.dietaryInfo.map((info, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-green-100 text-green-700 border-2 border-green-300 rounded-full text-sm sm:text-base font-semibold"
                        >
                          {info}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 border-t-2 border-primary/20 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                  <OrderNowButton 
                    className="flex-1 px-6 sm:px-8 py-3.5 sm:py-4 bg-primary text-white font-bold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300 active:scale-95 text-center"
                  >
                    Order Now
                  </OrderNowButton>
                  <Link 
                    href={`/menu/${item.categoryId}`} 
                    className="flex-1 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-br from-neutral-50 to-neutral-100 text-primary border-2 border-primary font-bold text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg hover:bg-primary/5 transition-all duration-300 active:scale-95 text-center"
                  >
                    View More Items
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
