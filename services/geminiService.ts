import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';
import { SUPPORTED_LANGUAGES } from "../constants";

// Function to get a new GoogleGenAI instance
export const getGeminiAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const suggestNextIngredient = async (currentIngredients: string[]): Promise<string> => {
  if (currentIngredients.length === 0) {
    const suggestions = ['Onion', 'Tomato', 'Rice', 'Garlic', 'Ginger'];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }
  
  const prompt = `Based on these ingredients for a Tamil Nadu style dish: [${currentIngredients.join(', ')}], suggest one more common ingredient that would pair well. Provide only the name of the single ingredient, no emoji, no explanation. For example: 'Coriander Leaves'.`;

  try {
    const response = await getGeminiAI().models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim().replace(/\.$/, '');
  } catch (error) {
    console.error("Error suggesting ingredient:", error);
    throw new Error("Could not get a suggestion from AI.");
  }
};

export const getRecipes = async (
  ingredients: string[],
  allergies: string,
  mealType: string,
  dietaryRestriction: string,
  cuisineType: string,
  language: string // New parameter for language
): Promise<Recipe[]> => {
  let prompt = `I have the following ingredients: ${ingredients.join(', ')}.`;

  if (allergies) {
    prompt += ` I am allergic to ${allergies}. Please ensure none of the suggested recipes contain these allergens or their derivatives.`;
  }
  
  const mealTypeQuery = mealType === 'All Meals' ? '' : ` suitable for ${mealType}`;
  const dietaryRestrictionQuery = dietaryRestriction === 'None' ? '' : ` which are ${dietaryRestriction.toLowerCase()}`;
  const cuisineTypeQuery = cuisineType === 'All Cuisines' ? 'authentic Tamil Nadu style' : ` ${cuisineType} style Tamil Nadu`;

  const languageName = SUPPORTED_LANGUAGES.find(lang => lang.code === language)?.name || 'English'; // Get full language name

  prompt += ` Please suggest 3 ${cuisineTypeQuery} recipes${dietaryRestrictionQuery}${mealTypeQuery} I can make. Critically, provide all recipe details (name, description, ingredients, steps, etc.) in **${languageName}**. For each recipe, provide a short description, and list only the ingredients I have that are used in this recipe (in 'matchingIngredients'). Critically, all suggested recipes must strictly use *only* the ingredients provided to you in my list. Do NOT suggest any recipes that require ingredients I have not explicitly listed. Therefore, the 'missingIngredients' array for any suggested recipe MUST be empty. Also, provide an estimated cooking time, prep time, calorie count, protein amount, a simple, effective image search query (e.g., 'Chettinad Chicken Curry'), AN OPTIONAL source URL for the recipe (if a relevant and authoritative one exists), AND step-by-step cooking instructions as a list of strings. Critically, choose ONE of these recipes as a "Top Recommendation". For this recommended recipe, set 'isRecommended' to true and provide a brief 'recommendationReason' (e.g., "Uses the most ingredients you have" or "A classic dish that's easy to start with"). For the other non-recommended recipes, set 'isRecommended' to false and the 'recommendationReason' to an empty string.`;

  try {
    const response = await getGeminiAI().models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recipes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the recipe." },
                  description: { type: Type.STRING, description: "A brief, appealing description of the dish." },
                  matchingIngredients: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Ingredients from the user's list that are used in this recipe."
                  },
                  missingIngredients: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Ingredients required for the recipe that the user does not have. This array must be empty as only provided ingredients are to be used."
                  },
                  nutrition: {
                    type: Type.OBJECT,
                    properties: {
                      calories: { type: Type.INTEGER, description: "Estimated calories per serving." },
                      protein: { type: Type.STRING, description: "Estimated protein per serving (e.g., '15g')." }
                    },
                    required: ['calories', 'protein']
                  },
                  cookingTime: { type: Type.STRING, description: "Estimated total cooking time (e.g., '45 minutes')." },
                  prepTime: { type: Type.STRING, description: "Estimated preparation time (e.g., '15 minutes')." }, // Added prepTime
                  cookingSteps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Step-by-step instructions for cooking the recipe."
                  },
                  imageQuery: { type: Type.STRING, description: "A simple search query to find an image of the dish." },
                  isRecommended: { type: Type.BOOLEAN, description: "True if this is the top recommended recipe, otherwise false." },
                  recommendationReason: { type: Type.STRING, description: "A short reason for the recommendation. Empty if not recommended." },
                  sourceUrl: { type: Type.STRING, description: "Optional URL for the recipe source." } // Added sourceUrl
                },
                required: ['name', 'description', 'matchingIngredients', 'missingIngredients', 'nutrition', 'cookingTime', 'prepTime', 'cookingSteps', 'imageQuery', 'isRecommended', 'recommendationReason']
              }
            }
          },
          required: ['recipes']
        }
      }
    });

    const responseObject = JSON.parse(response.text);
    return responseObject.recipes as Recipe[];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to generate recipes from AI. Please try again.");
  }
};

export const generateRecipeImage = async (imagePrompt: string): Promise<string> => {
  try {
    const response = await getGeminiAI().models.generateImages({
      model: 'imagen-4.0-generate-001', // High-quality image generation
      prompt: imagePrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image for the recipe.");
  }
};