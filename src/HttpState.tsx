import { HttpMethod, HttpHeader } from "./ApiTester";

export class HttpState {
  url: string;
  method: HttpMethod;
  headers: HttpHeader[];
  body: string;

  isLoading: boolean;
  response: any;
  error: string;

  constructor(
    url: string = "http://localhost:3001/",
    method: HttpMethod = HttpMethod.GET,
    headers: HttpHeader[] = [],
    body: string = "{\n}",
    isLoading: boolean = false,
    response: any = null,
    error: string = ""
  ) {
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.body = body;
    this.isLoading = isLoading;
    this.response = response;
    this.error = error;
    this.sendRequest = this.sendRequest.bind(this);
  }

  clone(): HttpState {
    return new HttpState(
      this.url,
      this.method,
      [...this.headers],
      this.body,
      this.isLoading,
      this.response,
      this.error
    );
  }

  async sendRequest(): Promise<HttpState> {
    try {
      const newState = new HttpState(
        this.url,
        this.method,
        this.headers,
        this.body,
        true,
        null,
        ""
      );

      const requestOptions: RequestInit = {
        method: this.method,
      };

      if (this.method === HttpMethod.POST ||
        this.method === HttpMethod.PUT ||
        this.method === HttpMethod.PATCH) {
        requestOptions.headers = this.headers.reduce(
          (headersObj, header) => ({
            ...headersObj,
            [header.key]: header.value,
          }),
          {}
        );

        requestOptions.body = this.body;
      }

      const response = await fetch(this.url, requestOptions);

      const responseData = await response.json();

      newState.isLoading = false;
      newState.response = responseData;
      return newState;
    } catch (error) {
      const newState = new HttpState(
        this.url,
        this.method,
        this.headers,
        this.body,
        false,
        null,
        `An error occurred during the request.\n${error}`
      );
      return newState;
    }
  }
}
