import { HttpState } from "./types";

export type UrlAction = {
  type: "changeUrl";
  payload: { index: number; newUrl: string; };
};

export const handleUrlChange = (index: number, arr: HttpState[], newUrl: string) => {
  const newArr = [...arr];
  newArr[index] = {
    ...newArr[index],
    url: newUrl,
  };
  return newArr;
};
