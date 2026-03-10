import { Screen } from "../types/screen"
import { TabId } from "../types/tab"
import { WorkspaceState } from "../types/workspace"

/**
 * Shallow-merges a patch into the state of the top screen in a tab stack.
 */
export const updateScreenState = (
  state: WorkspaceState,
  tabId: TabId,
  patch: Record<string, unknown>
): WorkspaceState => {

  const tabs = state.tabs.map(tab => {
    if (tab.id !== tabId) return tab

    const stack = tab.screenStack
    if (stack.length === 0) return tab

    const top = stack[stack.length - 1]

    const updatedScreen:Screen = {
      ...top,
      state: {
        ...(top.state ?? {}),
        ...patch
      }
    }

    const newStack = [...stack]
    newStack[newStack.length - 1] = updatedScreen

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
