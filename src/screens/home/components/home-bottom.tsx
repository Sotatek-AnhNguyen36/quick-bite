import { FontFamily } from 'assets/fonts';
import MyButton from 'components/base/my-button';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';

interface Props {
  icon: any;
  title?: any;
  des?: any;
  txtButton?: any;
}

const HomeBottomComponent = (props: Props) => {
  const { t } = useTranslation();
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { icon, title, des, txtButton } = props;

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{t(title)}</Text>
      <Text style={styles.des}>{t(des)}</Text>

      <MyButton i18nText={txtButton} textColor={colorCurrent.Main_Color} style={styles.btn} />
    </View>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: '100%',
      height: scale(180),
    },
    title: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_18,
      textAlign: 'center',
      marginTop: scale(24),
    },
    des: {
      ...FontFamily.Regular,
      color: color.Main_Color,
      fontSize: FontSize.FONT_14,
      textAlign: 'center',
      marginVertical: scale(16),
    },
    btn: {
      paddingHorizontal: scale(16),
      backgroundColor: color.transparent,
      borderWidth: 1,
      borderColor: color.Main_Color,
      marginTop: scale(8),
    },
  });
};

const HomeBottom = React.memo(HomeBottomComponent);

export default HomeBottom;
