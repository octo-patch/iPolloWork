import { describe, expect, test } from "bun:test";

import {
  localizedTemplateDescription,
  localizedTemplateTags,
  localizedTemplateTitle,
} from "../src/react-app/domains/session/templates/template-localization";

const clinicalHandoff = {
  id: "ipollowork.pptx-clinical-handoff",
  title: "Clinical Handoff",
  description: "A calm clinical handoff deck for patient context, risk triage, care plan, and shift ownership.",
  tags: ["healthcare", "minimal", "pptx-compatible", "themeable"],
};

describe("template localization", () => {
  test("uses Chinese copy for bundled PPTX-compatible template metadata", () => {
    expect(localizedTemplateTitle(clinicalHandoff, "zh")).toBe("临床交接");
    expect(localizedTemplateDescription(clinicalHandoff, "zh")).toBe("用于患者背景、风险分诊、护理计划和班次责任交接的沉稳临床交接幻灯片。");
    expect(localizedTemplateTags(clinicalHandoff, "zh")).toEqual(["医疗", "极简", "兼容 PPTX", "可换主题"]);
  });

  test("falls back to manifest metadata outside Chinese locale", () => {
    expect(localizedTemplateTitle(clinicalHandoff, "en")).toBe("Clinical Handoff");
    expect(localizedTemplateDescription(clinicalHandoff, "en")).toBe(clinicalHandoff.description);
    expect(localizedTemplateTags(clinicalHandoff, "en")).toEqual(clinicalHandoff.tags);
  });
});
