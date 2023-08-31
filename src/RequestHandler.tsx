import { HttpState } from "./HttpState";
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
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Header } from "./Header";
import { useEffect } from "react";
import { HttpMethod, HttpHeader } from "./ApiTester";

interface RequestHandlerProps {
  request: HttpState;
  handleRequestChange: (newRequest: HttpState) => void;
}

export function RequestHandler({
  request,
  handleRequestChange,
}: RequestHandlerProps) {
  useEffect(() => hljs.highlightAll(), [request]);

  const handleUrlChange = (newUrl: string) => {
    const newRequest = request.clone();
    newRequest.url = newUrl;
    handleRequestChange(newRequest);
  };

  const handleMethodChange = (newMethod: HttpMethod) => {
    const newRequest = request.clone();
    newRequest.method = newMethod;
    handleRequestChange(newRequest);
  };

  const handleHeadersChange = (newHeaders: HttpHeader[]) => {
    const newRequest = request.clone();
    newRequest.headers = newHeaders;
    handleRequestChange(newRequest);
  };

  const handleBodyChange = (newBody: string) => {
    const newRequest = request.clone();
    newRequest.body = newBody;
    handleRequestChange(newRequest);
  };

  const handleAddHeader = () => {
    handleHeadersChange([...request.headers, { "": "" }]);
  };

  const handleHeaderChange = (index: number, newHeader: HttpHeader) => {
    const updatedHeaders = [...request.headers];
    updatedHeaders[index] = newHeader;
    handleHeadersChange(updatedHeaders);
  };

  const handleHeaderRemove = (index: number) => {
    const updatedHeaders = [...request.headers];
    updatedHeaders.splice(index, 1);
    handleHeadersChange(updatedHeaders);
  };

  const sendRequest = () => {
    request.sendRequest().then((newRequest) => {
      handleRequestChange(newRequest);
    });
  };
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
        <Stack
          direction="row"
          gap={2}
          sx={{ width: "100%" }}
          alignItems="center"
          mb={3}
        >
          <FormControl>
            <InputLabel>HTTP Method</InputLabel>
            <Select
              value={request.method}
              label="HTTP Method"
              onChange={(e) => handleMethodChange(e.target.value as HttpMethod)}
            >
              {Object.keys(HttpMethod).map((methodName) => (
                <MenuItem key={methodName} value={methodName}>
                  {methodName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            label="API endpoint URL"
            value={request.url}
            onChange={(e) => handleUrlChange(e.target.value)}
            required
            sx={{ flex: 1 }}
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
            {request.headers.map((header, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={1}
                mt={2}
              >
                <Header
                  header={header}
                  handleHeaderChange={(newHeader: HttpHeader) => {
                    handleHeaderChange(index, newHeader);
                  }}
                />
                <IconButton
                  onClick={() => {
                    handleHeaderRemove(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button sx={{ mt: 1 }} variant="outlined" onClick={handleAddHeader}>
              Add Header
            </Button>
          </Box>{" "}
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
