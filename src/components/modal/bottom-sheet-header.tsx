import SvgIcon from 'assets/svgs';
import MyText from 'components/base/my-text';
import { useMyTheme } from 'hooks/useMyTheme';
import { I18nOfKey } from 'i18n';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { EThemeColor, getThemeColor } from 'themes/color';
import { getButtonHitSlop } from 'utils/functions';
import { scale } from 'utils/scale';

export interface BottomSheetHeaderProps {
  onPressLeftHeader?: () => void;
  i18nTitle?: I18nOfKey;
  i18nRight?: I18nOfKey;
  onPressRightHeader?: () => void;
}

const BottomSheetHeaderComponent = (props: BottomSheetHeaderProps) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { i18nTitle, i18nRight, onPressLeftHeader, onPressRightHeader } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnClose} hitSlop={getButtonHitSlop()} onPress={onPressLeftHeader}>
        <SvgIcon.IcClose />
      </TouchableOpacity>
      <MyText i18nText={i18nTitle} style={styles.title} />

      <TouchableOpacity style={styles.btnRight} hitSlop={getButtonHitSlop()} onPress={onPressRightHeader}>
        {i18nRight ? <MyText i18nText={i18nRight} style={styles.txrRight} /> : null}
      </TouchableOpacity>
    </View>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: scale(47),
      borderBottomWidth: 1,
      borderBottomColor: color.Bottom_Line,
    },
    title: {
      textAlign: 'center',
      flex: 1,
    },
    btnClose: {
      position: 'absolute',
      left: 0,
      zIndex: 1,
      paddingHorizontal: scale(16),
    },
    btnRight: {
      position: 'absolute',
      right: 0,
      zIndex: 1,
      paddingHorizontal: scale(16),
    },
    txrRight: {
      color: color.Support_Color_Purple,
    },
  });
};

const BottomSheetHeader = React.memo(BottomSheetHeaderComponent);

export default BottomSheetHeader;
