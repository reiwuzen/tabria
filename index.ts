import { createScreen } from "./core/createScreen";
import { createTab } from "./core/createTab";
import { createWorkspace } from "./core/createWorkspace";
import { activateTab } from "./operations/activateTab";
import { addTab } from "./operations/addTab";
import { closeTab } from "./operations/closeTab";
import { moveTab } from "./operations/moveTab";
import { openTab } from "./operations/openTab";
import { popScreen } from "./operations/popScreen";
import { pushScreen } from "./operations/pushScreen";
import { reopenClosedTab } from "./operations/reopenClosedTab";
import { replaceScreen } from "./operations/replaceScreen";
import { updateScreenState } from "./operations/updateScreenState";
import { getActiveScreen } from "./selectors/getActiveScreen";
import { getActiveTab } from "./selectors/getActiveTab";
import { getScreenStack } from "./selectors/getScreenStack";
import { getTab } from "./selectors/getTab";
import { getTabs } from "./selectors/getTabs";
import type { JsonObject } from "./types/misc";
import type { Screen as TabriaScreen, ScreenId } from "./types/screen";
import type { Tab as TabriaTab, TabId } from "./types/tab";
import type { WorkspaceState } from "./types/workspace";

/** Public screen model type. */
export type Screen = TabriaScreen;
/** Public branded screen identifier type. */
export type ScreenID = ScreenId;
/** Public tab model type. */
export type Tab = TabriaTab;
/** Public branded tab identifier type. */
export type TabID = TabId;
/** Public JSON-like metadata object type. */
export type JsonObj = JsonObject;
/** Public workspace root state type. */
export type Workspace = WorkspaceState;

/** Core constructors that create state objects. */
export { createWorkspace, createTab, createScreen };

/** Write-side state transition actions (immutable updates). */
export {
  activateTab,
  addTab,
  closeTab,
  moveTab,
  openTab,
  popScreen,
  pushScreen,
  reopenClosedTab,
  replaceScreen,
  updateScreenState,
};

/**
 * Read-side selectors for deriving view data from workspace state.
 * Selectors are read-only helpers and must never be used to mutate state.
 */
export { getTabs, getTab, getActiveTab, getActiveScreen, getScreenStack };

/** Grouped core constructors. */
export const core = {
  createWorkspace,
  createTab,
  createScreen,
} as const;

/** Grouped write-side state transition actions. */
export const actions = {
  activateTab,
  addTab,
  closeTab,
  moveTab,
  openTab,
  popScreen,
  pushScreen,
  reopenClosedTab,
  replaceScreen,
  updateScreenState,
} as const;

/**
 * Grouped read-side selectors.
 * Returned values are for view consumption and should be treated as immutable.
 */
export const selectors = {
  getTabs,
  getTab,
  getActiveTab,
  getActiveScreen,
  getScreenStack,
} as const;

/** Convenience merged API surface (`core + actions + selectors`). */
export const api = {
  ...core,
  ...actions,
  ...selectors,
} as const;
