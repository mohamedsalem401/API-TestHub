import { Tab, Tabs } from "@mui/material";

export function ResponseTabs({ index }: { index: number; }) {
  return (
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
      <Tab className="tab" label="Body" value="BODY" />
      <Tab className="tab" label="Headers" value="HEADERS" />
    </Tabs>
  );
}
