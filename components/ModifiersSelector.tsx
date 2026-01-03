'use client';

import { useState } from 'react';

interface Modifier {
  name: string;
  options: string[];
  default?: string;
}

interface ModifiersSelectorProps {
  modifiers: Modifier[];
}

export default function ModifiersSelector({ modifiers }: ModifiersSelectorProps) {
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    modifiers.forEach((modifier) => {
      initial[modifier.name] = modifier.default || modifier.options[0];
    });
    return initial;
  });

  const handleModifierChange = (modifierName: string, option: string) => {
    // Don't allow changes to Spice Level and Protein Type - they're display only
    if (modifierName === 'Spice Level' || modifierName === 'Protein Type') {
      return;
    }
    setSelectedModifiers((prev) => ({
      ...prev,
      [modifierName]: option,
    }));
  };

  const getSpiceLevelColors = (option: string) => {
    switch (option.toLowerCase()) {
      case 'mild':
        return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200';
      case 'hot':
        return 'bg-red-200 text-red-900 border-red-400 hover:bg-red-300';
      default:
        return 'bg-white text-neutral-600 border-neutral-300';
    }
  };

  const getProteinTypeColors = (option: string) => {
    switch (option.toLowerCase()) {
      case 'chicken':
        return 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200';
      case 'lamb':
        return 'bg-rose-200 text-rose-900 border-rose-400 hover:bg-rose-300';
      default:
        return 'bg-white text-neutral-600 border-neutral-300';
    }
  };

  if (!modifiers || modifiers.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-red-50/90 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md border border-primary/20 animate-fadeInUp">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
        Customize Your Order
      </h3>
      <div className="space-y-4 sm:space-y-5">
        {modifiers.map((modifier, index) => {
          const isSpiceLevel = modifier.name === 'Spice Level';
          const isProteinType = modifier.name === 'Protein Type';
          const isDisplayOnly = isSpiceLevel || isProteinType;
          
          return (
            <div key={index} className="space-y-2 sm:space-y-3">
              <label className="block text-sm sm:text-base font-semibold text-neutral-700 mb-2">
                {modifier.name}
                {isDisplayOnly && (
                  <span className="ml-2 text-xs text-neutral-500 font-normal">(Available options)</span>
                )}
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {modifier.options.map((option) => {
                  // For display-only modifiers, never show as selected
                  const isSelected = isDisplayOnly 
                    ? false 
                    : selectedModifiers[modifier.name] === option;
                  
                  // Get color classes for display-only modifiers
                  let displayColors = '';
                  if (isSpiceLevel) {
                    displayColors = getSpiceLevelColors(option);
                  } else if (isProteinType) {
                    displayColors = getProteinTypeColors(option);
                  }
                  
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleModifierChange(modifier.name, option)}
                      disabled={isDisplayOnly}
                      className={`px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg border-2 transition-all duration-300 ${
                        isDisplayOnly
                          ? `cursor-default ${displayColors}`
                          : 'cursor-pointer'
                      } ${
                        !isDisplayOnly && isSelected
                          ? 'bg-primary text-white border-primary shadow-md scale-105'
                          : !isDisplayOnly
                          ? 'bg-white text-neutral-700 border-neutral-300 hover:border-primary/50 hover:bg-primary/5'
                          : ''
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {Object.keys(selectedModifiers).some(key => key !== 'Spice Level' && key !== 'Protein Type') && (
        <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-primary/20">
          <p className="text-xs sm:text-sm text-neutral-600 italic">
            Your selections: {Object.entries(selectedModifiers)
              .filter(([key]) => key !== 'Spice Level' && key !== 'Protein Type')
              .map(([, value]) => value)
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}

