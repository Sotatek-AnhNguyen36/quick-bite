import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from 'screens/home/home.screen';
import ProfileScreen from 'screens/profile/profile.screen';
import HomeTabBarComponent from './home-tab-bar.component';
import { HOME_SCREEN, PROFILE_SCREEN, RESTAURANTS_SCREEN, SEARCH_SCREEN } from './screen-name';
import Restaurantscreen from 'screens/restaurants/restaurants.screen';
import Searchscreen from 'screens/search/search.screen';

const TabMainNavigator = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <TabMainNavigator.Navigator
      initialRouteName={HOME_SCREEN}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props: BottomTabBarProps) => <HomeTabBarComponent {...props} />}>
      <TabMainNavigator.Screen name={HOME_SCREEN} component={HomeScreen} />
      <TabMainNavigator.Screen name={RESTAURANTS_SCREEN} component={Restaurantscreen} />
      <TabMainNavigator.Screen name={SEARCH_SCREEN} component={Searchscreen} />
      <TabMainNavigator.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
    </TabMainNavigator.Navigator>
  );
};

export default TabNavigation;
