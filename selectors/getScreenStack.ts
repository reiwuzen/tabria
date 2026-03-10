import type { Screen } from "../types/screen";
import type { TabId } from "../types/tab";
import type { WorkspaceState } from "../types/workspace";
import { cloneScreen } from "./clone";

/**
 * Returns a safe copy of a tab's screen stack.
 * Defaults to the active tab when no tab ID is provided.
 */
export const getScreenStack = (
  state: WorkspaceState,
  tabId?: TabId
): Screen[] => {
  const targetId = tabId ?? state.activeTab;
  if (targetId === null || targetId === undefined) return [];

  const tab = state.tabs.find((item) => item.id === targetId);
  if (!tab) return [];

  return tab.screenStack.map((screen) => cloneScreen(screen));
};
