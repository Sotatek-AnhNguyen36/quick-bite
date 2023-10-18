import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalVariable } from 'constants/global-variable';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
import rootReducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  debug: true,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const composeEnhancers = compose;

const tempStore = () => {
  if (__DEV__) {
    return createStore(
      persistedReducer,
      composeEnhancers(applyMiddleware(sagaMiddleware), GlobalVariable?.tron?.createEnhancer?.()),
    );
  }

  return createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
};

export const store: any = tempStore();

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export type RootState = ReturnType<any>;
export type AppDispatch = typeof store.dispatch;
