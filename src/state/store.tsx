import { configureStore } from "@reduxjs/toolkit";
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
  body: {
    NONE: { active: boolean; value: string };
    JSON: { active: boolean; value: string };
    // FormData: { active: boolean; value: string };
    Raw: { active: boolean; value: string };
    HTML: { active: boolean; value: string };
    XML: { active: boolean; value: string };
    // XWwwForm: { active: boolean; value: string };
  };
  isLoading: boolean;
  response: any;
  error: string;
};

type ResponseAction = {
  type: "changeResponse";
  payload: { newMethod: Response };
};

const handleResponseChange = (
  state: HttpState[],
  index: number,
  newResponse: Response
) => {
  const newstate = [...state];
  newstate[index].response = newResponse;
  return newstate;
};

const initialState: HttpState[] = [
  {
    url: "https://example.com",
    headers: [{ key: "type", value: "string" }],
    method: HttpMethod.GET,
    body: {
      NONE: {
        active: true,
        value: "",
      },
      JSON: {
        active: false,
        value: "{}",
      },
      Raw: {
        active: false,
        value: "",
      },
      HTML: {
        active: false,
        value: "",
      },
      XML: {
        active: false,
        value: "",
      },
      /* FormData: {
        active: false,
        value: "",
      },
      XWwwForm: {
        active: false,
        value: "",
      }, */
    },
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
