import {
  Box, Tab,
  Tabs, Typography
} from "@mui/material";
import { Headers } from "../columns";

export function RequestHeadersContainer() {
  return (
    <Box>
      <Typography variant="h4">Headers</Typography>
      <Tabs value={"FULL URL"}>
        <Tab className="tab" label="Full url" value="FULL URL" />
        <Tab className="tab" label="Localhost" value="LOCALHOST" />
        <Tab className="tab" label="Relative path" value="RELATIVE PATH" />
        <Tab className="tab" label="API library" value="API LIBRARY" />
      </Tabs>
      <Headers />
    </Box>
  );
}
