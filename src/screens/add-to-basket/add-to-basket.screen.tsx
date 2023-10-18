import { FontFamily } from 'assets/fonts';
import { MyContainer } from 'components/base/my-container';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ADD_TO_BASKET_SCREEN } from 'routing/screen-name';
import { goBack, navigate } from 'routing/service-navigation';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { RouterType } from 'types/route';
import { MARGIN_BOTTOM, getStatusBarHeight } from 'utils/dimensions';
import { scale } from 'utils/scale';
import AddToBasketItem from './components/add-to-basket-item';
import MyButton from 'components/base/my-button';
import MySpace from 'components/base/my-space';
import MyIconButton from 'components/base/my-icon-button';
import { IFood, IRestaurant } from 'types/restaurant';
import CheckoutScreen from 'screens/checkout/checkout.screen';
import CartScreen from 'screens/cart/cart.screen';

interface IParamsRoute {
  restaurant: IRestaurant;
  food: IFood;
  foodType: string;
  quantity: number;
}

interface Props {
  route?: RouterType<IParamsRoute>;
}

const AddToBasketScreen = (props: Props) => {
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();
  const { restaurant, food, foodType, quantity } = props.route?.params || {};

  const goToCheckout = () => CheckoutScreen.start({ restaurant: restaurant!, food: food!, quantity: quantity! });

  const goToShoppingCart = () => CartScreen.start({ restaurant: restaurant!, food: food!, quantity: quantity! });

  return (
    <MyContainer contentStyle={styles.container}>
      <MyIconButton icon={'IcAngleLeft'} onPress={goBack} customStyle={styles.icBack} />

      <ScrollView style={styles.sc}>
        <Image
          source={restaurant?.image!}
          style={styles.img}
        />

        <Text style={styles.title}>{restaurant?.name}</Text>
        <View style={styles.line} />

        <Text style={styles.des}>{t(`foods.${foodType}`)}</Text>
        <View style={styles.line} />
        <AddToBasketItem food={food!} />
        <View style={styles.line} />

        <MySpace height={MARGIN_BOTTOM} />
      </ScrollView>

      <View style={styles.viewBottom}>
        <MyButton
          style={styles.btnCart}
          i18nText="cart.title"
          backgroundColor={colorCurrent.transparent}
          textColor={colorCurrent.Main_Color}
          onPress={goToShoppingCart}
        />
        <MySpace width={15} />
        <MyButton
          style={styles.btnBottom}
          i18nText="cart.checkout"
          backgroundColor={colorCurrent.Main_Color}
          onPress={goToCheckout}
        />
      </View>
    </MyContainer>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      paddingTop: getStatusBarHeight() + scale(16),
      paddingHorizontal: scale(16),
    },
    icBack: {
      borderRadius: scale(8),
    },
    sc: {
      flex: 1,
    },
    img: {
      width: '100%',
      height: scale(184),
      borderRadius: scale(8),
      marginTop: scale(32),
    },
    line: {
      height: 2,
      backgroundColor: color.Main_Color,
      width: '100%',
      marginVertical: scale(16),
    },
    title: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_24,
      marginTop: scale(24),
      marginBottom: scale(16),
    },
    des: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_18,
    },
    viewBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: MARGIN_BOTTOM,
      marginTop: scale(10),
    },
    btnBottom: {
      flex: 1,
    },
    btnCart: {
      flex: 1,
      borderWidth: 1,
      borderColor: color.Main_Color,
    },
  });
};

AddToBasketScreen.start = (params?: IParamsRoute) => {
  navigate(ADD_TO_BASKET_SCREEN, params);
};

export default AddToBasketScreen;
