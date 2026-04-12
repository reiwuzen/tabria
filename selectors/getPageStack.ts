import type { Page } from "../types/page";
import type { TabId } from "../types/tab";
import type { WorkspaceState } from "../types/workspace";
import { clonePage } from "./clone";

/**
 * Returns a safe copy of a tab's page history.
 * Defaults to the active tab when no tab ID is provided.
 */
export const getPageStack = (
  state: WorkspaceState,
  tabId?: TabId,
): Page[] => {
  const targetId = tabId ?? state.activeTab;
  if (targetId === null || targetId === undefined) return [];

  const tab = state.tabs.storage[targetId];
  if (!tab) return [];

  return tab.pages.order.map((pageId) => clonePage(tab.pages.storage[pageId]));
};
