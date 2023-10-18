import { StackActions } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function pushToPage(name: string, params?: object): void {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function replace(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

export function pop(number = 1) {
  navigationRef.current?.dispatch(StackActions.pop(number));
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function resetStack(name: string, params?: object): void {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name, params }]
  });
}

export function getCurrentRoute() {
  const currentRoute = navigationRef.current?.getCurrentRoute();
  return currentRoute?.name;
}
