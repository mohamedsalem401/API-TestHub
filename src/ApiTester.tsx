import React, { useState } from "react";
import { Box } from "@mui/material";
import "highlight.js/styles/atom-one-dark.css";
import { ResponseDiplayer } from "./ResponseDiplayer";
import { HttpState } from "./HttpState";
import { RequestHandler } from "./RequestHandler";
import { configureStore } from "@reduxjs/toolkit";

export interface HttpHeader {
  [key: string]: string;
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
enum HttpStateAction {}
const reducer = (
  state = new HttpState(),
  action: { type: HttpStateAction; payload?: any }
) => {
  return state;
};
const store = configureStore({ reducer: reducer });

const ApiEndpointTester = () => {
  const [request, setRequest] = useState(new HttpState());
  const handleRequestChange = (newRequest: HttpState) => {
    setRequest(newRequest);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        alignSelf: "stretch",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <RequestHandler
          request={request}
          handleRequestChange={handleRequestChange}
        />
        <ResponseDiplayer response={request.response} error={request.error} />
      </Box>
    </Box>
  );
};

export default ApiEndpointTester;
