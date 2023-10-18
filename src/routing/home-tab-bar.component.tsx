import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FontFamily } from 'assets/fonts';
import SvgIcon from 'assets/svgs';
import MyText from 'components/base/my-text';
import { useMyTheme } from 'hooks/useMyTheme';
import { I18nOfKey } from 'i18n';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { EThemeColor, getThemeColor } from 'themes/color';
import { getBottomSpace, ifIphoneX } from 'utils/dimensions';
import { scale } from 'utils/scale';
import { HOME_SCREEN, PROFILE_SCREEN, RESTAURANTS_SCREEN, SEARCH_SCREEN } from './screen-name';
import { navigate } from './service-navigation';

const HomeTabBarComponent = (props: BottomTabBarProps) => {
  const { state } = props;

  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = myStyles(themeCurrent);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {state?.routeNames?.map((e, i) => {
          const isFocused = state.index === i;

          const onPress = () => {
            if (!isFocused) {
              navigate(e);
            }
          };

          const color = isFocused ? colorCurrent.Main_Color : colorCurrent.Main_Color_2;

          let i18nTitle: I18nOfKey;

          const renderIcon = () => {
            switch (e) {
              case HOME_SCREEN:
                i18nTitle = 'tabBar.home';
                return <SvgIcon.IcTabHome color={color} />;
              case RESTAURANTS_SCREEN:
                i18nTitle = 'tabBar.restaurants';
                return <SvgIcon.IcTabRestaurants color={color} />;
              case SEARCH_SCREEN:
                i18nTitle = 'tabBar.search';
                return <SvgIcon.IcTabSearch color={color} />;
              case PROFILE_SCREEN:
                i18nTitle = 'tabBar.profile';
                return <SvgIcon.IcTabProfile color={color} />;
            }
          };

          return (
            <TouchableOpacity key={e} style={styles.btnTab} onPress={onPress}>
              {renderIcon()}
              <MyText
                i18nText={i18nTitle}
                style={[
                  styles.title,
                  {
                    color,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    main: {
      paddingBottom: ifIphoneX(getBottomSpace(), scale(0)),
      backgroundColor: color.BG_Color,
    },
    container: {
      flexDirection: 'row',
      backgroundColor: color.BG_Color,
      height: scale(62),
      alignItems: 'center',
      shadowColor: color.BG_Color_Shadow,
      shadowOffset: { width: 0, height: -5 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 20,
    },
    btnTab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...FontFamily.Medium,
      fontSize: scale(12),
      marginTop: scale(4),
    },
  });
}

export default HomeTabBarComponent;
