import { BodyData, HttpState } from "../state/store";

export function getActiveTab(
  index: number
): (state: HttpState[]) => keyof BodyData {
  return (state: HttpState[]) => {
    return state[index].body.active;
  };
}
