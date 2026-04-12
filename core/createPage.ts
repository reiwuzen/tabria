import type { Page, PageId } from "../types/page";
import { createId } from "../utils/id";

/**
 * Options used to create a page.
 */
type CreatePageOptions<TState = unknown> = {
  id?: PageId;
  key?: string;
  url?: string;
  type?: string;
  view?: string;
  state?: TState;
  meta?: Record<string, unknown>;
};

/**
 * Creates a page value.
 */
export const createPage = <TState = unknown>(
  opts: CreatePageOptions<TState> = {},
): Page<TState> => {
  return {
    id: opts.id ?? createId("PageId"),
    key: opts.key,
    url: opts.url,
    type: opts.type ?? "unknown",
    view: opts.view,
    state: opts.state,
    meta: opts.meta,
  };
};
