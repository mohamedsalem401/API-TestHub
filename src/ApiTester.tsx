import React, { useState } from "react";
import { Typography, Stack, Box } from "@mui/material";
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

function SavedRequests({ requests }: { requests: any }) {
  return (
    <Stack
      maxWidth="100%"
      sx={{
        flexDirection: "row",
        gap: 2,
        mb: 4,
        overflow: "auto",
        alignItems: "start",
        padding: "10px 0",
        "&::-webkit-scrollbar": {
          width: "4px",
          height: "6px",
          backgroundColor: "#FFF",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "2px",
        },
      }}
    >
      {requests.map(
        (req: {
          req:
            | string
            | number
            | boolean
            | ((prevState: string) => string)
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | null
            | undefined;
          method:
            | string
            | number
            | boolean
            | ((prevState: HttpMethod) => HttpMethod)
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | null
            | undefined;
          headers: React.SetStateAction<HttpHeader[]>;
          body: React.SetStateAction<string>;
        }) => (
          <Box
            flex={1}
            sx={{
              display: "flex",
              whiteSpace: "nowrap",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "#ddd",
              justifyContent: "space-between",
              padding: "8px 16px",
              gap: 2,
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6">
              {`${req.method}: ${` `}
                    ${req.req}`}
            </Typography>
          </Box>
        )
      )}
    </Stack>
  );
}
