import { HttpState } from "../state/store";

export function getActiveTab(index: number): (state: HttpState[]) => keyof HttpState["body"] {
  return (state: HttpState[]) => {
    const body = state[index].body;

    for (const key of Object.keys(body) as (keyof HttpState["body"])[]) {
      if (body[key].active) {
        return key;
      }
    }

    return "NONE";
  };
}
