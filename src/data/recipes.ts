import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Aromatic Country Tomato Rasam (நாட்டுத் தக்காளி ரசம்)',
    tamilTitle: 'அசல் நாட்டுத் தக்காளி மிளகு ரசம்',
    prepTime: '20 mins',
    servings: '4 people',
    difficulty: 'Easy',
    description: 'A comforting, medicinal South Indian rasam made with juicy vine-ripened country tomatoes, freshly crushed black pepper, and cold-pressed gingelly oil.',
    tamilDescription: 'அதிகாலையில் பறிக்கப்பட்ட நாட்டுத் தக்காளி மற்றும் மரச்செக்கு நல்லெண்ணெய் கொண்டு செய்யப்படும் மணமணக்கும் ரசம்.',
    productIds: ['f2h-veg-01', 'f2h-veg-05', 'f2h-oil-01'],
    instructions: [
      'Crush 3 ripe Country Tomatoes by hand in 2 cups of water with a pinch of rock salt and turmeric.',
      'Coarsely pound black pepper, cumin seeds, native garlic cloves, and a stalk of fresh curry leaves.',
      'Heat 1 tbsp cold-pressed gingelly oil in an earthen pot (manpaanai), splutter mustard seeds and small onions.',
      'Pour the tomato mixture, bring to a gentle frothy boil (do not overboil), garnish with fresh coriander, and turn off flame.'
    ]
  },
  {
    id: 'recipe-2',
    title: 'Traditional Moringa Leaf Poriyal (முருங்கை கீரை பொரியல்)',
    tamilTitle: 'மருத்துவ குணம் கொண்ட முருங்கை கீரை பொரியல்',
    prepTime: '15 mins',
    servings: '3-4 people',
    difficulty: 'Easy',
    description: 'Iron-rich stir fry using freshly plucked dawn moringa leaves, native small shallots, and fresh grated coconut.',
    tamilDescription: 'இரும்புச்சத்து நிறைந்த அதிகாலை முருங்கை கீரையுடன் சின்ன வெங்காயம் சேர்த்து வதக்கிய ஆரோக்கிய உணவு.',
    productIds: ['f2h-green-01', 'f2h-veg-05', 'f2h-oil-01'],
    instructions: [
      'Gently pluck clean moringa leaflets discarding stiff stalks.',
      'Heat wood-pressed sesame oil, add mustard seeds, split urad dal, dried red chillies, and sliced small onions.',
      'Saute onions till translucent, add the moringa leaves and salt. Stir on medium flame for 4-5 minutes until leaves turn tender green.',
      'Sprinkle fresh grated coconut and serve hot with steamed rice or millet.'
    ]
  },
  {
    id: 'recipe-3',
    title: 'Royal Karuppu Kavuni Sweet Porridge (கருப்புக் கவுனி கஞ்சி/பாயாசம்)',
    tamilTitle: 'பாரம்பரிய கருப்புக் கவுனி அரிசி பாயாசம்',
    prepTime: '35 mins',
    servings: '4 people',
    difficulty: 'Medium',
    description: 'Rich royal dessert made with antioxidant black rice, palm jaggery syrup, cardamoms, and aromatic A2 desi ghee.',
    tamilDescription: 'சோழ நாட்டு மன்னர்களின் விருப்பமான சத்து மிகுந்த கருப்புக் கவுனி பாயாசம்.',
    productIds: ['f2h-oil-02', 'f2h-oil-03'],
    instructions: [
      'Soak 1 cup Karuppu Kavuni rice in water for 4-6 hours.',
      'Pressure cook or slow simmer in an earthen pot with 3.5 cups water until the purple-black grains are soft and burst open.',
      'Melt native palm jaggery in warm water, strain impurities, and pour into the cooked black rice porridge.',
      'Simmer for 5 minutes, finish with freshly ground cardamom powder and 2 generous spoonfuls of golden A2 Desi Cow Ghee.'
    ]
  }
];
