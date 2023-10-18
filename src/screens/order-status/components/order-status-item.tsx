import { FontFamily } from 'assets/fonts';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';
import Svgs from 'assets/svgs';

interface Props {
  isActive?: boolean;
  number?: number;
  title?: string | any;
  value?: string | any;
}

const OrderStatusItemComponent = (props: Props) => {
  const { t } = useTranslation();
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { isActive, number, title, value } = props;

  return (
    <View style={styles.container}>
      <View style={[styles.line, isActive && { backgroundColor: colorCurrent.Color_F8D750 }]} />

      <View
        style={[
          styles.viewNumber,
          isActive && { backgroundColor: colorCurrent.Color_F8D750, borderColor: colorCurrent.Color_F8D750 },
        ]}>
        <Text style={styles.number}>{number}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{t(title)}</Text>
        <Text style={styles.value}>{t(value)}</Text>
      </View>

      <View style={styles.icRight}>
        <Svgs.IcChevronRight />
      </View>
    </View>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    line: {
      width: 2,
      backgroundColor: color.Color_A8A8A8,
    },
    content: {
      flex: 1,
    },
    viewNumber: {
      marginHorizontal: scale(16),
      width: scale(36),
      height: scale(24),
      borderRadius: scale(24),
      borderWidth: 1,
      borderColor: color.Color_A8A8A8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    number: {
      ...FontFamily.Bold,
      fontSize: FontSize.FONT_14,
      color: color.Main_Color,
    },
    title: {
      ...FontFamily.Bold,
      fontSize: FontSize.FONT_14,
      color: color.Main_Color,
    },
    value: {
      ...FontFamily.Regular,
      fontSize: FontSize.FONT_14,
      color: color.Text_4E4E4E,
      lineHeight: scale(22),
    },
    icRight: {
      alignSelf: 'center',
    },
  });
};

const OrderStatusItem = React.memo(OrderStatusItemComponent);

export default OrderStatusItem;
