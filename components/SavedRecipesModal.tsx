


import React from 'react';
import { Recipe } from '../types';
import { ClockIcon } from './RecipeResultSection'; // Reusing icons from RecipeResultSection

interface SavedRecipesModalProps {
    isOpen: boolean;
    onClose: () => void;
    savedRecipes: Recipe[];
    onRemoveRecipe: (recipeName: string) => void;
}

const CloseModalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

const SavedRecipesModal: React.FC<SavedRecipesModalProps> = ({ isOpen, onClose, savedRecipes, onRemoveRecipe }) => {
    if (!isOpen) return null;

    const modalTitleId = React.useId(); // Generate a unique ID for the modal title

    return (
        <div id="saved-recipes-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={modalTitleId}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="relative p-6 border-b border-gray-200">
                    <h2 id={modalTitleId} className="text-2xl font-bold text-gray-800 text-center">Your Saved Recipes</h2>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                        aria-label="Close modal"
                    >
                        <CloseModalIcon />
                    </button>
                </div>
                <div className="p-6 flex-grow overflow-y-auto">
                    {savedRecipes.length === 0 ? (
                        <div className="text-center text-gray-600 p-8">
                            <p className="text-3xl mb-4">⭐</p>
                            <p className="text-lg">No recipes saved yet!</p>
                            <p className="text-sm text-gray-500 mt-2">Find some delicious recipes and save them here.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                            {savedRecipes.map((recipe) => (
                                <div key={recipe.name} className="relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                                    <img 
                                        className="h-32 w-full object-cover" 
                                        src={recipe.generatedImageUrl || `https://source.unsplash.com/300x200/?${encodeURIComponent(recipe.imageQuery + ', food, Tamil Nadu')}`} 
                                        alt={recipe.name} 
                                    />
                                    <div className="p-4 flex-grow flex flex-col">
                                        <h4 className="text-lg font-bold text-gray-800 mb-1">{recipe.name}</h4>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
                                        <div className="mt-auto flex justify-between items-center text-xs text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center"><ClockIcon /> Prep: {recipe.prepTime}</span>
                                                <span className="flex items-center"><ClockIcon /> Cook: {recipe.cookingTime}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                {recipe.sourceUrl && (
                                                    <a
                                                        href={recipe.sourceUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition-colors flex items-center gap-1"
                                                        aria-label={`View source for ${recipe.name}`}
                                                    >
                                                        <ExternalLinkIcon />
                                                        Source
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => onRemoveRecipe(recipe.name)}
                                                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-200 transition-colors"
                                                    aria-label={`Remove ${recipe.name}`}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedRecipesModal;