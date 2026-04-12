import { TabId } from "../types/tab";
import type { PageId } from "../types/page";

/**
 * Creates a branded tab ID.
 */
export function createId(mode: "tabId"): TabId;
/**
 * Creates a branded page ID.
 */
export function createId(mode: "PageId"): PageId;

/**
 * Creates a branded identifier for tabs or pages.
 */
export function createId(mode: "tabId" | "PageId") {
  const id = crypto.randomUUID();

  switch (mode) {
    case "tabId":
      return id as TabId;

    case "PageId":
      return id as PageId;
  }
}
