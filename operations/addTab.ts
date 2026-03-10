import { Tab } from "../types/tab"
import { WorkspaceState } from "../types/workspace"

/**
 * Adds a tab to the workspace and activates it.
 * Returns the original state when the tab ID already exists.
 */
export const addTab = (
  state: WorkspaceState,
  tab: Tab
): WorkspaceState => {
  if (state.tabs.some(t => t.id === tab.id)) return state

  return {
    ...state,
    tabs: [...state.tabs, tab],
    activeTab: tab.id
  }
}
