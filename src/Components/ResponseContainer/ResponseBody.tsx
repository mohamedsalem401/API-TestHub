import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Editor } from "@monaco-editor/react";
import { getResonseBody } from "./RequestStateHandlers";
import { getResponseExtension } from "./RequestStateHandlers";

export function ResponseBody({ index }: { index: number; }) {
  const body = useSelector(getResonseBody(index));
  const language = useSelector(getResponseExtension(index));

  return (
    <Box>
      <Editor
        width="100%"
        height="300px"
        value={JSON.stringify(body, null, 2)}
        language={language}
        theme="vs-dark"
        options={{ readOnly: true }}
        onChange={(value) => {
          // handleChangeActiveBody(value || "");
        }} />
    </Box>
  );
}
