import { clearGlobal } from 'constants/global-variable';
import React from 'react';
import { useDispatch } from 'react-redux';
import { onLogout } from 'redux/actions';
import { Subscription } from 'rxjs';
import EventBus, { EventBusName } from 'services/event-bus';
import { AsyncStorageUtils, StorageKey } from 'utils/async-storage';

interface Props {
  children?: any;
}

const Root = (props: Props) => {
  const dispatch = useDispatch();

  const refTimerAuthPasscode = React.useRef<any>(null);

  const subScription = new Subscription();

  React.useEffect(() => {
    onRegisterEventBus();
    return () => {
      subScription?.unsubscribe?.();
      if (refTimerAuthPasscode?.current) {
        clearTimeout(refTimerAuthPasscode.current);
      }
    };
  }, []);

  const onRegisterEventBus = () => {
    subScription.add(
      EventBus.getInstance().events.subscribe((res: any) => {
        if (res.type === EventBusName.LOGOUT) {
          logout();
        }

        if (res.type === EventBusName.SPLASH_INIT_VALUE) {
          splashInitValue();
        }

        if (res.type === EventBusName.GET_INFO_USER) {
          getInfoUser();
        }
      })
    );
  };

  const splashInitValue = async () => {
    await getInfoUser();
  };

  const getInfoUser = async () => {
    // const user: IUser | undefined = await apiGetUserMe();
    // if (user) dispatch(onUpdateUser(user));
  };

  const logout = () => {
    clearGlobal();
    dispatch(onLogout());
    AsyncStorageUtils.remove(StorageKey.TOKEN);
  };

  return props?.children;
};

const RootComponent = React.memo(Root);

export default RootComponent;
