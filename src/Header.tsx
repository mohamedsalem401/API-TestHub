import { TextField, Box } from "@mui/material";
import { HttpState } from "./state/types";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { HeaderAction } from "./state/HeaderAction";

export function Header({
  index,
  headerIndex,
}: {
  index: number;
  headerIndex: number;
}) {
  const header = useSelector(
    (state: HttpState[]) => state[index].headers[headerIndex]
  );
  const dispatch: (action: HeaderAction) => void = useDispatch();

  const handleKeyChange = useCallback((newKey: string) => {
    const newHeader = { key: newKey, value: header.value };
    dispatch({
      type: "changeHeader",
      payload: { index: index, headerIndex: headerIndex, newHeader: newHeader },
    });
  }, []);

  const handleValueChange = useCallback((newValue: string) => {
    const newHeader = { key: header.key, value: newValue };
    dispatch({
      type: "changeHeader",
      payload: { index: index, headerIndex: headerIndex, newHeader: newHeader },
    });
  }, []);

  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <TextField
        label="Key"
        variant="outlined"
        size="small"
        sx={{ width: "120px" }}
        value={header.key}
        onChange={(e) => {
          handleKeyChange(e.target.value);
        }}
      />
      <TextField
        label="Value"
        variant="outlined"
        size="small"
        value={header.value}
        onChange={(e) => {
          handleValueChange(e.target.value);
        }}
      />
    </Box>
  );
}
