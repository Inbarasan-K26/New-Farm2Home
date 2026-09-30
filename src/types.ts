export type CategoryId = 
  | 'all'
  | 'greens'
  | 'vegetables'
  | 'fruits'
  | 'oils_staples'
  | 'dairy_eggs'
  | 'baskets';

export interface FarmOrigin {
  farmerName: string;
  tamilFarmerName: string;
  village: string;
  district: string;
  organicCertCode: string;
  soilPractice: string;
  acres: number;
  farmerStory: string;
}

export interface Product {
  id: string;
  name: string;
  tamilName: string;
  category: CategoryId;
  price: number;
  originalPrice: number;
  unit: string;
  tamilUnit: string;
  stockStatus: 'In Stock' | 'Dawn Harvest' | 'Limited Batch';
  harvestTime: string;
  farm: FarmOrigin;
  description: string;
  tamilDescription: string;
  nutrition: {
    calories: string;
    fiber: string;
    keyNutrient: string;
    healthBenefit: string;
  };
  rating: number;
  reviewsCount: number;
  seasonal: boolean;
  colorTheme: string; // Tailwind gradient/accent class
  iconType: 'leaf' | 'tomato' | 'carrot' | 'banana' | 'oil' | 'egg' | 'basket' | 'coconut' | 'herb';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  pincode: string;
  deliverySlot: string;
  packagingPreference: 'palm_leaf' | 'reusable_cloth' | 'biodegradable_box';
  paymentMethod: 'cod' | 'upi' | 'card';
  status: 'harvesting' | 'quality_check' | 'packed' | 'out_for_delivery' | 'delivered';
  placedAt: string;
  estimatedArrival: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  tamilName: string;
  location: string;
  cropSpecialty: string;
  experienceYears: number;
  soilMethod: string;
  quote: string;
  tamilQuote: string;
  fairTradePercent: number;
}

export interface Recipe {
  id: string;
  title: string;
  tamilTitle: string;
  prepTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium';
  description: string;
  tamilDescription: string;
  productIds: string[];
  instructions: string[];
}
