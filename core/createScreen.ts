import type { Screen, ScreenId } from "../types/screen"
import { createId } from "../utils/id"

/**
 * Options used to create a screen.
 */
type CreateScreenOptions<TState = unknown> = {
  id?: ScreenId
  type?: string
  view?: string
  state?: TState
}

/**
 * Creates a screen value.
 */
export const createScreen = <TState = unknown>(
  opts: CreateScreenOptions<TState> = {}
): Screen<TState> => {
  return {
    id: opts.id ?? createId("screenId"),
    type: opts.type ?? "unknown",
    view: opts.view,
    state: opts.state
  }
}
