import { SupportContactTranslation, SupportContactResponse } from "@/types/directus/contact/supportContact";

export async function GetSupportContact(locale: string): Promise<SupportContactTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/support_contact?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: SupportContactResponse = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No support contact data found");
    }

    const translations = data
      .map((section) => section.translations.find((t) => t.languages_code === lang))
      .filter((translation): translation is SupportContactTranslation => !!translation);

    if (translations.length === 0) {
      throw new Error(`No translations found for language: ${lang}`);
    }

    return translations;
  } catch (error) {
    console.error("Error fetching support contact data:", error);
    return undefined;
  }
}