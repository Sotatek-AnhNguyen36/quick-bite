import { BlurView } from '@react-native-community/blur';
import { StyleSheet, Text, View } from 'react-native';

import { ToastConfig } from 'react-native-toast-message';

import { getThemeColor } from 'themes/color';
import { getScreenWidth, getStatusBarHeight } from 'utils/dimensions';
import { scale } from 'utils/scale';

export const toastConfig: ToastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  CustomSuccess: ({ text1 }) => (
    <View style={styles.viewToast}>
      <Text style={styles.textToast}>{text1}</Text>
    </View>
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  CustomError: ({ text1 }) => (
    <View
      style={[
        styles.viewToast,
        {
          backgroundColor: getThemeColor().Support_Color_Red,
        },
      ]}>
      <Text style={styles.textToast}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  viewToast: {
    flex: 1,
    backgroundColor: getThemeColor().Button_Green,
    height: scale(46),
    width: getScreenWidth() - scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(46),
    marginTop: getStatusBarHeight(),
  },
  textToast: {
    fontSize: scale(14),
    color: getThemeColor().White,
    fontWeight: '700',
  },
});
