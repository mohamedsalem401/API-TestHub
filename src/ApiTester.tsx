import React, { useState } from "react";
import { Box } from "@mui/material";
import "highlight.js/styles/atom-one-dark.css";
import { ResponseDiplayer } from "./ResponseDiplayer";
import { HttpState } from "./HttpState";
import { RequestHandler } from "./RequestHandler";

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

const ApiEndpointTester = () => {
  const [request, setRequest] = useState(new HttpState());
  const handleRequestChange = (newRequest: HttpState) => {
    setRequest(newRequest);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={5}
      justifyContent="center"
      alignItems="center"
      padding={5}
    >
      <Box
        display="flex"
        flexDirection="row"
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
