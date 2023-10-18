import { useMyTheme } from 'hooks/useMyTheme';
import * as React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { EThemeColor, getThemeColor } from 'themes/color';

interface Props {
  children?: any;
  contentStyle?: ViewStyle;
  style?: ViewStyle;
  isTouchableWithoutFeedback?: boolean;
  onPressTouchableWithoutFeedback?: () => void;
}

export const MyContainer = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = myStyles(themeCurrent);

  const renderContent = () => {
    return (
      <View style={[styles.container, props.style]}>
        <View style={[styles.contentStyle, props.contentStyle]}>{props.children}</View>
      </View>
    );
  };

  if (props?.isTouchableWithoutFeedback) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          props?.onPressTouchableWithoutFeedback?.();
        }}>
        {renderContent()}
      </TouchableWithoutFeedback>
    );
  }

  return renderContent();
};

const myStyles = (themeCurrent: EThemeColor) =>
  StyleSheet.create({
    container: {
      backgroundColor: getThemeColor(themeCurrent).BG_Color,
      flex: 1,
    },
    contentStyle: {
      backgroundColor: getThemeColor(themeCurrent).BG_Color,
      flex: 1,
      overflow: 'hidden',
    },
  });
