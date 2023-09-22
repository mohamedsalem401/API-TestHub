import { Box } from "@mui/material";
import { RequestBodyContainer } from "./RequestBodyContainer";
import { RequestHeadersContainer } from "./RequestHeadersContainer";
import { URIContainer } from "./URIContainer";

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
      <URIContainer index={index}/>
      <RequestHeadersContainer index={index}/>
      <RequestBodyContainer />
    </Box>
  );
}
