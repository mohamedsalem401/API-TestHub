import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';
import { RequestState, getActiveBody } from './RequestReducer';
import { generateAxiosConfig } from '../helpers/generate-axios-config';

interface Res {
  body: any;
  code: number;
  time: number;
  headers?: Record<string, string>;
}

interface ResponseState {
  res: Res;
  isPending: boolean;
}

const initialState: ResponseState = {
  res: {
    body: undefined,
    code: 200,
    time: 0,
  },
  isPending: false,
};

export const sendHttpReq = createAsyncThunk(
  'sendRequest',
  async (reqState: RequestState, { rejectWithValue }) => {
    const { method, url, headers, body } = reqState;

    const axiosConfig = generateAxiosConfig({
      body,
      headers,
      method,
    });

    const startTime = performance.now();
    try {
      const res = await axios(url, axiosConfig);

      const endTime = performance.now();

      return {
        body: res.data,
        code: res.status,
        headers: res.headers as Record<string, string>,
        time: endTime - startTime,
      };
    } catch (err) {
      const error = err as AxiosError;

      const endTime = performance.now();

      return rejectWithValue({
        data: error.message,
        code: error.response?.status,
        time: endTime - startTime,
        headers: error.response?.headers,
      });
    }
  }
);

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendHttpReq.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(sendHttpReq.fulfilled, (state, action) => {
      state.isPending = false;
      state.res = action.payload;
    });
    builder.addCase(sendHttpReq.rejected, (state, action) => {
      const { payload } = action as {
        payload: { data?: string; code?: number; time: number; headers?: Record<string, string> };
      };

      state.isPending = false;
      state.res = {
        body: payload.data || 'Something went wrong',
        code: payload.code || 500,
        time: payload.time,
        headers: payload.headers || {},
      };
    });
  },
});

export const responseActions = responseSlice.actions;
export const responseReducer = responseSlice.reducer;

export const useSelectResponse = () =>
  useSelector((state: { response: ResponseState }) => state.response);
