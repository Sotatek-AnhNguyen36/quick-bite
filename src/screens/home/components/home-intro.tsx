import { FontFamily } from 'assets/fonts';
import Images from 'assets/images';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { FontSize } from 'themes';
import { EThemeColor, getThemeColor } from 'themes/color';
import { scale } from 'utils/scale';

interface Props {}

const HomeIntroComponent = (props: Props) => {
  const { t } = useTranslation();
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const {} = props;

  const keyExtractor = (item: any, index: number) => item.id?.toString?.() || index?.toString?.();

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <View style={styles.viewItem}>
      <Image source={Images.ic_step_1} style={styles.icItem} />

      <Text style={styles.step}>{`${t('home.step')} ${index + 1}`}</Text>
      <Text style={styles.stepDes}>{t('home.stepDes')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[...new Array(3).keys()]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: color.Main_Color,
      marginVertical: scale(16),
    },
    viewItem: {
      paddingHorizontal: scale(24),
      borderRightWidth: 2,
      borderRightColor: color.Main_Color,
      paddingTop: scale(24),
      paddingBottom: scale(32),
      alignItems: 'center',
      justifyContent: 'center',
    },
    icItem: {
      width: scale(220),
      height: scale(220),
    },
    step: {
      ...FontFamily.Bold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_18,
      marginTop: scale(16),
      textAlign: 'center',
    },
    stepDes: {
      ...FontFamily.Regular,
      color: color.Main_Color,
      fontSize: FontSize.FONT_14,
      marginTop: scale(16),
      textAlign: 'center',
    },
  });
};

const HomeIntro = React.memo(HomeIntroComponent);

export default HomeIntro;
