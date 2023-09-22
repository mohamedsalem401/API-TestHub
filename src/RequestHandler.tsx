//@
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Stack,
  Box,
  IconButton,
  Collapse,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Header } from "./Header";
import { useCallback, useEffect } from "react";
import { HttpState, HttpMethod, HttpHeader } from "./state/store";
import { useDispatch, useSelector } from "react-redux";

export function RequestHandler({ index }: { index: number }) {
  const request = useSelector((state: HttpState[]) => state[index]);
  const dispatch = useDispatch();
  const handleBodyChange = (newBody: string) => {};

  const sendRequest = () => {
    // request.sendRequest().then((newRequest) => {
    //   handleRequestChange(newRequest);
    // });
  };
  const handleMethodChange = useCallback((newMethod: HttpMethod) => {
    dispatch({
      type: "changeMethod",
      payload: { index: index, newMethod: newMethod },
    });
  }, []);

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "start",
        }}
      >
        <Stack direction="row" sx={{ width: "100%" }} alignItems="center">
          <FormControl>
            <InputLabel>HTTP Method</InputLabel>
            <Select
              value={request.method}
              label="HTTP Method"
              onChange={(e) => handleMethodChange(e.target.value as HttpMethod)}
              style={{ width: "150px" }}
            >
              {Object.keys(HttpMethod).map((methodName) => (
                <MenuItem key={methodName} value={methodName}>
                  {methodName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="API endpoint URL"
            value={request.url}
            onChange={(e) => {
              dispatch({
                type: "changeUrl",
                payload: { index: index, newUrl: e.target.value },
              });
            }}
            variant="outlined"
            fullWidth
          />
        </Stack>
        <Collapse
          in={
            request.method === HttpMethod.POST ||
            request.method === HttpMethod.PATCH
          }
          sx={{ width: "100%", mb: 2 }}
        >
          <TextField
            label="Request Data (json)"
            fullWidth
            multiline
            value={request.body}
            onChange={(e) => handleBodyChange(e.target.value)}
          />
        </Collapse>

        {/* Render headers */}
        <Stack
          width="100%"
          direction="column"
          gap={2}
          alignItems="start"
          flexWrap="wrap"
          justifyContent="space-between"
          mb={3}
        >
          <Box flex={1} textAlign="start">
            <Typography fontWeight={700} fontSize="20px">
              Headers
            </Typography>
            {request.headers.map((header, headerIndex) => (
              <Box
                key={headerIndex}
                display="flex"
                alignItems="center"
                gap={1}
                mt={2}
              >
                <Header index={index} headerIndex={headerIndex} />
                <IconButton
                  onClick={() => {
                    // handleHeaderRemove(headerIndex);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              sx={{ mt: 1 }}
              variant="outlined"
              onClick={() => {
                dispatch({
                  type: "addHeader",
                  payload: { index: index },
                });
              }}
            >
              Add Header
            </Button>
          </Box>
        </Stack>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={sendRequest}
        >
          {request.isLoading ? "Loading..." : "Send"}
        </Button>
      </Box>
    </Box>
  );
}
