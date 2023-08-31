import React from "react";
import { TextField, Box } from "@mui/material";
import { HttpHeader } from "./ApiTester";

export interface Header {
  header: HttpHeader;
  handleHeaderChange: (newHeader: HttpHeader) => void;
}
export function Header({ header, handleHeaderChange }: Header) {
  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <TextField
        label="Key"
        variant="outlined"
        size="small"
        sx={{ width: "120px" }}
        value={header.key}
        onChange={(e) => {
          const newHeaderKey = e.target.value;
          handleHeaderChange({ key: newHeaderKey, value: header.value });
        }} />
      <TextField
        label="Value"
        variant="outlined"
        size="small"
        value={header.value}
        onChange={(e) => {
          const newHeaderValue = e.target.value;
          handleHeaderChange({ key: newHeaderValue, value: header.value });
        }} />
    </Box>
  );
}