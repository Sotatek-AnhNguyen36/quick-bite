import { scale } from 'utils/scale';
import { StyleSheet, Text, View } from 'react-native';
import { FontFamily } from 'assets/fonts';
import React from 'react';
import { EThemeColor, getThemeColor } from 'themes/color';
import { useMyTheme } from 'hooks/useMyTheme';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
}

const RestaurantDetailHeader = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t(`foods.${props.title}`)}
      </Text>
    </View>
  );
}

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      height: scale(60),
      justifyContent: 'center',
      borderTopColor: color.Main_Color,
      borderTopWidth: scale(2),
      borderBottomColor: color.Main_Color,
      borderBottomWidth: scale(2),
    },
    title: {
      ...FontFamily.Bold,
      fontSize: scale(18),
      color: color.Main_Color,
    },
  });
};

export default RestaurantDetailHeader;
