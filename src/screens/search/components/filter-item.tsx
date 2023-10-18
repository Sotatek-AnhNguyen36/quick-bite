import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';
import { FontFamily } from 'assets/fonts';
import { useMyTheme } from 'hooks/useMyTheme';
import { useTranslation } from 'react-i18next';
import { IRestaurantFilter } from 'types/restaurant';

interface Props {
  item: IRestaurantFilter;
  onPress: (item: IRestaurantFilter) => void;
}

const FilterItem = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();
  const { item, onPress } = props;

  return (
    <TouchableOpacity
      style={item.selected ? styles.containerActive : styles.containerInactive}
      onPress={() => onPress(item)}
    >
      <Text style={item.selected ? styles.textActive : styles.textInactive}>{t(item.title)}</Text>
    </TouchableOpacity>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    containerActive: {
      backgroundColor: color.Main_Color,
      height: scale(38),
      paddingHorizontal: scale(12),
      borderRadius: scale(24),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(12),
      marginBottom: scale(12),
    },
    containerInactive: {
      borderColor: color.Main_Color,
      borderWidth: scale(1),
      height: scale(38),
      paddingHorizontal: scale(12),
      borderRadius: scale(24),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(12),
      marginBottom: scale(12),
    },
    textActive: {
      ...FontFamily.SemiBold,
      fontSize: scale(14),
      color: color.White,
    },
    textInactive: {
      ...FontFamily.Regular,
      fontSize: scale(14),
      color: color.Main_Color,
    },
  });
};

export default FilterItem;
