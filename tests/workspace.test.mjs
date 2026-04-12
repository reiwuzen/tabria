import test from "node:test";
import assert from "node:assert/strict";
import {
  createWorkspace,
  createPage,
  openTab,
  pushPage,
  replacePage,
  updatePageState,
  popPage,
  closeTab,
  reopenClosedTab,
  getTabs,
  getActiveTab,
  getActivePage,
  getPageStack,
} from "../dist/index.js";

test("createWorkspace creates an empty workspace", () => {
  const workspace = createWorkspace();

  assert.equal(workspace.activeTab, null);
  assert.deepEqual(workspace.tabs.openOrder, []);
  assert.deepEqual(workspace.tabs.closedOrder, []);
  assert.deepEqual(workspace.tabs.storage, {});
});

test("openTab adds and activates a new tab", () => {
  let workspace = createWorkspace();

  workspace = openTab(workspace, { title: "Library" });

  assert.equal(workspace.tabs.openOrder.length, 1);
  assert.equal(workspace.tabs.storage[workspace.tabs.openOrder[0]].title, "Library");
  assert.equal(workspace.activeTab, workspace.tabs.openOrder[0]);
});

test("page operations update the active tab history", () => {
  let workspace = createWorkspace();
  workspace = openTab(workspace, { title: "Reader" });

  const tabId = workspace.activeTab;
  assert.ok(tabId);

  const library = createPage({ type: "library" });
  const manga = createPage({ type: "manga", state: { id: 42 } });
  const reader = createPage({
    type: "reader",
    view: "vertical",
    state: { page: 12 },
  });

  workspace = pushPage(workspace, tabId, library);
  workspace = pushPage(workspace, tabId, manga);
  workspace = replacePage(workspace, tabId, reader);
  workspace = updatePageState(workspace, tabId, { page: 13 });

  const activeTab = workspace.tabs.storage[tabId];
  assert.ok(activeTab);
  assert.equal(activeTab.pages.order.length, 2);
  assert.equal(activeTab.currentPageId, activeTab.pages.order[1]);
  assert.equal(activeTab.pages.storage[activeTab.pages.order[0]].type, "library");
  assert.equal(activeTab.pages.storage[activeTab.pages.order[1]].type, "reader");
  assert.deepEqual(activeTab.pages.storage[activeTab.pages.order[1]].state, { page: 13 });

  workspace = popPage(workspace, tabId);
  const afterPop = workspace.tabs.storage[tabId];
  assert.ok(afterPop);
  assert.equal(afterPop.pages.order.length, 1);
  assert.equal(afterPop.currentPageId, afterPop.pages.order[0]);
  assert.equal(afterPop.pages.storage[afterPop.pages.order[0]].type, "library");
});

test("closeTab moves a tab into closed order and reopenClosedTab restores it", () => {
  let workspace = createWorkspace();
  workspace = openTab(workspace, { title: "A" });
  workspace = openTab(workspace, { title: "B" });

  const tabA = workspace.tabs.storage[workspace.tabs.openOrder[0]];
  const tabB = workspace.tabs.storage[workspace.tabs.openOrder[1]];

  workspace = closeTab(workspace, tabB.id);

  assert.equal(workspace.tabs.openOrder.length, 1);
  assert.equal(workspace.tabs.openOrder[0], tabA.id);
  assert.equal(workspace.tabs.closedOrder.length, 1);
  assert.equal(workspace.tabs.closedOrder[0], tabB.id);
  assert.ok(workspace.tabs.storage[tabB.id].closedAt);

  workspace = reopenClosedTab(workspace);

  assert.equal(workspace.tabs.openOrder.length, 2);
  assert.equal(workspace.tabs.openOrder[1], tabB.id);
  assert.equal(workspace.activeTab, tabB.id);
  assert.equal(workspace.tabs.closedOrder.length, 0);
});

test("selectors return derived copies and do not expose internals", () => {
  let workspace = createWorkspace();
  workspace = openTab(workspace, { title: "Reader" });
  const tabId = workspace.activeTab;
  assert.ok(tabId);

  workspace = pushPage(workspace, tabId, createPage({ type: "library" }));
  workspace = pushPage(
    workspace,
    tabId,
    createPage({ type: "reader", state: { page: 10 } })
  );

  const tabs = getTabs(workspace);
  const activeTab = getActiveTab(workspace);
  const stack = getPageStack(workspace, tabId);
  const activePage = getActivePage(workspace, tabId);

  assert.equal(tabs.length, 1);
  assert.ok(activeTab);
  assert.equal(stack.length, 2);
  assert.ok(activePage);

  tabs[0].title = "Mutated Outside";
  activeTab.title = "Mutated Outside";
  stack[1].type = "mutated";
  activePage.state.page = 999;

  const storedTab = workspace.tabs.storage[workspace.tabs.openOrder[0]];
  assert.equal(storedTab.title, "Reader");
  assert.equal(storedTab.pages.storage[storedTab.pages.order[1]].type, "reader");
  assert.deepEqual(storedTab.pages.storage[storedTab.pages.order[1]].state, { page: 10 });
});
