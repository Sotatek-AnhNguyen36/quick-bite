import { FontFamily } from 'assets/fonts';
import Images from 'assets/images';
import { MyContainer } from 'components/base/my-container';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ORDER_STATUS_SCREEN } from 'routing/screen-name';
import { goBack, navigate } from 'routing/service-navigation';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';
import OrderStatusItem from './components/order-status-item';
import MyIconButton from 'components/base/my-icon-button';

interface IParamsRoute {}

const OrderStatusScreen = () => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();

  return (
    <MyContainer contentStyle={styles.container}>
      <ScrollView style={styles.content}>
        <Image source={Images.BkaMap} style={styles.icHeader} />

        <MyIconButton icon={'IcClose'} onPress={goBack} customStyle={styles.icX} />

        <View style={styles.viewRound}>
          <View style={styles.round} />
        </View>

        <View style={styles.viewMin}>
          <Text style={styles.min}>35 min</Text>
        </View>

        <View style={styles.viewFlex}>
          <Text style={styles.title}>{t('orderStatus.title')}</Text>
          <Text style={styles.delivered}>{t('orderStatus.delivered')}</Text>
        </View>

        <View style={styles.line} />

        <OrderStatusItem number={1} title={'orderStatus.status1'} value={'orderStatus.status1Des'} isActive />
        <View style={styles.line} />

        <OrderStatusItem number={2} title={'orderStatus.status2'} value={'orderStatus.status2Des'} />
        <View style={styles.line} />

        <OrderStatusItem number={3} title={'orderStatus.status3'} value={'orderStatus.status3Des'} />
        <View style={styles.line} />
      </ScrollView>
    </MyContainer>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      backgroundColor: color.BG_Color_Shadow,
    },
    content: {
      flex: 1,
      borderTopLeftRadius: scale(16),
      borderTopRightRadius: scale(16),
      // marginTop: getStatusBarHeight() + scale(20),
      shadowColor: color.BG_Color_Shadow,
      shadowOffset: { width: 0.5, height: 1 },
      shadowOpacity: 2,
      shadowRadius: 2,
      elevation: 2,
      padding: scale(16),
      backgroundColor: color.BG_Color,
      borderColor: color.transparent,
    },
    icHeader: {
      width: '100%',
      height: scale(184),
      resizeMode: 'contain',
    },
    icX: {
      position: 'absolute',
      top: scale(8),
      right: scale(8),
      borderRadius: scale(8),
    },
    viewRound: {
      width: scale(32),
      height: scale(32),
      borderRadius: scale(16),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#A4A7B7',
      position: 'absolute',
      top: scale(98),
      left: scale(95),
    },
    round: {
      width: scale(24),
      height: scale(24),
      borderRadius: scale(16),
      backgroundColor: color.Main_Color,
    },
    viewMin: {
      width: scale(96),
      height: scale(96),
      borderRadius: scale(96),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.Main_Color,
      position: 'absolute',
      top: scale(136),
      right: 0,
    },
    min: {
      ...FontFamily.Bold,
      color: color.White,
      fontSize: FontSize.FONT_18,
    },
    viewFlex: {
      marginTop: scale(48),
      flexDirection: 'row',
    },
    title: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_24,
      flex: 1,
    },
    delivered: {
      ...FontFamily.Regular,
      color: color.Main_Color,
      fontSize: FontSize.FONT_12,
      alignSelf: 'flex-end',
      marginBottom: scale(3),
    },
    line: {
      height: 2,
      backgroundColor: color.Main_Color,
      width: '100%',
      marginVertical: scale(16),
    },
  });
};

OrderStatusScreen.start = (params?: IParamsRoute) => {
  navigate(ORDER_STATUS_SCREEN, params);
};

export default OrderStatusScreen;
