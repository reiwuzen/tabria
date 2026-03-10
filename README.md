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
- navigating between screens inside a tab
- restoring closed tabs

Your UI framework simply subscribes to the state and renders it.

## Main concepts

### Workspace

The global state container.

```text
Workspace
  activeTab
  tabs[]
  recentlyClosed[]
```

### Tab

Represents a working context.

```text
Tab
  id
  title
  createdAt
  updatedAt
  screenStack[]
```

A tab can contain multiple screens.

### Screen

A navigation unit inside a tab.

```text
Screen
  id
  type
  view
  state
```

Example:

```ts
type: "reader"
view: "vertical"
state: { page: 12 }
```

### Screen Stack

Each tab maintains its own navigation stack.

Example navigation:

```text
Library
  -> Manga
    -> Reader
```

Stack representation:

```text
[Library, Manga, Reader]
```

Operations include:

- `pushScreen`
- `popScreen`
- `replaceScreen`
- `updateScreenState`

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

### Screen navigation

- `createScreen`
- `pushScreen`
- `popScreen`
- `replaceScreen`
- `updateScreenState`

### Tab history

- `recentlyClosed`
- `reopenClosedTab()`

This enables browser-like behavior:

- `Ctrl + Shift + T`

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
  createScreen,
  addTab,
  openTab,
  pushScreen,
  updateScreenState,
  getActiveTab,
  getActiveScreen,
  type Workspace,
} from "@reiwuzen/tabria";

let workspace: Workspace = createWorkspace();

const tab = createTab({ title: "Library" });
workspace = addTab(workspace, tab);

workspace = openTab(workspace, { title: "Manga" });

const library = createScreen({
  type: "library",
  view: "grid",
});
workspace = pushScreen(workspace, tab.id, library);

workspace = updateScreenState(workspace, tab.id, {
  section: "favorites",
});

const activeTab = getActiveTab(workspace);
const activeScreen = getActiveScreen(workspace);
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
- `Screen`
- `ScreenID`
- `JsonObj`

### `core`

- `createTab`
- `createScreen`
- `createWorkspace`

### `actions`

- `openTab`
- `addTab`
- `activateTab`
- `closeTab`
- `moveTab`
- `reopenClosedTab`
- `pushScreen`
- `popScreen`
- `replaceScreen`
- `updateScreenState`

### `selectors`

- `getTabs`
- `getTab`
- `getActiveTab`
- `getActiveScreen`
- `getScreenStack`

Selectors are read-only helpers for view code.
Use `actions` for any state updates.

## Behavior Notes

- All operations are pure: they return new state objects instead of mutating inputs.
- Selectors are pure read helpers and should be used for view/derived access only.
- If an operation targets a non-existent tab, the original state is returned.
- `closeTab` appends the closed tab to `recentlyClosed` and sets `closedAt`.
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
