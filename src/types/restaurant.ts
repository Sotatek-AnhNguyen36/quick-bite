import { ImageProps } from 'react-native';

export interface IRestaurant {
  id: number;
  name: string;
  description: string;
  deliveryIn: string;
  deliveryCosts: string;
  image: ImageProps;
}

export interface IRestaurants {
  title: string;
  data: IRestaurant[][];
}

export interface IRestaurantFilter {
  id: number;
  title: string;
  selected: boolean;
}

export interface IFood {
  id: number;
  name: string;
  description: string;
  price: string;
  popular: boolean;
  image: ImageProps;
}

export interface IFoods {
  title: string;
  data: IFood[];
}

export interface ITopping {
  id: number;
  title: string;
  price: string;
  selected: boolean;
}
