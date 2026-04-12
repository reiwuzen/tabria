import type { TabId, TabState } from "./tab"

/**
 * Root state for a tab workspace.
 */
export type WorkspaceState = {
  activeTab: TabId | null
  tabs: TabState
}
