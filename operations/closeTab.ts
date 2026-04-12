import type { WorkspaceState } from '../types/workspace'
import { TabId } from '../types/tab'

/**
 * Closes a tab, updates active tab selection, and prepends the closed tab to history.
 */
export const closeTab = (
  state: WorkspaceState,
  tabId: TabId
): WorkspaceState => {
  const index = state.tabs.openOrder.findIndex(t => t === tabId)
  if (index === -1) return state

  const tab = state.tabs.storage[tabId]
  const closedTab = {
    ...tab,
    updatedAt: Date.now(),
    closedAt: Date.now(),
    runtimeState: "discarded" as const
  }

  const openOrder = state.tabs.openOrder.filter(id => id !== tabId)

  let activeTab = state.activeTab

  if (state.activeTab === tabId) {
    activeTab =
      openOrder[index] ??
      openOrder[index - 1] ??
      null
  }

  return {
    ...state,
    tabs: {
      ...state.tabs,
      openOrder,
      closedOrder: [tabId, ...state.tabs.closedOrder],
      storage: {
        ...state.tabs.storage,
        [tabId]: closedTab
      }
    },
    activeTab,
  }
}
