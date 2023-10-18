import { IRestaurant } from 'types/restaurant';
import Images from 'assets/images';

export const SEARCH_INITIAL_STATE: IRestaurant[] = [
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
    name: 'Pancake World',
    description: 'Brunch, desserts',
    deliveryCosts: '3.26',
    deliveryIn: '25-35min',
    image: Images.Pancake,
  },
  {
    id: 3,
    name: 'Little Italy',
    description: 'Sandwiches, Brunch',
    deliveryCosts: '0',
    deliveryIn: '25-35min',
    image: Images.LittleItaly,
  },
  {
    id: 4,
    name: `AvoBistro`,
    description: 'Breakfast, lunch, snacks',
    deliveryCosts: '0',
    deliveryIn: '25-35min',
    image: Images.AvoBistro,
  },
];

export const SEARCH_FILTER = [
  { id: 1, title: 'burger' },
  { id: 2, title: 'kebab' },
  { id: 3, title: 'pizza' },
  { id: 4, title: 'sushi' },
  { id: 5, title: 'sanwich' },
  { id: 6, title: 'indian' },
  { id: 7, title: 'cafe' },
  { id: 8, title: 'desserts' },
  { id: 9, title: 'steak' },
  { id: 10, title: 'japanese' },
  { id: 11, title: 'pasta' },
  { id: 12, title: 'salad' },
];

export const SEARCH_SORT_BY = [
  { id: 1, title: 'open_now' },
  { id: 2, title: 'free_delivery' },
  { id: 3, title: '5_stars' },
];
