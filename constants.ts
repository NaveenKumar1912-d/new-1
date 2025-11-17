

import { Ingredient } from './types';

export const TAMIL_NADU_INGREDIENTS: Ingredient[] = [
  // Vegetables
  { name: 'Tomato', emoji: '🍅', category: 'Vegetables' },
  { name: 'Onion', emoji: '🧅', category: 'Vegetables' },
  { name: 'Brinjal', emoji: '🍆', category: 'Vegetables' },
  { name: 'Drumstick', emoji: '🌿', category: 'Vegetables' },
  { name: 'Curry Leaves', emoji: '🍃', category: 'Vegetables' },
  { name: 'Garlic', emoji: '🧄', category: 'Vegetables' },
  { name: 'Ginger', emoji: '🍠', category: 'Vegetables' },
  { name: 'Potato', emoji: '🥔', category: 'Vegetables' },
  { name: 'Carrot', emoji: '🥕', category: 'Vegetables' },
  { name: 'Green Chilli', emoji: '🌶️', category: 'Vegetables' },
  { name: 'Coriander Leaves', emoji: '🌿', category: 'Vegetables' },
  { name: 'Okra', emoji: '🌿', category: 'Vegetables' },
  { name: 'Cabbage', emoji: '🥬', category: 'Vegetables' },
  { name: 'Cauliflower', emoji: '🥦', category: 'Vegetables' },
  { name: 'Bell Pepper', emoji: '🫑', category: 'Vegetables' },
  { name: 'Ash Gourd', emoji: '🥒', category: 'Vegetables' },
  { name: 'Snake Gourd', emoji: '🥒', category: 'Vegetables' },
  { name: 'Cluster Beans', emoji: '🌱', category: 'Vegetables' },
  { name: 'Raw Banana', emoji: '🍌', category: 'Vegetables' },

  // Staples
  { name: 'Rice', emoji: '🍚', category: 'Staples' },
  { name: 'Ragi', emoji: '🌾', category: 'Staples' },
  { name: 'Wheat', emoji: '🌾', category: 'Staples' },
  { name: 'Tamarind', emoji: '🌰', category: 'Staples' },
  { name: 'Coconut', emoji: '🥥', category: 'Staples' },
  { name: 'Jaggery', emoji: '🟤', category: 'Staples' },
  { name: 'Kambu (Pearl Millet)', emoji: '🌾', category: 'Staples' },
  
  // Dals & Proteins
  { name: 'Toor Dal', emoji: '🌰', category: 'Proteins' },
  { name: 'Chana Dal', emoji: '🌰', category: 'Proteins' },
  { name: 'Moong Dal', emoji: '🌰', category: 'Proteins' },
  { name: 'Urad Dal', emoji: '🌰', category: 'Proteins' },
  { name: 'Paneer', emoji: '🧀', category: 'Proteins' },
  { name: 'Tofu', emoji: '🍢', category: 'Proteins' },
  { name: 'Egg', emoji: '🥚', category: 'Proteins' },
  { name: 'Chicken', emoji: '🍗', category: 'Proteins' },
  { name: 'Fish', emoji: '🐟', category: 'Proteins' },
  { name: 'Mutton', emoji: '🐐', category: 'Proteins' },
  { name: 'Prawns', emoji: '🦐', category: 'Proteins' },
  { name: 'Crab', emoji: '🦀', category: 'Proteins' },
  { name: 'Black Eyed Peas', emoji: '🫘', category: 'Proteins' },
  { name: 'Bengal Gram', emoji: '🌰', category: 'Proteins' },
  { name: 'Curd', emoji: '🥛', category: 'Proteins' },

  // Spices
  { name: 'Mustard Seeds', emoji: '⚫', category: 'Spices' },
  { name: 'Fenugreek', emoji: '🌿', category: 'Spices' },
  { name: 'Turmeric Powder', emoji: '💛', category: 'Spices' },
  { name: 'Chilli Powder', emoji: '🌶️', category: 'Spices' },
  { name: 'Coriander Seeds', emoji: '🟤', category: 'Spices' },
  { name: 'Cumin Seeds', emoji: '🟤', category: 'Spices' },
  { name: 'Black Pepper', emoji: '⚫', category: 'Spices' },
  { name: 'Cinnamon', emoji: '🪵', category: 'Spices' },
  { name: 'Cardamom', emoji: '🌿', category: 'Spices' },
  { name: 'Cloves', emoji: '🌿', category: 'Spices' },
  { name: 'Asafoetida', emoji: '🧂', category: 'Spices' },
  { name: 'Dry Red Chilli', emoji: '🌶️', category: 'Spices' },
  { name: 'Fennel Seeds', emoji: '🌿', category: 'Spices' },

  // Oils
  { name: 'Sesame Oil', emoji: '💧', category: 'Oils' },
  { name: 'Coconut Oil', emoji: '💧', category: 'Oils' },
  { name: 'Groundnut Oil', emoji: '💧', category: 'Oils' },
  { name: 'Ghee', emoji: '🧈', category: 'Oils' },
];

export const DIETARY_RESTRICTIONS = ['None', 'Vegetarian', 'Non-vegetarian'];
export const CUISINE_TYPES = ['All Cuisines', 'Chettinad', 'Kongunadu', 'Madurai', 'Nanjilnadu', 'Coimbatore'];

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'தமிழ்' }, // Tamil
  { code: 'hi', name: 'हिन्दी' }, // Hindi
  { code: 'es', name: 'Español' }, // Spanish
  { code: 'fr', name: 'Français' }, // French
];

export const ALLERGEN_OPTIONS = ['None', 'Peanuts', 'Gluten', 'Dairy', 'Soy', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts'];