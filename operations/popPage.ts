import { TabId } from "../types/tab"
import { WorkspaceState } from "../types/workspace"

/**
 * Pops the current page from a tab history when at least two pages exist.
 */
export const popPage = (
  state: WorkspaceState,
  tabId: TabId
): WorkspaceState => {
  const tab = state.tabs.storage[tabId]
  if (!tab) return state

  if (tab.pages.order.length <= 1 || tab.currentPageId === null) return state

  const currentPageIndex = tab.pages.order.findIndex((pageId) => pageId === tab.currentPageId)
  if (currentPageIndex <= 0) return state

  const pageId = tab.pages.order[currentPageIndex]
  const order = tab.pages.order.filter((_, index) => index !== currentPageIndex)
  const { [pageId]: _removed, ...storage } = tab.pages.storage
  const nextPageId = order[Math.min(currentPageIndex - 1, order.length - 1)] ?? null

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
            storage
          },
          currentPageId: nextPageId
        }
      }
    }
  }
}
