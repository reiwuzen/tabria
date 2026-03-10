import { TabId } from "../types/tab"
import { WorkspaceState } from "../types/workspace"

/**
 * Pops the top screen from a tab stack when at least two screens exist.
 */
export const popScreen = (
  state: WorkspaceState,
  tabId: TabId
): WorkspaceState => {
  const tabs = state.tabs.map(tab => {
    if (tab.id !== tabId) return tab

    if (tab.screenStack.length <= 1) return tab

    return {
      ...tab,
      updatedAt: Date.now(),
      screenStack: tab.screenStack.slice(0, -1)
    }
  })

  return {
    ...state,
    tabs
  }
}
