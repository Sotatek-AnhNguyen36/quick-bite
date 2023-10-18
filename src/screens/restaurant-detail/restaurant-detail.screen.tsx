import { FontFamily } from 'assets/fonts';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';
import { RESTAURANT_DETAIL_SCREEN } from 'routing/screen-name';
import { goBack, navigate } from 'routing/service-navigation';
import { EThemeColor, getThemeColor } from 'themes/color';
import { RouterType } from 'types/route';
import { getScreenWidth, getBottomSpace, getStatusBarHeight } from 'utils/dimensions';
import { scale } from 'utils/scale';
import { IRestaurant } from 'types/restaurant';
import { FOODS_INITIAL_STATE } from 'mocked-data/restaurants';
import RestaurantDetailHeader from 'screens/restaurant-detail/components/restaurant-detail-header';
import RestaurantDetailItem from 'screens/restaurant-detail/components/restaurant-detail-item';
import MyIconButton from 'components/base/my-icon-button';

interface IParamsRoute {
  restaurant: IRestaurant;
}

interface Props {
  route?: RouterType<IParamsRoute>;
}

const RestaurantDetailScreen = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { restaurant } = props.route?.params || {};

  const renderHeader = () => (
    <>
      <Image source={restaurant?.image!} style={styles.image} />
      <Text style={styles.name}>{restaurant?.name}</Text>
    </>
  );

  const renderSectionHeader = ({ section: { title } }) => <RestaurantDetailHeader title={title} />;

  const renderItem = ({ item, section }) => {
    return <RestaurantDetailItem restaurant={restaurant!} food={item} foodType={section.title} />;
  }

  const renderSeparator = () => <View style={styles.separator}/>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MyIconButton icon={'IcAngleLeft'} onPress={goBack} />
        <MyIconButton icon={'IcSearch'} onPress={goBack} />
      </View>
      <SectionList
        sections={FOODS_INITIAL_STATE}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={renderHeader()}
        contentContainerStyle={styles.contentSectionList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: getStatusBarHeight(),
      paddingHorizontal: scale(16),
      backgroundColor: color.BG_Color,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: scale(16),
    },
    image: {
      width: getScreenWidth() - scale(32),
      height: scale(184),
      borderRadius: scale(8),
    },
    name: {
      paddingTop: scale(24),
      paddingBottom: scale(32),
      ...FontFamily.Bold,
      fontSize: scale(24),
      color: color.Main_Color,
    },
    contentSectionList: {
      paddingTop: scale(24),
      paddingBottom: getBottomSpace() + scale(24),
    },
    separator: {
      width: '100%',
      height: scale(2),
      backgroundColor: color.Main_Color,
    },
  });
};

RestaurantDetailScreen.start = (params?: IParamsRoute) => {
  navigate(RESTAURANT_DETAIL_SCREEN, params);
};

export default RestaurantDetailScreen;
