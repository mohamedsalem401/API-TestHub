import { Box, Tab, Tabs, TextField, Typography } from "@mui/material";

export function RequestBodyContainer({ index }: { index: number }) {
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
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab className="tab" label="NONE" value="NONE" />
        <Tab className="tab" label="JSON" value="JSON" />
        <Tab className="tab" label="XML" value="XML" />
        <Tab className="tab" label="FORM-DATA" value="FORM-DATA" />
        <Tab className="tab" label="Raw" value="RAW" />
        <Tab
          className="tab"
          label="x-www-form-urlencoded"
          value="X-WWW-FORM-URLENCODED"
        />
      </Tabs>
      <TextField
        multiline
        minRows={7}
        style={{
          width: "100%",
        }}
      />
    </Box>
  );
}
