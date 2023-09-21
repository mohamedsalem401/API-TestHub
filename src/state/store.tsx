import { configureStore } from "@reduxjs/toolkit";
import { UrlAction, handleUrlChange } from "./UrlAction";
import {
  HeaderAction,
  handleAddHeader,
  handleChangeHeader,
  handleRemoveHeader,
} from "./HeaderAction";
import { MethodAction, handleMethodChange } from "./MethodAction";

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

type BodyAction = {
  type: "changeBody";
  payload: { index: number; newBody: string };
};
const handleBodyChange = (arr: HttpState[], index: number, newBody: string) => {
  const newArr = [...arr];
  newArr[index].body = newBody;
  return newArr;
};

type ResponseAction = {
  type: "changeResponse";
  payload: { newMethod: Response };
};

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
export type HttpStateAction =
  | UrlAction
  | HeaderAction
  | MethodAction
  | BodyAction
  | ResponseAction;

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
    case "changeBody":
      return handleBodyChange(
        state,
        action.payload.index,
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
