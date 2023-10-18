import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { getThemeColor } from 'themes/color';
import LoadingManager from './loading-manager';

const TIME_OUT = 20 * 1000;

export function showLoading(): void {
  const ref = LoadingManager.getDefault();

  if (ref) {
    ref.showLoading();
  }
}

export function hideLoading(): void {
  const ref = LoadingManager.getDefault();

  if (ref) {
    ref.hideLoading();
  }
}

export type SPINNER_TYPE =
  | 'CircleFlip'
  | 'Bounce'
  | 'Wave'
  | 'WanderingCubes'
  | 'Pulse'
  | 'ChasingDots'
  | 'ThreeBounce'
  | 'Circle'
  | '9CubeGrid'
  | 'WordPress'
  | 'FadingCircle'
  | 'FadingCircleAlt'
  | 'Arc'
  | 'ArcAlt';

export interface LoadingProps {
  spinnerSize?: number;
  spinnerType?: SPINNER_TYPE;
  spinnerColor?: any;
}

export interface LoadingState {
  isVisible: boolean;
}

export default class LoadingModal extends React.PureComponent<
  LoadingProps,
  LoadingState
> {
  loadingTimeout: any = null;

  static defaultProps = {
    spinnerSize: 40,
    spinnerType: 'Circle',
    spinnerColor: getThemeColor().Main_Color
  };

  constructor(props: LoadingProps) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentWillUnmount() {
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
  }

  hideLoading = () => {
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
    this.setState({ isVisible: false });
  };

  showLoading = () => {
    Keyboard.dismiss();

    this.loadingTimeout = setTimeout(() => {
      this.setState({ isVisible: false });
    }, TIME_OUT);
    this.setState({ isVisible: true });
  };

  render() {
    if (!this.state.isVisible) return null;
    return (
      <View style={styles.modal}>
        <Spinner
          isVisible
          size={this.props.spinnerSize}
          type={this.props.spinnerType}
          color={this.props.spinnerColor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 999
  }
});
