import { createPage } from "./core/createPage";
import { createTab } from "./core/createTab";
import { createWorkspace } from "./core/createWorkspace";
import { activateTab } from "./operations/activateTab";
import { addTab } from "./operations/addTab";
import { closeTab } from "./operations/closeTab";
import { moveTab } from "./operations/moveTab";
import { openTab } from "./operations/openTab";
import { popPage } from "./operations/popPage";
import { pushPage } from "./operations/pushPage";
import { reopenClosedTab } from "./operations/reopenClosedTab";
import { replacePage } from "./operations/replacePage";
import { updatePageState } from "./operations/updatePageState";
import { getActivePage } from "./selectors/getActivePage";
import { getActiveTab } from "./selectors/getActiveTab";
import { getPageStack } from "./selectors/getPageStack";
import { getTab } from "./selectors/getTab";
import { getTabs } from "./selectors/getTabs";
import type { JsonObject } from "./types/misc";
import type { Page as TabriaPage, PageId as TabriaPageId, PageState as TabriaPageState } from "./types/page";
import type { Tab as TabriaTab, TabId, TabState as TabriaTabState } from "./types/tab";
import type { WorkspaceState } from "./types/workspace";

/** Public page model type. */
export type Page = TabriaPage;
/** Public page history state type. */
export type PageState = TabriaPageState;
/** Public branded page identifier type. */
export type PageID = TabriaPageId;
/** Public tab model type. */
export type Tab = TabriaTab;
/** Public tab collection state type. */
export type TabState = TabriaTabState;
/** Public branded tab identifier type. */
export type TabID = TabId;
/** Public JSON-like metadata object type. */
export type JsonObj = JsonObject;
/** Public workspace root state type. */
export type Workspace = WorkspaceState;

export const createScreen = createPage;
export const pushScreen = pushPage;
export const replaceScreen = replacePage;
export const popScreen = popPage;
export const updateScreenState = updatePageState;
export const getActiveScreen = getActivePage;
export const getScreenStack = getPageStack;

/** Core constructors that create state objects. */
export { createWorkspace, createTab, createPage };

/** Write-side state transition actions (immutable updates). */
export {
  activateTab,
  addTab,
  closeTab,
  moveTab,
  openTab,
  popPage,
  pushPage,
  reopenClosedTab,
  replacePage,
  updatePageState,
};

/**
 * Read-side selectors for deriving view data from workspace state.
 * Selectors are read-only helpers and must never be used to mutate state.
 */
export {
  getTabs,
  getTab,
  getActiveTab,
  getActivePage,
  getPageStack,
};

/** Grouped core constructors. */
export const core = {
  createWorkspace,
  createTab,
  createPage,
  createScreen,
} as const;

/** Grouped write-side state transition actions. */
export const actions = {
  activateTab,
  addTab,
  closeTab,
  moveTab,
  openTab,
  popPage,
  popScreen,
  pushPage,
  pushScreen,
  reopenClosedTab,
  replacePage,
  replaceScreen,
  updatePageState,
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
  getActivePage,
  getActiveScreen,
  getPageStack,
  getScreenStack,
} as const;

/** Convenience merged API surface (`core + actions + selectors`). */
export const api = {
  ...core,
  ...actions,
  ...selectors,
} as const;
