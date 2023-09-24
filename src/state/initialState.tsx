import { HttpState, HttpMethod } from "./types";

export const initialState: HttpState[] = [
  {
    url: "https://dummy.restapiexample.com/api/v1/employees",
    headers: [],
    method: HttpMethod.GET,
    body: {
      active: "NONE",
      data: {
        NONE: {
          value: "",
        },
        JSON: {
          value: "{}",
        },
        Raw: {
          value: "",
        },
        HTML: {
          value: "",
        },
        XML: {
          value: "",
        },
      },
    },
    response: {
      isLoading: false,
      responseObject: undefined,
      time: 0,
    },
  },
];
