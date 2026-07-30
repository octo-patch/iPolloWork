import { describe, expect, test } from "bun:test";

import {
  localizedTemplateDescription,
  templateCardTags,
  localizedTemplateTags,
  localizedTemplateTitle,
} from "../src/react-app/domains/session/templates/template-localization";

const uploadedTemplate = {
  id: "partner.unknown-template",
  category: "slides",
  style: "minimal",
  title: "Clinical Handoff",
  description: "A calm clinical handoff deck.",
  tags: ["healthcare", "minimal"],
  localizedMetadata: {
    sourceLocale: "en",
    translations: {
      zh: {
        title: "临床交接",
        description: "用于患者信息与护理计划交接的临床幻灯片。",
        tags: ["医疗", "极简"],
      },
    },
  },
} as const;

describe("template localization", () => {
  test("reads localized metadata from any uploaded template manifest", () => {
    expect(localizedTemplateTitle(uploadedTemplate, "zh")).toBe("临床交接");
    expect(localizedTemplateDescription(uploadedTemplate, "zh-CN")).toBe("用于患者信息与护理计划交接的临床幻灯片。");
    expect(localizedTemplateTags(uploadedTemplate, "zh")).toEqual(["医疗", "极简"]);
  });

  test("falls back to source metadata when the requested locale is missing", () => {
    expect(localizedTemplateTitle(uploadedTemplate, "ja")).toBe("Clinical Handoff");
    expect(localizedTemplateDescription(uploadedTemplate, "ja")).toBe(uploadedTemplate.description);
    expect(localizedTemplateTags(uploadedTemplate, "ja")).toEqual(uploadedTemplate.tags);
  });

  test("shows only the localized style on slide template cards", () => {
    expect(templateCardTags(uploadedTemplate, "zh", "极简")).toEqual(["极简"]);
    expect(templateCardTags(uploadedTemplate, "zh", "极简")).not.toContain("医疗");
  });

  test("keeps localized metadata tags on non-slide template cards", () => {
    expect(templateCardTags({ ...uploadedTemplate, category: "site" }, "zh", "极简")).toEqual(["医疗", "极简"]);
  });
});
