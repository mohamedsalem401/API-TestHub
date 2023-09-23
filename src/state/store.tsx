import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { UrlAction, handleUrlChange } from "./UrlAction";
import {
  HeaderAction,
  handleAddHeader,
  handleChangeHeader,
  handleRemoveHeader,
} from "./HeaderAction";
import { MethodAction, handleMethodChange } from "./MethodAction";
import {
  BodyAction,
  handleChangeActiveBody,
  handleChangeBody,
} from "./BodyAction";
import axios, { AxiosError, AxiosResponse } from "axios";
import { response } from "express";

export interface HttpHeader {
  [key: string]: string;
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
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

type HttpResponse = {
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

function convertHeadersArrayToAxiosHeaders(headersArray: HttpHeader[]) {
  const axiosHeaders: { [key: string]: string } = {};

  for (const header of headersArray) {
    if (header.key && header.value) {
      axiosHeaders[header.key] = header.value;
    }
  }

  return axiosHeaders;
}

async function makeHttpRequest(
  url: string,
  method: HttpMethod,
  headers: { [key: string]: string },
  body: string
): Promise<AxiosResponse | undefined> {
  const axiosConfig = {
    url,
    method,
    headers: headers,
    data: body, // Use the appropriate body based on the method
  };

  const response = await axios(axiosConfig);

  // Handle the successful response
  return response;
}

export type RequestAction =
  | {
      type: "sendRequest";
      payload: { index: number; dispatch: any };
    }
  | {
      type: "setLoading";
      payload: { index: number };
    }
  | {
      type: "setResponse";
      payload: { index: number; response: HttpResponse };
    };

const handleSetLoading = (state: HttpState[], index: number) => {
  const newState = [...state];
  const httpState = newState[index];
  const newHttpState = { ...httpState };

  newHttpState.response = {
    isLoading: true,
    responseObject: undefined,
    time: 0,
  };

  newState[index] = newHttpState;
  return newState;
};

const handleSetResponse = (
  state: HttpState[],
  index: number,
  responseObject: HttpResponse
) => {
  const newState = [...state];
  const httpState = newState[index];
  const newHttpState = { ...httpState };

  newHttpState.response = responseObject;

  newState[index] = newHttpState;
  return newState;
};

// TODO Refactor this function
export const handleSendRequest = (state: HttpState[], index: number) => {
  const httpState = state[index];
  const startTime = performance.now();
  const axiosHeaders = convertHeadersArrayToAxiosHeaders(httpState.headers);
  const active = httpState.body.active;
  const body = httpState.body.data[active].value;

  const response = makeHttpRequest(
    httpState.url,
    httpState.method,
    axiosHeaders,
    body
  )
    .then((response) => {
      const endTime = performance.now();
      const time = endTime - startTime;

      const setResponseAction: RequestAction = {
        type: "setResponse",
        payload: {
          index: index,
          response: {
            isLoading: false,
            responseObject: response,
            time: time,
          },
        },
      };

      store.dispatch(setResponseAction);
    })
    .catch((response) => {
      const endTime = performance.now();
      const time = endTime - startTime;

      const setResponseAction: RequestAction = {
        type: "setResponse",
        payload: {
          index: index,
          response: {
            isLoading: false,
            responseObject: response,
            time: time,
          },
        },
      };

      store.dispatch(setResponseAction);
    });

  return state;
};

const initialState: HttpState[] = [
  {
    url: "https://dummy.restapiexample.com/api/v1/employees",
    headers: [{ key: "type", value: "string" }],
    method: HttpMethod.GET,
    body: {
      active: "NONE",
      data: {
        NONE: {
          value: "",
        },
        JSON: {
          value: "{}",
        },
        Raw: {
          value: "",
        },
        HTML: {
          value: "",
        },
        XML: {
          value: "",
        },
      },
    },
    response: {
      isLoading: false,
      responseObject: undefined,
      time: 0,
    },
  },
];

export type HttpStateAction =
  | UrlAction
  | HeaderAction
  | MethodAction
  | BodyAction
  | RequestAction;

const reducer = (state = initialState, action: HttpStateAction) => {
  switch (action.type) {
    case "changeUrl":
      return handleUrlChange(
        action.payload.index,
        state,
        action.payload.newUrl
      );
    case "changeMethod":
      return handleMethodChange(
        state,
        action.payload.index,
        action.payload.newMethod
      );
    case "changeActiveBody":
      return handleChangeActiveBody(
        state,
        action.payload.index,
        action.payload.key
      );
    case "changeBody":
      return handleChangeBody(
        state,
        action.payload.index,
        action.payload.key,
        action.payload.newBody
      );
    case "addHeader":
      return handleAddHeader(state, action.payload.index);
    case "changeHeader":
      return handleChangeHeader(
        state,
        action.payload.index,
        action.payload.headerIndex,
        action.payload.newHeader
      );
    case "removeHeader":
      return handleRemoveHeader(
        state,
        action.payload.index,
        action.payload.headerIndex
      );
    case "sendRequest":
      return handleSendRequest(state, action.payload.index);
    case "setLoading":
      return handleSetLoading(state, action.payload.index);
    case "setResponse":
      return handleSetResponse(
        state,
        action.payload.index,
        action.payload.response
      );
    default:
      return state;
  }
};

export const store = configureStore({ reducer: reducer });
