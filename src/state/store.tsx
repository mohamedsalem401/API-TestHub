import { configureStore } from '@reduxjs/toolkit';
import { handleChangeActiveBody, handleChangeBody } from './BodyAction';
import { handleSendRequest, handleSetLoading, handleSetResponse } from './RequestAction';
import { initialState } from './initialState';
import { HttpStateAction } from './types';

const reducer = (state = initialState, action: HttpStateAction) => {
  switch (action.type) {
    case 'changeActiveBody':
      return handleChangeActiveBody(state, action.payload.index, action.payload.key);
    case 'changeBody':
      return handleChangeBody(
        state,
        action.payload.index,
        action.payload.key,
        action.payload.newBody
      );
    case 'sendRequest':
      return handleSendRequest(state, action.payload.index);
    case 'setLoading':
      return handleSetLoading(state, action.payload.index);
    case 'setResponse':
      return handleSetResponse(state, action.payload.index, action.payload.response);
    default:
      return state;
  }
};

export const store = configureStore({ reducer: reducer });
