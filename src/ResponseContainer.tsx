import { Alert, Box, IconButton, Tab, Tabs, TextField } from "@mui/material";
import { ContentCopy, Download, OpenInFull } from "@mui/icons-material";

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
      <ResponseActions />

      {/* Tabs */}
      <ResponseTabs />

      {/* Response Body */}
      <TabView />
    </Box>
  );
}
function TabView() {
  return (
    <TextField
      multiline
      minRows={8}
      style={{
        width: "100%",
      }}
    />
  );
}
function ResponseTabs() {
  return (
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
  );
}
function ResponseActions() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        alignSelf: "stretch",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Alert severity="success">200 ( OK )</Alert>
      <Alert severity="info">3200 ms</Alert>
      <Alert severity="info">32.6 KB</Alert>
      <Box style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        <IconButton>
          <ContentCopy />
        </IconButton>
        <IconButton>
          <OpenInFull />
        </IconButton>
        <IconButton>
          <Download />
        </IconButton>
      </Box>
    </Box>
  );
}
