import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';
import { FontFamily } from 'assets/fonts';
import { useMyTheme } from 'hooks/useMyTheme';
import { useTranslation } from 'react-i18next';
import { IRestaurant } from 'types/restaurant';
import Svgs from 'assets/svgs';
import RestaurantDetailScreen from 'screens/restaurant-detail/restaurant-detail.screen';

interface Props {
  restaurant: IRestaurant;
}

const RestaurantItem = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();
  const { restaurant } = props;

  const renderBanner = () => (
    <ImageBackground source={restaurant?.image} style={styles.image} imageStyle={styles.imageStyle}>
      <View style={styles.deliveryInContainer}>
        <Text style={styles.deliveryIn}>{restaurant.deliveryIn}</Text>
      </View>
    </ImageBackground>
  );

  const renderBottom = () => (
    <View style={styles.bottom}>
      <Svgs.IcShippingFast />
      <View style={{ flex: 1 }}>
        <Text style={styles.costs}>
          {Number(restaurant.deliveryCosts) === 0 ? t('restaurants.free_delivery') : `$${restaurant.deliveryCosts}`}
        </Text>
      </View>
      <Text style={styles.costs}>
        $$$
        <Text style={styles.costsGray}>$$</Text>
      </Text>
    </View>
  );

  const goRestaurantDetail = () => RestaurantDetailScreen.start({ restaurant });

  return (
    <TouchableOpacity style={styles.container} onPress={goRestaurantDetail}>
      {renderBanner()}
      <Text style={styles.title}>{restaurant?.name}</Text>
      <Text style={styles.description} numberOfLines={1}>{restaurant?.description}</Text>
      {renderBottom()}
    </TouchableOpacity>
  )
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      width: scale(200),
      backgroundColor: color.White,
      padding: scale(8),
      borderRadius: scale(8),
    },
    image: {
      width: scale(184),
      height: scale(80),
      resizeMode: 'contain',
      marginBottom: scale(8),
    },
    imageStyle: {
      borderRadius: scale(6),
    },
    deliveryInContainer: {
      backgroundColor: color.White,
      marginTop: scale(4),
      marginRight: scale(4),
      alignSelf: 'flex-end',
      height: scale(24),
      borderRadius: scale(6),
      paddingHorizontal: scale(6),
      justifyContent: 'center',
    },
    deliveryIn: {
      ...FontFamily.SemiBold,
      fontSize: scale(10),
      color: color.Main_Color,
    },
    title: {
      ...FontFamily.Bold,
      fontSize: scale(14),
      color: color.Main_Color,
    },
    description: {
      ...FontFamily.Regular,
      fontSize: scale(10),
      color: color.Black_2,
    },
    bottom: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: scale(12),
    },
    costs: {
      ...FontFamily.SemiBold,
      fontSize: scale(14),
      paddingLeft: scale(12),
      color: color.Main_Color,
    },
    costsGray: {
      color: color.Gray,
    },
  });
};

export default RestaurantItem;
