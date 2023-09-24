import { Box, TextField } from "@mui/material";
import { ResponseBody } from "./ResponseBody";
import { ResponseTabs } from "./ResponseTabs";
import { ResponseActions } from "./ResponseActions";

export function ResponseContainer({ index }: { index: number }) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "stretch",
        width: "100%",
        alignItems: "flexStart",
        gap: "16px",
      }}
    >
      {/* Header */}
      <ResponseActions index={index} />

      {/* Tabs */}
      <ResponseTabs index={index} />

      {/* Response Body */}
      <ResponseBody index={index} />
    </Box>
  );
}
