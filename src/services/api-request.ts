import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GlobalVariable } from 'constants/global-variable';
import { ResponseCode } from 'constants/http-status';
import Config from 'react-native-config';
import { EventBusName, onPushEventBus } from './event-bus';

interface CustomHeaders {
  isAuth?: boolean;
}

const REQ_TIMEOUT = 15 * 1000;

const instance = Axios.create({
  baseURL: Config.API_URL,
  timeout: REQ_TIMEOUT,
});

instance.interceptors.request.use(_config => requestHandler(_config));

const requestHandler = (request: AxiosRequestConfig) => {
  if (__DEV__) {
  }
  return request;
};

instance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error),
);

const errorHandler = async (error: any) => {
  if (__DEV__) {
    console.log(error);
  }

  const statusCode = error?.response?.status;
  const originalRequest = error.config;

  if (statusCode === ResponseCode.TOKEN_REMOVED) {
    onPushEventBus(EventBusName.LOGOUT);
    return Promise.reject({ ...error });
  }

  if (statusCode === ResponseCode.UNAUTHORIZED) {
    // const refreshRes: any = await apiRefreshToken();
    // if (refreshRes) {
    //   originalRequest.headers[
    //     'Authorization'
    //   ] = `Bearer ${refreshRes?.accessToken}`;

    //   SocketUtils?.getInstance?.()?.restart?.();

    //   return instance(originalRequest);
    // }
    return Promise.reject({ ...error });
  }

  return Promise.reject({ ...error });
};

const successHandler = async (response: AxiosResponse) => {
  if (__DEV__) {
    // console.log(`Response API: ${response.config.url}`, response.data);
  }

  return response.data;
};

function getHeader(customHeaders?: CustomHeaders): any {
  const header: any = customHeaders || {};

  if (GlobalVariable?.tokenInfo?.accessToken) {
    header.Authorization = `Bearer ${GlobalVariable.tokenInfo?.accessToken}`;
  }

  return {
    ...header,
    'Content-Type': 'application/json',
    'X-API-KEY': Config.X_API_KEY,
  };
}

async function get<ReqType, ResType>(url: string, params?: ReqType, customHeaders?: CustomHeaders): Promise<ResType> {
  const headers = getHeader(customHeaders);
  return instance.get(url, { params, headers });
}

async function post<ReqType, ResType>(url: string, data?: ReqType, customHeaders?: CustomHeaders): Promise<ResType> {
  const headers = getHeader(customHeaders);
  return instance.post(url, { ...data }, { headers });
}

async function postForm<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders,
): Promise<ResType> {
  const headers = getHeader(customHeaders);
  return instance.post(url, data, { headers });
}

async function put<ReqType, ResType>(url: string, data?: ReqType, customHeaders?: CustomHeaders): Promise<ResType> {
  const headers = getHeader(customHeaders);
  return instance.put(url, { ...data }, { headers });
}

async function patch<ReqType, ResType>(url: string, data?: ReqType, customHeaders?: CustomHeaders): Promise<ResType> {
  const headers = getHeader(customHeaders);
  return instance.patch(url, { ...data }, { headers });
}

async function remove<ReqType, ResType>(url: string, data?: ReqType, customHeaders?: CustomHeaders): Promise<ResType> {
  const headers = getHeader(customHeaders);
  return instance.delete(url, { data: { ...data }, headers: { ...headers } });
}

const ApiRequest = {
  get,
  post,
  postForm,
  put,
  patch,
  remove,
};

export default ApiRequest;
