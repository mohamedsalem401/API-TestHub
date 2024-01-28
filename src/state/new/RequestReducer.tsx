import { createSlice } from '@reduxjs/toolkit';
import { HttpMethod } from '../types';
import { useSelector } from 'react-redux';

export interface Header {
  id: string;
  key: string;
  value: string;
}

export interface RequestState {
  method: HttpMethod;
  url: string;
  headers: Header[];
}

const initialState: RequestState = {
  method: HttpMethod.GET,
  url: 'https://dummy.restapiexample.com/api/v1/employees',
  headers: [
    {
      id: '999',
      key: 'Content-Type',
      value: 'application/json',
    },
  ],
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
    deleteHeader(state, action: { payload: string }) {},
  },
});

export const requestActions = requestSlice.actions;
export const requestReducer = requestSlice.reducer;

export const useSelectRequest = () =>
  useSelector((state: { request: RequestState }) => state.request);
