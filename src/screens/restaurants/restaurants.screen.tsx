import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, SectionList, StyleSheet, Text, View } from 'react-native';
import { EThemeColor, getThemeColor } from 'themes/color';
import Images from 'assets/images';
import { scale } from 'utils/scale';
import { getScreenWidth, getStatusBarHeight } from 'utils/dimensions';
import { FontFamily } from 'assets/fonts';
import { RESTAURANTS_INITIAL_STATE } from 'mocked-data/restaurants';
import RestaurantHeader from 'screens/restaurants/components/restaurant-header';
import RestaurantItem from 'screens/restaurants/components/restaurant-item';
import MyIconButton from 'components/base/my-icon-button';

const RestaurantsScreen = () => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.textHeader}>{t('quickBite')}</Text>
      <MyIconButton icon={'IcShoppingCart'} />
    </View>
  );

  const renderBanner = () => <Image source={Images.RestaurantsBanner} style={styles.banner}/>;

  const renderContent = () => (
    <SectionList
      sections={RESTAURANTS_INITIAL_STATE}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderRestaurants}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={renderBanner()}
      contentContainerStyle={styles.contentSectionList}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderSectionHeader = ({ section: { title } }) => <RestaurantHeader title={title} />;

  const renderRestaurants = ({ item }) => (
    <FlatList
      horizontal
      data={item}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
      contentContainerStyle={styles.contentList}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={renderSeparator}
    />
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderItem = ({ item }) => <RestaurantItem restaurant={item} />

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.BG_Color,
      paddingTop: getStatusBarHeight(),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scale(16),
      paddingHorizontal: scale(16),
    },
    textHeader: {
      ...FontFamily.Bold,
      fontSize: scale(18),
      color: color.Main_Color,
    },
    banner: {
      marginHorizontal: scale(16),
      width: getScreenWidth() - scale(32),
      marginBottom: scale(30),
      marginTop: scale(20),
    },
    contentSectionList: {
      paddingBottom: scale(64),
    },
    list: {
      marginLeft: scale(16),
    },
    contentList: {
      paddingRight: scale(16),
    },
    separator: {
      width: scale(16),
    },
  });
};

export default RestaurantsScreen;
