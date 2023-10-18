import { combineReducers } from 'redux';
import userReducer from './user.reducer';

export type StoreState = ReturnType<typeof appReducers>;

const appReducers = combineReducers({
  user: userReducer,
});

const rootReducers = (state: any, action: any) => {
  return appReducers(state, action);
};

export default rootReducers;
