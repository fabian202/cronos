import { useContext } from "react";
import { EntryContext } from "../providers/entryProvider";

export const useEntryContext = () => {
  const entryContext = useContext(EntryContext);
  return {
      state: entryContext[0],
      dispatch: entryContext[1]
  }
};