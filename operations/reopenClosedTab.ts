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
  if (state.tabs.closedOrder.length === 0) return state

  let index = 0

  if (tabId) {
    index = state.tabs.closedOrder.findIndex(t => t === tabId)
    if (index === -1) return state
  }

  const targetId = state.tabs.closedOrder[index]
  const tab = state.tabs.storage[targetId]

  const closedOrder = [
    ...state.tabs.closedOrder.slice(0, index),
    ...state.tabs.closedOrder.slice(index + 1)
  ]

  return {
    ...state,
    tabs: {
      ...state.tabs,
      openOrder: [...state.tabs.openOrder, targetId],
      closedOrder,
      storage: {
        ...state.tabs.storage,
        [targetId]: {
          ...tab,
          updatedAt: Date.now(),
          closedAt: undefined,
          runtimeState: "loaded"
        }
      }
    },
    activeTab: tab.id,
  }
}
