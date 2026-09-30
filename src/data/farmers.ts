import { FarmerProfile } from '../types';

export const FARMER_PROFILES: FarmerProfile[] = [
  {
    id: 'farmer-1',
    name: 'Sundaramurthy & Family',
    tamilName: 'சுந்தரமூர்த்தி & குடும்பத்தினர்',
    location: 'Anaimalai Foothills, Pollachi',
    cropSpecialty: 'Native Moringa, Country Drumsticks & Tender Coconut',
    experienceYears: 24,
    soilMethod: 'Zero-Chemical Panchagavya, Multi-tier Agroforestry',
    quote: 'When you feed the earth natural compost, the plant defends itself without a single drop of poison. We harvest only what we would feed our own grandchildren.',
    tamilQuote: 'மண்ணுக்கு இயற்கையான உணவைக் கொடுக்கும் போது, பயிர்களுக்கு விஷம் தெளிக்க வேண்டிய தேவையில்லை.',
    fairTradePercent: 84
  },
  {
    id: 'farmer-2',
    name: 'Dr. Arulmozhi (Agri Scientist turned Farmer)',
    tamilName: 'டாக்டர் அருள்மொழி (வேளாண் ஆராய்ச்சியாளர்)',
    location: 'Thiruvaiyaru, Thanjavur (Cauvery Delta)',
    cropSpecialty: 'Heritage Karuppu Kavuni Black Rice & Mappillai Samba',
    experienceYears: 18,
    soilMethod: 'River Alluvial Soil, Desi Heirloom Seed Conservation',
    quote: 'Traditional Tamil grains held medicinal wisdom for two millennia. Reviving them restores health to both the soil microbiome and our families.',
    tamilQuote: 'பாரம்பரிய நெல் ரகங்கள் நமது மண்ணையும் உடலையும் ஒருங்கே காக்கும் இயற்கை மருந்து.',
    fairTradePercent: 82
  },
  {
    id: 'farmer-3',
    name: 'K. R. Thangavel',
    tamilName: 'கே. ஆர். தங்கவேல்',
    location: 'Kinathukadavu Red Soil Plains, Coimbatore',
    cropSpecialty: 'Vine-Ripened Heirloom Country Tomatoes & Native Brinjals',
    experienceYears: 31,
    soilMethod: 'Earthen Mulching, Natural Neem Seed Pest Repellent',
    quote: 'Commercial hybrid tomatoes look shiny on supermarket shelves but have lost their taste. Our heirloom varieties burst with authentic tangy flavor.',
    tamilQuote: 'ஹைப்ரிட் தக்காளி பளபளப்பாக இருக்கும், ஆனால் சுவை இருக்காது. நமது நாட்டுத் தக்காளி மணமும் சுவையும் நிறைந்தது.',
    fairTradePercent: 86
  },
  {
    id: 'farmer-4',
    name: 'Senthil Nathan & Gowshala Collective',
    tamilName: 'செந்தில் நாதன் (கொங்கு கோசாலை)',
    location: 'Dharapuram, Tiruppur',
    cropSpecialty: 'A2 Native Kangeyam Cow Ghee & Cold-Pressed Sesame',
    experienceYears: 15,
    soilMethod: 'Grass-fed Pastures, Traditional Wooden Bilona Churning',
    quote: 'We don’t separate calves from their mothers. Sacred milk collected in small batches creates the golden aroma of real desi ghee.',
    tamilQuote: 'கன்றுகளுக்கு முதலில் பால் கொடுத்த பின்னரே, பாரம்பரிய முறையில் தயிரில் இருந்து நெய் காய்ச்சுகிறோம்.',
    fairTradePercent: 85
  }
];

export const TRANSPARENCY_METRICS = {
  farmerShareAverage: '83.5%',
  middlemanCut: '0% (Direct Farm Gate)',
  harvestToDoorstepHours: '4 - 7 Hours',
  plasticPackagingReducedKg: '14,800+ kg',
  pesticideFreeAreaAcres: '420+ Certified Acres',
};
