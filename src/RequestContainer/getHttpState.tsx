import { HttpState } from "../state/types";

export function getHttpState(index: number): (state: HttpState[]) => HttpState {
  return (state: HttpState[]) => state[index];
}
