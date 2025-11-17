
import React, { useState, useCallback, useEffect, useRef } from 'react';
import HeroSection from './components/HeroSection';
import IngredientInputSection from './components/IngredientInputSection';
import RecipeResultSection from './components/RecipeResultSection';
import Footer from './components/Footer';
import SuggestedIngredients from './components/SuggestedIngredients';
import SavedRecipesModal from './components/SavedRecipesModal'; // Import SavedRecipesModal
import ToastContainer from './components/ToastContainer'; // Import ToastContainer
import CookingView from './components/CookingView'; // Import new CookingView
import ChatbotWidget from './components/ChatbotWidget'; // Import new ChatbotWidget
import { Ingredient, Recipe } from './types';
import { TAMIL_NADU_INGREDIENTS } from './constants';
import { ai, suggestNextIngredient, getRecipes, generateRecipeImage } from './services/geminiService'; // Import 'ai' instance
import { getSavedRecipes, saveRecipe, removeRecipe, getAllRatings, saveRating } from './services/localStorageService'; // Import local storage service
import { Chat } from '@google/genai'; // Import Chat type

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

const App: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isFinding, setIsFinding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [allergies, setAllergies] = useState('');
  const [mealType, setMealType] = useState('All Meals');
  const [dietaryRestriction, setDietaryRestriction] = useState('None');
  const [cuisineType, setCuisineType] = useState('All Cuisines');
  const [showSavedRecipesModal, setShowSavedRecipesModal] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [recipeRatings, setRecipeRatings] = useState<Record<string, number>>({});
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // New state for cooking view
  const [currentView, setCurrentView] = useState<'main' | 'cooking'>('main');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  // New state for chatbot
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ text: string, sender: 'user' | 'ai' }[]>([]);
  const [isChatTyping, setIsChatTyping] = useState(false);
  const chatInstanceRef = useRef<Chat | null>(null);

  // New state for language selection
  const [language, setLanguage] = useState('en');


  // Load saved recipes and ratings from local storage on initial mount
  useEffect(() => {
    setSavedRecipes(getSavedRecipes());
    setRecipeRatings(getAllRatings());
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'info' | 'error') => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000); // Toast disappears after 3 seconds
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const handleAddIngredient = (ingredient: Ingredient) => {
    if (!selectedIngredients.some(i => i.name === ingredient.name)) {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients(prev => prev.filter(i => i.name !== ingredient.name));
  };

  const handleSuggestIngredient = useCallback(async () => {
    setIsSuggesting(true);
    try {
      const ingredientNames = selectedIngredients.map(i => i.name);
      const suggestedName = await suggestNextIngredient(ingredientNames);
      
      const suggestedIngredient = TAMIL_NADU_INGREDIENTS.find(
        i => i.name.toLowerCase() === suggestedName.toLowerCase()
      );

      if (suggestedIngredient && !selectedIngredients.some(i => i.name === suggestedIngredient.name)) {
        handleAddIngredient(suggestedIngredient);
        addToast(`Added "${suggestedIngredient.name}" to your pantry!`, 'info');
      } else if (suggestedIngredient) {
        addToast(`"${suggestedIngredient.name}" is already in your pantry!`, 'info');
      } else {
        console.warn("AI suggested an existing or unknown ingredient:", suggestedName);
        addToast("Could not get a new ingredient suggestion.", 'error');
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to get ingredient suggestion.", 'error');
    } finally {
      setIsSuggesting(false);
    }
  }, [selectedIngredients, addToast]);
  

  const handleFindRecipes = useCallback(async () => {
    if (selectedIngredients.length === 0) {
        addToast("Please add at least one ingredient to find recipes.", 'info');
        return;
    }
    setIsFinding(true);
    setError(null);
    setHasSearched(true);
    setRecipes([]); // Clear previous recipes
    try {
      const ingredientNames = selectedIngredients.map(i => i.name);
      const generatedRecipes = await getRecipes(ingredientNames, allergies, mealType, dietaryRestriction, cuisineType, language);

      // Generate images concurrently for all recipes
      const recipesWithImages = await Promise.all(
        generatedRecipes.map(async (recipe) => {
          try {
            // Use a more descriptive prompt for image generation
            const imagePrompt = `${recipe.imageQuery}, ${recipe.name}, Tamil Nadu cuisine, high quality, food photography`;
            const imageUrl = await generateRecipeImage(imagePrompt);
            return { ...recipe, generatedImageUrl: imageUrl };
          } catch (imageError) {
            console.warn(`Failed to generate image for ${recipe.name}:`, imageError);
            return { ...recipe, generatedImageUrl: undefined }; // Fallback if image generation fails
          }
        })
      );
      setRecipes(recipesWithImages);
      if (recipesWithImages.length > 0) {
        addToast(`Found ${recipesWithImages.length} delicious recipes!`, 'success');
      } else {
        addToast("No recipes found for your selection.", 'info');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        addToast(err.message, 'error');
      } else {
        setError("An unknown error occurred.");
        addToast("An unknown error occurred while finding recipes.", 'error');
      }
      setRecipes([]);
    } finally {
      setIsFinding(false);
    }
  }, [selectedIngredients, allergies, mealType, dietaryRestriction, cuisineType, language, addToast]);

  const handleClearFilters = useCallback(() => {
    setAllergies('');
    setMealType('All Meals');
    setDietaryRestriction('None');
    setCuisineType('All Cuisines');
    setLanguage('en'); // Reset language to default
    addToast("All filters cleared.", 'info');
  }, [addToast]);

  const handleSaveRecipe = useCallback((recipe: Recipe) => {
    saveRecipe(recipe);
    setSavedRecipes(getSavedRecipes()); // Refresh state from local storage
    // Toast message is now handled by RecipeCard's handleSaveToggle
  }, []);

  const handleRemoveSavedRecipe = useCallback((recipeName: string) => {
    removeRecipe(recipeName);
    setSavedRecipes(getSavedRecipes()); // Refresh state from local storage
    // Toast message is now handled by RecipeCard's handleSaveToggle
  }, []);

  const handleOpenSavedRecipes = useCallback(() => {
    setSavedRecipes(getSavedRecipes()); // Ensure latest saved recipes are loaded
    setShowSavedRecipesModal(true);
  }, []);

  const handleCloseSavedRecipes = useCallback(() => {
    setShowSavedRecipesModal(false);
  }, []);

  const handleRateRecipe = useCallback((recipeName: string, rating: number) => {
    saveRating(recipeName, rating);
    setRecipeRatings(getAllRatings()); // Refresh state from local storage
    // Toast message is now handled by RecipeCard
  }, []);

  // New navigation handlers for Cooking View
  const handleStartCooking = useCallback((recipe: Recipe) => {
    setActiveRecipe(recipe);
    setCurrentView('cooking');
    addToast(`Starting to cook "${recipe.name}"!`, 'info');
  }, [addToast]);

  const handleBackToRecipes = useCallback(() => {
    setActiveRecipe(null);
    setCurrentView('main');
    addToast("Back to recipe ideas.", 'info');
  }, [addToast]);

  // Chatbot functions
  const toggleChatbot = useCallback(() => {
    setIsChatbotOpen(prev => {
      if (!prev && !chatInstanceRef.current) {
        // Initialize chat only when opening for the first time
        chatInstanceRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: 'You are a helpful culinary assistant from SmartPantry.AI, specializing in Tamil Nadu cuisine. You can answer questions about ingredients, cooking techniques, and app usage. You can also respond in multiple languages if asked. Keep your responses concise and friendly.',
          },
        });
        setChatMessages([{ text: "Hello! I'm your SmartPantry AI Assistant. How can I help you today?", sender: 'ai' }]);
      }
      return !prev;
    });
  }, []);

  const handleUserSendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const newUserMessage = { text: userMessage, sender: 'user' as const };
    setChatMessages(prev => [...prev, newUserMessage]);
    setIsChatTyping(true);

    if (!chatInstanceRef.current) {
      console.error("Chat instance not initialized.");
      addToast("Chat not ready. Please try again.", 'error');
      setIsChatTyping(false);
      return;
    }

    try {
      const result = await chatInstanceRef.current.sendMessageStream({ message: userMessage });
      let fullResponse = '';
      for await (const chunk of result) {
        fullResponse += chunk.text;
        setChatMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.sender === 'ai') {
            // Update last AI message with new chunk
            return [...prev.slice(0, -1), { ...lastMessage, text: fullResponse }];
          } else {
            // Add new AI message
            return [...prev, { text: fullResponse, sender: 'ai' as const }];
          }
        });
      }
    } catch (err) {
      console.error("Error sending message to chatbot:", err);
      addToast("Failed to get response from AI. Please try again.", 'error');
      setChatMessages(prev => [...prev, { text: "Sorry, I encountered an error. Please try again.", sender: 'ai' }]);
    } finally {
      setIsChatTyping(false);
    }
  }, [addToast]);


  return (
    <div className="min-h-screen">
      {currentView === 'main' && (
        <>
          <HeroSection />
          
          <main className="container mx-auto px-4 -mt-12 relative z-10">
            <IngredientInputSection 
              selectedIngredients={selectedIngredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              onSuggestIngredient={handleSuggestIngredient}
              onFindRecipes={handleFindRecipes}
              isSuggesting={isSuggesting}
              isFinding={isFinding}
              allergies={allergies}
              onAllergyChange={setAllergies}
              mealType={mealType}
              onMealTypeChange={setMealType}
              dietaryRestriction={dietaryRestriction}
              onDietaryRestrictionChange={setDietaryRestriction}
              cuisineType={cuisineType}
              onCuisineTypeChange={setCuisineType}
              onClearFilters={handleClearFilters}
              language={language} // Pass language prop
              onLanguageChange={setLanguage} // Pass language change handler
            />

            <div className="flex justify-center mt-6">
                <button
                    onClick={handleOpenSavedRecipes}
                    className="bg-[#E94E3C] text-white font-semibold py-2 px-6 rounded-full hover:bg-red-700 transition-all duration-300 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M11.645 20.917L3.423 9.75A6.733 6.733 0 012.25 6.75c0-3.181 2.579-5.75 5.75-5.75 1.565 0 3.033.627 4.07 1.636l-.001-.002.002-.002A5.766 5.766 0 0116.5 1c3.171 0 5.75 2.579 5.75 5.75a6.733 6.733 0 01-1.173 3l-8.222 11.167a.75.75 0 01-1.115 0z" />
                    </svg>
                    View Saved Recipes ({savedRecipes.length})
                </button>
            </div>

            <SuggestedIngredients
              allIngredients={TAMIL_NADU_INGREDIENTS}
              selectedIngredients={selectedIngredients}
              onAddIngredient={handleAddIngredient}
            />
            
            <RecipeResultSection 
              recipes={recipes} 
              isLoading={isFinding}
              error={error}
              hasSearched={hasSearched}
              onSaveRecipe={handleSaveRecipe}
              onRemoveSavedRecipe={handleRemoveSavedRecipe}
              savedRecipes={savedRecipes} // Pass saved recipes to determine 'isSaved' state for cards
              recipeRatings={recipeRatings} // Pass recipe ratings
              onRateRecipe={handleRateRecipe} // Pass rating handler
              onShowToast={addToast} // Pass toast handler to RecipeResultSection and its children
              onStartCooking={handleStartCooking} // Pass new prop for starting cooking view
            />
          </main>
          
          <Footer />

          <SavedRecipesModal 
            isOpen={showSavedRecipesModal}
            onClose={handleCloseSavedRecipes}
            savedRecipes={savedRecipes}
            onRemoveRecipe={handleRemoveSavedRecipe}
          />

          <button
              onClick={toggleChatbot}
              className="fixed bottom-4 right-4 bg-[#E94E3C] text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40"
              aria-label="Open AI Chatbot"
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.75 9.75 0 01-3.105-.562c-.39-.108-.67.243-.603.662A8.964 8.964 0 0012 21.75c4.971 0 9-3.694 9-8.25zm-9-8.25a9.75 9.75 0 00-3.105.562c-.39.108-.67-.243-.603-.662A8.964 8.964 0 0012 2.25c4.971 0 9 3.694 9 8.25z" />
              </svg>
          </button>
        </>
      )}

      {currentView === 'cooking' && activeRecipe && (
        <CookingView 
          recipe={activeRecipe} 
          onBack={handleBackToRecipes} 
        />
      )}

      {isChatbotOpen && (
        <ChatbotWidget
          isOpen={isChatbotOpen}
          messages={chatMessages}
          onSendMessage={handleUserSendMessage}
          onClose={toggleChatbot}
          isTyping={isChatTyping}
        />
      )}

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};

export default App;