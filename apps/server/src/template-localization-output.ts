import type { TemplateLocalizedMetadata } from "@ipollowork/types/templates";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function disabledTemplateLocalizationTools(toolIds: readonly string[]): Record<string, boolean> {
  return Object.fromEntries(toolIds.map((id) => [id, false]));
}

function parseTemplateLocalizationPayload(value: unknown): Record<string, TemplateLocalizedMetadata> {
  if (!isRecord(value) || !Array.isArray(value.templates)) return {};
  const result: Record<string, TemplateLocalizedMetadata> = {};
  for (const candidate of value.templates) {
    if (!isRecord(candidate) || typeof candidate.id !== "string" || typeof candidate.sourceLocale !== "string" || !Array.isArray(candidate.translations)) continue;
    const translations: TemplateLocalizedMetadata["translations"] = {};
    for (const translation of candidate.translations) {
      if (!isRecord(translation)
        || typeof translation.locale !== "string"
        || typeof translation.title !== "string"
        || typeof translation.description !== "string"
        || !Array.isArray(translation.tags)
        || translation.tags.some((tag) => typeof tag !== "string")) continue;
      translations[translation.locale] = {
        title: translation.title,
        description: translation.description,
        tags: translation.tags,
      };
    }
    result[candidate.id] = { sourceLocale: candidate.sourceLocale, translations };
  }
  return result;
}

export function parseTemplateLocalizationText(text: string): Record<string, TemplateLocalizedMetadata> {
  const candidates = [text.trim()];
  for (const match of text.matchAll(/```(?:json)?\s*([\s\S]*?)```/giu)) candidates.push(match[1]?.trim() ?? "");
  const objectStart = text.indexOf("{");
  const objectEnd = text.lastIndexOf("}");
  if (objectStart >= 0 && objectEnd > objectStart) candidates.push(text.slice(objectStart, objectEnd + 1));

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const parsed = parseTemplateLocalizationPayload(JSON.parse(candidate));
      if (Object.keys(parsed).length > 0) return parsed;
    } catch {
      // Try the next possible JSON segment.
    }
  }
  return {};
}
