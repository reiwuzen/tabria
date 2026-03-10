# State Model

## WorkspaceState

```ts
type WorkspaceState = {
  activeTab: TabId | null;
  tabs: Tab[];
  recentlyClosed: Tab[];
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
  screenStack: Screen[];
  meta?: Record<string, unknown>;
};
```

## Screen

```ts
type Screen = {
  id: ScreenId;
  type: string;
  view?: string;
  state?: unknown;
};
```

Each tab owns a `screenStack`, for example:

`[Library, Manga, Reader]`

## Read vs write

- Use `selectors` to read/derive view data from this model.
- Use `actions` to create new state values.
- Do not mutate state directly from UI code.
