import { BodyData, HttpState } from "./store";

export type BodyAction =
  | {
      type: "changeActiveBody";
      payload: { index: number; key: keyof BodyData };
    }
  | {
      type: "changeBody";
      payload: { index: number; key: keyof BodyData; newBody: string };
    };

export const handleChangeActiveBody = (
  state: HttpState[],
  index: number,
  key: keyof BodyData
): HttpState[] => {
  const newState = [...state];
  const newHttpState = { ...newState[index] };

  newHttpState.body = {
    ...newHttpState.body,
    active: key,
  };
  newState[index] = newHttpState;
  return newState;
};

export const handleChangeBody = (
  state: HttpState[],
  index: number,
  key: keyof BodyData,
  newBodyValue: string
): HttpState[] => {
  const newState = [...state];
  const newHttpState = { ...newState[index] };

  newHttpState.body = {
    ...newHttpState.body,
    data: {
      ...newHttpState.body.data,
      [key]: { value: newBodyValue },
    },
  };
  newState[index] = newHttpState;
  return newState;
};
