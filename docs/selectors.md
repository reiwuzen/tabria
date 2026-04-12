# Selectors (Read-Only)

Selectors are pure read helpers for deriving view data from `WorkspaceState`.

They are intended for UI/read access only and must not be used to mutate state.
Use `actions` for all state changes.

## Why selectors exist

- keep read logic centralized
- avoid leaking internal state shape usage all over app code
- separate read concerns (`selectors`) from write concerns (`actions`)

## Available selectors

- `getTabs(state)`
- `getTab(state, tabId)`
- `getActiveTab(state)`
- `getActivePage(state, tabId?)`
- `getPageStack(state, tabId?)`

## Usage

```ts
import {
  createWorkspace,
  openTab,
  getActiveTab,
  getActivePage,
  type Workspace,
} from "@reiwuzen/tabria";

let state: Workspace = createWorkspace();
state = openTab(state, { title: "Library" });

const tab = getActiveTab(state);
const page = getActivePage(state);
```

## Important rule

Selectors are for view data only.
If you need to update state, call an action such as `addTab`, `pushPage`, or `updatePageState`.
