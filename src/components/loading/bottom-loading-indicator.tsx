import { getThemeColor } from 'themes/color';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  style?: ViewStyle;
}

export const BottomLoadingIndicator = (props: Props) => (
  <View style={[styles.container, props.style]}>
    <ActivityIndicator size="small" color={getThemeColor().Main_Color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
