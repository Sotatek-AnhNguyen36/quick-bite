import { GlobalVariable } from 'constants/global-variable';

export enum EThemeColor {
  Light = 'Light',
  Dark = 'Dark',
}

const Light = {
  transparent: 'transparent',

  Main_Color: '#18204A',
  Main_Color_2: '#565B79',

  BG_Color: '#EDF0EB',
  BG_Color_Shadow: '#C1CEBD66',

  Text_4E4E4E: '#4E4E4E',
  Color_3578EA: '#3578EA',
  Color_A8A8A8: '#A8A8A8',
  Color_F8D750: '#F8D750',
  White: '#FFFFFF',
  Black: '#000000',
  Black_2: '#4E4E4E',

  Gray: '#A8A8A8',
  Gray_2: '#F5F5F5',

  // Use - Guide

  Button_Linear: ['#4E2AE8', '#BE27E2'],
  Button_Green: '#46A34A',

  Text_1: '#111111',
  Text_2: '#535454',
  Text_3: '#C4C4C4',

  Support_Color_Purple: '#8428E6',
  Support_Color_Red: '#FF1700',

  Line_Color: '#C4C4C4',
  Bottom_Line: '#D6DEE5',

  Background_5: '#D9D9D9',

  Accent_Purple: '#DBBEF7',
};

const Dark = {
  // Todo
};

export const getThemeColor = (theme = EThemeColor.Light) => {
  // Todo

  // if (theme === EThemeColor.Dark) {
  //   return Dark;
  // }
  return Light;
};

export const isThemeLight = () => {
  return GlobalVariable.themeCurrent === EThemeColor.Light;
};
