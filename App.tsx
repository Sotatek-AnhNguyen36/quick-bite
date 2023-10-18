import LoadingManager from 'components/loading/loading-manager';
import LoadingModal from 'components/loading/loading-modal';
import RootComponent from 'components/root/root.component';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/stores';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { toastConfig } from 'components/base/my-toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StackNavigator from 'routing/main-navigation';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('transparent');
  StatusBar.setTranslucent(true);
}
StatusBar.setBarStyle('dark-content');

declare global {
  interface Console {
    tron: any;
  }
}

const App = () => {
  const loadingRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      loadingRef?.current && LoadingManager.unregister(loadingRef.current);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootComponent>
              <BottomSheetModalProvider>
                <StackNavigator />
              </BottomSheetModalProvider>

              <LoadingModal
                ref={ref => {
                  loadingRef.current = ref;
                  LoadingManager.register(loadingRef.current);
                }}
              />
            </RootComponent>
            <Toast config={toastConfig} />
          </PersistGate>
        </Provider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
};

export default App;
