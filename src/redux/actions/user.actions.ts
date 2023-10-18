import { IUser } from 'types/user';
import { LOGOUT, UPDATE_USER_INFO } from './action-types';

export function onUpdateUser(user?: IUser | undefined) {
  return {
    type: UPDATE_USER_INFO,
    payload: user,
  };
}

export function onLogout() {
  return {
    type: LOGOUT,
  };
}
