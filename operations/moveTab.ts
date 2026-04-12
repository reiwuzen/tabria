import { TabId } from "../types/tab"
import { WorkspaceState } from "../types/workspace"

/**
 * Moves a tab to a target index. The index is clamped to valid bounds.
 */
export const moveTab = (
  state: WorkspaceState,
  tabId: TabId,
  toIndex: number
): WorkspaceState => {
  const fromIndex = state.tabs.openOrder.findIndex(t => t === tabId)
  if (fromIndex === -1) return state

  const openOrder = [...state.tabs.openOrder]

  const [tab] = openOrder.splice(fromIndex, 1)

  const clampedIndex = Math.max(0, Math.min(toIndex, openOrder.length))

  openOrder.splice(clampedIndex, 0, tab)

  return {
    ...state,
    tabs: {
      ...state.tabs,
      openOrder
    }
  }
}
