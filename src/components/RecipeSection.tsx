import React, { useState } from 'react';
import { ChefHat, Clock, Users, Plus, Check } from 'lucide-react';
import { RECIPES } from '../data/recipes';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface RecipeSectionProps {
  onAddMultipleToCart: (products: Product[]) => void;
  language: 'en' | 'ta';
}

export const RecipeSection: React.FC<RecipeSectionProps> = ({
  onAddMultipleToCart,
  language,
}) => {
  const [activeRecipeId, setActiveRecipeId] = useState(RECIPES[0].id);
  const [addedRecipeId, setAddedRecipeId] = useState<string | null>(null);

  const activeRecipe = RECIPES.find(r => r.id === activeRecipeId) || RECIPES[0];
  const ingredientProducts = PRODUCTS.filter(p => activeRecipe.productIds.includes(p.id));

  const handleAddAllIngredients = (recipeId: string, products: Product[]) => {
    onAddMultipleToCart(products);
    setAddedRecipeId(recipeId);
    setTimeout(() => setAddedRecipeId(null), 1800);
  };

  return (
    <section id="recipes" className="py-16 sm:py-24 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <ChefHat className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Farm Kitchen Heritage' : 'பாரம்பரிய சமையல்'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
            {language === 'en' ? 'Cook Like Grandma with Dawn Harvest' : 'பண்ணைக் காய்கறிகளுடன் பாரம்பரிய சுவை'}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            {language === 'en'
              ? 'Traditional recipes handed down through generations. Get all organic ingredients delivered together in one basket.'
              : 'தலைமுறை தலைமுறையாக தொடரும் பாரம்பரிய சமையல் குறிப்புகள். தேவையான அனைத்து இயற்கை பொருட்களையும் ஒரே கூடையில் பெறலாம்.'}
          </p>
        </div>

        {/* Recipe Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {RECIPES.map(recipe => (
            <button
              key={recipe.id}
              onClick={() => setActiveRecipeId(recipe.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                recipe.id === activeRecipe.id
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {language === 'en' ? recipe.title : recipe.tamilTitle}
            </button>
          ))}
        </div>

        {/* Recipe Card Grid */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Recipe Method & Details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{activeRecipe.prepTime}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{activeRecipe.servings}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-800 font-medium">{activeRecipe.difficulty}</span>
                </div>

                <h3 className="text-2xl font-display font-bold text-stone-900 mb-2">
                  {language === 'en' ? activeRecipe.title : activeRecipe.tamilTitle}
                </h3>

                <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                  {language === 'en' ? activeRecipe.description : activeRecipe.tamilDescription}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    {language === 'en' ? 'Cooking Steps' : 'செய்முறை'}
                  </h4>
                  <ol className="space-y-2.5 text-xs text-stone-700 list-decimal list-inside leading-relaxed">
                    {activeRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="pl-1">
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Right: Ingredient Bundler with 1-Click Add */}
            <div className="lg:col-span-5 bg-[#FAF8F5] rounded-xl p-5 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                    {language === 'en' ? 'Organic Ingredients Bundle' : 'தேவையான இயற்கை பொருட்கள்'}
                  </h4>
                  <span className="text-xs text-stone-500">
                    {ingredientProducts.length} items
                  </span>
                </div>

                {/* List of Ingredients */}
                <div className="space-y-3 mb-6">
                  {ingredientProducts.map(prod => (
                    <div key={prod.id} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-stone-200/80">
                      <div>
                        <div className="font-semibold text-stone-900">{prod.name}</div>
                        <div className="text-[11px] text-stone-500">{prod.unit} · {prod.farm.farmerName}</div>
                      </div>
                      <div className="font-mono font-bold text-stone-900">
                        ₹{prod.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Bundle Price & CTA */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-stone-500">Bundle Subtotal</span>
                  <span className="font-mono font-bold text-base text-stone-900">
                    ₹{ingredientProducts.reduce((sum, p) => sum + p.price, 0)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddAllIngredients(activeRecipe.id, ingredientProducts)}
                  className={`w-full py-2.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs ${
                    addedRecipeId === activeRecipe.id
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-900 hover:bg-emerald-800 text-white'
                  }`}
                >
                  {addedRecipeId === activeRecipe.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'All Ingredients Added to Basket!' : 'அனைத்து பொருட்களும் சேர்க்கப்பட்டன!'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Add All 3 Items to Basket' : 'அனைத்தையும் கூடையில் சேர்க்க'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
