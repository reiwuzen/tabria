# Tabria Overview

Tabria is a headless state engine for tabbed workspaces with nested screen navigation.

It focuses on pure state transitions:

- open/close/switch/move tabs
- push/pop/replace/update screens per tab
- restore recently closed tabs

Architecture:

```text
UI (React/Vue/etc) -> Tabria state engine -> application logic
```

Use Tabria to keep navigation and tab behavior consistent, while your UI layer only renders state.
