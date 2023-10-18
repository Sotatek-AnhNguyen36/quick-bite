import { FontFamily } from 'assets/fonts';
import MyButton from 'components/base/my-button';
import { MyContainer } from 'components/base/my-container';
import MySpace from 'components/base/my-space';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import CartScreen from 'screens/cart/cart.screen';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { getStatusBarHeight } from 'utils/dimensions';
import { scale } from 'utils/scale';

const ProfileScreen = () => {
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();

  return (
    <MyContainer contentStyle={styles.container}>
      <MySpace height={getStatusBarHeight()} />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Text style={styles.title}>{t('quickBite')}</Text>
        <Text style={styles.createAcc}>{t('login.createAcc')}</Text>
        <Text style={styles.desLog}>{t('login.loginBelow')}</Text>

        <MyButton
          backgroundColor={colorCurrent.White}
          i18nText="login.gg"
          textColor={colorCurrent.Black}
          marginTop={20}
        />
        <MyButton
          backgroundColor={colorCurrent.Black}
          i18nText="login.apple"
          textColor={colorCurrent.White}
          marginTop={8}
        />
        <MyButton
          backgroundColor={colorCurrent.Color_3578EA}
          i18nText="login.fb"
          textColor={colorCurrent.White}
          marginTop={8}
        />

        <View style={styles.space}>
          <View style={styles.line} />
          <Text style={styles.txtOr}>{t('login.or')}</Text>
          <View style={styles.line} />
        </View>

        <TextInput
          style={styles.input}
          placeholder={t('login.email')}
          placeholderTextColor={colorCurrent.Color_A8A8A8}
        />

        <MyButton
          backgroundColor={colorCurrent.Main_Color}
          i18nText="next"
          textColor={colorCurrent.White}
          marginTop={8}
          onPress={() => {
            // Todo: Navigate to Cart Screen
            CartScreen.start();
          }}
        />

        <Text style={styles.txtBottom}>{t('login.txtBottom')}</Text>
      </ScrollView>
    </MyContainer>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      paddingHorizontal: scale(16),
    },
    title: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_18,
      marginTop: scale(16),
    },
    createAcc: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_18,
      textAlign: 'center',
      marginTop: scale(10),
    },
    desLog: {
      ...FontFamily.Regular,
      fontSize: FontSize.FONT_14,
      marginTop: scale(8),
      textAlign: 'center',
      color: color.Text_4E4E4E,
    },
    space: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: scale(20),
    },
    line: {
      height: 2,
      flex: 1,
      backgroundColor: color.Text_4E4E4E,
    },
    txtOr: {
      ...FontFamily.Regular,
      fontSize: FontSize.FONT_14,
      color: color.Text_4E4E4E,
      marginHorizontal: scale(24),
    },
    input: {
      flex: 1,
      height: scale(48),
      backgroundColor: color.White,
      borderRadius: scale(8),
      padding: 0,
      paddingHorizontal: scale(8),
      ...FontFamily.Medium,
      fontSize: FontSize.FONT_14,
    },
    txtBottom: {
      ...FontFamily.Regular,
      fontSize: FontSize.FONT_12,
      color: color.Text_4E4E4E,
      textAlign: 'center',
      marginTop: scale(24),
    },
  });
};

export default ProfileScreen;
