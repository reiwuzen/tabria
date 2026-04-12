# State Model

## WorkspaceState

```ts
type WorkspaceState = {
  activeTab: TabId | null;
  tabs: {
    openOrder: TabId[];
    closedOrder: TabId[];
    storage: Record<TabId, Tab>;
  };
};
```

## Tab

```ts
type Tab = {
  id: TabId;
  title: string;
  createdAt: number;
  updatedAt: number;
  closedAt?: number;
  runtimeState: "loaded" | "discarded";
  pages: {
    order: PageId[];
    storage: Record<PageId, Page>;
  };
  currentPageId: PageId | null;
  meta?: Record<string, unknown>;
};
```

## Page

```ts
type Page = {
  id: PageId;
  key?: string;
  url?: string;
  type: string;
  view?: string;
  state?: unknown;
  meta?: Record<string, unknown>;
};
```

Each tab owns an ordered page history, for example:

`[Library, Manga, Reader]`

`currentPageId` points at the currently active page within that ordered list.

## Read vs write

- Use `selectors` to read/derive view data from this model.
- Use `actions` to create new state values.
- Do not mutate state directly from UI code.
