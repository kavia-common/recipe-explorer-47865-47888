import { Recipe } from '../models/recipe.model';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Herb Roasted Chicken',
    description: 'Juicy roasted chicken with lemon, garlic, and fresh herbs.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
    tags: ['chicken', 'dinner'],
    ingredients: [
      '1 whole chicken (1.5kg)',
      '2 lemons',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      'Fresh rosemary and thyme',
      'Salt and pepper'
    ],
    steps: [
      'Preheat oven to 200°C (392°F).',
      'Pat chicken dry; season with salt and pepper.',
      'Mix olive oil, garlic, and herbs; rub over chicken.',
      'Stuff with lemon halves; roast 60–75 min until juices run clear.',
      'Rest 10 minutes before carving.'
    ]
  },
  {
    id: '2',
    title: 'Creamy Mushroom Pasta',
    description: 'Rich and creamy pasta with sautéed mushrooms and parmesan.',
    imageUrl: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
    rating: 4.5,
    tags: ['pasta', 'vegetarian'],
    ingredients: [
      '300g pasta (fettuccine or tagliatelle)',
      '300g mushrooms, sliced',
      '2 tbsp butter',
      '2 cloves garlic, minced',
      '200ml cream',
      '50g parmesan, grated',
      'Salt and pepper'
    ],
    steps: [
      'Cook pasta until al dente; reserve some pasta water.',
      'Sauté mushrooms in butter; add garlic.',
      'Pour in cream; simmer gently.',
      'Add pasta and parmesan; toss, loosen with pasta water.',
      'Season and serve.'
    ]
  },
  {
    id: '3',
    title: 'Avocado Toast with Poached Egg',
    description: 'Simple, delicious breakfast with creamy avocado and runny egg.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-eacef0df6022?q=80&w=1200&auto=format&fit=crop',
    rating: 4.2,
    tags: ['breakfast', 'quick'],
    ingredients: [
      '2 slices sourdough bread',
      '1 ripe avocado',
      '1 egg',
      'Chili flakes, salt, pepper',
      'Lemon juice'
    ],
    steps: [
      'Toast bread.',
      'Mash avocado with lemon, salt, and pepper.',
      'Poach egg 3–4 minutes.',
      'Spread avocado on toast, top with egg and chili flakes.'
    ]
  }
];
