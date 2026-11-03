import assert from "node:assert/strict";
import test from "node:test";
import { restoreLibrary, TOP_PROJECT_IDS } from "../src/library.js";
import { readFileSync } from "node:fs";
const projects = JSON.parse(
  readFileSync(new URL("../src/projects.json", import.meta.url)),
);
const validIds = projects.map((project) => project.id);
test("new visitors see the curated top projects", () =>
  assert.deepEqual(restoreLibrary(null, null, validIds), TOP_PROJECT_IDS));
test("an empty legacy library is upgraded to the curated collection", () =>
  assert.deepEqual(restoreLibrary(null, "[]", validIds), TOP_PROJECT_IDS));
test("legacy likes are retained alongside the curated picks", () =>
  assert.deepEqual(restoreLibrary(null, '[0,1,999,"3"]', validIds), [
    ...new Set([...TOP_PROJECT_IDS, 0, 1]),
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
