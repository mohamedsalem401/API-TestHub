import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import { PlayCircle } from "@mui/icons-material";
import { DataGridDemo } from "./ApiTester";

export function RequestContainer({ index }: { index: number }) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignSelf: "stretch",
        width: "100%",
      }}
    >
      <URIContainer />
      <RequestHeadersContainer />
      <RequestBodyContainer />
    </Box>
  );
}
function RequestBodyContainer() {
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
      <TextField
        multiline
        minRows={7}
        style={{
          width: "100%",
        }} />
    </Box>
  );
}
function RequestHeadersContainer() {
  return (
    <Box>
      <Typography variant="h4">Headers</Typography>
      <Tabs value={"FULL URL"}>
        <Tab className="tab" label="Full url" value="FULL URL" />
        <Tab className="tab" label="Localhost" value="LOCALHOST" />
        <Tab className="tab" label="Relative path" value="RELATIVE PATH" />
        <Tab className="tab" label="API library" value="API LIBRARY" />
      </Tabs>
      <DataGridDemo />
    </Box>
  );
}
function URIContainer() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "var(--1, 8px)",
        alignSelf: "stretch",
        // width: "-webkit-fill-available",
      }}
    >
      <URIContainerHeader />

      <URIContainerBody />
    </Box>
  );
}
function URIContainerBody() {
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
          label="Age"
          // value={age}
          // onChange={handleChange}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          style={{
            width: "100px",
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="URL"
        fullWidth
        // size="medium"
        style={{
          // width: "100%",
          // height: "100%",
          alignSelf: "stretch",
        }} />
    </Box>
  );
}
function URIContainerHeader() {
  return (
    <Box
      style={{
        display: "flex",
        padding: "var(--none, 0px)",
        alignItems: "center",
        gap: "var(--1, 8px)",
        alignSelf: "stretch",
        // width: "-webkit-fill-available",
      }}
    >
      <Tabs
        value={"FULL URL"}
        scrollButtons="auto"
        style={{ alignSelf: "stretch" }}
      >
        <Tab className="tab" label="Full url" value="FULL URL" />
        <Tab className="tab" label="Localhost" value="LOCALHOST" />
        <Tab className="tab" label="Relative path" value="RELATIVE PATH" />
        <Tab className="tab" label="API library" value="API LIBRARY" />
      </Tabs>
      <Button variant="contained" color="primary" className="tab">
        RUN <PlayCircle />
      </Button>
    </Box>
  );
}
