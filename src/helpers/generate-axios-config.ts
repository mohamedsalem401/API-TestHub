import { AxiosRequestConfig } from 'axios';
import { getActiveBody, type BodyState, type Header } from '../state/RequestReducer';

interface GenerateAxiosConfigParams {
  method: string;
  headers: Header[];
  body: BodyState;
}

export function generateAxiosConfig(params: GenerateAxiosConfigParams): AxiosRequestConfig {
  const { method, headers, body } = params;
  let reqBody: string | undefined = undefined;

  const reqHeaders: Record<string, string> = {};

  headers.forEach((header) => {
    reqHeaders[header.key] = header.value;
  });

  if (method !== 'GET' && method !== 'DELETE') {
    const activeBody = getActiveBody(body);

    if (activeBody) {
      reqBody = activeBody.value;
    }
  }

  return {
    method,
    headers: reqHeaders,
    data: reqBody,
  };
}
