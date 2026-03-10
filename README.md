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
import { Tabria } from "@reiwuzen/tabria";

let workspace: Tabria.Workspace = Tabria.core.createWorkspace();

const tab = Tabria.core.createTab({ title: "Library" });
workspace = Tabria.operations.addTab(workspace, tab);

workspace = Tabria.operations.openTab(workspace, { title: "Manga" });

const library = Tabria.core.createScreen({
  type: "library",
  view: "grid",
});
workspace = Tabria.operations.pushScreen(workspace, tab.id, library);

workspace = Tabria.operations.updateScreenState(workspace, tab.id, {
  section: "favorites",
});
```

## API Reference

### Namespace exports

- `Tabria.core`
- `Tabria.operations`
- `Tabria.api` (merged convenience API)

### Types

- `Tabria.Workspace`
- `Tabria.Tab`
- `Tabria.TabID`
- `Tabria.Screen`
- `Tabria.ScreenID`
- `Tabria.JsonObj`

### `Tabria.core`

- `createTab`
- `createScreen`
- `createWorkspace`

### `Tabria.operations`

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

## Behavior Notes

- All operations are pure: they return new state objects instead of mutating inputs.
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
