import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { HttpMethod, HttpState } from "../state/types";
import { useCallback } from "react";
import { MethodAction } from "../state/MethodAction";
import { UrlAction } from "../state/UrlAction";

export function URIContainerBody({ index }: { index: number }) {
  const httpState = useSelector((state: HttpState[]) => state[index]);
  const url = httpState.url;
  const method = httpState.method;
  const dispatch = useDispatch();

  const handleMethodChange = useCallback((newMethod: HttpMethod) => {
    const action: MethodAction = {
      type: "changeMethod",
      payload: { index: index, newMethod: newMethod },
    };
    dispatch(action);
  }, []);

  const handleUrlChange = useCallback((newUrl: string) => {
    const action: UrlAction = {
      type: "changeUrl",
      payload: { index: index, newUrl: newUrl },
    };
    dispatch(action);
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        alignSelf: "stretch",
      }}
    >
      <FormControl
        style={{
          width: "100px",
          overflow: "hidden",
        }}
        size="small"
      >
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          label="HTTP Method"
          value={method}
          onChange={(e) => {
            handleMethodChange(e.target.value as HttpMethod);
          }}
          labelId="http-method-select-label"
          id="http-method-select"
          size="small"
          style={{
            width: "100px",
          }}
        >
          {Object.values(HttpMethod).map((method, index) => (
            <MenuItem key={index} value={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="URL"
        value={url}
        onChange={(e) => {
          handleUrlChange(e.target.value);
        }}
        fullWidth
        style={{
          alignSelf: "stretch",
        }}
      />
    </Box>
  );
}
