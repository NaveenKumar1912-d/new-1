
import { Recipe } from '../types';

const SAVED_RECIPES_KEY = 'savedRecipes';
const RECIPE_RATINGS_KEY = 'recipeRatings';

/**
 * Retrieves all saved recipes from local storage.
 * @returns {Recipe[]} An array of saved recipes.
 */
export const getSavedRecipes = (): Recipe[] => {
  try {
    const jsonString = localStorage.getItem(SAVED_RECIPES_KEY);
    return jsonString ? JSON.parse(jsonString) : [];
  } catch (error) {
    console.error("Error retrieving saved recipes from local storage:", error);
    return [];
  }
};

/**
 * Saves a recipe to local storage. If the recipe already exists, it won't be added again.
 * @param {Recipe} recipe The recipe to save.
 */
export const saveRecipe = (recipe: Recipe): void => {
  try {
    const savedRecipes = getSavedRecipes();
    if (!savedRecipes.some(r => r.name === recipe.name)) {
      savedRecipes.push(recipe);
      localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(savedRecipes));
    }
  } catch (error) {
    console.error("Error saving recipe to local storage:", error);
  }
};

/**
 * Removes a recipe from local storage by its name.
 * @param {string} recipeName The name of the recipe to remove.
 */
export const removeRecipe = (recipeName: string): void => {
  try {
    let savedRecipes = getSavedRecipes();
    savedRecipes = savedRecipes.filter(r => r.name !== recipeName);
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(savedRecipes));
    // Optionally remove rating when recipe is removed from saved
    removeRating(recipeName);
  } catch (error) {
    console.error("Error removing recipe from local storage:", error);
  }
};

/**
 * Checks if a recipe is already saved in local storage.
 * @param {string} recipeName The name of the recipe to check.
 * @returns {boolean} True if the recipe is saved, false otherwise.
 */
export const isRecipeSaved = (recipeName: string): boolean => {
  const savedRecipes = getSavedRecipes();
  return savedRecipes.some(r => r.name === recipeName);
};

/**
 * Retrieves all saved recipe ratings from local storage.
 * @returns {Record<string, number>} An object mapping recipe names to their ratings.
 */
export const getAllRatings = (): Record<string, number> => {
  try {
    const jsonString = localStorage.getItem(RECIPE_RATINGS_KEY);
    return jsonString ? JSON.parse(jsonString) : {};
  } catch (error) {
    console.error("Error retrieving recipe ratings from local storage:", error);
    return {};
  }
};

/**
 * Saves or updates a rating for a specific recipe.
 * @param {string} recipeName The name of the recipe to rate.
 * @param {number} rating The star rating (1-5).
 */
export const saveRating = (recipeName: string, rating: number): void => {
  try {
    const ratings = getAllRatings();
    ratings[recipeName] = rating;
    localStorage.setItem(RECIPE_RATINGS_KEY, JSON.stringify(ratings));
  } catch (error) {
    console.error("Error saving recipe rating to local storage:", error);
  }
};

/**
 * Removes a rating for a specific recipe.
 * @param {string} recipeName The name of the recipe whose rating to remove.
 */
export const removeRating = (recipeName: string): void => {
  try {
    const ratings = getAllRatings();
    delete ratings[recipeName];
    localStorage.setItem(RECIPE_RATINGS_KEY, JSON.stringify(ratings));
  } catch (error) {
    console.error("Error removing recipe rating from local storage:", error);
  }
};