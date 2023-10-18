import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EThemeColor, getThemeColor } from 'themes/color';
import { useMyTheme } from 'hooks/useMyTheme';
import { ITopping } from 'types/restaurant';
import { scale } from 'utils/scale';
import { FontFamily } from 'assets/fonts';
import Svgs from 'assets/svgs';

interface Props {
  item: ITopping;
  onPress: (item: ITopping) => void;
}

const ToppingItem = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { item, onPress } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onPress(item)}>
        {item.selected ? <Svgs.IcCheck /> : null}
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>+${item.price}</Text>
    </View>
  );
}


const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: scale(4),
      alignItems: 'center',
    },
    button: {
      width: scale(24),
      height: scale(24),
      borderColor: color.Main_Color,
      borderWidth: scale(1),
      borderRadius: scale(4),
      marginRight: scale(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      flex: 1,
      ...FontFamily.Regular,
      fontSize: scale(14),
      color: color.Main_Color,
    },
    price: {
      ...FontFamily.Regular,
      fontSize: scale(14),
      color: color.Main_Color,
    },
  });
};

export default ToppingItem;
