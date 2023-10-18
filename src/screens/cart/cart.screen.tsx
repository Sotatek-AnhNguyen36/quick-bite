import { FontFamily } from 'assets/fonts';
import MyButton from 'components/base/my-button';
import { MyContainer } from 'components/base/my-container';
import { useMyTheme } from 'hooks/useMyTheme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CART_SCREEN } from 'routing/screen-name';
import { goBack, navigate } from 'routing/service-navigation';
import CheckoutScreen from 'screens/checkout/checkout.screen';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { RouterType } from 'types/route';
import { getStatusBarHeight, MARGIN_BOTTOM } from 'utils/dimensions';
import { scale } from 'utils/scale';
import MyIconButton from 'components/base/my-icon-button';
import Svgs from 'assets/svgs';
import { IFood, IRestaurant } from 'types/restaurant';

interface IParamsRoute {
  restaurant: IRestaurant;
  food: IFood;
  quantity: number;
}

interface Props {
  route?: RouterType<IParamsRoute>;
}

const CartScreen = (props: Props) => {
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();
  const { restaurant, food, quantity } = props.route?.params || {};
  const [_quantity, _setQuantity] = useState<number>(quantity!);

  const subtotal = Number(food?.price) * Number(_quantity);
  const total = Number(subtotal) + Number(restaurant?.deliveryCosts);

  const onMinus = () => _setQuantity(_quantity - 1);

  const onPlus = () => _setQuantity(_quantity + 1);

  const goToCheckout = () => CheckoutScreen.start({ restaurant: restaurant!, food: food!, quantity: quantity! });

  return (
    <MyContainer contentStyle={styles.container}>
      <MyIconButton icon={'IcAngleLeft'} onPress={goBack} customStyle={styles.icBack} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.sc}>
        <Text style={styles.title}>{t('cart.title')}</Text>
        <View style={styles.line} />

        <View style={styles.viewItem}>
          <Text style={styles.nameItem}>{food?.name}</Text>

          <Text style={styles.price}>${food?.price}</Text>
        </View>

        <View style={styles.viewQty}>
          <Text style={styles.txtQty}>{t('cart.qty')}</Text>

          <View style={styles.inputQty}>
            <TouchableOpacity style={styles.iconQty} onPress={onMinus} disabled={_quantity < 2}>
              <Svgs.IcMinus />
            </TouchableOpacity>
            <Text style={styles.valQty}>{_quantity}</Text>
            <TouchableOpacity style={styles.iconQty} onPress={onPlus}>
              <Svgs.IcPlus />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.viewCal}>
          <Text style={styles.txtCal}>{t('cart.subTotal')}</Text>
          <Text style={styles.price}>${Number(subtotal).toFixed(2)}</Text>
        </View>
        <View style={styles.viewCal}>
          <Text style={styles.txtCal}>{t('cart.deliveryCosts')}</Text>
          <Text style={styles.price}>${restaurant?.deliveryCosts}</Text>
        </View>
        <View style={styles.viewCal}>
          <Text style={[styles.txtCal, { ...FontFamily.Bold }]}>{t('cart.total')}</Text>
          <Text style={[styles.price, { ...FontFamily.Bold }]}>${Number(total).toFixed(2)}</Text>
        </View>
      </ScrollView>

      <MyButton
        backgroundColor={colorCurrent.Main_Color}
        i18nText="cart.checkout"
        style={styles.btnCheckout}
        onPress={goToCheckout}
      />
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
    title: {
      marginTop: scale(36),
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_18,
    },
    line: {
      height: 2,
      backgroundColor: color.Main_Color,
      width: '100%',
      marginVertical: scale(12),
    },
    viewItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    nameItem: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_16,
      flex: 1,
    },
    price: {
      ...FontFamily.Regular,
      color: color.Main_Color,
      fontSize: FontSize.FONT_16,
    },
    viewQty: {
      flexDirection: 'row',
      marginTop: scale(30),
    },
    txtQty: {
      ...FontFamily.Regular,
      color: color.Main_Color,
      fontSize: FontSize.FONT_16,
      flex: 1,
      alignSelf: 'flex-end',
    },
    inputQty: {
      flexDirection: 'row',
      alignItems: 'center',
      height: scale(48),
      borderRadius: scale(8),
      backgroundColor: color.White,
      paddingHorizontal: scale(8),
    },
    iconQty: {
      width: scale(30),
      height: scale(30),
      alignItems: 'center',
      justifyContent: 'center',
    },
    valQty: {
      minWidth: scale(30),
      textAlign: 'center',
      ...FontFamily.SemiBold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_14,
      marginHorizontal: scale(8),
    },
    viewCal: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scale(8),
    },
    txtCal: {
      ...FontFamily.Regular,
      color: color.Main_Color,
      fontSize: FontSize.FONT_16,
      flex: 1,
    },
    btnCheckout: {
      marginBottom: MARGIN_BOTTOM,
    },
  });
};

CartScreen.start = (params?: IParamsRoute) => {
  navigate(CART_SCREEN, params);
};

export default CartScreen;
