import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { HttpMethod } from './types';

export interface Header {
  id: string;
  key: string;
  value: string;
}

export interface BodyState {
  active: number;
  data: {
    json: {
      value: string;
      id: 1;
    };
    html: {
      value: string;
      id: 2;
    };
    xml: {
      value: string;
      id: 3;
    };
  };
}
export type BodyKey = keyof BodyState['data'];

export interface RequestState {
  method: HttpMethod;
  url: string;
  headers: Header[];
  body: BodyState;
}

const initialState: RequestState = {
  method: HttpMethod.GET,
  url: 'https://jsonplaceholder.typicode.com/todos',
  headers: [
    {
      id: '999',
      key: 'Content-Type',
      value: 'application/json',
    },
  ],
  body: {
    active: 0,
    data: {
      json: {
        value: '',
        id: 1,
      },
      html: {
        value: '',
        id: 2,
      },
      xml: {
        value: '',
        id: 3,
      },
    },
  },
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setMethod(state, action: { payload: HttpMethod }) {
      state.method = action.payload;
    },
    setUrl(state, action: { payload: string }) {
      state.url = action.payload;
    },
    addHeader(state, action: { payload: Omit<Header, 'id'> }) {
      const id = Date.now().toString();

      state.headers.push({
        id,
        ...action.payload,
      });
    },
    updateHeader(state, action: { payload: { id: string; header: Partial<Omit<Header, 'id'>> } }) {
      const { id, header } = action.payload;

      const index = state.headers.findIndex((h) => h.id === id);

      if (index !== -1) {
        state.headers[index] = { ...state.headers[index], ...header };
      }
    },
    deleteHeader(state, action: { payload: string }) {
      state.headers = state.headers.filter((h) => h.id !== action.payload);
    },
    setActiveBody(state, action: { payload: number }) {
      state.body.active = action.payload;
    },
    setBody(state, action: { payload: string }) {
      const activeBody = getActiveBody(state.body);

      if (!activeBody) {
        throw new Error('Active body not found');
      }

      state.body.data[activeBody.type].value = action.payload;
    },
  },
});

export const requestActions = requestSlice.actions;
export const requestReducer = requestSlice.reducer;

export const useSelectRequest = () =>
  useSelector((state: { request: RequestState }) => state.request);

export const getActiveBody = (body: BodyState) => {
  if (body.active === 0) {
    return;
  }

  const activeBody = Object.keys(body.data).find(
    (k) => body.data[k as BodyKey].id === body.active
  ) as BodyKey | undefined;

  if (!activeBody) {
    throw new Error('Active body not found');
  }

  return {
    type: activeBody,
    value: body.data[activeBody].value,
  };
};
