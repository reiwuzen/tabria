import type { WorkspaceState } from "../types/workspace";
import type { TabId } from "../types/tab";
import type { Tab } from "../types/tab";

/**
 * Options used to create a workspace state.
 */
type CreateWorkspaceOptions = {
  activeTab?: TabId | null;
  tabs?: Tab[];
  openOrder?: TabId[];
  closedOrder?: TabId[];
  storage?: Record<TabId, Tab>;
};

/**
 * Creates a workspace state object.
 */
export const createWorkspace = (
  opts: CreateWorkspaceOptions = {}
): WorkspaceState => {
  const openOrder = opts.openOrder ?? opts.tabs?.map((tab) => tab.id) ?? [];
  const closedOrder = opts.closedOrder ?? [];
  const storage =
    opts.storage ??
    (Object.fromEntries((opts.tabs ?? []).map((tab) => [tab.id, tab])) as Record<
      TabId,
      Tab
    >);
  const activeTab =
    opts.activeTab !== undefined
      ? opts.activeTab
      : openOrder.length > 0
        ? openOrder[openOrder.length - 1]
        : null;

  return {
    activeTab,
    tabs: {
      openOrder,
      closedOrder,
      storage,
    },
  };
};
