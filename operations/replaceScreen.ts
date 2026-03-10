import { TabId } from "../types/tab"
import { WorkspaceState } from "../types/workspace"
import type { Screen } from "../types/screen"

/**
 * Replaces the top screen of a tab's stack.
 * If the stack is empty, the screen is inserted as the first entry.
 */
export const replaceScreen = (
  state: WorkspaceState,
  tabId: TabId,
  screen: Screen
): WorkspaceState => {

  const tabs = state.tabs.map(tab => {
    if (tab.id !== tabId) return tab

    if (tab.screenStack.length === 0) {
      return {
        ...tab,
        updatedAt: Date.now(),
        screenStack: [screen]
      }
    }

    const newStack = [...tab.screenStack]
    newStack[newStack.length - 1] = screen

    return {
      ...tab,
      updatedAt: Date.now(),
      screenStack: newStack
    }
  })

  return {
    ...state,
    tabs
  }
}
