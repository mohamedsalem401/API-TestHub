import {
  Box, Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";

export function RequestBodyContainer() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Typography variant="h4">Body</Typography>
      <Tabs
        value={"NONE"}
        style={{
          display: "flex",
          height: "42px",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <Tab className="tab" label="NONE" value="NONE" />
        <Tab className="tab" label="FORM-DATA" value="FORM-DATA" />
        <Tab className="tab" label="Relative path" value="RELATIVE PATH" />
        <Tab className="tab" label="API library" value="API LIBRARY" />
      </Tabs>
      <TextField
        multiline
        minRows={7}
        style={{
          width: "100%",
        }} />
    </Box>
  );
}
