import { Editor } from "@monaco-editor/react";
import { Box, TextField, Typography } from "@mui/material";
import { HeaderAction } from "../state/HeaderAction";
import { RequestBodyTabs } from "./RequestBodyTabs";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTab as getRequestBodyActiveTab } from "./getActiveTab";
import { useCallback } from "react";
import { BodyAction } from "../state/BodyAction";
import { HttpState } from "../state/types";

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
      <RequestBodyTabs index={index} />
      <RequestBody index={index} />
    </Box>
  );
}

function RequestBody({ index }: { index: number }) {
  const activeTab = useSelector(getRequestBodyActiveTab(index));
  const body = useSelector((state: HttpState[]) => {
    return state[index].body.data[activeTab].value;
  });
  const dispatch = useDispatch();

  const handleChangeActiveBody = useCallback(
    (newBody: string) => {
      const action: BodyAction = {
        type: "changeBody",
        payload: { index: index, key: activeTab, newBody: newBody },
      };
      dispatch(action);
    },
    [activeTab]
  );

  const languageMapping = {
    JSON: "json",
    XML: "xml",
    HTML: "html",
    Raw: "",
  };

  return (
    <Box>
      {activeTab != "NONE" && (
        <Editor
          width="100%"
          height="200px"
          theme="vs-dark"
          language={languageMapping[activeTab] || ""}
          value={body}
          onChange={(value) => {
            handleChangeActiveBody(value || "");
          }}
        />
      )}
    </Box>
  );
}
