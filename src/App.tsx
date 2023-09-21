import "./App.css";
import ApiEndpointTester from "./ApiTester";
import React, { useState } from "react";
import ProjectContainer from "./ProjectContainer";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./state/store";

function App() {
  return (
    <Box
      style={{
        // padding: 64,
        display: "flex",
        width: "100%",
      }}
    >
      <Provider store={store}>
        <ApiEndpointTester index={0}/>
      </Provider>
    </Box>
  );
}

export default App;

/**
 *   async sendRequest(): Promise<HttpState> {
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

 */
