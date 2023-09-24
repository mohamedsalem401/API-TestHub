import { HttpMethod, HttpState } from "./types";

export type MethodAction = {
  type: "changeMethod";
  payload: { index: number; newMethod: HttpMethod };
};

export const handleMethodChange = (
  arr: HttpState[],
  index: number,
  newMethod: HttpMethod
) => {
  const newArr = [...arr];
  newArr[index] = { ...newArr[index], method: newMethod };
  return newArr;
};
