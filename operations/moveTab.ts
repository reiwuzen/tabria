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
  const fromIndex = state.tabs.findIndex(t => t.id === tabId)
  if (fromIndex === -1) return state

  const tabs = [...state.tabs]

  const [tab] = tabs.splice(fromIndex, 1)

  const clampedIndex = Math.max(0, Math.min(toIndex, tabs.length))

  tabs.splice(clampedIndex, 0, tab)

  return {
    ...state,
    tabs
  }
}
