import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';
import { FontFamily } from 'assets/fonts';
import { useMyTheme } from 'hooks/useMyTheme';
import { IFood, IRestaurant } from 'types/restaurant';
import Images from 'assets/images';
import FoodDetailScreen from 'screens/food-detail/food-detail.screen';

interface Props {
  restaurant: IRestaurant;
  food: IFood;
  foodType: string;
}

const RestaurantDetailItem = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { restaurant, food, foodType } = props;

  const renderInfo = () => (
    <View style={styles.info}>
      <Text style={styles.name}>{food?.name}</Text>
      <Text style={styles.description} numberOfLines={2}>{food?.description}</Text>
      <View style={styles.bottom}>
        <Text style={styles.price}>${food?.price}</Text>
        <Image source={Images.Popular} style={styles.popular} />
      </View>
    </View>
  );

  const renderImage = () => <Image source={food?.image} style={styles.image} />

  const goFoodDetail = () => FoodDetailScreen.start({ restaurant, food, foodType });

  return (
    <TouchableOpacity style={styles.container} onPress={goFoodDetail}>
      {renderInfo()}
      {renderImage()}
    </TouchableOpacity>
  )
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: scale(8),
      paddingVertical: scale(24),
    },
    info: {
      flex: 1,
      paddingRight: scale(12),
    },
    name: {
      ...FontFamily.Bold,
      fontSize: scale(14),
      color: color.Main_Color,
    },
    description: {
      ...FontFamily.Regular,
      fontSize: scale(12),
      color: color.Main_Color,
      paddingTop: scale(8),
      flex: 1,
    },

    bottom: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: {
      ...FontFamily.Bold,
      fontSize: scale(14),
      color: color.Main_Color,
      paddingRight: scale(8),
    },
    popular: {
      width: scale(66),
      height: scale(24),
      resizeMode: 'contain',
    },
    image: {
      width: scale(160),
      height: scale(112),
      borderRadius: scale(8),
    },
  });
};

export default RestaurantDetailItem;
