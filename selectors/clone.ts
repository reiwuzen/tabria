import type { Screen } from "../types/screen";
import type { Tab } from "../types/tab";

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) return false;
  return Object.getPrototypeOf(value) === Object.prototype;
};

const cloneValue = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map((item) => cloneValue(item)) as T;
  }

  if (isPlainObject(value)) {
    const cloned: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      cloned[key] = cloneValue(item);
    }
    return cloned as T;
  }

  return value;
};

export const cloneScreen = <TState = unknown>(
  screen: Screen<TState>
): Screen<TState> => {
  return {
    ...screen,
    state: cloneValue(screen.state),
  };
};

export const cloneTab = (tab: Tab): Tab => {
  return {
    ...tab,
    screenStack: tab.screenStack.map((screen) => cloneScreen(screen)),
    meta: cloneValue(tab.meta),
  };
};
