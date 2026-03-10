import type { WorkspaceState } from "../types/workspace"
import type { TabId } from "../types/tab"

/**
 * Sets the active tab when the tab exists.
 */
export const activateTab = (
  state: WorkspaceState,
  tabId: TabId
): WorkspaceState => {
  const exists = state.tabs.some(tab => tab.id === tabId)

  if (!exists) return state

  return {
    ...state,
    activeTab: tabId
  }
}
