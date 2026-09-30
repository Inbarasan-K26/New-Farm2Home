import React, { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Sprout, ArrowUpDown, Heart } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FarmBasketCustomizer } from './components/FarmBasketCustomizer';
import { FarmerSpotlight } from './components/FarmerSpotlight';
import { RecipeSection } from './components/RecipeSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { PincodeModal } from './components/PincodeModal';
import { FavoritesModal } from './components/FavoritesModal';
import { Footer } from './components/Footer';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Product, CartItem, Order, CategoryId } from './types';

export default function App() {
  // State: Cart with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('farm2home_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State: Favorites list in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('farm2home_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State: Language (English / Tamil)
  const [language, setLanguage] = useState<'en' | 'ta'>(() => {
    try {
      return (localStorage.getItem('farm2home_lang') as 'en' | 'ta') || 'en';
    } catch {
      return 'en';
    }
  });

  // State: User Pincode
  const [userPincode, setUserPincode] = useState<string>(() => {
    try {
      return localStorage.getItem('farm2home_pincode') || '600028';
    } catch {
      return '600028';
    }
  });

  // Navigation & Modals State
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('farm2home_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('farm2home_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('farm2home_lang', language);
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('farm2home_pincode', userPincode);
    } catch (e) {
      console.error(e);
    }
  }, [userPincode]);

  // Favorites toggle handler
  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }
      return prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddMultipleToCart = (products: Product[]) => {
    setCartItems(prev => {
      const updated = [...prev];
      products.forEach(p => {
        const idx = updated.findIndex(item => item.product.id === p.id);
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        } else {
          updated.push({ product: p, quantity: 1 });
        }
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  const handleAddCustomBasket = (basketProduct: Product) => {
    handleAddToCart(basketProduct, 1);
    setIsCartOpen(true);
  };

  const handleOrderCompleted = (order: Order) => {
    setActiveOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsOrderTrackerOpen(true);
  };

  const handleToggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      let matchesCategory = true;
      if (selectedCategory === 'favorites') {
        matchesCategory = favorites.includes(p.id);
      } else if (selectedCategory !== 'all') {
        matchesCategory = p.category === selectedCategory;
      }

      const matchesSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tamilName.includes(searchQuery) ||
        p.farm.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.farm.village.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [selectedCategory, searchQuery, sortBy, favorites]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      
      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <Header
        cartCount={totalCartCount}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        userPincode={userPincode}
        onOpenPincodeModal={() => setIsPincodeModalOpen(true)}
      />

      {/* Main Campaign Hero */}
      <main className="flex-1">
        <Hero
          onExploreHarvest={() => scrollToSection('catalog')}
          onExploreBaskets={() => scrollToSection('baskets')}
          userPincode={userPincode}
          setUserPincode={setUserPincode}
          language={language}
        />

        {/* Featured Fresh Harvest Catalog Section */}
        <section id="catalog" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-stone-200">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
                <Sprout className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Today’s Dawn Harvest Catalog' : 'இன்றைய புதிய விளைச்சல்'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
                {language === 'en' ? 'Direct From The Soil' : 'பண்ணையிலிருந்து நேராக'}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-600">
                {language === 'en'
                  ? 'Gathered at first light from certified organic groves in Pollachi, Thanjavur & Salem.'
                  : 'அதிகாலையில் பறிக்கப்பட்ட இயற்கை காய்கறிகள், கீரைகள் மற்றும் மரச்செக்கு எண்ணெய்.'}
              </p>
            </div>

            {/* Live Search & Sort Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative min-w-[220px]">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search produce, greens, farmer...' : 'காய்கறி, கீரை தேடுக...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-emerald-700"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>

              <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-stone-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Tabs (Segmented Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {/* Favorites Filter Tab */}
            <button
              onClick={() => setSelectedCategory('favorites')}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === 'favorites'
                  ? 'bg-rose-700 text-white shadow-2xs'
                  : 'bg-white text-stone-700 hover:bg-rose-50/60 border border-stone-200/80 hover:border-rose-300'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${selectedCategory === 'favorites' ? 'fill-white' : 'text-rose-500 fill-rose-500'}`} />
              <span>{language === 'en' ? 'Favorites' : 'விருப்பங்கள்'}</span>
              <span className={`text-[10px] tabular-nums ${selectedCategory === 'favorites' ? 'text-rose-200' : 'text-stone-400'}`}>
                ({favorites.length})
              </span>
            </button>

            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryId)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-900 text-white shadow-2xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                <span>{language === 'en' ? cat.name : cat.tamilName}</span>
                <span className={`text-[10px] tabular-nums ${selectedCategory === cat.id ? 'text-emerald-200' : 'text-stone-400'}`}>
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>

          {/* 3-Column Product Grid with Generous Whitespace */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
              <Sprout className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-stone-700">
                {selectedCategory === 'favorites'
                  ? (language === 'en' ? 'No favorite produce items saved yet.' : 'விருப்பப்பட்டியலில் பொருட்கள் எதுவும் இல்லை.')
                  : 'No matching organic produce found.'}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {selectedCategory === 'favorites'
                  ? (language === 'en' ? 'Click the heart icon on any produce details modal to save your favorite items.' : 'பொருட்களின் விபரத்தில் உள்ள இதயக் குறியீட்டை அழுத்தி சேமிக்கவும்.')
                  : 'Try resetting the search or category filter.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-800"
              >
                Show All Produce
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredProducts.map(product => {
                const itemInCart = cartItems.find(i => i.product.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantityInCart={itemInCart ? itemInCart.quantity : 0}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onQuickView={(p) => setSelectedProductForDetail(p)}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    language={language}
                  />
                );
              })}
            </div>
          )}

        </section>

        {/* Weekly Farm Basket Configurator & Subscription */}
        <FarmBasketCustomizer
          onAddCustomBasket={handleAddCustomBasket}
          language={language}
        />

        {/* Our Farmers & Fair Trade Transparency Section */}
        <FarmerSpotlight
          language={language}
        />

        {/* Grandma's Farm Fresh Recipes Section */}
        <RecipeSection
          onAddMultipleToCart={handleAddMultipleToCart}
          language={language}
        />

      </main>

      {/* Footer */}
      <Footer
        language={language}
        onNavigate={scrollToSection}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        language={language}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        userPincode={userPincode}
        onOrderCompleted={handleOrderCompleted}
        language={language}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        activeOrder={activeOrder}
        language={language}
      />

      {/* Pincode Modal */}
      <PincodeModal
        isOpen={isPincodeModalOpen}
        onClose={() => setIsPincodeModalOpen(false)}
        currentPincode={userPincode}
        onSavePincode={(pin) => setUserPincode(pin)}
        language={language}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        quantityInCart={
          selectedProductForDetail
            ? cartItems.find(i => i.product.id === selectedProductForDetail.id)?.quantity || 0
            : 0
        }
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        isFavorite={selectedProductForDetail ? favorites.includes(selectedProductForDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        language={language}
      />

      {/* Favorites Reorder Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        allProducts={PRODUCTS}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setSelectedProductForDetail(p)}
        language={language}
      />

    </div>
  );
}
