import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';
import { useMyTheme } from 'hooks/useMyTheme';
import Svgs from 'assets/svgs';

interface Props {
  icon: string;
  customStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const MyIconButton = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { icon, customStyle, onPress = () => {} } = props;
  const Icon = Svgs[icon];

  return (
    <TouchableOpacity
      style={[styles.container, customStyle]}
      onPress={onPress}
    >
      <Icon />
    </TouchableOpacity>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      backgroundColor: color.White,
      width: scale(32),
      height: scale(32),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scale(4),
    },
  });
};

export default MyIconButton;
