import { TabId } from "../types/tab";
import { WorkspaceState } from "../types/workspace";
import type { Page } from "../types/page";

/**
 * Replaces the current page of a tab.
 * If the history is empty, the page is inserted as the first entry.
 */
export const replacePage = (
  state: WorkspaceState,
  tabId: TabId,
  page: Page,
): WorkspaceState => {
  const tab = state.tabs.storage[tabId];
  if (!tab) return state;

  if (tab.pages.order.length === 0 || tab.currentPageId === null) {
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
              order: [page.id],
              storage: {
                [page.id]: page,
              },
            },
            currentPageId: page.id,
          },
        },
      },
    };
  }

  const currentPageId = tab.currentPageId;
  const currentPageIndex = tab.pages.order.findIndex((pageId) => pageId === currentPageId);
  if (currentPageIndex === -1) return state;

  const order = [...tab.pages.order];
  order[currentPageIndex] = page.id;
  const { [currentPageId]: _removed, ...storage } = tab.pages.storage;

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
            order,
            storage: {
              ...storage,
              [page.id]: page,
            },
          },
          currentPageId: page.id,
        },
      },
    },
  };
};
