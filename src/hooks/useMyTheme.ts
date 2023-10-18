import { GlobalVariable } from 'constants/global-variable';
import { useColorScheme } from 'react-native';
import { EThemeColor, getThemeColor } from 'themes/color';

export const useMyTheme = () => {
  const colorScheme = useColorScheme();

  // Todo
  const themeCurrent = EThemeColor.Light;

  if (colorScheme === 'dark') {
    // Todo
    // themeCurrent = EThemeColor.Dark;
  }

  GlobalVariable.themeCurrent = themeCurrent;

  const colorCurrent = getThemeColor(themeCurrent);

  return {
    themeCurrent,
    colorCurrent,
  };
};
