/**
 * Branded identifier for a screen.
 */
export type ScreenId = string & { readonly __brand: "ScreenId" }

/**
 * A navigation unit rendered within a tab.
 */
export type Screen<TState = unknown> = {
  readonly id: ScreenId
  type: string
  view?: string
  state?: TState
}
