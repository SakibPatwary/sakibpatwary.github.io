import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { nextProjectIndex, filterProjects } from "../src/player-utils.js";
const projects = JSON.parse(
  fs.readFileSync(new URL("../src/projects.json", import.meta.url)),
);
test("next and previous start at the correct ends before a track is selected", () => {
  assert.equal(nextProjectIndex(-1, 17, 1), 0);
  assert.equal(nextProjectIndex(-1, 17, -1), 16);
});
test("queue wraps correctly in both directions", () => {
  assert.equal(nextProjectIndex(16, 17, 1), 0);
  assert.equal(nextProjectIndex(0, 17, -1), 16);
});
test("shuffle never repeats the current project, including either random boundary", () => {
  for (let current = 0; current < 17; current++)
    for (const random of [0, 0.1, 0.5, 0.999999]) {
      const next = nextProjectIndex(current, 17, 1, true, () => random);
      assert.notEqual(next, current);
      assert.ok(next >= 0 && next < 17);
    }
});
test("empty and single-project collections are safe", () => {
  assert.equal(nextProjectIndex(0, 0), -1);
  assert.equal(nextProjectIndex(0, 1, 1, true), 0);
});
test("search, category and saved-project filters compose", () => {
  assert.equal(filterProjects(projects).length, 17);
  assert.equal(filterProjects(projects, { category: "Education" }).length, 3);
  assert.equal(
    filterProjects(projects, { query: "  SMART think  " })[0].name,
    "Smart Think",
  );
  assert.deepEqual(
    filterProjects(projects, {
      category: "Education",
      savedOnly: true,
      liked: [0, 2],
    }).map((p) => p.id),
    [2],
  );
  assert.equal(
    filterProjects(projects, { query: "no-such-project" }).length,
    0,
  );
});
test("all original project assets and destinations are present", () => {
  assert.equal(projects.length, 17);
  assert.equal(new Set(projects.map((p) => p.url)).size, 17);
  projects.forEach((project, index) => {
    assert.equal(project.id, index);
    assert.ok(["http:", "https:"].includes(new URL(project.url).protocol));
    assert.ok(
      fs.existsSync(
        new URL("../public/assets/images/" + project.image, import.meta.url),
      ),
    );
  });
});

test("project technology stacks contain usable names and remain searchable", () => {
  for (const project of projects) {
    assert.ok(Array.isArray(project.stack) && project.stack.length > 0);
    assert.equal(new Set(project.stack).size, project.stack.length);
    for (const technology of project.stack) {
      assert.equal(typeof technology, "string");
      assert.ok(technology.trim().length > 0);
      assert.ok(
        filterProjects(projects, { query: technology }).some(
          (match) => match.id === project.id,
        ),
      );
    }
  }
});
