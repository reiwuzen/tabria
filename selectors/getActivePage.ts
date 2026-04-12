import type { Page } from "../types/page";
import type { TabId } from "../types/tab";
import type { WorkspaceState } from "../types/workspace";
import { clonePage } from "./clone";

/**
 * Returns a safe copy of the current page in a tab.
 * Defaults to the active tab when no tab ID is provided.
 */
export const getActivePage = (
  state: WorkspaceState,
  tabId?: TabId,
): Page | undefined => {
  const targetId = tabId ?? state.activeTab;
  if (targetId === null || targetId === undefined) return undefined;

  const tab = state.tabs.storage[targetId];
  if (!tab) return undefined;
  if (tab.currentPageId === null) {
    return undefined;
  }

  const pageId = tab.currentPageId;
  if (!tab.pages.storage[pageId]) return undefined;
  return clonePage(tab.pages.storage[pageId]);
};
