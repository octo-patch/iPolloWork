import type { TemplateLocalizedMetadataEntry, TemplateManifestV1 } from "@ipollowork/types/templates";
import type { Language } from "@/i18n";

type TemplateMetadata = Pick<TemplateManifestV1, "title" | "description" | "tags" | "localizedMetadata">;
type TemplateCardMetadata = TemplateMetadata & Pick<TemplateManifestV1, "category" | "style">;

function localeCandidates(locale: Language | string): string[] {
  const normalized = locale.trim();
  if (!normalized) return [];
  const base = normalized.split("-")[0];
  return base && base !== normalized ? [normalized, base] : [normalized];
}

function localizedMetadata(
  template: TemplateMetadata,
  locale: Language | string,
): TemplateLocalizedMetadataEntry | undefined {
  const translations = template.localizedMetadata?.translations;
  if (!translations) return undefined;
  for (const candidate of localeCandidates(locale)) {
    const exact = translations[candidate];
    if (exact) return exact;
    const caseInsensitiveKey = Object.keys(translations).find((key) => key.toLowerCase() === candidate.toLowerCase());
    if (caseInsensitiveKey) return translations[caseInsensitiveKey];
  }
  return undefined;
}

export function localizedTemplateTitle(template: TemplateMetadata, locale: Language | string): string {
  return localizedMetadata(template, locale)?.title ?? template.title;
}

export function localizedTemplateDescription(template: TemplateMetadata, locale: Language | string): string {
  return localizedMetadata(template, locale)?.description ?? template.description;
}

export function localizedTemplateTags(template: TemplateMetadata, locale: Language | string): string[] {
  return [...(localizedMetadata(template, locale)?.tags ?? template.tags)];
}

export function templateCardTags(
  template: TemplateCardMetadata,
  locale: Language | string,
  localizedStyle: string,
): string[] {
  return template.category === "slides" ? [localizedStyle] : localizedTemplateTags(template, locale);
}
