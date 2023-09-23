import { Box, Button, Tab, Tabs } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getHttpState } from "./getHttpState";

export function URIContainerHeader({ index }: { index: number }) {
  const httpState = useSelector(getHttpState(index));
  const dispatch = useDispatch();

  function handleSendRequest() {
    return () => {
      dispatch({
        type: "setLoading",
        payload: { index: index },
      });
      dispatch({
        type: "sendRequest",
        payload: { index: index },
      });
    };
  }

  return (
    <Box
      style={{
        display: "flex",
        padding: "var(--none, 0px)",
        alignItems: "center",
        gap: "var(--1, 8px)",
        alignSelf: "stretch",
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

      <Button
        variant="contained"
        color="primary"
        className="tab"
        endIcon={<PlayCircle />}
        onClick={handleSendRequest()}
      >
        RUN
      </Button>
    </Box>
  );
}
