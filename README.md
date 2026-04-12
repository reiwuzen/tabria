# Tabria

## Core idea

Tabria separates state management from UI rendering.

```text
UI (React / Vue / etc)
        |
Tabria (state engine)
        |
Application logic
```

The library only handles state transitions, such as:

- opening tabs
- closing tabs
- switching tabs
- navigating between pages inside a tab
- restoring closed tabs from closed history

Your UI framework simply subscribes to the state and renders it.

## Main concepts

### Workspace

The global state container.

```text
Workspace
  activeTab
  tabs.openOrder[]
  tabs.closedOrder[]
  tabs.storage{}
```

### Tab

Represents a working context.

```text
Tab
  id
  title
  createdAt
  updatedAt
  runtimeState
  pages.order[]
  pages.storage{}
  currentPageId
```

A tab can contain multiple pages.

### Page

A navigation entry inside a tab.

```text
Page
  id
  key
  url
  type
  view
  state
  meta
```

Example:

```ts
type: "reader"
view: "vertical"
state: { page: 12 }
```

### Page History

Each tab maintains its own ordered page history.

Example navigation:

```text
Library
  -> Manga
    -> Reader
```

History representation:

```text
[Library, Manga, Reader]
```

Operations include:

- `pushPage`
- `popPage`
- `replacePage`
- `updatePageState`

## Core capabilities

Tabria provides primitives for:

### Tab management

- `createWorkspace`
- `createTab`
- `openTab`
- `addTab`
- `activateTab`
- `closeTab`
- `moveTab`
- `reopenClosedTab`

### Page navigation

- `createPage`
- `pushPage`
- `popPage`
- `replacePage`
- `updatePageState`

### Closed tab history

- `tabs.closedOrder`
- `reopenClosedTab()`

## Design goals

Tabria is designed to be:

- headless: no UI components
- framework-agnostic: works with React, Vue, Svelte, etc.
- predictable: pure state transition functions
- portable: usable in web, desktop (Tauri/Electron), or Node apps

## Installation

```bash
pnpm add @reiwuzen/tabria
```

```bash
npm install @reiwuzen/tabria
```

## Usage

```ts
import {
  createWorkspace,
  createTab,
  createPage,
  addTab,
  openTab,
  pushPage,
  updatePageState,
  getActiveTab,
  getActivePage,
  type Workspace,
} from "@reiwuzen/tabria";

let workspace: Workspace = createWorkspace();

const tab = createTab({ title: "Library" });
workspace = addTab(workspace, tab);

workspace = openTab(workspace, { title: "Manga" });

const library = createPage({
  type: "library",
  view: "grid",
});
workspace = pushPage(workspace, tab.id, library);

workspace = updatePageState(workspace, tab.id, {
  section: "favorites",
});

const activeTab = getActiveTab(workspace);
const activePage = getActivePage(workspace);
```

## API Reference

### Grouped exports (optional)

- `core`
- `actions`
- `selectors`
- `api` (merged convenience API)

### Types

- `Workspace`
- `Tab`
- `TabID`
- `TabState`
- `Page`
- `PageID`
- `PageState`
- `JsonObj`

### `core`

- `createTab`
- `createPage`
- `createWorkspace`

### `actions`

- `openTab`
- `addTab`
- `activateTab`
- `closeTab`
- `moveTab`
- `reopenClosedTab`
- `pushPage`
- `popPage`
- `replacePage`
- `updatePageState`

### `selectors`

- `getTabs`
- `getTab`
- `getActiveTab`
- `getActivePage`
- `getPageStack`

Selectors are read-only helpers for view code.
Use `actions` for any state updates.

## Behavior Notes

- All operations are pure: they return new state objects instead of mutating inputs.
- Selectors are pure read helpers and should be used for view/derived access only.
- If an operation targets a non-existent tab, the original state is returned.
- `closeTab` moves the tab ID from `tabs.openOrder` to `tabs.closedOrder`, sets `closedAt`, and marks the tab `runtimeState` as `discarded`.
- `reopenClosedTab()` restores the most recently closed tab by default.
- `reopenClosedTab(tabId)` restores a specific closed tab when found.

## Development

```bash
pnpm install
pnpm build
```

Build output:

- ESM: `dist/index.js`
- CJS: `dist/index.cjs`
- Types: `dist/index.d.ts`

## License

ISC
