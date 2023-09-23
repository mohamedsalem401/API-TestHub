import { Alert, Box, IconButton, Tab, Tabs, TextField } from "@mui/material";
import { ContentCopy, Download, OpenInFull } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { HttpState } from "./state/store";

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
      <TabView index={index} />
    </Box>
  );
}

function TabView({ index }: { index: number }) {
  const body = useSelector(getResonseBody(index));

  return (
    <TextField
      multiline
      minRows={8}
      style={{
        width: "100%",
      }}
      value={JSON.stringify(body)}
    />
  );
}

function ResponseTabs({ index }: { index: number }) {
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

function ResponseActions({ index }: { index: number }) {
  const code = useSelector(getCode(index));
  const status = useSelector(getStatus(index));
  const time = useSelector((state: HttpState[]) => {
    return state[index].response.time;
  });
  const body = useSelector(getResonseBody(index));

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
      <Alert severity="success">
        {code} ( {status} )
      </Alert>
      <Alert severity="info">{time.toFixed(0)} ms</Alert>
      {/* <Alert severity="info">{(body.length / 1000).toFixed(3)} KB</Alert> */}
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

function getResonseBody(
  index: number
): (state: HttpState[]) => ReadableStream<Uint8Array> | null | undefined {
  return (state: HttpState[]) => {
    return state[index].response.responseObject?.data.data;
  };
}

function getCode(index: number): (state: HttpState[]) => number | undefined {
  return (state: HttpState[]) => {
    return state[index].response.responseObject?.status || 200;
  };
}

function getStatus(index: number) {
  return (state: HttpState[]) => {
    return state[index].response.responseObject?.statusText || "OK";
  };
}
