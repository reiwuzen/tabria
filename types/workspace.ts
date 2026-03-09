import { Tab, TabId } from "./tab"

/**
 * Root state for a tab workspace.
 */
export type WorkspaceState = {
  activeTab: TabId | null
  tabs: Tab[]
  recentlyClosed: Tab[]
}
