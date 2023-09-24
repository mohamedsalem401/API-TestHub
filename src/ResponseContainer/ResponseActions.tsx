import { Alert, Box, IconButton } from "@mui/material";
import { ContentCopy, Download, OpenInFull } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { copyToClipboard } from "../helpers/copyToClipboard";
import { downloadFile } from "../helpers/downloadFile";
import { getCode, getStatus, getResonseBody } from "./RequestStateHandlers";
import { getResponseExtension } from "./RequestStateHandlers";
import { getResponseTime } from "./RequestStateHandlers";

export function ResponseActions({ index }: { index: number }) {
  const code = useSelector(getCode(index));
  const status = useSelector(getStatus(index));
  const time = useSelector(getResponseTime(index));
  const body = useSelector(getResonseBody(index));
  const stringfiedBody = JSON.stringify(body);
  const extension = useSelector(getResponseExtension(index));

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
      <Alert severity="info">
        {((stringfiedBody?.length || 0) / 1024).toFixed(2)} KB
      </Alert>
      <Box style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        <IconButton
          onClick={() => {
            copyToClipboard(stringfiedBody);
          }}
        >
          <ContentCopy />
        </IconButton>
        {/* TODO: ADD full width view*/}
        <IconButton>
          <OpenInFull />
        </IconButton>
        <IconButton
          onClick={() => {
            downloadFile(stringfiedBody, "", extension);
          }}
        >
          <Download />
        </IconButton>
      </Box>
    </Box>
  );
}
