import type { Page } from "../types/page";
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

export const clonePage = <TState = unknown>(
  page: Page<TState>,
): Page<TState> => {
  return {
    ...page,
    state: cloneValue(page.state),
    meta: cloneValue(page.meta),
  };
};

export const cloneScreen = clonePage;

export const cloneTab = (tab: Tab): Tab => {
  return {
    ...tab,
    pages: {
      order: [...tab.pages.order],
      storage: Object.fromEntries(
        tab.pages.order.map((pageId) => [pageId, clonePage(tab.pages.storage[pageId])]),
      ) as Tab["pages"]["storage"],
    },
    meta: cloneValue(tab.meta),
  };
};
