import { useMyTheme } from 'hooks/useMyTheme';
import { I18nOfKey } from 'i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput as Input, StyleSheet, TextInputProps } from 'react-native';
import { EThemeColor, getThemeColor } from 'themes/color';

interface Props extends TextInputProps {
  i18nPlaceholder?: I18nOfKey;
}

const TextInputComponent = (props: Props) => {
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = myStyles(themeCurrent);
  const { t } = useTranslation();

  return (
    <Input
      {...props}
      style={[styles.container, props.style]}
      placeholder={(props?.i18nPlaceholder && t(props?.i18nPlaceholder)) || props.placeholder}
      placeholderTextColor={colorCurrent.Text_3}
      selectionColor={colorCurrent.Main_Color}
    />
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      color: color.Text_1,
      lineHeight: undefined,
      padding: 0,
      margin: 0,
    },
  });
};

const TextInput = React.memo(TextInputComponent);

export default TextInput;
