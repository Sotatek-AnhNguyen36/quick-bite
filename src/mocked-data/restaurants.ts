import { IFood, IFoods, IRestaurant, IRestaurants } from 'types/restaurant';
import Images from 'assets/images';

export const RESTAURANTS_NEW_INITIAL_STATE: IRestaurant[] = [
  {
    id: 1,
    name: 'Bruncherie',
    description: 'Breakfast, lunch, desserts',
    deliveryCosts: '3.26',
    deliveryIn: '25-35min',
    image: Images.Bruncherie,
  },
  {
    id: 2,
    name: `Mom's Soups`,
    description: 'Lunch',
    deliveryCosts: '3.26',
    deliveryIn: '25-35min',
    image: Images.Soup,
  },
];

export const RESTAURANTS_POPULAR_INITIAL_STATE: IRestaurant[] = [
  {
    id: 1,
    name: `AvoBistro`,
    description: 'Breakfast, lunch, snacks',
    deliveryCosts: '0',
    deliveryIn: '25-35min',
    image: Images.AvoBistro,
  },
  {
    id: 2,
    name: 'Pancake World',
    description: 'Brunch, desserts',
    deliveryCosts: '3.26',
    deliveryIn: '25-35min',
    image: Images.Pancake,
  },
];

export const RESTAURANTS_FREE_DELIVERY_INITIAL_STATE: IRestaurant[] = [
  {
    id: 1,
    name: 'Little Italy',
    description: 'Sandwiches, Brunch',
    deliveryCosts: '0',
    deliveryIn: '25-35min',
    image: Images.LittleItaly,
  },
  {
    id: 2,
    name: `AvoBistro`,
    description: 'Breakfast, lunch, snacks',
    deliveryCosts: '0',
    deliveryIn: '25-35min',
    image: Images.AvoBistro,
  },
];

export const RESTAURANTS_INITIAL_STATE: IRestaurants[] = [
  {
    title: 'new',
    data: [RESTAURANTS_NEW_INITIAL_STATE],
  },
  {
    title: 'popular',
    data: [RESTAURANTS_POPULAR_INITIAL_STATE],
  },
  {
    title: 'free_delivery',
    data: [RESTAURANTS_FREE_DELIVERY_INITIAL_STATE],
  },
]

export const SANDWICHES_INITIAL_STATE: IFood[] = [
  {
    id: 1,
    name: 'Artichoke Sandwich',
    description: 'Artichoke, spinach, cheddar and mushrooms.',
    price: '7.50',
    popular: true,
    image: Images.Artichoke,
  },
  {
    id: 2,
    name: 'Egg Sandwich',
    description: 'Tomato, mozzarella topped with fried egg.',
    price: '5.70',
    popular: true,
    image: Images.Egg,
  },
  {
    id: 3,
    name: 'Chili Chicken',
    description: 'Chicken, rocket and chili peppers with mayonnaise.',
    price: '7.30',
    popular: true,
    image: Images.Chili,
  }
];

export const DESSERTS_INITIAL_STATE: IFood[] = [
  {
    id: 1,
    name: 'Strawberry Cake',
    description: 'Topped with fresh strawberries and mint.',
    price: '4.50',
    popular: true,
    image: Images.Strawberry,
  },
  {
    id: 2,
    name: 'Lemon Mousse',
    description: 'Topped with fresh oranges and berries.',
    price: '4.00',
    popular: true,
    image: Images.Lemon,
  },
  {
    id: 3,
    name: 'Homemade Granola',
    description: 'Granola, greek yogurt topped with fresh peaches.',
    price: '4.30',
    popular: true,
    image: Images.Granola,
  }
];


export const FOODS_INITIAL_STATE: IFoods[] = [
  {
    title: 'sandwiches',
    data: SANDWICHES_INITIAL_STATE,
  },
  {
    title: 'desserts',
    data: DESSERTS_INITIAL_STATE,
  },
]
