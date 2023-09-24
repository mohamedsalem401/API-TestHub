import axios, { AxiosResponse } from "axios";
import { store } from "./store";
import { HttpHeader, HttpMethod, HttpResponse, HttpState } from "./types";

function convertHeadersArrayToAxiosHeaders(headersArray: HttpHeader[]) {
  const axiosHeaders: { [key: string]: string; } = {};

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
  headers: { [key: string]: string; },
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

export type RequestAction = {
  type: "sendRequest";
  payload: { index: number; dispatch: any; };
} |
{
  type: "setLoading";
  payload: { index: number; };
} |
{
  type: "setResponse";
  payload: { index: number; response: HttpResponse; };
};
export const handleSetLoading = (state: HttpState[], index: number) => {
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
export const handleSetResponse = (
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
