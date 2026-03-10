import type { Screen } from "../types/screen";
import type { TabId } from "../types/tab";
import type { WorkspaceState } from "../types/workspace";
import { getScreenStack } from "./getScreenStack";

/**
 * Returns a safe copy of the active screen in a tab.
 * Defaults to the active tab when no tab ID is provided.
 */
export const getActiveScreen = (
  state: WorkspaceState,
  tabId?: TabId
): Screen | undefined => {
  const stack = getScreenStack(state, tabId);
  return stack.length > 0 ? stack[stack.length - 1] : undefined;
};
