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
    setSelectedModifiers((prev) => ({
      ...prev,
      [modifierName]: option,
    }));
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
        {modifiers.map((modifier, index) => (
          <div key={index} className="space-y-2 sm:space-y-3">
            <label className="block text-sm sm:text-base font-semibold text-neutral-700 mb-2">
              {modifier.name}
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {modifier.options.map((option) => {
                const isSelected = selectedModifiers[modifier.name] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleModifierChange(modifier.name, option)}
                    className={`px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg border-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-md scale-105'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-primary/20">
        <p className="text-xs sm:text-sm text-neutral-600 italic">
          Your selections: {Object.values(selectedModifiers).join(', ')}
        </p>
      </div>
    </div>
  );
}

