
import React, { useState } from 'react';
import { Recipe } from '../types';
import { ClockIcon, ExternalLinkIcon } from './RecipeResultSection'; // Reusing icons

interface CookingViewProps {
  recipe: Recipe;
  onBack: () => void;
}

const CookingView: React.FC<CookingViewProps> = ({ recipe, onBack }) => {
  const allIngredients = [...recipe.matchingIngredients, ...recipe.missingIngredients];
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

  const handleToggleIngredientCheck = (ingredientName: string) => {
    setCheckedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ingredientName)) {
        newSet.delete(ingredientName);
      } else {
        newSet.add(ingredientName);
      }
      return newSet;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-white shadow-xl rounded-xl my-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm sm:text-base"
          aria-label="Back to all recipes"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Recipes
        </button>
        {recipe.sourceUrl && (
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
            aria-label={`View full recipe source for ${recipe.name}`}
          >
            <ExternalLinkIcon />
            Full Source
          </a>
        )}
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">{recipe.name}</h1>
      <p className="text-lg text-gray-700 text-center mb-6 max-w-2xl mx-auto">{recipe.description}</p>

      <div className="flex justify-center gap-6 mb-8 text-gray-700 text-lg font-medium">
        <span className="flex items-center"><ClockIcon /> Prep: {recipe.prepTime}</span>
        <span className="flex items-center"><ClockIcon /> Cook: {recipe.cookingTime}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-amber-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-amber-200 pb-2">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            {allIngredients.map((ing, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">●</span>
                <span>{ing}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-gray-700 mb-3 border-b border-amber-100 pb-2">Ingredient Checklist</h3>
          <ul className="space-y-3 text-gray-800">
            {allIngredients.map((ing, index) => (
              <li key={`checklist-${ing}-${index}`} className="flex items-center">
                <input
                  type="checkbox"
                  id={`ingredient-check-${ing}-${index}`}
                  checked={checkedIngredients.has(ing)}
                  onChange={() => handleToggleIngredientCheck(ing)}
                  className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                />
                <label
                  htmlFor={`ingredient-check-${ing}-${index}`}
                  className={`ml-3 text-lg cursor-pointer ${checkedIngredients.has(ing) ? 'line-through text-gray-500 italic' : ''}`}
                >
                  {ing}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Nutrition Info</h2>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Calories:</span> {recipe.nutrition.calories} kcal</p>
            <p><span className="font-semibold">Protein:</span> {recipe.nutrition.protein}</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-green-200 pb-2">Cooking Steps</h2>
        <ol className="list-decimal list-outside ml-5 space-y-4 text-gray-800 text-lg">
          {recipe.cookingSteps.map((step, index) => (
            <li key={index} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-[#E94E3C] text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors"
          aria-label="Finish cooking and go back to recipes"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Recipes
        </button>
      </div>
    </div>
  );
};

export default CookingView;
