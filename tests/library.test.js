import assert from "node:assert/strict";
import test from "node:test";
import { restoreLibrary, TOP_PROJECT_IDS } from "../src/library.js";
const validIds = Array.from({ length: 17 }, (_, id) => id);
test("new visitors see the curated top projects", () =>
  assert.deepEqual(restoreLibrary(null, null, validIds), TOP_PROJECT_IDS));
test("an empty legacy library is upgraded to the curated collection", () =>
  assert.deepEqual(restoreLibrary(null, "[]", validIds), TOP_PROJECT_IDS));
test("legacy likes are retained alongside the curated picks", () =>
  assert.deepEqual(restoreLibrary(null, '[0,1,999,"3"]', validIds), [
    ...TOP_PROJECT_IDS,
    0,
  ]));
test("an intentionally emptied current library remains empty on reload", () =>
  assert.deepEqual(
    restoreLibrary(JSON.stringify({ version: 2, liked: [] }), null, validIds),
    [],
  ));
test("saved values are validated, deduplicated, and recover safely from malformed storage", () => {
  assert.deepEqual(
    restoreLibrary("{broken", "{broken", validIds),
    TOP_PROJECT_IDS,
  );
  assert.deepEqual(
    restoreLibrary(
      JSON.stringify({ version: 2, liked: [2, 2, 999, "1", null] }),
      null,
      validIds,
    ),
    [2],
  );
});
