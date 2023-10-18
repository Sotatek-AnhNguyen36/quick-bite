import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { GlobalVariable } from 'constants/global-variable';
import React from 'react';
import AddToBasketScreen from 'screens/add-to-basket/add-to-basket.screen';
import CartFinalScreen from 'screens/cart-final/cart-final.screen';
import CartScreen from 'screens/cart/cart.screen';
import CheckoutScreen from 'screens/checkout/checkout.screen';
import HomeScreen from 'screens/home/home.screen';
import OrderStatusScreen from 'screens/order-status/order-status.screen';
import SplashScreen from 'screens/splash/splash.screen';
import TabNavigation from './home-bottom-tab';
import {
  ADD_TO_BASKET_SCREEN,
  CART_FINAL_SCREEN,
  CART_SCREEN,
  CHECKOUT_SCREEN,
  FOOD_DETAIL_SCREEN,
  HOME_SCREEN,
  MAIN_SCREEN,
  ORDER_STATUS_SCREEN,
  RESTAURANT_DETAIL_SCREEN,
  SPLASH_SCREEN,
  THANK_YOU_SCREEN,
} from './screen-name';
import { navigationRef } from './service-navigation';
import ThankYouScreen from 'screens/thank-you/thank-you.screen';
import RestaurantDetailScreen from 'screens/restaurant-detail/restaurant-detail.screen';
import FoodDetailScreen from 'screens/food-detail/food-detail.screen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SPLASH_SCREEN}>
      <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={MAIN_SCREEN} component={TabNavigation} />
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={CART_SCREEN} component={CartScreen} />
      <Stack.Screen name={CHECKOUT_SCREEN} component={CheckoutScreen} />
      <Stack.Screen name={CART_FINAL_SCREEN} component={CartFinalScreen} />
      <Stack.Screen name={THANK_YOU_SCREEN} component={ThankYouScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name={ORDER_STATUS_SCREEN} component={OrderStatusScreen} options={{ gestureEnabled: false, presentation: 'modal' }} />
      <Stack.Screen name={ADD_TO_BASKET_SCREEN} component={AddToBasketScreen} />
      <Stack.Screen name={RESTAURANT_DETAIL_SCREEN} component={RestaurantDetailScreen} />
      <Stack.Screen name={FOOD_DETAIL_SCREEN} component={FoodDetailScreen} options={{ gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }} />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  const onSetStatusBar = (screenName: string) => {
    if (!screenName) {
      return;
    }
  };

  const getCurrentRoute = (state: any): any => {
    try {
      if (state.index === undefined || state.index < 0) {
        return undefined;
      }
      const nestedState = state.routes[state.index].state;
      if (nestedState !== undefined) {
        return getCurrentRoute(nestedState);
      }
      return state.routes[state.index].name;
    } catch (error) {}
  };

  const onStateChange = (state: NavigationState | undefined): void => {
    const screenName = getCurrentRoute(state);

    if (screenName) {
      onSetStatusBar(screenName);

      GlobalVariable.activeRouteKey = screenName;
    }
  };

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <MainStack />
    </NavigationContainer>
  );
};

export default StackNavigator;
