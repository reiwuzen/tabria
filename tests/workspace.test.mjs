import test from "node:test";
import assert from "node:assert/strict";
import { Tabria } from "../dist/index.js";

test("createWorkspace creates an empty workspace", () => {
  const workspace = Tabria.core.createWorkspace();

  assert.equal(workspace.activeTab, null);
  assert.deepEqual(workspace.tabs, []);
  assert.deepEqual(workspace.recentlyClosed, []);
});

test("openTab adds and activates a new tab", () => {
  let workspace = Tabria.core.createWorkspace();

  workspace = Tabria.operations.openTab(workspace, { title: "Library" });

  assert.equal(workspace.tabs.length, 1);
  assert.equal(workspace.tabs[0].title, "Library");
  assert.equal(workspace.activeTab, workspace.tabs[0].id);
});

test("screen operations update the active tab stack", () => {
  let workspace = Tabria.core.createWorkspace();
  workspace = Tabria.operations.openTab(workspace, { title: "Reader" });

  const tabId = workspace.activeTab;
  assert.ok(tabId);

  const library = Tabria.core.createScreen({ type: "library" });
  const manga = Tabria.core.createScreen({ type: "manga", state: { id: 42 } });
  const reader = Tabria.core.createScreen({
    type: "reader",
    view: "vertical",
    state: { page: 12 },
  });

  workspace = Tabria.operations.pushScreen(workspace, tabId, library);
  workspace = Tabria.operations.pushScreen(workspace, tabId, manga);
  workspace = Tabria.operations.replaceScreen(workspace, tabId, reader);
  workspace = Tabria.operations.updateScreenState(workspace, tabId, { page: 13 });

  const activeTab = workspace.tabs.find((tab) => tab.id === tabId);
  assert.ok(activeTab);
  assert.equal(activeTab.screenStack.length, 2);
  assert.equal(activeTab.screenStack[0].type, "library");
  assert.equal(activeTab.screenStack[1].type, "reader");
  assert.deepEqual(activeTab.screenStack[1].state, { page: 13 });

  workspace = Tabria.operations.popScreen(workspace, tabId);
  const afterPop = workspace.tabs.find((tab) => tab.id === tabId);
  assert.ok(afterPop);
  assert.equal(afterPop.screenStack.length, 1);
  assert.equal(afterPop.screenStack[0].type, "library");
});

test("closeTab stores tab in recentlyClosed and reopenClosedTab restores it", () => {
  let workspace = Tabria.core.createWorkspace();
  workspace = Tabria.operations.openTab(workspace, { title: "A" });
  workspace = Tabria.operations.openTab(workspace, { title: "B" });

  const tabA = workspace.tabs[0];
  const tabB = workspace.tabs[1];

  workspace = Tabria.operations.closeTab(workspace, tabB.id);

  assert.equal(workspace.tabs.length, 1);
  assert.equal(workspace.tabs[0].id, tabA.id);
  assert.equal(workspace.recentlyClosed.length, 1);
  assert.equal(workspace.recentlyClosed[0].id, tabB.id);
  assert.ok(workspace.recentlyClosed[0].closedAt);

  workspace = Tabria.operations.reopenClosedTab(workspace);

  assert.equal(workspace.tabs.length, 2);
  assert.equal(workspace.tabs[1].id, tabB.id);
  assert.equal(workspace.activeTab, tabB.id);
  assert.equal(workspace.recentlyClosed.length, 0);
});
