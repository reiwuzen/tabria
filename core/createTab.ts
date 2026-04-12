import type { JsonObject } from "../types/misc";
import type { Page, PageId } from "../types/page";
import type { Tab, TabId } from "../types/tab";
import { createId } from "../utils/id";
import { now } from "../utils/time";

/**
 * Options used to create a tab.
 */
export type CreateTabOptions = {
  id?: TabId;
  title?: string;
  page?: Page;
  pages?: Page[];
  runtimeState?: Tab["runtimeState"];
  meta?: JsonObject;
};

/**
 * Creates a tab value with timestamps and optional initial pages.
 */
export const createTab = (opts: CreateTabOptions = {}): Tab => {
  const id = opts.id ?? createId("tabId");
  const timestamp = now();
  const pages = opts.pages ?? (opts.page ? [opts.page] : []);
  const pageOrder = pages.map((page) => page.id);
  const pageStorage = Object.fromEntries(
    pages.map((page) => [page.id, page]),
  ) as Record<PageId, Page>;

  return {
    id,
    title: opts.title ?? "New Tab",
    createdAt: timestamp,
    updatedAt: timestamp,
    runtimeState: opts.runtimeState ?? "loaded",
    pages: {
      order: pageOrder,
      storage: pageStorage,
    },
    currentPageId: pages.length > 0 ? pages[pages.length - 1].id : null,
    meta: opts.meta,
  };
};
