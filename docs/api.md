# API

## Namespace

```ts
import { Tabria } from "tabria";
```

Exports:

- `Tabria.core`
- `Tabria.operations`
- `Tabria.api` (`core + operations`)

## Core

- `createWorkspace(opts?)`
- `createTab(opts?)`
- `createScreen(opts?)`

## Operations

- `openTab(state, opts?)`
- `addTab(state, tab)`
- `activateTab(state, tabId)`
- `closeTab(state, tabId)`
- `moveTab(state, tabId, toIndex)`
- `reopenClosedTab(state, tabId?)`
- `pushScreen(state, tabId, screen)`
- `popScreen(state, tabId)`
- `replaceScreen(state, tabId, screen)`
- `updateScreenState(state, tabId, patch)`

## Quick Example

```ts
import { Tabria } from "tabria";

let state = Tabria.core.createWorkspace();
state = Tabria.operations.openTab(state, { title: "Library" });
```
