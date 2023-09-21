import "./App.css";
import ApiEndpointTester from "./ApiTester";
import React, { useState } from "react";
import ProjectContainer from "./ProjectContainer";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      style={{
        padding: 64,
        display: "flex",
        width: "100%",
      }}
    >
      <ApiEndpointTester />
    </Box>
  );
}

export default App;
