import React from "react";
import { Typography, Stack, Box } from "@mui/material";
import { HttpMethod, HttpHeader } from "./state/types";

export function SavedRequests({ requests }: { requests: any }) {
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
