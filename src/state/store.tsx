import { configureStore } from "@reduxjs/toolkit";
import { UrlAction, handleUrlChange } from "./UrlAction";
import {
  HeaderAction,
  handleAddHeader,
  handleChangeHeader,
  handleRemoveHeader,
} from "./HeaderAction";

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

export type HttpState = {
  url: string;
  headers: HttpHeader[];
  method: HttpMethod;
  body: string;
  isLoading: boolean;
  response: any;
  error: string;
};
enum MethodAction {
  changeMethod,
}
const handleMethodChange = (
  arr: HttpState[],
  index: number,
  newMethod: HttpMethod
) => {
  const newArr = [...arr];
  newArr[index].method = newMethod;
  return newArr;
};
enum BodyAction {
  changeBody,
}
const handleBodyChange = (index: number, arr: HttpState[], newBody: string) => {
  const newArr = [...arr];
  newArr[index].body = newBody;
  return newArr;
};
enum ResponseAction {
  changeResponse,
}
const handleResponseChange = (
  arr: HttpState[],
  index: number,
  newResponse: Response
) => {
  const newArr = [...arr];
  newArr[index].response = newResponse;
  return newArr;
};
const initialState: HttpState[] = [
  {
    url: "https://example.com",
    headers: [],
    method: HttpMethod.GET,
    body: "",
    isLoading: false,
    response: undefined,
    error: "",
  },
];
type HttpStateAction =
  | UrlAction
  | HeaderAction
  | { type: MethodAction.changeMethod; payload: { newMethod: HttpMethod } }
  | { type: BodyAction.changeBody; payload: { newBody: string } }
  | { type: ResponseAction.changeResponse; payload: { newResponse: Response } };

const reducer = (state = initialState, action: HttpStateAction) => {
  switch (action.type) {
    case "changeUrl":
      return handleUrlChange(
        action.payload.index,
        state,
        action.payload.newUrl
      );
    case "addHeader":
      return handleAddHeader(state, action.payload.index);
    case "changeHeader":
      return handleChangeHeader(
        state,
        action.payload.index,
        action.payload.newHeader
      );
    case "removeHeader":
      return handleRemoveHeader(
        state,
        action.payload.index,
        action.payload.headerIndex
      );
    default:
      return state;
  }
};
export const store = configureStore({ reducer: reducer });
