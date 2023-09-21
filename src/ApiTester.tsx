import { useState } from "react";
import { Box } from "@mui/material";
import "highlight.js/styles/atom-one-dark.css";
// import { ResponseDiplayer } from "./ResponseDiplayer";
// import { RequestHandler } from "./RequestHandler";
import { useSelector } from "react-redux";
import { HttpState } from "./state/store";
import { RequestHandler } from "./RequestHandler";

const ApiEndpointTester = ({ index }: { index: number }) => {
  const request = useSelector((store: HttpState) => store);
  // const [request, setRequest] = useState(initialState);
  const handleRequestChange = () => {
    // setRequest(newRequest);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        alignSelf: "stretch",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* <Box>{request.url}</Box> */}
        <RequestHandler index={index} />
        {/* <ResponseDiplayer response={request.response} error={request.error} /> */}
      </Box>
    </Box>
  );
};

export default ApiEndpointTester;
