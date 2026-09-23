---
title: "Integration of @teqfw/di and OpenAI SDK in a Chrome extension"
description: "A prototype MV3 extension using @teqfw/di exposed three problems: handling paths, CSP limits, and running the OpenAI SDK in the browser. The DI container made it easier to test code in Node.js and run it in the extension, but it already needs refinements."
date: 2025-08-28
display_date: "August 28, 2025"
image: "/img/blog/2025/08/28-01-di-openai-extension.png"
image_alt: "@teqfw/di and OpenAI SDK"
---

# Integration of @teqfw/di and OpenAI SDK in a Chrome extension

<zoom-img
    src="/img/blog/2025/08/28-01-di-openai-extension.png"
    alt="@teqfw/di and OpenAI SDK"
    width="100px"
    style="float: left; margin: 15px 15px 0 0"
  ></zoom-img>

I tried building a prototype Chrome (MV3) extension to test how
    [@teqfw/di](https://github.com/teqfw/di) works in a restricted environment and when connecting a third-party SDK. Three problem areas emerged right away: container configuration, CSP restrictions, and running the OpenAI SDK in the browser.

### 1. Relative paths

**Problem**: an extension cannot use absolute paths when configuring the namespace in the container. Absolute paths inside a Chrome extension behave differently from a regular browser or Node.js.

- In **Node.js**, modules load via `file://…`.

- In the **browser** — via `http(s)://…`.

- In a **Chrome extension** — only through `chrome-extension:// /…`.

**Solution**: always use `import.meta.url` to build relative paths when configuring the object container.

### 2. CSP and dependency parsing

CSP in MV3 completely forbids `new Function`. An earlier version of the container used this trick to parse dependencies, but it had to switch to a compatible option without dynamic code. Thanks to this, the DI container keeps working under the strict extension limitations.

### 3. OpenAI SDK and browser restrictions

The **OpenAI SDK** itself requires enabling the `dangerouslyAllowBrowser: true` option in the browser. It's a safeguard against accidentally leaking the API key. In my prototype the key is stored in `chrome.storage.local` in plain text. That's acceptable for an extension, but it's still worth adding at least light obfuscation.

### Benefits of the DI container

The DI container [@teqfw/di](https://github.com/teqfw/di) pulled in the OpenAI SDK as regular ESM dependencies. This gave two benefits at once: the code can be tested in **Node.js** and run in the **Chrome extension** without changes. The container works only with the SDK's **ESM modules**, which matches the modern format.

A week ago I released the first stable version of
    [@teqfw/di](https://wiredgeese.com/ru/blog/2025/20250821-02-teqfw-di-release.html), but new improvement requests have already appeared: a "safe mode" without `new Function` is needed. This experiment showed that even under MV3's strict limits you can build a flexible architecture based on
    [@teqfw/di](https://github.com/teqfw/di).
