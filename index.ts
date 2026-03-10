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
import type { JsonObject } from "./types/misc";
import type { Screen as TabriaScreen, ScreenId } from "./types/screen";
import type { Tab as TabriaTab, TabId } from "./types/tab";
import type { WorkspaceState } from "./types/workspace";

/**
 * Public namespace for Tabria types and state transition APIs.
 */
export namespace Tabria {
  /** Screen model type. */
  export type Screen = TabriaScreen;
  /** Branded screen identifier type. */
  export type ScreenID = ScreenId;
  /** Tab model type. */
  export type Tab = TabriaTab;
  /** Branded tab identifier type. */
  export type TabID = TabId;
  /** Generic JSON-like metadata object. */
  export type JsonObj = JsonObject;
  /** Workspace root state type. */
  export type Workspace = WorkspaceState;

  /** Core constructors for workspace, tab, and screen state. */
  export const core = {
    createScreen,
    createTab,
    createWorkspace,
  };

  /** Immutable state transition operations for tabs and screens. */
  export const operations = {
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

  /** Convenience merged API (`core` + `operations`). */
  export const api = {
    ...core,
    ...operations,
  };
}
