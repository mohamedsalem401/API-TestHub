import { HttpHeader, HttpState } from "./store";

export type HeaderAction =
  | {
      type: "addHeader";
      payload: { index: number };
    }
  | {
      type: "changeHeader";
      payload: { index: number; headerIndex: number; newHeader: HttpHeader };
    }
  | {
      type: "removeHeader";
      payload: { index: number; headerIndex: number };
    };

export const handleAddHeader = (arr: HttpState[], index: number) => {
  const newArr = [...arr];
  console.log("add header");
  newArr[index] = {
    ...newArr[index],
    headers: [...newArr[index].headers, { "": "" }],
  };
  return newArr;
};

export const handleChangeHeader = (
  arr: HttpState[],
  index: number,
  headerIndex: number,
  newHeader: HttpHeader
) => {
  console.log(headerIndex, index);
  const newArr = [...arr];
  newArr[index] = {
    ...newArr[index],
    headers: [...newArr[index].headers],
  };
  newArr[index].headers[headerIndex] = newHeader;
  return newArr;
};

export const handleRemoveHeader = (
  arr: HttpState[],
  index: number,
  headerIndex: number
) => {
  const newArr = [...arr];
  newArr[index] = {
    ...newArr[index],
    headers: [...newArr[index].headers],
  };
  newArr[index].headers.splice(headerIndex, 1);
  return newArr;
};
