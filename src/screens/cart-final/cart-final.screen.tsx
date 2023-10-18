import { FontFamily } from 'assets/fonts';
import MyButton from 'components/base/my-button';
import { MyContainer } from 'components/base/my-container';
import MySpace from 'components/base/my-space';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { CART_FINAL_SCREEN } from 'routing/screen-name';
import { goBack, navigate } from 'routing/service-navigation';
import ThankYouScreen from 'screens/thank-you/thank-you.screen';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { RouterType } from 'types/route';
import { MARGIN_BOTTOM, getStatusBarHeight } from 'utils/dimensions';
import { scale } from 'utils/scale';
import MyIconButton from 'components/base/my-icon-button';
import { IFood, IRestaurant } from 'types/restaurant';

interface IParamsRoute {
  restaurant: IRestaurant;
  food: IFood;
  quantity: number;
}

interface Props {
  route?: RouterType<IParamsRoute>;
}

const CartFinalScreen = (props: Props) => {
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();
  const { restaurant, food, quantity } = props.route?.params || {};

  const subtotal = Number(food?.price) * Number(quantity);
  const total = Number(subtotal) + Number(restaurant?.deliveryCosts);

  return (
    <MyContainer contentStyle={styles.container}>
      <MyIconButton icon={'IcAngleLeft'} onPress={goBack} customStyle={styles.icBack} />

      <View style={styles.content}>
        <Text style={styles.title}>{t('cart.priceVat')}</Text>
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
      </View>

      <MyButton
        i18nText="cart.proceed"
        backgroundColor={colorCurrent.Main_Color}
        onPress={() => {
          ThankYouScreen.start();
        }}
      />

      <MySpace height={MARGIN_BOTTOM} />
    </MyContainer>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      paddingTop: getStatusBarHeight() + scale(10),
      paddingHorizontal: scale(16),
    },
    icBack: {
      borderRadius: scale(8),
    },
    content: {
      flex: 1,
      marginTop: scale(32),
    },
    title: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_18,
    },
    line: {
      height: 2,
      backgroundColor: color.Main_Color,
      width: '100%',
      marginVertical: scale(16),
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
    price: {
      ...FontFamily.Regular,
      color: color.Main_Color,
      fontSize: FontSize.FONT_16,
    },
  });
};

CartFinalScreen.start = (params?: IParamsRoute) => {
  navigate(CART_FINAL_SCREEN, params);
};

export default CartFinalScreen;
