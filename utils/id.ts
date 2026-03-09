import { TabId } from "../types/tab";
import type { ScreenId } from "../types/screen";

/**
 * Creates a branded tab ID.
 */
export function createId(mode: "tabId"): TabId;
/**
 * Creates a branded screen ID.
 */
export function createId(mode: "screenId"): ScreenId;

/**
 * Creates a branded identifier for tabs or screens.
 */
export function createId(mode: "tabId" | "screenId") {
  const id = crypto.randomUUID();

  switch (mode) {
    case "tabId":
      return id as TabId;

    case "screenId":
      return id as ScreenId;
  }
}
