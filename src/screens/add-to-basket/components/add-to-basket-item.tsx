import { FontFamily } from 'assets/fonts';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';
import Images from 'assets/images';
import { IFood, IRestaurant } from 'types/restaurant';

interface Props {
  food: IFood;
}

const AddToBasketItemComponent = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { food } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{food?.name}</Text>
        <Text style={styles.des}>{food?.description}</Text>

        <View style={styles.viewBottom}>
          <Text style={styles.price}>${food?.price}</Text>
          <Image source={Images.Popular} style={styles.popular} />
        </View>
      </View>

      <Image
        source={food?.image}
        style={styles.img}
      />
    </View>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginVertical: scale(8),
    },
    line: {
      width: 2,
      backgroundColor: color.Color_F8D750,
      marginRight: scale(12),
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      paddingRight: scale(16),
    },
    title: {
      ...FontFamily.Bold,
      fontSize: FontSize.FONT_14,
      color: color.Main_Color,
    },
    des: {
      ...FontFamily.Regular,
      fontSize: FontSize.FONT_12,
      color: color.Main_Color,
    },
    img: {
      width: scale(160),
      height: scale(122),
      borderRadius: scale(8),
    },
    viewBottom: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: {
      ...FontFamily.Bold,
      fontSize: FontSize.FONT_14,
      color: color.Main_Color,
      marginRight: scale(8),
    },
    popular: {
      width: scale(66),
      height: scale(24),
      resizeMode: 'contain',
    },
  });
};

const AddToBasketItem = React.memo(AddToBasketItemComponent);

export default AddToBasketItem;
