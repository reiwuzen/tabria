import type { WorkspaceState } from "../types/workspace"
import type { TabId } from "../types/tab"

/**
 * Restores the most recently closed tab.
 */
export function reopenClosedTab(
  state: WorkspaceState
): WorkspaceState

/**
 * Restores a specific closed tab by ID.
 */
export function reopenClosedTab(
  state: WorkspaceState,
  tabId: TabId
): WorkspaceState

/**
 * Restores a closed tab back into the workspace and activates it.
 */
export function reopenClosedTab(
  state: WorkspaceState,
  tabId?: TabId
): WorkspaceState {

  if (state.recentlyClosed.length === 0) return state

  let index = 0

  if (tabId) {
    index = state.recentlyClosed.findIndex(t => t.id === tabId)
    if (index === -1) return state
  }

  const tab = state.recentlyClosed[index]

  const recentlyClosed = [
    ...state.recentlyClosed.slice(0, index),
    ...state.recentlyClosed.slice(index + 1)
  ]

  return {
    ...state,
    tabs: [...state.tabs, tab],
    activeTab: tab.id,
    recentlyClosed
  }
}
