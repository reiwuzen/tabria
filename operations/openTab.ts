import { createTab, type CreateTabOptions } from "../core/createTab";
import type { WorkspaceState } from "../types/workspace";
import { addTab } from "./addTab";

/**
 * Creates a tab and adds it to the workspace in a single transition.
 */
export const openTab = (
  state: WorkspaceState,
  opts: CreateTabOptions = {}
): WorkspaceState => {
  const tab = createTab(opts);
  return addTab(state, tab);
};
