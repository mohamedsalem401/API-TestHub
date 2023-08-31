import React from "react";
import {
  Typography, Box,
  IconButton
} from "@mui/material";

export interface ResponseDiplayer {
  response: string;
  error: string;
}
export function ResponseDiplayer({ response, error }: ResponseDiplayer) {
  const handleDownload = () => {
    if (response) {
      const blob = new Blob([JSON.stringify(response)], {
        type: "application/json;charset=utf-8",
      });
      // saveAs(blob, "response.json");
    }
  };

  return (
    <Box sx={{ flex: 1, width: { xs: "100%", md: "45%" } }} textAlign="start">
      <Typography
        variant="h6"
        sx={{ display: "flex", alignItems: "center" }}
        mb={2}
      >
        Response:
        <IconButton
          color="primary"
          aria-label="Download Response"
          disabled={!response}
          onClick={handleDownload}
          sx={{ ml: 1 }}
        >
          download
        </IconButton>
      </Typography>
      <Box
        sx={{
          padding: "6px",
          borderRadius: "6px",
          backgroundColor: "#282c34",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "300px",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              height: "4px",
              width: "4px",
              backgroundColor: "#282c34",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "2px",
            },
          }}
        >
          <pre
            className="language-json"
            style={{
              textAlign: "start",
            }}
          >
            <code>
              {!error
                ? response
                  ? JSON.stringify(response, null, 2)
                  : `{\n\n}`
                : error}
            </code>
          </pre>
        </Box>
      </Box>
    </Box>
  );
}
