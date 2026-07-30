import { describe, expect, test } from "bun:test";

import { disabledTemplateLocalizationTools, parseTemplateLocalizationText } from "./template-localization-output.js";

describe("template localization output", () => {
  test("parses JSON returned in a Markdown code fence", () => {
    const result = parseTemplateLocalizationText(`Here is the requested JSON:\n\n\`\`\`json
{
  "templates": [{
    "id": "partner.unknown-template",
    "sourceLocale": "en",
    "translations": [{
      "locale": "zh",
      "title": "简洁作品集",
      "description": "紧凑的本地作品集模板。",
      "tags": ["作品集"]
    }]
  }]
}
\`\`\``);

    expect(result["partner.unknown-template"]?.translations.zh).toEqual({
      title: "简洁作品集",
      description: "紧凑的本地作品集模板。",
      tags: ["作品集"],
    });
  });

  test("returns no localizations for invalid text", () => {
    expect(parseTemplateLocalizationText("I could not translate these templates.")).toEqual({});
  });

  test("disables every tool exposed by OpenCode", () => {
    expect(disabledTemplateLocalizationTools(["read", "write", "bash", "custom-tool"])).toEqual({
      read: false,
      write: false,
      bash: false,
      "custom-tool": false,
    });
  });
});
