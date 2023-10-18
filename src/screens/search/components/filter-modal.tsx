import { StyleSheet, Text, View } from 'react-native';
import { FontFamily } from 'assets/fonts';
import { scale } from 'utils/scale';
import React, { useEffect, useState } from 'react';
import { getBottomSpace } from 'utils/dimensions';
import { EThemeColor, getThemeColor } from 'themes/color';
import { useMyTheme } from 'hooks/useMyTheme';
import { useTranslation } from 'react-i18next';
import { SEARCH_FILTER, SEARCH_SORT_BY } from 'mocked-data/search';
import { IRestaurantFilter } from 'types/restaurant';
import FilterItem from 'screens/search/components/filter-item';
import MyIconButton from 'components/base/my-icon-button';

interface Props {
  onClose: () => void;
}

const FilterModal = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();
  const [dataFilter, setDataFilter] = useState<IRestaurantFilter[]>();
  const [dataSort, setDataSort] = useState<IRestaurantFilter[]>();

  useEffect(() => {
    getDataFilter();
    getDataSort();
  }, []);

  const getDataFilter = () => {
    setDataFilter(SEARCH_FILTER.map(e => {
      return { ...e, selected: false };
    }));
  };

  const getDataSort = () => {
    setDataSort(SEARCH_SORT_BY.map(e => {
      return { ...e, selected: false };
    }));
  };

  const renderFilter = () => (
    <View style={styles.valueFilter} >
      {dataFilter?.map(e => <FilterItem key={e.id.toString()} item={e} onPress={onPressFilter} />)}
    </View>
  );

  const onPressFilter = (item: IRestaurantFilter) => {
    setDataFilter(dataFilter?.map(e => {
      return {
        ...e,
        selected: item.id === e.id ? !e.selected : e.selected,
      }
    }))
  }

  const renderSortBy = () => (
    <View style={styles.viewSortBy}>
      <Text style={styles.textSortBy}>{t('sortBy')}</Text>
      <View style={styles.valueSortBy}>
        {dataSort?.map(e => <FilterItem key={e.id.toString()} item={e} onPress={onPressSortBy} />)}
      </View>
    </View>
  );

  const onPressSortBy = (item: IRestaurantFilter) => {
    setDataSort(dataSort?.map(e => {
      return {
        ...e,
        selected: item.id === e.id ? !e.selected : e.selected,
      }
    }))
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Filter</Text>
          <MyIconButton  icon={'IcClose'} onPress={props.onClose} customStyle={styles.buttonHeader} />
        </View>
        {renderFilter()}
        {renderSortBy()}
      </View>
    </View>
  );
};


const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    content: {
      width: '100%',
      backgroundColor: color.White,
      borderRadius: scale(16),
      paddingBottom: getBottomSpace() + scale(24),
      paddingTop: scale(24),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: scale(32),
      paddingHorizontal: scale(16),
    },
    textHeader: {
      ...FontFamily.Bold,
      fontSize: scale(24),
      color: color.Main_Color,
    },
    buttonHeader: {
      backgroundColor: color.Gray_2,
      borderRadius: scale(8),
    },
    valueFilter: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingLeft: scale(16),
    },
    viewSortBy: {
      borderTopWidth: scale(2),
      borderTopColor: color.Main_Color,
      marginTop: scale(9),
      marginHorizontal: scale(16),
    },
    textSortBy: {
      paddingVertical: scale(16),
      ...FontFamily.Bold,
      fontSize: scale(12),
      color: color.Main_Color,
    },
    valueSortBy: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });
};

export default FilterModal;
