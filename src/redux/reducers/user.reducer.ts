import { IUser } from 'types/user';
import { LOGOUT, UPDATE_USER_INFO } from '../actions/action-types';

export interface UserState {
  user?: IUser;
}

interface ActionProps {
  type: string;
  payload: any;
}

const initState: UserState = {
  user: undefined,
};

export default (state = initState, action: ActionProps) => {
  const { type } = action;
  switch (type) {
    case UPDATE_USER_INFO: {
      const user = action?.payload || {};
      return {
        ...state,
        user,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        user: undefined,
      };
    }

    default:
      return state;
  }
};
