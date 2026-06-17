'use client';

import { useState } from 'react';

interface IngredientsListProps {
  ingredients: string[];
}

export default function IngredientsList({ ingredients }: IngredientsListProps) {
  const [showAll, setShowAll] = useState(false);
  // Show only 2 ingredients initially
  const initialCount = 2;
  const hasMore = ingredients.length > initialCount;
  const displayedIngredients = showAll ? ingredients : ingredients.slice(0, initialCount);

  return (
    <div className="bg-gradient-to-br from-red-50/90 to-orange-50/90 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md border border-primary/20 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
        Ingredients
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {displayedIngredients.map((ingredient, index) => (
          <li 
            key={index}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-red-50 to-red-100/50 rounded-lg border-l-3 border-primary text-sm sm:text-base text-neutral-800 hover:translate-x-1 transition-transform duration-300"
          >
            <ion-icon name="checkmark-circle" className="text-primary text-lg flex-shrink-0"></ion-icon>
            <span>{ingredient}</span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 sm:mt-5 px-4 sm:px-6 py-2 sm:py-2.5 bg-primary/10 text-primary border-2 border-primary/30 rounded-lg font-semibold text-sm sm:text-base hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 active:scale-95"
        >
          {showAll ? 'Show Less' : `Show More (${ingredients.length - initialCount} more)`}
        </button>
      )}
    </div>
  );
}

