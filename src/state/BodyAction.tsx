import { HttpState } from "./store";

export type BodyAction =
  | {
      type: "changeActiveBody";
      payload: { index: number; key: keyof HttpState["body"] };
    }
  | {
      type: "changeBody";
      payload: { index: number; key: keyof HttpState["body"]; newBody: string };
    };

export const handleChangeActiveBody = (
  state: HttpState[],
  index: number,
  key: keyof HttpState["body"]
): HttpState[] => {
  const newState = [...state];
  const newHttpState = { ...newState[index] };
  const newBody = { ...newHttpState.body };

  // Deactivate all body types
  for (const bodyKey in newBody) {
    (newBody as any)[bodyKey] = {
      ...(newBody as any)[bodyKey],
      active: false,
    };
  }

  // Activate the specified body type
  newBody[key] = {
    ...newBody[key],
    active: true,
  };
  newHttpState.body = newBody;
  newState[index] = newHttpState;
  return newState;
};

export const handleChangeBody = (
  state: HttpState[],
  index: number,
  key: keyof HttpState["body"],
  newBodyValue: string
): HttpState[] => {
  const newState = [...state];
  const newHttpState = { ...newState[index] };
  const newBody = { ...newHttpState.body };
  // Activate the specified body type
  newBody[key] = {
    ...newBody[key],
    value: newBodyValue,
  };
  newHttpState.body = newBody;
  newState[index] = newHttpState;
  return newState;
};
