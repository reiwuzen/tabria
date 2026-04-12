import { TabId } from "../types/tab";
import { WorkspaceState } from "../types/workspace";
import type { Page } from "../types/page";

/**
 * Pushes a page onto a tab's page history.
 */
export const pushPage = (
  state: WorkspaceState,
  tabId: TabId,
  page: Page,
): WorkspaceState => {
  const tab = state.tabs.storage[tabId];
  if (!tab) return state;

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
            order: [...tab.pages.order, page.id],
            storage: {
              ...tab.pages.storage,
              [page.id]: page,
            },
          },
          currentPageId: page.id,
        },
      },
    },
  };
};
