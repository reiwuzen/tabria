import type { WorkspaceState } from '../types/workspace'
import { TabId } from '../types/tab'

/**
 * Closes a tab, updates active tab selection, and prepends the closed tab to history.
 */
export const closeTab = (
  state: WorkspaceState,
  tabId: TabId
): WorkspaceState => {
  const index = state.tabs.findIndex(t => t.id === tabId)
  if (index === -1) return state

  const closedTab = {
    ...state.tabs[index],
    closedAt: Date.now()
  }

  const tabs = state.tabs.filter(t => t.id !== tabId)

  let activeTab = state.activeTab

  if (state.activeTab === tabId) {
    activeTab =
      tabs[index]?.id ??
      tabs[index - 1]?.id ??
      null
  }

  return {
    ...state,
    tabs,
    activeTab,
    recentlyClosed: [closedTab, ...state.recentlyClosed]
  }
}
