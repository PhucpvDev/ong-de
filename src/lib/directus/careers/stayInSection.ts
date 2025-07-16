import { StayInSectionTranslation, StayInSectionResponse } from "@/types/directus/careers/stayInSection";

export async function GetStayInSection(locale: string): Promise<StayInSectionTranslation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/stayIn_section?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: StayInSectionResponse = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No stay in section data found");
    }

    const translation = data[0].translations.find((t) => t.languages_code === lang);

    if (!translation) {
      throw new Error(`No translation found for language: ${lang}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching stay in section data:", error);
    return undefined;
  }
}