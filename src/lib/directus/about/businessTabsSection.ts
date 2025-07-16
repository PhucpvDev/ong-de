import axios from "axios";
import { BusinessTabsTranslation, BusinessTabsResponse } from "@/types/directus/about/businessTabsSection";

export async function GetBusinessTabs(locale: string): Promise<BusinessTabsTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await axios.get<BusinessTabsResponse>(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/business_tabs?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { data } = response.data;

    if (!data || data.length === 0) {
      throw new Error("No business tabs data found");
    }

    const translations = data
      .map((section) => section.translations.find((t) => t.languages_code === lang))
      .filter((translation): translation is BusinessTabsTranslation => !!translation);

    if (translations.length === 0) {
      throw new Error(`No translations found for language: ${lang}`);
    }

    return translations;
  } catch (error) {
    console.error("Error fetching business tabs data:", error);
    return undefined;
  }
}