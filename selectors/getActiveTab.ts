import type { Tab } from "../types/tab";
import type { WorkspaceState } from "../types/workspace";
import { cloneTab } from "./clone";

/**
 * Returns a safe copy of the active tab.
 */
export const getActiveTab = (state: WorkspaceState): Tab | undefined => {
  if (state.activeTab === null) return undefined;

  const tab = state.tabs.find((item) => item.id === state.activeTab);
  return tab ? cloneTab(tab) : undefined;
};
