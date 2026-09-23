---
title: "JavaScript in VSCode: language, tool, and analysis model"
description: "Why JavaScript analysis in VSCode relies on the TypeScript model, how tsserver works, and where dynamic links become invisible."
date: 2025-12-24
display_date: "December 24, 2025"
image: "/img/blog/2025/20251224-01-js-vscode-analysis.png"
image_alt: "JavaScript in VSCode"
---

# JavaScript in VSCode: language, tool, and analysis model

<zoom-img src="/img/blog/2025/20251224-01-js-vscode-analysis.png" alt="JavaScript in VSCode" width="100px"></zoom-img>

In VSCode, JavaScript is analyzed not as an independent language but as a projection of the TypeScript type
        model served by `tsserver`. This sets the boundaries of what the IDE can see in code and explains
        why some constructs are analyzed predictably while others remain opaque.

In the publication I examine the role of `jsconfig.json`, the architecture of the Language Server
        Protocol, and the place of JSDoc in a TypeScript-oriented analysis model. I also show why dynamic dependencies
        and late binding stay outside the TypeScript model used by VSCode.

The full text is available in the
        [library material](/en/library/teqfw/20251224-01-js-vscode-analysis.html).
