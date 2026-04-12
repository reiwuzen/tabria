import type { JsonObject } from "./misc";

/**
 * Branded identifier for a page.
 */
export type PageId = string & { readonly __brand: "PageId" };

/**
 * A navigation entry rendered within a tab.
 */
export type Page<TState = unknown> = {
  readonly id: PageId;
  key?: string;
  url?: string;
  type: string;
  view?: string;
  state?: TState;
  meta?: JsonObject;
};

/**
 * Ordered page storage for a tab.
 */
export type PageState<TState = unknown> = {
  order: PageId[];
  storage: Record<PageId, Page<TState>>;
};
