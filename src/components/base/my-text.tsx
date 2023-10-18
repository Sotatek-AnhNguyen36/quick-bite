import { FontFamily } from 'assets/fonts';
import { useMyTheme } from 'hooks/useMyTheme';
import { I18nOfKey } from 'i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextProps } from 'react-native';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';

interface Props extends TextProps {
  originText?: string;
  i18nText?: I18nOfKey;
  i18nParams?: {
    [key: string]: string | number;
  };
}

const MyTextComponent = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = myStyles(themeCurrent);
  const { t } = useTranslation();

  const { originText, i18nText, i18nParams } = props;

  return (
    <Text style={[styles.container, props?.style]}>
      {originText || ''}
      {(i18nText && t(i18nText, i18nParams)) || ''}
      {props?.children}
    </Text>
  );
};

const MyText = React.memo(MyTextComponent);

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      ...FontFamily.Regular,
      color: color.Text_1,
      fontSize: FontSize.FONT_14,
    },
  });
};

export default MyText;
