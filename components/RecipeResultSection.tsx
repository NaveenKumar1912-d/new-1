

import React, { useState } from 'react';
import { Recipe, Ingredient } from '../types';

export const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const ChevronUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

const HeartIconOutline = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const HeartIconFilled = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.645 20.917L3.423 9.75A6.733 6.733 0 012.25 6.75c0-3.181 2.579-5.75 5.75-5.75 1.565 0 3.033.627 4.07 1.636l-.001-.002.002-.002A5.766 5.766 0 0116.5 1c3.171 0 5.75 2.579 5.75 5.75a6.733 6.733 0 01-1.173 3l-8.222 11.167a.75.75 0 01-1.115 0z" />
    </svg>
);

const CheckIconOutline = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CheckIconFilled = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

// Fix: Export ExternalLinkIcon so it can be imported by other components.
export const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg 
        className={`w-5 h-5 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
        aria-hidden="true"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
);


interface RecipeCardProps {
    recipe: Recipe;
    onSaveRecipe: (recipe: Recipe) => void;
    onRemoveSavedRecipe: (recipeName: string) => void;
    isSaved: boolean;
    currentRating: number | null;
    onRateRecipe: (recipeName: string, rating: number) => void;
    onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
    onStartCooking: (recipe: Recipe) => void; // New prop
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSaveRecipe, onRemoveSavedRecipe, isSaved, currentRating, onRateRecipe, onShowToast, onStartCooking }) => {
    const [showSteps, setShowSteps] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [isCooked, setIsCooked] = useState(false);
    const [isCookedAnimating, setIsCookedAnimating] = useState(false); // New state for 'Cooked It!' animation
    const [isSavingAnimating, setIsSavingAnimating] = useState(false); // New state for save button animation
    
    // Use generated image if available, otherwise fall back to Unsplash
    const imageUrl = recipe.generatedImageUrl 
        ? recipe.generatedImageUrl 
        : `https://source.unsplash.com/400x300/?${encodeURIComponent(recipe.imageQuery + ', food, Tamil Nadu')}`;

    const handleSaveToggle = () => {
        setIsSavingAnimating(true); // Trigger animation
        setTimeout(() => setIsSavingAnimating(false), 300); // Reset animation state after 300ms

        if (isSaved) {
            onRemoveSavedRecipe(recipe.name);
            onShowToast(`Removed "${recipe.name}" from saved recipes.`, 'info');
        } else {
            onSaveRecipe(recipe);
            onShowToast(`Saved "${recipe.name}"!`, 'success');
        }
    };

    const handleCookedIt = () => {
        setIsCookedAnimating(true); // Trigger animation
        setTimeout(() => setIsCookedAnimating(false), 300); // Reset animation state after 300ms

        setIsCooked(true);
        onShowToast(`Hooray! You cooked "${recipe.name}"!`, 'success');
    };

    const stepsId = React.useId(); // Unique ID for cooking steps

    return (
        <div 
            className={`relative bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl flex flex-col ${recipe.isRecommended ? 'border-2 border-[#F5C16C] ring-4 ring-amber-100' : ''}`}
            role={recipe.isRecommended ? "region" : undefined}
            aria-labelledby={recipe.isRecommended ? `${recipe.name.replace(/\s/g, '-')}-title` : undefined}
        >
             {recipe.isRecommended && (
                <div className="absolute top-3 right-3 z-10 bg-[#F5C16C] text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <span role="img" aria-label="star" aria-hidden="true">⭐</span>
                    <span>Top Pick</span>
                </div>
            )}
            <img className="h-48 w-full object-cover" src={imageUrl} alt={recipe.name} />
            <div className="p-6 flex flex-col flex-grow">
                <h3 id={`${recipe.name.replace(/\s/g, '-')}-title`} className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                
                {recipe.isRecommended && recipe.recommendationReason && (
                    <div className="bg-amber-50 border-l-4 border-amber-400 text-amber-800 p-3 rounded-r-lg mb-4 text-sm italic">
                       "{recipe.recommendationReason}"
                    </div>
                )}

                <div className="text-gray-600 text-sm mb-3 flex-grow">{recipe.description}</div>
                
                <div 
                    className="flex items-center gap-1 mb-4" 
                    onMouseLeave={() => setHoverRating(0)}
                    role="radiogroup"
                    aria-label={`Rate ${recipe.name} from 1 to 5 stars`}
                >
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                            key={star} 
                            onClick={() => {
                                onRateRecipe(recipe.name, star);
                                onShowToast(`Rated "${recipe.name}" ${star} stars!`, 'info');
                            }}
                            onMouseEnter={() => setHoverRating(star)}
                            role="radio"
                            aria-label={`${star} stars`}
                            aria-checked={star === (currentRating || 0)}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    onRateRecipe(recipe.name, star);
                                    onShowToast(`Rated "${recipe.name}" ${star} stars!`, 'info');
                                }
                            }}
                        >
                            <StarIcon filled={star <= (hoverRating || currentRating || 0)} />
                        </span>
                    ))}
                    {currentRating && <span className="text-sm text-gray-600 ml-1">({currentRating} stars)</span>}
                </div>

                <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-1">Matching Ingredients:</h4>
                    <div className="flex flex-wrap gap-1">
                        {recipe.matchingIngredients.map(ing => <span key={ing} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0">{ing}</span>)}
                    </div>
                </div>

                {recipe.missingIngredients.length > 0 && (
                    <div className="mb-4">
                        <h4 className="font-semibold text-sm text-gray-700 mb-1">Missing Ingredients:</h4>
                        <div className="flex flex-wrap gap-1">
                            {recipe.missingIngredients.map(ing => <span key={ing} className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0">{ing}</span>)}
                        </div>
                    </div>
                )}

                <button 
                    onClick={() => onStartCooking(recipe)}
                    className="w-full bg-[#E94E3C] text-white font-bold py-2.5 px-4 rounded-full mt-2 mb-4 hover:bg-red-700 transition-all duration-300"
                    aria-label={`Start cooking ${recipe.name}`}
                >
                    Start Cooking
                </button>

                {recipe.cookingSteps && recipe.cookingSteps.length > 0 && (
                    <div className="mb-4">
                        <button
                            onClick={() => setShowSteps(!showSteps)}
                            className="w-full flex justify-between items-center text-left font-semibold text-sm text-gray-700 py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-expanded={showSteps}
                            aria-controls={stepsId}
                        >
                            <span>View All Cooking Steps</span>
                            {showSteps ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </button>
                        <div id={stepsId} className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${showSteps ? 'max-h-96' : 'max-h-0'}`}>
                            <ol className="list-decimal list-inside text-gray-600 text-sm mt-2 space-y-1">
                                {recipe.cookingSteps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                )}
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center"><ClockIcon /> Prep: {recipe.prepTime}</span>
                        <span className="flex items-center"><ClockIcon /> Cook: {recipe.cookingTime}</span>
                    </div>
                    <button 
                        onClick={handleCookedIt}
                        disabled={isCooked}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs transition-all duration-300 transform
                            ${isCooked
                                ? 'bg-green-500 text-white cursor-default scale-105 ring-4 ring-green-400 ring-opacity-75 shadow-lg'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'}
                            ${isCookedAnimating ? 'animate-cooked-pop' : ''}`}
                        aria-label={isCooked ? `You cooked ${recipe.name}` : `Mark ${recipe.name} as cooked`}
                    >
                        {isCooked ? '✓ Cooked' : 'Cooked It!'}
                    </button>
                    <button 
                        onClick={handleSaveToggle}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs transition-all duration-200 transform
                            ${isSaved 
                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                            ${isSavingAnimating ? 'scale-105' : ''} /* Apply scale animation */
                            ${recipe.isRecommended ? 'border-2 border-red-500' : ''}`}
                        aria-label={isSaved ? `Remove ${recipe.name} from saved` : `Save ${recipe.name}`}
                    >
                        {isSaved ? <HeartIconFilled /> : <HeartIconOutline />}
                        {isSaved ? 'Saved' : 'Save Recipe'}
                    </button>
                    {recipe.sourceUrl && (
                        <a 
                            href={recipe.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                            aria-label={`View source for ${recipe.name}`}
                        >
                            <ExternalLinkIcon />
                            Source
                        </a>
                    )}
                    <div className="text-right min-w-[100px]">
                        <span className="font-semibold">{recipe.nutrition.calories} kcal</span>
                        <span className="block text-xs">{recipe.nutrition.protein} Protein</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


interface RecipeResultSectionProps {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  onSaveRecipe: (recipe: Recipe) => void;
  onRemoveSavedRecipe: (recipeName: string) => void;
  savedRecipes: Recipe[];
  recipeRatings: Record<string, number>; // New prop for all recipe ratings
  onRateRecipe: (recipeName: string, rating: number) => void; // New prop for rating handler
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
  onStartCooking: (recipe: Recipe) => void; // New prop
}

const parseTimeStringToMinutes = (timeString: string): number => {
    let totalMinutes = 0;
    const hoursMatch = timeString.match(/(\d+)\s*hour(s)?/);
    const minutesMatch = timeString.match(/(\d+)\s*min(ute(s)?)?/);

    if (hoursMatch && hoursMatch[1]) {
        totalMinutes += parseInt(hoursMatch[1], 10) * 60;
    }
    if (minutesMatch && minutesMatch[1]) {
        totalMinutes += parseInt(minutesMatch[1], 10);
    }
    return totalMinutes;
};

const RecipeResultSection: React.FC<RecipeResultSectionProps> = ({ recipes, isLoading, error, hasSearched, onSaveRecipe, onRemoveSavedRecipe, savedRecipes, recipeRatings, onRateRecipe, onShowToast, onStartCooking }) => {
  const [sortKey, setSortKey] = useState<'none' | 'prepTime' | 'cookingTime'>('none');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortKey(e.target.value as typeof sortKey);
  };

  const handleSortOrderToggle = () => {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-center bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>;
    }

    if (hasSearched && recipes.length === 0) {
      return <div className="text-center text-gray-600 p-8 bg-white/50 rounded-lg">
        <p className="text-2xl mb-2">🤔</p>
        <p>No recipes found for this combination. Try adding more ingredients!</p>
      </div>;
    }

    if (!hasSearched) {
        return <div className="text-center text-gray-500 p-8">
            <p className="text-2xl mb-2">🌶️🥥🍚</p>
            <p>Your delicious recipe suggestions will appear here!</p>
        </div>;
    }

    const sortedRecipes = [...recipes].sort((a, b) => {
        // Primary sort: Recommended recipes first
        if (a.isRecommended && !b.isRecommended) return -1;
        if (!a.isRecommended && b.isRecommended) return 1;

        // Secondary sort: By time if a sortKey is selected
        if (sortKey !== 'none') {
            const aTime = parseTimeStringToMinutes(a[sortKey]);
            const bTime = parseTimeStringToMinutes(b[sortKey]);

            if (sortOrder === 'asc') {
                return aTime - bTime;
            } else {
                return bTime - aTime;
            }
        }
        return 0; // Maintain original order if no specific time sort
    });

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedRecipes.map((recipe, index) => (
          <RecipeCard 
            key={index} 
            recipe={recipe} 
            onSaveRecipe={onSaveRecipe}
            onRemoveSavedRecipe={onRemoveSavedRecipe}
            isSaved={savedRecipes.some(r => r.name === recipe.name)}
            currentRating={recipeRatings[recipe.name] || null} // Pass current rating
            onRateRecipe={onRateRecipe} // Pass rating handler
            onShowToast={onShowToast} // Pass toast handler to RecipeResultSection and its children
            onStartCooking={onStartCooking} // Pass new prop for starting cooking view
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your AI-Powered Recipe Ideas</h2>
      
      {hasSearched && recipes.length > 0 && (
          <div className="flex justify-center items-center gap-4 mb-8">
              <label htmlFor="sort-by" className="text-gray-700 font-medium">Sort by:</label>
              <select
                  id="sort-by"
                  value={sortKey}
                  onChange={handleSortKeyChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F5C16C] focus:border-transparent transition"
                  aria-label="Sort recipes by"
              >
                  <option value="none">Default</option>
                  <option value="prepTime">Prep Time</option>
                  <option value="cookingTime">Cooking Time</option>
              </select>
              <button
                  onClick={handleSortOrderToggle}
                  className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={sortKey === 'none'}
                  aria-label={`Current sort order: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}. Click to change to ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              >
                  {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
          </div>
      )}

      {renderContent()}
    </div>
  );
};

export default RecipeResultSection;