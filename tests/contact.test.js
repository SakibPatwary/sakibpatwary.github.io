import assert from "node:assert/strict";
import test from "node:test";
import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { build } from "esbuild";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

const cache = path.resolve("node_modules/.cache/contact-tests");
await mkdir(cache, { recursive: true });
const output = path.join(cache, "ContactForm.mjs");
await build({
  entryPoints: ["src/components/ContactForm.jsx"],
  outfile: output,
  bundle: true,
  format: "esm",
  jsx: "automatic",
  packages: "external",
});
const { default: ContactForm } = await import(pathToFileURL(output));

async function withForm(sendMessage, check) {
  const dom = new JSDOM('<div id="root"></div>', { url: "http://localhost" });
  const previous = {};
  for (const key of [
    "window",
    "document",
    "FormData",
    "IS_REACT_ACT_ENVIRONMENT",
  ]) {
    previous[key] = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, {
      configurable: true,
      writable: true,
      value: key === "IS_REACT_ACT_ENVIRONMENT" ? true : dom.window[key],
    });
  }
  const root = createRoot(document.getElementById("root"));
  try {
    await act(() =>
      root.render(React.createElement(ContactForm, { sendMessage })),
    );
    document.querySelector('[name="name"]').value = " Sakib Patwary ";
    document.querySelector('[name="email"]').value = "sakib@example.com";
    document.querySelector('[name="message"]').value = " Test message ";
    const submit = () =>
      document
        .querySelector("form")
        .dispatchEvent(
          new dom.window.Event("submit", { bubbles: true, cancelable: true }),
        );
    await check({ submit });
  } finally {
    await act(() => root.unmount());
    dom.window.close();
    for (const [key, descriptor] of Object.entries(previous)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
}

test("only confirmed delivery replaces the form with the success check", async () => {
  let resolve;
  let calls = 0;
  await withForm(
    (values) => {
      calls++;
      assert.deepEqual(values, {
        name: "Sakib Patwary",
        email: "sakib@example.com",
        message: "Test message",
      });
      return new Promise((done) => {
        resolve = done;
      });
    },
    async ({ submit }) => {
      await act(() => {
        submit();
        submit();
      });
      assert.equal(calls, 1);
      assert.equal(
        document.querySelector('button[type="submit"]').disabled,
        true,
      );
      assert.equal(document.querySelector(".contact-success"), null);
      await act(async () => resolve({ status: 200, text: "OK" }));
      assert.equal(document.querySelector("form"), null);
      assert.equal(document.querySelector("h2").textContent, "Message sent!");
      assert.ok(document.querySelector(".contact-success-icon svg"));
    },
  );
});

test("failed delivery preserves the form, error and entered values for retry", async (t) => {
  t.mock.method(console, "error", () => {});
  await withForm(
    async () => {
      throw { status: 403, text: "Service unavailable" };
    },
    async ({ submit }) => {
      await act(async () => submit());
      assert.ok(document.querySelector("form"));
      assert.equal(
        document.querySelector('[name="message"]').value,
        " Test message ",
      );
      assert.match(
        document.querySelector(".form-status.error").textContent,
        /could not be sent/,
      );
      assert.equal(
        document.querySelector('button[type="submit"]').disabled,
        false,
      );
      assert.equal(document.querySelector(".contact-success"), null);
    },
  );
});

test("whitespace-only messages never contact the delivery service", async () => {
  let calls = 0;
  await withForm(
    async () => {
      calls++;
    },
    async ({ submit }) => {
      document.querySelector('[name="message"]').value = "   ";
      await act(async () => submit());
      assert.equal(calls, 0);
      assert.match(
        document.querySelector(".form-status.error").textContent,
        /complete every field/,
      );
    },
  );
});
