import { Box } from "@mui/material";
import { URIContainerHeader } from "./URIContainerHeader";
import { URIContainerBody } from "./URIContainerBody";

export function URIContainer({ index }: { index: number }) {  
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "var(--1, 8px)",
        alignSelf: "stretch",
      }}
    >
      <URIContainerHeader index={index}/>
      <URIContainerBody index={index}/>
    </Box>
  );
}
