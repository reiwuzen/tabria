import type { Tab } from "../types/tab";
import type { WorkspaceState } from "../types/workspace";
import { cloneTab } from "./clone";

/**
 * Returns a safe copy of all tabs in the workspace.
 */
export const getTabs = (state: WorkspaceState): Tab[] => {
  return state.tabs.openOrder.map((tabId) => cloneTab(state.tabs.storage[tabId]));
};
