import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';
import { RequestState } from './RequestReducer';

interface Res {
  body: any;
  code: number;
  time: number;
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
    const { method, url, headers } = reqState;
    const reqHeaders: Record<string, string> = {};

    headers.forEach((header) => {
      reqHeaders[header.key] = header.value;
    });

    const startTime = performance.now();
    try {
      const res = await axios(url, { method, headers: reqHeaders });

      const endTime = performance.now();

      return {
        body: res.data,
        code: res.status,
        time: endTime - startTime,
      };
    } catch (err) {
      const error = err as AxiosError;

      const endTime = performance.now();

      return rejectWithValue({
        data: error.message,
        code: error.response?.status,
        time: endTime - startTime,
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
      const { payload } = action as { payload: { data?: string; code?: number; time: number } };

      state.isPending = false;
      state.res = {
        body: payload.data || 'Something went wrong',
        code: payload.code || 500,
        time: payload.time,
      };
    });
  },
});

export const responseActions = responseSlice.actions;
export const responseReducer = responseSlice.reducer;

export const useSelectResponse = () =>
  useSelector((state: { response: ResponseState }) => state.response);
