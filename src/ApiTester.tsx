import { Box } from "@mui/material";
import { ResponseContainer } from "./ResponseContainer";
import { RequestContainer } from "./RequestContainer/RequestContainer";

const ApiEndpoint = ({ index }: { index: number }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: "80px",
      }}
    >
      <RequestContainer index={index} />
      <ResponseContainer index={index} />
    </Box>
  );
};

export default ApiEndpoint;
