import test from "node:test";
import assert from "node:assert/strict";
import {
  createWorkspace,
  createScreen,
  openTab,
  pushScreen,
  replaceScreen,
  updateScreenState,
  popScreen,
  closeTab,
  reopenClosedTab,
  getTabs,
  getActiveTab,
  getActiveScreen,
  getScreenStack,
} from "../dist/index.js";

test("createWorkspace creates an empty workspace", () => {
  const workspace = createWorkspace();

  assert.equal(workspace.activeTab, null);
  assert.deepEqual(workspace.tabs, []);
  assert.deepEqual(workspace.recentlyClosed, []);
});

test("openTab adds and activates a new tab", () => {
  let workspace = createWorkspace();

  workspace = openTab(workspace, { title: "Library" });

  assert.equal(workspace.tabs.length, 1);
  assert.equal(workspace.tabs[0].title, "Library");
  assert.equal(workspace.activeTab, workspace.tabs[0].id);
});

test("screen operations update the active tab stack", () => {
  let workspace = createWorkspace();
  workspace = openTab(workspace, { title: "Reader" });

  const tabId = workspace.activeTab;
  assert.ok(tabId);

  const library = createScreen({ type: "library" });
  const manga = createScreen({ type: "manga", state: { id: 42 } });
  const reader = createScreen({
    type: "reader",
    view: "vertical",
    state: { page: 12 },
  });

  workspace = pushScreen(workspace, tabId, library);
  workspace = pushScreen(workspace, tabId, manga);
  workspace = replaceScreen(workspace, tabId, reader);
  workspace = updateScreenState(workspace, tabId, { page: 13 });

  const activeTab = workspace.tabs.find((tab) => tab.id === tabId);
  assert.ok(activeTab);
  assert.equal(activeTab.screenStack.length, 2);
  assert.equal(activeTab.screenStack[0].type, "library");
  assert.equal(activeTab.screenStack[1].type, "reader");
  assert.deepEqual(activeTab.screenStack[1].state, { page: 13 });

  workspace = popScreen(workspace, tabId);
  const afterPop = workspace.tabs.find((tab) => tab.id === tabId);
  assert.ok(afterPop);
  assert.equal(afterPop.screenStack.length, 1);
  assert.equal(afterPop.screenStack[0].type, "library");
});

test("closeTab stores tab in recentlyClosed and reopenClosedTab restores it", () => {
  let workspace = createWorkspace();
  workspace = openTab(workspace, { title: "A" });
  workspace = openTab(workspace, { title: "B" });

  const tabA = workspace.tabs[0];
  const tabB = workspace.tabs[1];

  workspace = closeTab(workspace, tabB.id);

  assert.equal(workspace.tabs.length, 1);
  assert.equal(workspace.tabs[0].id, tabA.id);
  assert.equal(workspace.recentlyClosed.length, 1);
  assert.equal(workspace.recentlyClosed[0].id, tabB.id);
  assert.ok(workspace.recentlyClosed[0].closedAt);

  workspace = reopenClosedTab(workspace);

  assert.equal(workspace.tabs.length, 2);
  assert.equal(workspace.tabs[1].id, tabB.id);
  assert.equal(workspace.activeTab, tabB.id);
  assert.equal(workspace.recentlyClosed.length, 0);
});

test("selectors return derived copies and do not expose internals", () => {
  let workspace = createWorkspace();
  workspace = openTab(workspace, { title: "Reader" });
  const tabId = workspace.activeTab;
  assert.ok(tabId);

  workspace = pushScreen(workspace, tabId, createScreen({ type: "library" }));
  workspace = pushScreen(
    workspace,
    tabId,
    createScreen({ type: "reader", state: { page: 10 } })
  );

  const tabs = getTabs(workspace);
  const activeTab = getActiveTab(workspace);
  const stack = getScreenStack(workspace, tabId);
  const activeScreen = getActiveScreen(workspace, tabId);

  assert.equal(tabs.length, 1);
  assert.ok(activeTab);
  assert.equal(stack.length, 2);
  assert.ok(activeScreen);

  tabs[0].title = "Mutated Outside";
  activeTab.title = "Mutated Outside";
  stack[1].type = "mutated";
  activeScreen.state.page = 999;

  assert.equal(workspace.tabs[0].title, "Reader");
  assert.equal(workspace.tabs[0].screenStack[1].type, "reader");
  assert.deepEqual(workspace.tabs[0].screenStack[1].state, { page: 10 });
});
