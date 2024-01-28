import { AxiosResponse } from 'axios';

export interface HttpHeader {
  [key: string]: string;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export type BodyData = {
  NONE: {
    value: string;
  };
  JSON: {
    value: string;
  };
  Raw: {
    value: string;
  };
  HTML: {
    value: string;
  };
  XML: {
    value: string;
  };
};

export type HttpResponse = {
  isLoading: boolean;
  time: number;
  responseObject?: AxiosResponse;
};

export type HttpState = {
  url: string;
  headers: HttpHeader[];
  method: HttpMethod;
  body: {
    active: keyof BodyData;
    data: BodyData;
  };
  response: HttpResponse;
};
