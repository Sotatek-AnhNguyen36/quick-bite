import { FontFamily } from 'assets/fonts';
import Images from 'assets/images';
import SvgIcon from 'assets/svgs';
import MyIconButton from 'components/base/my-icon-button';
import MySpace from 'components/base/my-space';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { MARGIN_BOTTOM, getStatusBarHeight } from 'utils/dimensions';
import { scale } from 'utils/scale';
import HomeBottom from './components/home-bottom';
import HomeIntro from './components/home-intro';

interface Props {}

const HomeScreen = (props: Props) => {
  const { t } = useTranslation();
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const {} = props;

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.textHeader}>{t('quickBite')}</Text>
      <MyIconButton icon={'IcShoppingCart'} />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}

      <ScrollView style={styles.sc} showsVerticalScrollIndicator={false}>
        <View style={styles.viewIconHeader}>
          <Image source={Images.ic_home_header_right} style={styles.icHeader} />
          <Image source={Images.ic_home_header_left} style={[styles.icRight]} />
        </View>

        <Text style={styles.title}>{t('home.title')}</Text>

        <View style={styles.viewSearch}>
          <TextInput placeholder={t('home.placeSearch')} placeholderTextColor={colorCurrent.Gray} style={styles.input} />

          <SvgIcon.IcTabSearch color={colorCurrent.Main_Color} width={scale(16)} height={scale(16)} />
        </View>

        <View style={styles.line} />

        <Text style={styles.howItWork}>{t('home.howItWork')}</Text>

        <HomeIntro />

        <Text style={styles.howItWork}>{t('home.workWith')}</Text>
        <View style={styles.line} />

        <HomeBottom
          icon={Images.ic_home_rider}
          title="home.bottom1"
          des="home.bottom1Des"
          txtButton="home.bottom1Button"
        />

        <View style={[styles.line, { marginVertical: scale(32) }]} />

        <HomeBottom
          icon={Images.ic_home_restaurant}
          title="home.bottom2"
          des="home.bottom2Des"
          txtButton="home.bottom2Button"
        />

        <View style={[styles.line, { marginVertical: scale(32) }]} />

        <HomeBottom
          icon={Images.ic_home_colleague}
          title="home.bottom3"
          des="home.bottom3Des"
          txtButton="home.bottom3Button"
        />
        <MySpace height={MARGIN_BOTTOM} />
      </ScrollView>
    </View>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.BG_Color,
      paddingTop: getStatusBarHeight(),
      paddingHorizontal: scale(16),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scale(16),
    },
    textHeader: {
      ...FontFamily.Bold,
      fontSize: FontSize.FONT_18,
      color: color.Main_Color,
    },
    sc: {
      flex: 1,
    },
    icHeader: {
      width: scale(69),
      height: scale(103),
      resizeMode: 'contain',
    },
    icRight: {
      width: scale(82),
      height: scale(74),
      resizeMode: 'contain',
      alignSelf: 'flex-start',
    },
    viewIconHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: scale(12),
    },
    title: {
      ...FontFamily.Bold,
      fontSize: FontSize.FONT_32,
      color: color.Main_Color,
      textAlign: 'center',
      marginTop: -scale(30),
    },
    viewSearch: {
      flexDirection: 'row',
      backgroundColor: color.White,
      marginTop: scale(40),
      height: scale(48),
      alignItems: 'center',
      borderRadius: scale(8),
      paddingHorizontal: scale(8),
      marginBottom: scale(48),
    },
    input: {
      flex: 1,
      height: scale(48),
      backgroundColor: color.White,
      borderRadius: scale(8),
      padding: 0,
      ...FontFamily.Medium,
      fontSize: FontSize.FONT_14,
    },
    line: {
      height: 1,
      backgroundColor: color.Main_Color,
      width: '100%',
      marginVertical: scale(16),
    },
    howItWork: {
      ...FontFamily.Bold,
      fontSize: FontSize.FONT_18,
      color: color.Main_Color,
    },
  });
};

export default HomeScreen;
