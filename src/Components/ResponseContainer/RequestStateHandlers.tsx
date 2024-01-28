import { HttpState } from '../../state/types';
import { AxiosResponse } from 'axios';

export function getResonseBody(index: number): AxiosResponse<any, any>['data'] | undefined {
  return (state: HttpState[]) => {
    return state[index].response.responseObject?.data;
  };
}
export function getCode(index: number): (state: HttpState[]) => number | undefined {
  return (state: HttpState[]) => {
    return state[index].response.responseObject?.status || 200;
  };
}
export function getStatus(index: number) {
  return (state: HttpState[]) => {
    return state[index].response.responseObject?.statusText || 'OK';
  };
}
export function getResponseExtension(index: number) {
  return (state: HttpState[]) => {
    const response = state[index].response.responseObject;

    if (response && response.headers) {
      const contentType = response.headers['content-type'];

      if (contentType) {
        if (contentType.includes('application/json')) {
          return 'json';
        } else if (contentType.includes('text/html')) {
          return 'html';
        }
      }
    }

    return '';
  };
}
export function getResponseTime(index: number): (state: HttpState[]) => number {
  return (state: HttpState[]) => {
    return state[index].response.time;
  };
}
