import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { handleUrlChange } from "./UrlAction";
import {
  handleAddHeader,
  handleChangeHeader,
  handleRemoveHeader,
} from "./HeaderAction";
import { handleMethodChange } from "./MethodAction";
import {
  handleChangeActiveBody,
  handleChangeBody,
} from "./BodyAction";
import { AxiosError } from "axios";
import { response } from "express";
import {
  handleSendRequest,
  handleSetLoading,
  handleSetResponse,
} from "./RequestAction";
import { initialState } from "./initialState";
import { HttpStateAction } from "./types";

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
