import type { Page } from "../types/page";
import { TabId } from "../types/tab";
import { WorkspaceState } from "../types/workspace";

/**
 * Shallow-merges a patch into the state of the current page in a tab.
 */
export const updatePageState = (
  state: WorkspaceState,
  tabId: TabId,
  patch: Record<string, unknown>,
): WorkspaceState => {
  const tab = state.tabs.storage[tabId];
  if (!tab) return state;
  if (tab.currentPageId === null) {
    return state;
  }

  const pageId = tab.currentPageId;
  if (!tab.pages.storage[pageId]) return state;
  const page = tab.pages.storage[pageId];

  const baseState =
    typeof page.state === "object" && page.state !== null ? page.state : {};

  const updatedPage: Page = {
    ...page,
    state: {
      ...baseState,
      ...patch,
    },
  };

  return {
    ...state,
    tabs: {
      ...state.tabs,
      storage: {
        ...state.tabs.storage,
        [tabId]: {
          ...tab,
          updatedAt: Date.now(),
          pages: {
            ...tab.pages,
            storage: {
              ...tab.pages.storage,
              [pageId]: updatedPage,
            },
          },
        },
      },
    },
  };
};
