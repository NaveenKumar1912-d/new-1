
import React, { useState, useRef, useEffect } from 'react';
import { Ingredient } from '../types';
import { TAMIL_NADU_INGREDIENTS, DIETARY_RESTRICTIONS, CUISINE_TYPES, SUPPORTED_LANGUAGES, ALLERGEN_OPTIONS, OCCASION_TYPES } from '../constants';

interface IngredientInputSectionProps {
  selectedIngredients: Ingredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (ingredient: Ingredient) => void;
  onSuggestIngredient: () => Promise<void>;
  onFindRecipes: () => void;
  isSuggesting: boolean;
  isFinding: boolean;
  allergies: string;
  onAllergyChange: (value: string) => void;
  mealType: string;
  onMealTypeChange: (value: string) => void;
  dietaryRestriction: string;
  onDietaryRestrictionChange: (value: string) => void;
  cuisineType: string;
  onCuisineTypeChange: (value: string) => void;
  onClearFilters: () => void; // New prop for clearing filters
  language: string; // New prop for selected language
  onLanguageChange: (value: string) => void; // New prop for changing language
  occasionType: string; // New prop for occasion type
  onOccasionTypeChange: (value: string) => void; // New prop for changing occasion type
}

const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const IngredientInputSection: React.FC<IngredientInputSectionProps> = ({
  selectedIngredients,
  onAddIngredient,
  onRemoveIngredient,
  onSuggestIngredient,
  onFindRecipes,
  isSuggesting,
  isFinding,
  allergies,
  onAllergyChange,
  mealType,
  onMealTypeChange,
  dietaryRestriction,
  onDietaryRestrictionChange,
  cuisineType,
  onCuisineTypeChange,
  onClearFilters, // Destructure new prop
  language, // Destructure new prop
  onLanguageChange, // Destructure new prop
  occasionType, // Destructure new prop
  onOccasionTypeChange, // Destructure new prop
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Ingredient[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const MEAL_TYPES = ['All Meals', 'Breakfast', 'Lunch', 'Dinner', 'Snacks']; // Moved here from constants for now as it's the only usage
  const uniqueId = React.useId(); // Use useId for unique IDs
  const suggestionsListId = `${uniqueId}-suggestions`;

  useEffect(() => {
    if (inputValue) {
      const filtered = TAMIL_NADU_INGREDIENTS.filter(
        (ing) =>
          ing.name.toLowerCase().includes(inputValue.toLowerCase()) &&
          !selectedIngredients.some(sel => sel.name === ing.name)
      );
      setSuggestions(filtered.slice(0, 5));
      setIsSuggestionsVisible(true);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  }, [inputValue, selectedIngredients]);

  const handleSelect = (ingredient: Ingredient) => {
    onAddIngredient(ingredient);
    setInputValue('');
    setIsSuggestionsVisible(false);
  };
  
  useEffect(() => {
    if (suggestionsRef.current && highlightedIndex > -1) {
        const item = suggestionsRef.current.children[highlightedIndex] as HTMLLIElement;
        item?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSuggestionsVisible && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex > -1) {
          handleSelect(suggestions[highlightedIndex]);
        }
      } else if (e.key === 'Escape') {
        setIsSuggestionsVisible(false);
      }
    }
  };

  const handleVoiceInput = () => {
    // Placeholder for Web Speech API
    alert('Voice input feature is coming soon!');
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleAllergyToggle = (allergen: string) => {
    const currentAllergiesArray = allergies.split(',').map(a => a.trim()).filter(Boolean);
    let newAllergiesArray: string[] = [];

    if (allergen === 'None') {
        newAllergiesArray = []; // Selecting 'None' clears all other allergies
    } else {
        // If 'None' was selected, clear it first
        if (currentAllergiesArray.includes('None')) {
            newAllergiesArray = [];
        } else {
            newAllergiesArray = [...currentAllergiesArray];
        }

        if (newAllergiesArray.includes(allergen)) {
            newAllergiesArray = newAllergiesArray.filter(a => a !== allergen);
        } else {
            newAllergiesArray.push(allergen);
        }
    }
    
    // If no specific allergies are selected and 'None' is not explicitly chosen, default to empty string
    // This is to ensure 'None' doesn't appear in the comma-separated string for the AI prompt
    const finalAllergiesString = newAllergiesArray.length === 0 ? '' : newAllergiesArray.join(', ');
    onAllergyChange(finalAllergiesString);
  };

  const currentSelectedAllergies = allergies.split(',').map(a => a.trim()).filter(Boolean);


  return (
    <div ref={wrapperRef} className="bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg max-w-4xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Kitchen Pantry</h2>
      
      <div className="relative mb-4">
        <input
          type="text"
          id={`${uniqueId}-ingredient-input`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsSuggestionsVisible(inputValue.length > 0)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Type 'To...' for Tomato, Toor Dal"
          className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5C16C] focus:border-transparent transition hover:border-gray-400"
          role="combobox"
          aria-autocomplete="list"
          aria-controls={suggestionsListId}
          aria-expanded={isSuggestionsVisible}
          aria-haspopup="listbox"
          aria-activedescendant={highlightedIndex > -1 ? `${suggestionsListId}-${highlightedIndex}` : undefined}
        />
        <button onClick={handleVoiceInput} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E94E3C]">
            <MicIcon />
        </button>
        {isSuggestionsVisible && suggestions.length > 0 && (
          <ul
            ref={suggestionsRef}
            id={suggestionsListId}
            role="listbox"
            aria-label="Ingredient Suggestions"
            className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-xl max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.name}
                id={`${suggestionsListId}-${index}`}
                onClick={() => handleSelect(suggestion)}
                onMouseOver={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={index === highlightedIndex}
                className={`p-3 cursor-pointer flex items-center gap-3 transition-colors ${
                  index === highlightedIndex ? 'bg-[#FFF7E6]' : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{suggestion.emoji}</span>
                <span>{suggestion.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="min-h-[60px] bg-gray-50 p-3 rounded-lg flex flex-wrap gap-2 items-center border">
        {selectedIngredients.length === 0 ? (
            <p className="text-gray-500">Your selected ingredients will appear here...</p>
        ) : (
            selectedIngredients.map((ing) => (
            <div key={ing.name} className="flex items-center gap-2 bg-[#6BBE45] text-white py-1 px-3 rounded-full animate-in fade-in-0 zoom-in-95 transition-all duration-200 hover:scale-105 hover:shadow-md cursor-default">
                <span>{ing.emoji}</span>
                <span className="font-medium">{ing.name}</span>
                <button 
                  onClick={() => onRemoveIngredient(ing)} 
                  className="bg-white/20 rounded-full p-0.5 hover:bg-red-500 transition-colors"
                  aria-label={`Remove ${ing.name}`}
                >
                    <CloseIcon />
                </button>
            </div>
            ))
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-center mb-4">
          <button
            onClick={onClearFilters}
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-5 rounded-full hover:bg-gray-300 transition-colors duration-300 text-sm"
          >
            Clear All Filters
          </button>
        </div>

        <div>
            <h4 className="block text-sm font-medium text-gray-700 mb-2 text-center">Any Allergies?</h4>
            <div className="flex flex-wrap justify-center gap-2">
                {ALLERGEN_OPTIONS.map((allergen) => (
                <button
                    key={allergen}
                    onClick={() => handleAllergyToggle(allergen)}
                    className={`py-2 px-4 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                    (allergen === 'None' && currentSelectedAllergies.length === 0) || (allergen !== 'None' && currentSelectedAllergies.includes(allergen))
                        ? 'bg-[#E94E3C] text-white shadow'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-pressed={currentSelectedAllergies.includes(allergen) || (allergen === 'None' && currentSelectedAllergies.length === 0)}
                >
                    {allergen}
                </button>
                ))}
            </div>
        </div>

        <div>
            <h4 className="block text-sm font-medium text-gray-700 mb-2 text-center">Meal Type</h4>
            <div className="flex flex-wrap justify-center gap-2">
                {MEAL_TYPES.map((meal) => (
                <button
                    key={meal}
                    onClick={() => onMealTypeChange(meal)}
                    className={`py-2 px-4 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                    mealType === meal
                        ? 'bg-[#E94E3C] text-white shadow'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-pressed={mealType === meal}
                >
                    {meal}
                </button>
                ))}
            </div>
        </div>

        <div>
            <h4 className="block text-sm font-medium text-gray-700 mb-2 text-center">Dietary Restrictions</h4>
            <div className="flex flex-wrap justify-center gap-2">
                {DIETARY_RESTRICTIONS.map((restriction) => (
                <button
                    key={restriction}
                    onClick={() => onDietaryRestrictionChange(restriction)}
                    className={`py-2 px-4 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                    dietaryRestriction === restriction
                        ? 'bg-[#E94E3C] text-white shadow'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-pressed={dietaryRestriction === restriction}
                >
                    {restriction}
                </button>
                ))}
            </div>
        </div>

        <div>
            <h4 className="block text-sm font-medium text-gray-700 mb-2 text-center">Cuisine Type</h4>
            <div className="flex flex-wrap justify-center gap-2">
                {CUISINE_TYPES.map((cuisine) => (
                <button
                    key={cuisine}
                    onClick={() => onCuisineTypeChange(cuisine)}
                    className={`py-2 px-4 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                    cuisineType === cuisine
                        ? 'bg-[#E94E3C] text-white shadow'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-pressed={cuisineType === cuisine}
                >
                    {cuisine}
                </button>
                ))}
            </div>
        </div>

        <div> {/* New: Occasion Type Filter */}
            <h4 className="block text-sm font-medium text-gray-700 mb-2 text-center">Occasion Type</h4>
            <div className="flex flex-wrap justify-center gap-2">
                {OCCASION_TYPES.map((occasion) => (
                <button
                    key={occasion}
                    onClick={() => onOccasionTypeChange(occasion)}
                    className={`py-2 px-4 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                    occasionType === occasion
                        ? 'bg-[#E94E3C] text-white shadow'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-pressed={occasionType === occasion}
                >
                    {occasion}
                </button>
                ))}
            </div>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2 text-center">Recipe Language</label>
          <div className="flex justify-center">
            <select
              id="language"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F5C16C] focus:border-transparent transition hover:border-gray-400 text-sm"
              aria-label="Select recipe language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>


      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center border-t pt-6">
        <button 
          onClick={onSuggestIngredient}
          disabled={isSuggesting}
          className="w-full sm:w-auto bg-white border border-[#6BBE45] text-[#6BBE45] font-semibold py-2 px-6 rounded-full hover:bg-[#6BBE45] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          aria-label={isSuggesting ? 'Suggesting ingredient...' : 'Suggest Next Ingredient'}
        >
          {isSuggesting ? 'Thinking...' : '💡 Suggest Next Ingredient'}
        </button>
        <button
          onClick={onFindRecipes}
          disabled={selectedIngredients.length === 0 || isFinding}
          className="w-full sm:w-auto bg-[#E94E3C] text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
          aria-label={isFinding ? 'Finding recipes...' : 'Find Recipes'}
        >
          {isFinding ? 'Finding Recipes...' : '🍳 Find Recipes'}
        </button>
      </div>
    </div>
  );
};

export default IngredientInputSection;