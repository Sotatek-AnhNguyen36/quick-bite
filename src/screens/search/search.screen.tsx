import { useMyTheme } from 'hooks/useMyTheme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { EThemeColor, getThemeColor } from 'themes/color';
import { SEARCH_INITIAL_STATE } from 'mocked-data/search';
import SearchItem from 'screens/search/components/search-item';
import { scale } from 'utils/scale';
import { getScreenWidth, getStatusBarHeight } from 'utils/dimensions';
import Svgs from 'assets/svgs';
import { FontFamily } from 'assets/fonts';
import FilterModal from 'screens/search/components/filter-modal';
import MyIconButton from 'components/base/my-icon-button';

const Searchscreen = () => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();
  const color = getThemeColor(themeCurrent);
  const [visible, setVisible] = useState<boolean>(false);

  const renderHeader = () => (
    <View style={styles.header}>
      <MyIconButton icon={'IcAngleLeft'} customStyle={styles.buttonBack} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={t('searchForRestaurants')}
          placeholderTextColor={color.Gray}
        />
        <TouchableOpacity
          style={styles.buttonFilter}
          hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
          onPress={showFilter}
        >
          <Svgs.IcFilter />
        </TouchableOpacity>
      </View>
    </View>
  );

  const showFilter = () => setVisible(true);

  const hideFilter = () => setVisible(false);

  const renderContent = () => (
    <FlatList
      data={SEARCH_INITIAL_STATE}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
    />
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderItem = ({ item }) => <SearchItem restaurant={item} />;

  const renderFilter = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <FilterModal onClose={hideFilter} />
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderContent()}
      {renderFilter()}
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
      paddingHorizontal: scale(16),
      paddingTop: scale(16),
      alignItems: 'center',
      paddingBottom: scale(8),
    },
    buttonBack: {
      width: scale(45),
      height: scale(48),
      borderRadius: scale(8),
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      marginLeft: scale(16),
      height: scale(48),
      backgroundColor: color.White,
      borderRadius: scale(8),
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      color: color.Main_Color,
      paddingHorizontal: scale(10),
      ...FontFamily.Medium,
      fontSize: scale(14),
      height: scale(48),
    },
    buttonFilter: {
      marginRight: scale(16),
    },
    separator: {
      width: getScreenWidth() - scale(32),
      height: scale(2),
      backgroundColor: color.Main_Color,
      alignSelf: 'center',
    },
  });
};

export default Searchscreen;
