import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';
import { FontFamily } from 'assets/fonts';
import { FontSize } from 'themes';
import Svgs from 'assets/svgs';

interface Props {
  icon?: any;
  title?: string;
  des?: string;
}

const CheckoutOptionComponent = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { icon, title, des } = props;
  const Icon = Svgs[icon];

  return (
    <View style={styles.container}>
      {icon ? <View style={styles.icon}><Icon /></View> : null}

      <View style={styles.content}>
        <Text style={styles.title}>{title || ''}</Text>
        <Text style={styles.des}>{des || ''}</Text>
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
    icon: {
      marginRight: scale(24),
      marginTop: scale(2),
    },
    content: {
      flex: 1,
    },
    title: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_14,
    },
    des: {
      ...FontFamily.Regular,
      color: color.Text_4E4E4E,
      fontSize: FontSize.FONT_14,
    },
    icRight: {
      alignSelf: 'center',
    },
  });
};

const CheckoutOption = React.memo(CheckoutOptionComponent);

export default CheckoutOption;
