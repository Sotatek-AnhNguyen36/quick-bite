import Toast from 'react-native-toast-message';

export const showToastSuccess = (message: string) => {
  Toast.show({
    type: 'CustomSuccess',
    text1: message,
  });
};

export const showToastError = (message: string) => {
  Toast.show({
    type: 'CustomError',
    text1: message,
  });
};
