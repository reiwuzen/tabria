import { TabId } from "../types/tab"
import { WorkspaceState } from "../types/workspace"
import type { Screen } from "../types/screen"

/**
 * Pushes a screen onto a tab's screen stack.
 */
export const pushScreen = (
  state: WorkspaceState,
  tabId: TabId,
  screen: Screen
): WorkspaceState => {

  const tabs = state.tabs.map(tab => {
    if (tab.id !== tabId) return tab

    return {
      ...tab,
      updatedAt: Date.now(),
      screenStack: [...tab.screenStack, screen]
    }
  })

  return {
    ...state,
    tabs
  }
}
