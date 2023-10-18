import { FontFamily } from 'assets/fonts';
import Images from 'assets/images';
import MyButton from 'components/base/my-button';
import { MyContainer } from 'components/base/my-container';
import MySpace from 'components/base/my-space';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MAIN_SCREEN, THANK_YOU_SCREEN } from 'routing/screen-name';
import { navigate } from 'routing/service-navigation';
import OrderStatusScreen from 'screens/order-status/order-status.screen';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { RouterType } from 'types/route';
import { MARGIN_BOTTOM, getStatusBarHeight } from 'utils/dimensions';
import { scale } from 'utils/scale';

interface IParamsRoute {}

interface Props {
  route?: RouterType<IParamsRoute>;
}

const ThankYouScreen = (props: Props) => {
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();

  return (
    <MyContainer contentStyle={styles.container}>
      <View style={styles.content}>
        <Image source={Images.ThanksBanner} style={styles.icHeader} />
        <Text style={styles.title}>{t('thankYou.title')}</Text>
      </View>

      <View style={styles.viewBottom}>
        <MyButton
          style={styles.btnCart}
          i18nText="thankYou.returnHome"
          backgroundColor={colorCurrent.transparent}
          textColor={colorCurrent.Main_Color}
          onPress={() => {
            navigate(MAIN_SCREEN);
          }}
        />
        <MySpace width={15} />
        <MyButton
          style={styles.btnBottom}
          i18nText="thankYou.trackOrder"
          backgroundColor={colorCurrent.Main_Color}
          onPress={() => {
            OrderStatusScreen.start();
          }}
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
      paddingTop: getStatusBarHeight(),
    },
    icHeader: {
      width: '100%',
      height: scale(184),
      marginTop: scale(40),
    },
    title: {
      textAlign: 'center',
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_24,
      marginTop: scale(28),
    },
    content: {
      flex: 1,
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

ThankYouScreen.start = (params?: IParamsRoute) => {
  navigate(THANK_YOU_SCREEN, params);
};

export default ThankYouScreen;
