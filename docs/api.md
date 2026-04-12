# API

## Module

```ts
import {
  createWorkspace,
  openTab,
  core,
  actions,
  selectors,
  api,
  type Workspace,
} from "@reiwuzen/tabria";
```

Exports:

- flat named exports for all constructors, actions, and selectors
- all public types as module types (`Workspace`, `Tab`, `Page`, etc.)
- optional grouped exports: `core`, `actions`, `selectors`, `api`
- selectors are read-only view helpers; use actions to mutate state
- screen-named exports still exist as compatibility aliases

## Core

- `createWorkspace(opts?)`
- `createTab(opts?)`
- `createPage(opts?)`

## Actions

- `openTab(state, opts?)`
- `addTab(state, tab)`
- `activateTab(state, tabId)`
- `closeTab(state, tabId)`
- `moveTab(state, tabId, toIndex)`
- `reopenClosedTab(state, tabId?)`
- `pushPage(state, tabId, page)`
- `popPage(state, tabId)`
- `replacePage(state, tabId, page)`
- `updatePageState(state, tabId, patch)`

## Selectors

- `getTabs(state)`
- `getTab(state, tabId)`
- `getActiveTab(state)`
- `getActivePage(state, tabId?)`
- `getPageStack(state, tabId?)`

Selectors are for derived read access only.
They should not be used to mutate any part of workspace state.

See also: `./selectors.md`

## Quick Example

```ts
import { createWorkspace, openTab, getActiveTab } from "@reiwuzen/tabria";

let state = createWorkspace();
state = openTab(state, { title: "Library" });
const activeTab = getActiveTab(state);
```
