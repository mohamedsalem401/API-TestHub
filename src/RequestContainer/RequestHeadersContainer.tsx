import { Box, Tab, Tabs, Typography } from "@mui/material";
import { KeyValueTable } from "../KeyValueTable";
import { useDispatch, useSelector } from "react-redux";
import { HttpHeader } from "../state/types";
import { useCallback } from "react";
import { HeaderAction } from "../state/HeaderAction";
import { getHttpState } from "./getHttpState";

export function RequestHeadersContainer({ index }: { index: number }) {
  const httpState = useSelector(getHttpState(index));
  const dispatch = useDispatch();
  const rows = httpState.headers.map((header, index) => {
    return { id: index, key: header.key, value: header.value };
  });
  rows.push({ id: rows.length, key: "", value: "" });

  const handleKeyChange = useCallback((headerIndex: number, newKey: any) => {
    const newHeader = { key: newKey, value: rows[headerIndex].value };
    const action: HeaderAction = {
      type: "changeHeader",
      payload: { index: index, headerIndex: headerIndex, newHeader: newHeader },
    };
    dispatch(action);
  }, []);

  const handleValueChange = useCallback(
    (headerIndex: number, newValue: any) => {
      const newHeader = { key: rows[headerIndex].key, value: newValue };
      const action: HeaderAction = {
        type: "changeHeader",
        payload: {
          index: index,
          headerIndex: headerIndex,
          newHeader: newHeader,
        },
      };
      dispatch(action);
    },
    []
  );

  const onChange = (headerIndex: number, field: string, value: string) => {
    if (field === "key") {
      handleKeyChange(headerIndex, value);
    } else {
      handleValueChange(headerIndex, value);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Headers</Typography>
      <Tabs value={"HEADERS"}>
        <Tab className="tab" label="Headers" value="HEADERS" />
        <Tab className="tab" label="Authentication" value="AUTHENTICATION" />
        <Tab className="tab" label="Raw" value="RAW" />
      </Tabs>
      <KeyValueTable rows={rows} onChange={onChange} />
    </Box>
  );
}
