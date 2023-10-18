import i18next, { TypeOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ko from './ko.json';
import vi from './vi.json';

export enum ELanguageType {
  English = 'en',
  Vietnam = 'vi',
}

// Start - Setting Type To Support Key In File Json
type PluralSuffix = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

type WithOrWithoutPlural<K> = TypeOptions['jsonFormat'] extends 'v4'
  ? K extends `${infer B}_${PluralSuffix}`
    ? B | K
    : K
  : K;

type KeysWithSeparator<K1, K2, S extends string = TypeOptions['keySeparator']> = `${K1 & string}${S}${K2 & string}`;
type KeysWithSeparator2<K1, K2> = KeysWithSeparator<K1, Exclude<K2, keyof any[]>>;

type Normalize2<T, K = keyof T> = K extends keyof T
  ? T[K] extends Record<string, any>
    ? T[K] extends readonly any[]
      ? KeysWithSeparator2<K, WithOrWithoutPlural<keyof T[K]>> | KeysWithSeparator2<K, Normalize2<T[K]>>
      : KeysWithSeparator<K, WithOrWithoutPlural<keyof T[K]>> | KeysWithSeparator<K, Normalize2<T[K]>>
    : never
  : never;

type Normalize<T> = WithOrWithoutPlural<keyof T> | Normalize2<T>;

type I18nResource = typeof en;

export type I18nOfKey = Normalize<I18nResource>;
// End

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: true,
  },
  lng: ELanguageType.English,
  fallbackLng: ELanguageType.English,
  resources: {
    vi: {
      translation: vi,
    },
    en: {
      translation: en,
    },
    ko: {
      translation: ko,
    },
  },
});

export default i18next;
