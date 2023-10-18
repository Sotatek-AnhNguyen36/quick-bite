import { FontFamily } from 'assets/fonts';
import Images from 'assets/images';
import MyButton from 'components/base/my-button';
import { MyContainer } from 'components/base/my-container';
import MySpace from 'components/base/my-space';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CHECKOUT_SCREEN } from 'routing/screen-name';
import { goBack, navigate } from 'routing/service-navigation';
import CartFinalScreen from 'screens/cart-final/cart-final.screen';
import CartItem from 'screens/cart/components/cart-item';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { RouterType } from 'types/route';
import { MARGIN_BOTTOM, getStatusBarHeight } from 'utils/dimensions';
import { scale } from 'utils/scale';
import CheckoutOption from './components/checkout-option';
import MyIconButton from 'components/base/my-icon-button';
import Svgs from 'assets/svgs';
import ThankYouScreen from 'screens/thank-you/thank-you.screen';
import { IFood, IRestaurant } from 'types/restaurant';

interface IParamsRoute {
  restaurant: IRestaurant;
  food: IFood;
  quantity: number;
}

interface Props {
  route?: RouterType<IParamsRoute>;
}

const CheckoutScreen = (props: Props) => {
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();
  const { restaurant, food, quantity } = props.route?.params || {};

  const subtotal = Number(food?.price) * Number(quantity);
  const total = Number(subtotal) + Number(restaurant?.deliveryCosts);

  const goToShoppingCartFinal = () => CartFinalScreen.start({ restaurant: restaurant!, food: food!, quantity: quantity! });

  const goToThankYou = () => ThankYouScreen.start();

  return (
    <MyContainer contentStyle={styles.container}>
      <View style={styles.header}>
        <MyIconButton icon={'IcAngleLeft'} onPress={goBack} customStyle={styles.icBack} />
        <MyIconButton icon={'IcShoppingCart'} customStyle={styles.icBack} onPress={goToShoppingCartFinal} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.sc}>
        <Image source={Images.CheckoutBanner} style={styles.icHeader} />

        <Text style={styles.title}>{t('cart.checkout')}</Text>
        <Text style={styles.resName}>{restaurant?.name}</Text>

        <View style={styles.line} />
        <Text style={styles.deliveryMethod}>{t('cart.method')}</Text>
        <View style={styles.line} />

        <CheckoutOption
          title={t('cart.deliveryTime', { time: 35 })}
          des={t('cart.homeAddress')}
          icon={'IcShippingFast'}
        />
        <View style={styles.line} />

        <CheckoutOption title={t('cart.noContact')} des={t('cart.leaveOrder')} />
        <View style={styles.line} />

        <Text style={styles.deliveryMethod}>{t('cart.selectedItems')}</Text>
        <View style={styles.line} />
        <CartItem food={food!} quantity={quantity!} />
        <View style={styles.line} />

        <View style={styles.viewMore}>
          <Svgs.IcPlus />

          <Text style={styles.txtAddMore}>{t('cart.addMore')}</Text>
        </View>

        <View style={styles.line} />

        <Text style={styles.deliveryMethod}>{t('cart.paymentDetail')}</Text>
        <View style={styles.line} />

        <CheckoutOption title={t('cart.paymentMethod')} des={t('cart.paymentCard')} icon={'IcCreditCart'} />
        <View style={styles.line} />

        <CheckoutOption title={t('cart.tip')} des={t('cart.tipDes')} icon={'IcTips'} />
        <View style={styles.line} />

        <MySpace height={MARGIN_BOTTOM} />
      </ScrollView>

      <View style={styles.viewBottom}>
        <MyButton
          style={styles.btnCart}
          i18nText="cart.title"
          backgroundColor={colorCurrent.transparent}
          textColor={colorCurrent.Main_Color}
          onPress={goToShoppingCartFinal}
        />
        <MySpace width={15} />
        <MyButton
          style={styles.btnBottom}
          originText={`${t('cart.pay')} $${Number(total).toFixed(2)}`}
          backgroundColor={colorCurrent.Main_Color}
          onPress={goToThankYou}
        />
      </View>
    </MyContainer>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      paddingHorizontal: scale(16),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: getStatusBarHeight() + scale(10),
      marginBottom: scale(8),
    },
    icBack: {
      borderRadius: scale(8),
    },
    icHeader: {
      width: '100%',
      marginTop: scale(30),
      height: scale(184),
    },
    sc: {
      flex: 1,
    },
    title: {
      marginTop: scale(24),
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_24,
    },
    resName: {
      marginTop: scale(8),
      ...FontFamily.Regular,
      color: color.Main_Color,
      fontSize: FontSize.FONT_16,
    },
    line: {
      height: 2,
      backgroundColor: color.Main_Color,
      width: '100%',
      marginVertical: scale(16),
    },
    deliveryMethod: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_18,
    },
    viewMore: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    txtAddMore: {
      ...FontFamily.Regular,
      color: color.Main_Color,
      fontSize: FontSize.FONT_12,
      paddingLeft: scale(20),
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

CheckoutScreen.start = (params?: IParamsRoute) => {
  navigate(CHECKOUT_SCREEN, params);
};

export default CheckoutScreen;
