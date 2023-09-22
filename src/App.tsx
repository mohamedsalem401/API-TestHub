import "./App.css";
import ApiEndpoint from "./ApiTester";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./state/store";

function App() {
  return (
    <Box
      style={{
        padding: 32,
        display: "flex",
        width: "100%",
      }}
    >
      <Provider store={store}>
        <ApiEndpoint index={0} />
      </Provider>
    </Box>
  );
}

export default App;
