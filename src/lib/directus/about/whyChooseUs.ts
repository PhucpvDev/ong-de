import { WhyChooseUsTranslation, WhyChooseUsResponse } from "@/types/directus/about/whyChooseUs";
function cleanJsonString(jsonString: string): string {
  return jsonString
    .replace(/^"|"$/g, '') 
    .replace(/,\s*([\]}])/g, '$1') 
    .replace(/[\n\t]+/g, ' ') 
    .replace(/\s+/g, ' ') 
    .replace(/\\"/g, '"') 
    .trim();
}
export async function GetWhyChooseUs(locale: string): Promise<WhyChooseUsTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/whyChooseUs?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: WhyChooseUsResponse = await response.json();

    const translations = data
      .map((item) => {
        const translation = item.translations.find((t) => t.languages_code === lang);
        if (!translation) {
          console.warn(`No translation found for language: ${lang} in whyChooseUs ID: ${item.id}`);
          return null;
        }
        try {
          return {
            ...translation,
            features:
              typeof translation.features === "string"
                ? JSON.parse(cleanJsonString(translation.features))
                : translation.features,
            illustration:
              typeof translation.illustration === "string"
                ? JSON.parse(cleanJsonString(translation.illustration))
                : translation.illustration,
          };
        } catch (err) {
          console.warn(`Failed to parse translation for whyChooseUs_id ${item.id}:`, err);
          return null;
        }
      })
      .filter((t): t is WhyChooseUsTranslation => t !== null);

    return translations.length > 0 ? translations : undefined;
  } catch (error) {
    console.error("Error fetching why choose us data:", error);
    return undefined;
  }
}