import { Tab, Tabs } from "@mui/material";
import { HttpState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { BodyAction } from "../state/BodyAction";
import { getActiveTab } from "./getActiveTab";

export function RequestBodyTabs({ index }: { index: number }) {
  const activeTab = useSelector(getActiveTab(index));

  const dispatch = useDispatch();

  const bodyKeys: (keyof HttpState["body"])[] = [
    "NONE",
    "JSON",
    "XML",
    "HTML",
    "Raw",
  ];

  const labelMapping: Record<string, string> = {
    NONE: "None",
    JSON: "JSON",
    XML: "XML",
    HTML: "HTML",
    FormData: "Form-Data",
    Raw: "Raw",
    XWwwForm: "x-www-form-urlencoded",
  };

  const handleChangeActiveBody = useCallback((key: keyof HttpState["body"]) => {
    const action: BodyAction = {
      type: "changeActiveBody",
      payload: { index: index, key: key },
    };
    dispatch(action);
  }, []);

  return (
    <Tabs
      value={activeTab}
      onChange={(e, newValue) => {
        handleChangeActiveBody(newValue as keyof HttpState["body"]);
      }}
      variant="scrollable"
      scrollButtons="auto"
    >
      {bodyKeys.map((key) => (
        <Tab key={key} className="tab" label={labelMapping[key]} value={key} />
      ))}
    </Tabs>
  );
}
