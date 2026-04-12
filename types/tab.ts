import type { JsonObject } from "./misc";
import type { PageState } from "./page";

/**
 * Branded identifier for a tab.
 */
export type TabId = string & { readonly __brand: "TabId" };

export type TabRuntimeState = "loaded" | "discarded";

/**
 * Represents a single browser tab and its page navigation state.
 */
export type Tab = {
  readonly id: TabId;
  title: string;
  readonly createdAt: number;
  updatedAt: number;
  closedAt?: number;
  runtimeState: TabRuntimeState;
  pages: PageState;
  currentPageId: string;
  meta?: JsonObject;
};

/**
 * Ordered tab storage for a workspace.
 */
export type TabState = {
  openOrder: TabId[];
  closedOrder: TabId[];
  storage: Record<TabId, Tab>;
};
