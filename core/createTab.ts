import { Tab, TabId } from "../types/tab"
import { JsonObject } from "../types/misc"
import { createId } from "../utils/id"
import { now } from "../utils/time"
import { Screen } from "../types/screen"

/**
 * Options used to create a tab.
 */
export type CreateTabOptions = {
  id?: TabId
  title?: string
  screen?: Screen
  meta?: JsonObject
}

/**
 * Creates a tab value with timestamps and an optional initial screen.
 */
export const createTab = (opts: CreateTabOptions = {}): Tab => {
  const id = opts.id ?? createId('tabId')
  const timestamp = now()

  return {
    id,
    title: opts.title ?? "New Tab",
    createdAt: timestamp,
    updatedAt: timestamp,
    screenStack: opts.screen ? [opts.screen] : [],
    meta: opts.meta
  }
}
