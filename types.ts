

export interface Ingredient {
  name: string;
  emoji: string;
  category: string;
}

export interface Recipe {
  name: string;
  description: string;
  matchingIngredients: string[];
  missingIngredients: string[];
  nutrition: {
    calories: number;
    protein: string;
  };
  cookingTime: string;
  prepTime: string; // New field for preparation time
  cookingSteps: string[]; // New field for cooking steps
  imageQuery: string;
  generatedImageUrl?: string; // New field for generated image
  isRecommended?: boolean;
  recommendationReason?: string;
  sourceUrl?: string; // New optional field for recipe source URL
}