import { Platform } from 'react-native';

interface ITruncateTxt {
  value: string;
  length?: number;
  start?: number;
  end?: number;
}
export const truncateTxt = (params: ITruncateTxt): string => {
  const { value = '', start = 6, end = 4, length = 9 } = params;
  return value?.length > length ? value?.substr(0, start) + '...' + value?.substr(value.length - end) : value;
};

interface IGetBigPriceFormatStringOption {
  isSub?: boolean;
  decimal?: number;
}

export const getBigPriceFormatString = (value?: string, option?: IGetBigPriceFormatStringOption) => {
  if (!value || value === 'NaN') {
    return '0';
  }

  const decimal = option?.decimal || 8; // Default

  const arr = value?.toString?.().split?.('.');
  let tempValue = value;

  try {
    if (arr?.[1].length > decimal) {
      tempValue = `${arr?.[0]}.${arr?.[1].slice?.(0, decimal)}${option?.isSub ? '...' : ''}`;
    }
  } catch (error) {}

  return tempValue;
};

export const isInputEmpty = (text?: string): boolean => {
  if (!text) {
    return true;
  }
  if (text.trim() === '') {
    return true;
  }
  return false;
};

export const isEmail = (input: string): boolean => {
  const re = new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$');
  return re.test(input);
};

export const onShowErrorRequestApi = (error: any) => {
  const message = error?.response?.data?.error?.message || error?.message || undefined;
  if (message) {
  }
};
export function capitalizeFirstLetter(str: string | undefined) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export interface IFormatAmountInputOptions {
  maxNumberDecimal?: number | 0; // default 18
}

export function formatAmountInput(amount: string, options?: IFormatAmountInputOptions): string {
  if (!amount) {
    return '';
  }

  if (amount === '0') {
    // Todo
    return '0';
  }

  let temp = amount?.trimStart?.()?.trimEnd?.();

  if (!temp) {
    return '';
  }

  try {
    temp = temp // Remove decimal 0. `1.000` => `1.`, `1.100` => `1.1`
      .replace(/(\.\d*[^0])0*$/, '$1') // Remove useless decimal. `1.` => `1`
      .replace(/\.0*$/, '') // Remove integer 0. `0001` => `1`, 000.1' => `.1`
      .replace(/^0+/, '')
      .replace(',', '.');

    if (temp.startsWith('.')) {
      temp = '0'.concat(temp);
    }

    const arr = temp.split('.');

    if (options?.maxNumberDecimal && arr.length >= 2 && options?.maxNumberDecimal < arr?.[1].length) {
      temp = `${arr[0]}.${arr[1].slice(0, options.maxNumberDecimal)}`;
    }
  } catch (error) {
    console.log('formatAmountInput - error: ', error);
  }

  return temp;
}

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const getButtonHitSlop = (value = 10) => {
  return {
    top: value,
    left: value,
    bottom: value,
    right: value,
  };
};
