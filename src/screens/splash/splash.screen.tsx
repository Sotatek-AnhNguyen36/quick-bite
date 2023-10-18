import Images from 'assets/images';
import { GlobalVariable, IToken } from 'constants/global-variable';
import { useMyTheme } from 'hooks/useMyTheme';
import 'i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet } from 'react-native';
import { MAIN_SCREEN, SPLASH_SCREEN } from 'routing/screen-name';
import { navigate, resetStack } from 'routing/service-navigation';
import { EThemeColor, getThemeColor } from 'themes/color';
import { RouterType } from 'types/route';
import { AsyncStorageUtils, StorageKey } from 'utils/async-storage';
import { getScreenHeight, getScreenWidth } from 'utils/dimensions';

interface IParamsRoute {}

interface Props {
  route?: RouterType<IParamsRoute>;
}

const SplashScreen = (props: Props) => {
  const { i18n } = useTranslation();
  const { themeCurrent } = useMyTheme();
  const styles = myStyles(themeCurrent);

  const initLocale = React.useCallback(() => {
    const currentLocale = 'en'; // Todo
    i18n.changeLanguage(currentLocale);
  }, [i18n]);

  React.useEffect(() => {
    initLocale();
  }, [initLocale]);

  React.useEffect(() => {
    onNavigate();
  }, []);

  const onNavigate = async () => {
    const tokenInfo: IToken | null = await AsyncStorageUtils.getObject(StorageKey.TOKEN);

    let screenName = MAIN_SCREEN; // Todo - Login
    if (tokenInfo?.accessToken) {
      GlobalVariable.tokenInfo = {
        ...tokenInfo,
      };
      screenName = MAIN_SCREEN;
    }

    setTimeout(() => {
      resetStack(screenName);
      if (tokenInfo?.accessToken) {
        // onPushEventBus(EventBusName.SPLASH_INIT_VALUE);
      }
    }, 200);
  };

  return <Image source={Images.Splash} style={styles.img} />;
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    img: {
      width: getScreenWidth(),
      height: getScreenHeight(),
    },
  });
};

SplashScreen.start = (params?: IParamsRoute) => {
  navigate(SPLASH_SCREEN, params);
};

export default SplashScreen;
