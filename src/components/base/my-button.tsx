import { FontFamily } from 'assets/fonts';
import { useMyTheme } from 'hooks/useMyTheme';
import { I18nOfKey } from 'i18n';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';
import { FontSize } from 'themes';

interface Props extends TouchableOpacityProps {
  textStyle?: StyleProp<TextStyle>;
  originText?: string;
  i18nText?: I18nOfKey;
  isBorder?: boolean;
  textColor?: string;
  backgroundColor?: string;
  disabled?: boolean;
  marginTop?: number;
}

const MyButtonComponent = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = myStyles(themeCurrent);
  const { t } = useTranslation();

  const { backgroundColor = getThemeColor().Support_Color_Purple, textColor = getThemeColor().White } = props;

  let colorTxt = getThemeColor().White;
  if (props?.isBorder) {
    colorTxt = getThemeColor().Support_Color_Purple;
  }
  if (textColor) {
    colorTxt = textColor;
  }

  // const bkaColor = props?.disabled
  //   ? getThemeColor().secondary
  //   : backgroundColor;

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={props?.activeOpacity || 0.8}
      style={[
        styles.container,
        {
          backgroundColor: props?.isBorder ? getThemeColor().transparent : backgroundColor,
          borderColor: props?.isBorder ? getThemeColor(themeCurrent).Support_Color_Purple : undefined,
          marginTop: props?.marginTop || undefined,
          opacity: props?.disabled ? 0.3 : 1,
        },
        props?.style,
      ]}
      onPress={props?.onPress}
      disabled={props?.disabled}>
      <Text
        style={[
          styles.text,
          {
            color: colorTxt,
          },
          props?.textStyle,
        ]}>
        {(props?.i18nText && t(props?.i18nText)) || ''}
        {props?.originText || ''}
      </Text>
    </TouchableOpacity>
  );
};

const myStyles = (themeCurrent: EThemeColor) =>
  StyleSheet.create({
    container: {
      height: scale(48),
      paddingHorizontal: scale(5),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(8),
    },
    text: {
      ...FontFamily.SemiBold,
      fontSize: FontSize.FONT_14,
    },
  });

const MyButton = React.memo(MyButtonComponent);

export default MyButton;
