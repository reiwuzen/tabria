import type { Tab, TabId } from "../types/tab";
import type { WorkspaceState } from "../types/workspace";
import { cloneTab } from "./clone";

/**
 * Returns a safe copy of a tab by ID.
 */
export const getTab = (
  state: WorkspaceState,
  tabId: TabId
): Tab | undefined => {
  const tab = state.tabs.storage[tabId];
  return tab ? cloneTab(tab) : undefined;
};
