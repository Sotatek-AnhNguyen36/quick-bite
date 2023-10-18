import { getThemeColor } from 'themes/color';
import * as React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';

export interface LoadingViewProps {
  style?: StyleProp<ViewStyle>;
  top?: number;
}

export default class LoadingView extends React.PureComponent<LoadingViewProps> {
  public render() {
    const { top: marginTop } = this.props;
    return (
      <View style={[styles.container, { marginTop }, this.props.style]}>
        <ActivityIndicator size="small" color={getThemeColor().Main_Color} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
