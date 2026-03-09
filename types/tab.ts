import type{ JsonObject } from "./misc";
import { Screen } from "./screen";

/**
 * Branded identifier for a tab.
 */
export type TabId = string & { readonly __brand: "TabId" };

/**
 * Represents a single tab and its screen navigation state.
 */
export type Tab = {
  readonly id: TabId;
  title: string;
  readonly createdAt: number;
  updatedAt: number;
  closedAt?: number;
  screenStack: Screen[];
  meta?: JsonObject;
};
