import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';
import { FontFamily } from 'assets/fonts';
import { IRestaurant } from 'types/restaurant';
import { useMyTheme } from 'hooks/useMyTheme';
import { useTranslation } from 'react-i18next';
import Svgs from 'assets/svgs';
import RestaurantDetailScreen from 'screens/restaurant-detail/restaurant-detail.screen';

interface Props {
  restaurant: IRestaurant;
}

const SearchItem = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();
  const { restaurant } = props;

  const renderImage = () => <Image source={restaurant?.image} style={styles.image} />

  const renderInfo = () => (
    <View style={styles.info}>
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.description} numberOfLines={2}>{restaurant.description}</Text>
      {renderBottomInfo()}
    </View>
  );

  const renderBottomInfo = () => (
    <View style={styles.bottom}>
      <Svgs.IcShippingFast />
      <View style={{ flex: 1 }}>
        <Text style={styles.costs}>
          {Number(restaurant.deliveryCosts) === 0 ? t('restaurants.free') : `$${restaurant.deliveryCosts}`}
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
      {renderImage()}
      {renderInfo()}
    </TouchableOpacity>
  )
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      paddingHorizontal: scale(16),
      paddingVertical: scale(24),
      flexDirection: 'row',
    },
    image: {
      width: scale(160),
      height: scale(94),
      borderRadius: scale(8),
    },
    info: {
      flex: 1,
      paddingLeft: scale(24),
    },
    name: {
      ...FontFamily.Bold,
      fontSize: scale(14),
      color: color.Main_Color,
      lineHeight: scale(22),
    },
    description: {
      flex: 1,
      paddingTop: scale(8),
      ...FontFamily.Regular,
      fontSize: scale(12),
      color: color.Main_Color,
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

export default SearchItem;
