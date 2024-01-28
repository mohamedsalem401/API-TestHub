import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RequestState } from './RequestReducer';

interface ResponseState {
  data: any;
  error?: string;
  isPending: boolean;
}

const initialState: ResponseState = {
  data: undefined,
  error: undefined,
  isPending: false,
};

export const sendHttpReq = createAsyncThunk('sendRequest', async (reqState: RequestState) => {
  const { method, url, headers } = reqState;
  const reqHeaders: Record<string, string> = {};

  headers.forEach((header) => {
    reqHeaders[header.key] = header.value;
  });

  const res = await axios(url, { method, headers: reqHeaders });
  return res.data;
});

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendHttpReq.pending, (state) => {
      state.isPending = true;
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(sendHttpReq.fulfilled, (state, action) => {
      state.isPending = false;
      state.data = action.payload;
    });
    builder.addCase(sendHttpReq.rejected, (state, action) => {
      state.isPending = false;
      state.data = undefined;
      state.error = action.error.message;
    });
  },
});

export const responseActions = responseSlice.actions;
export const responseReducer = responseSlice.reducer;

export const useSelectResponse = () =>
  useSelector((state: { response: ResponseState }) => state.response);
