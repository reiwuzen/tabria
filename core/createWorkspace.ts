import type { WorkspaceState } from "../types/workspace";
import type { TabId } from "../types/tab";
import type { Tab } from "../types/tab";

/**
 * Options used to create a workspace state.
 */
type CreateWorkspaceOptions = {
  activeTab?: TabId | null;
  tabs?: Tab[];
  recentlyClosed?: Tab[];
};

/**
 * Creates a workspace state object.
 */
export const createWorkspace = (
  opts: CreateWorkspaceOptions = {}
): WorkspaceState => {
  const tabs = opts.tabs ?? [];
  const recentlyClosed = opts.recentlyClosed ?? [];
  const activeTab =
    opts.activeTab !== undefined
      ? opts.activeTab
      : tabs.length > 0
        ? tabs[tabs.length - 1].id
        : null;

  return {
    activeTab,
    tabs,
    recentlyClosed,
  };
};
