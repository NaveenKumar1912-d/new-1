

import React from 'react';
import { Ingredient } from '../types';

interface SuggestedIngredientsProps {
  allIngredients: Ingredient[];
  selectedIngredients: Ingredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
}

const SuggestedIngredients: React.FC<SuggestedIngredientsProps> = ({ allIngredients, selectedIngredients, onAddIngredient }) => {
  const availableIngredients = allIngredients.filter(
    (ing) => !selectedIngredients.some((sel) => sel.name === ing.name)
  );

  const groupedIngredients = availableIngredients.reduce((acc, ing) => {
    const category = ing.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ing);
    return acc;
  }, {} as Record<string, Ingredient[]>);

  const categoryOrder = ['Vegetables', 'Staples', 'Proteins', 'Spices', 'Oils', 'Other'];

  return (
    <div className="max-w-4xl mx-auto w-full mt-8 p-6 md:p-8 bg-white rounded-xl shadow-md">
      <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">Or Pick From Common Ingredients</h3>
      
      <div className="space-y-6">
        {categoryOrder.map((category) => (
          groupedIngredients[category] && groupedIngredients[category].length > 0 && (
            <div key={category} className="bg-amber-50/50 p-4 rounded-lg shadow-inner">
              <h4 className="font-bold text-lg text-amber-800 mb-3">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {groupedIngredients[category].map((ing) => (
                  <button
                    key={ing.name}
                    onClick={() => onAddIngredient(ing)}
                    className="flex items-center gap-2 bg-white border border-gray-300 py-1.5 px-3 rounded-full hover:bg-gray-100 hover:border-[#F5C16C] transition-all transform hover:scale-105"
                  >
                    <span className="text-lg">{ing.emoji}</span>
                    <span className="font-medium text-sm text-gray-800">{ing.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default SuggestedIngredients;