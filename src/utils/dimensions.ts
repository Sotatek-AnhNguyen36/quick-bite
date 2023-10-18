import { Dimensions, Platform, StatusBar } from 'react-native';
import { scale } from './scale';

export const getScreenWidth = () => {
  return Dimensions.get('window').width;
};

export const getScreenHeight = () => {
  return Dimensions.get('window').height;
};

export const isIphoneX = () => {
  const val = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (val.height === 780 ||
      val.width === 780 ||
      val.height === 812 ||
      val.width === 812 ||
      val.height === 844 ||
      val.width === 844 ||
      val.height === 896 ||
      val.width === 896 ||
      val.height === 926 ||
      val.width === 926 ||
      val.height === 932 ||
      val.width === 932 ||
      val.height === 852 ||
      val.width === 852)
  );
};

export function ifIphoneX(iPhoneXHeight: number, iPhoneNormalHeight: number) {
  if (isIphoneX()) {
    return iPhoneXHeight;
  }
  return iPhoneNormalHeight;
}

export const getStatusBarHeight = (safe = true) => {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
};

export const getBottomSpace = (): number => {
  return isIphoneX() ? 34 : 0;
};

export const MARGIN_BOTTOM = getBottomSpace() + ifIphoneX(0, scale(20));
