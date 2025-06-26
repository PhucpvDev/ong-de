import { EcotourismSectionTranslation, EcotourismSection, EcotourismSectionResponse } from "@/types/directus/about/ecotourismSections";

export async function GetEcotourismSections(locale: string): Promise<EcotourismSectionTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/ecotourism_sections?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: EcotourismSectionResponse = await response.json();

    const translations = data.map((section) => {
      const translation = section.translations.find((t) => t.languages_code === lang);
      if (!translation) {
        throw new Error(`No translation found for language: ${lang} in section ID: ${section.id}`);
      }
      return translation;
    });

    return translations;
  } catch (error) {
    console.error("Error fetching ecotourism sections data:", error);
    return undefined;
  }
}
