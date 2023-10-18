import { useMyTheme } from 'hooks/useMyTheme';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FOOD_DETAIL_SCREEN } from 'routing/screen-name';
import { goBack, navigate } from 'routing/service-navigation';
import { EThemeColor, getThemeColor } from 'themes/color';
import { RouterType } from 'types/route';
import MyIconButton from 'components/base/my-icon-button';
import { IFood, IRestaurant, ITopping } from 'types/restaurant';
import { getBottomSpace, getScreenWidth, getStatusBarHeight } from 'utils/dimensions';
import { scale } from 'utils/scale';
import Images from 'assets/images';
import { FontFamily } from 'assets/fonts';
import { FOOD_TOPPINGS } from 'mocked-data/foods';
import ToppingItem from 'screens/food-detail/components/topping-item';
import Svgs from 'assets/svgs';
import { FontSize } from 'themes';
import AddToBasketScreen from 'screens/add-to-basket/add-to-basket.screen';

interface IParamsRoute {
  restaurant: IRestaurant;
  food: IFood;
  foodType: string;
}

interface Props {
  route?: RouterType<IParamsRoute>;
}

const FoodDetailScreen = (props: Props) => {
  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();
  const { restaurant, food, foodType } = props.route?.params || {};
  const [toppings, setToppings] = useState<ITopping[]>();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    getToppings();
  }, []);

  const getToppings = () => {
    setToppings(FOOD_TOPPINGS.map(e => {
      return { ...e, selected: false };
    }));
  };

  const renderInfo = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{food?.name}</Text>
        <Image source={Images.Popular} style={styles.popular} />
      </View>
      <View style={styles.info}>
        <Text style={styles.description}>{food?.description}</Text>
        <Text style={styles.price}>${food?.price}</Text>
      </View>
    </View>
  );

  const renderToppings = () => (
    <View style={styles.toppingsView}>
      <Text style={styles.toppings}>{t('toppings')}</Text>
      <Text style={styles.toppingsDescription}>{t('chooseAdditional')}</Text>
      {toppings?.map(e => <ToppingItem key={e.id.toString()} item={e} onPress={onSelectTopping} />)}
    </View>
  );

  const onSelectTopping = (item: ITopping) => {
    setToppings(toppings?.map(e => {
      return {
        ...e,
        selected: item.id === e.id ? !e.selected : e.selected,
      }
    }))
  };

  const getTotal = () => {
    const totalToppings = toppings?.reduce((total, currentValue) => {
      if (currentValue.selected) {
        return Number(total) + Number(currentValue.price);
      }
      return Number(total);
    }, 0);

    const sum = (totalToppings || 0) + Number(food?.price);
    return Number(sum * quantity).toFixed(2);
  }

  const renderSubTotal = () => (
    <View style={styles.subTotal}>
      <Text style={styles.toppings}>{t('subtotal')}</Text>
      <Text style={styles.price}>${getTotal()}</Text>
    </View>
  );

  const renderAddToOrder = () => (
    <View style={styles.bottom}>
      <View style={styles.inputQty}>
        <TouchableOpacity style={styles.iconQty} onPress={onMinus} disabled={quantity < 2}>
          <Svgs.IcMinus />
        </TouchableOpacity>
        <Text style={styles.valQty}>{quantity}</Text>
        <TouchableOpacity style={styles.iconQty} onPress={onPlus}>
          <Svgs.IcPlus />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={addToBasket}>
        <Text style={styles.buttonText}>{t('addToOrder')}</Text>
      </TouchableOpacity>
    </View>
  );

  const addToBasket = () => {
    const params = {
      restaurant: restaurant!,
      food: food!,
      foodType: foodType!,
      quantity,
    }
    AddToBasketScreen.start(params);
  };

  const onMinus = () => setQuantity(quantity - 1);

  const onPlus = () => setQuantity(quantity + 1);

  return (
    <View style={styles.container}>
      <ImageBackground source={food?.image!} style={styles.image} imageStyle={styles.imageStyle}>
        <MyIconButton icon={'IcClose'} onPress={goBack} />
      </ImageBackground>
      {renderInfo()}
      {renderToppings()}
      {renderSubTotal()}
      {renderAddToOrder()}
    </View>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.BG_Color,
      paddingTop: getStatusBarHeight() + scale(16),
      paddingHorizontal: scale(16),
    },
    image: {
      width: getScreenWidth() - scale(32),
      height: scale(184),
      alignItems: 'flex-end',
      padding: scale(8),
    },
    imageStyle: {
      borderRadius: scale(8),
    },
    header: {
      flexDirection: 'row',
      paddingTop: scale(24),
      paddingBottom: scale(16),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      ...FontFamily.Bold,
      fontSize: scale(18),
      color: color.Main_Color,
    },
    popular: {
      width: scale(66),
      height: scale(24),
      resizeMode: 'contain',
    },
    info: {
      flexDirection: 'row',
    },
    description: {
      flex: 1,
      ...FontFamily.Regular,
      fontSize: scale(14),
      color: color.Main_Color,
    },
    price: {
      ...FontFamily.Bold,
      fontSize: scale(14),
      color: color.Main_Color,
      paddingLeft: scale(24),
    },
    toppingsView: {
      marginVertical: scale(16),
      borderColor: color.Main_Color,
      borderTopWidth: scale(2),
      borderBottomWidth: scale(2),
      paddingVertical: scale(16),
    },
    toppings: {
      ...FontFamily.Bold,
      fontSize: scale(14),
      color: color.Main_Color,
    },
    toppingsDescription: {
      paddingTop: scale(16),
      paddingBottom: scale(12),
      ...FontFamily.Regular,
      fontSize: scale(14),
      color: color.Main_Color,
    },
    subTotal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bottom: {
      position: 'absolute',
      left: scale(16),
      right: scale(16),
      bottom: getBottomSpace(),
      flexDirection: 'row',
    },
    inputQty: {
      flexDirection: 'row',
      alignItems: 'center',
      height: scale(48),
      borderRadius: scale(8),
      backgroundColor: color.White,
      paddingHorizontal: scale(8),
    },
    iconQty: {
      width: scale(30),
      height: scale(30),
      alignItems: 'center',
      justifyContent: 'center',
    },
    valQty: {
      minWidth: scale(30),
      textAlign: 'center',
      ...FontFamily.SemiBold,
      color: color.Main_Color,
      fontSize: FontSize.FONT_14,
      marginHorizontal: scale(8),
    },
    button: {
      flex: 1,
      backgroundColor: color.Main_Color,
      borderRadius: scale(8),
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: scale(16),
    },
    buttonText: {
      ...FontFamily.SemiBold,
      color: color.White,
      fontSize: scale(14),
    },
  });
};

FoodDetailScreen.start = (params?: IParamsRoute) => {
  navigate(FOOD_DETAIL_SCREEN, params);
};

export default FoodDetailScreen;


