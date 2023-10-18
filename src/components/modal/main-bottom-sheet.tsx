import {
  BottomSheetBackdropProps,
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useMyTheme } from 'hooks/useMyTheme';

import React, { Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleProp, StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { EThemeColor, getThemeColor } from 'themes/color';
import BottomSheetHeader, { BottomSheetHeaderProps } from './bottom-sheet-header';

export interface MainBottomSheetRef {
  open: () => void;
  dismiss: () => void;
}

interface MainBottomSheetProps extends BottomSheetHeaderProps {
  onOpen?: () => void;
  name?: string;
  isVisible?: boolean;
  children: string | JSX.Element | JSX.Element[];
  handleCloseModal?: () => void;
  style?: StyleProp<ViewStyle>;
  snapPoints?: (string | number)[];
  detached?: boolean;
  bottomInset?: number;
  backgroundTransparent?: boolean;
  handleComponent?: React.FC<BottomSheetHandleProps> | null;
  keyboardBlurBehavior?: 'none' | 'restore';
  enablePanDownToClose?: boolean;
  isDynamicSnapPoints?: boolean;
  bkaBackdrop?: string;
  disableBackDropPress?: boolean;
}

export interface CustomBackdropProps extends BottomSheetBackdropProps {
  onBackdropPress: () => void;
  bkaBackdrop?: string;
}

const CustomBackdrop = ({ animatedIndex, style, onBackdropPress, bkaBackdrop }: CustomBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.7], Extrapolate.CLAMP),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: bkaBackdrop || '#000000',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return (
    <TouchableWithoutFeedback onPress={onBackdropPress}>
      <Animated.View style={containerStyle} />
    </TouchableWithoutFeedback>
  );
};

const MainBottomSheetComponent = (props: MainBottomSheetProps, ref: Ref<MainBottomSheetRef>) => {
  const {
    onOpen,
    children,
    isVisible = false,
    handleCloseModal,
    style = {},
    snapPoints = ['50%'],
    name = 'MainBottomSheet',
    detached = false,
    bottomInset = 0,
    backgroundTransparent = false,
    handleComponent,
    keyboardBlurBehavior = 'none',
    enablePanDownToClose = false,
    isDynamicSnapPoints = false,
    bkaBackdrop,
    disableBackDropPress = false,
  } = props;

  const { themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  useEffect(() => {
    if (isVisible) {
      openBottomSheet();
    }
  }, [isVisible]);

  useFocusEffect(
    React.useCallback(() => {
      return () => bottomSheetModalRef.current?.dismiss();
    }, []),
  );

  const openBottomSheet = useCallback(() => {
    onOpen?.();
    bottomSheetModalRef.current?.present();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  useImperativeHandle(
    ref,
    (): MainBottomSheetRef => ({
      dismiss: closeBottomSheet,
      open: openBottomSheet,
    }),
  );

  const renderHeader = () => (
    <BottomSheetHeader
      i18nTitle={props?.i18nTitle}
      i18nRight={props?.i18nRight}
      onPressLeftHeader={closeBottomSheet}
      onPressRightHeader={props.onPressRightHeader}
    />
  );

  if (isDynamicSnapPoints) {
    return (
      <BottomSheetModal
        keyboardBlurBehavior={keyboardBlurBehavior}
        handleComponent={handleComponent}
        detached={detached}
        bottomInset={bottomInset}
        name={name}
        ref={bottomSheetModalRef}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose={enablePanDownToClose}
        backgroundStyle={[styles.container, backgroundTransparent && styles.backgroundTransparent]}
        backdropComponent={backdropComponentProps => (
          <CustomBackdrop
            {...backdropComponentProps}
            onBackdropPress={disableBackDropPress ? () => {} : closeBottomSheet}
            bkaBackdrop={bkaBackdrop}
          />
        )}
        onDismiss={handleCloseModal}
        style={style}>
        <BottomSheetView onLayout={handleContentLayout}>
          {renderHeader()}
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }

  return (
    <BottomSheetModal
      keyboardBlurBehavior={keyboardBlurBehavior}
      handleComponent={handleComponent}
      detached={detached}
      bottomInset={bottomInset}
      name={name}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ height: 0 }}
      enablePanDownToClose={enablePanDownToClose}
      backgroundStyle={[styles.container, backgroundTransparent && styles.backgroundTransparent]}
      backdropComponent={backdropComponentProps => (
        <CustomBackdrop
          {...backdropComponentProps}
          onBackdropPress={disableBackDropPress ? () => {} : closeBottomSheet}
          bkaBackdrop={bkaBackdrop}
        />
      )}
      onDismiss={handleCloseModal}
      style={style}>
      {renderHeader()}
      {children}
    </BottomSheetModal>
  );
};

const MainBottomSheet = React.memo(React.forwardRef(MainBottomSheetComponent));

export default MainBottomSheet;

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({
    container: {
      backgroundColor: color.White,
    },
    backgroundTransparent: {
      backgroundColor: 'transparent',
    },
  });
};
