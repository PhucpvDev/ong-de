import axios from "axios";
import { ServiceSectionTranslation, ServiceSectionResponse } from "@/types/directus/about/serviceSection";

export async function GetServiceSection(locale: string): Promise<ServiceSectionTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await axios.get<ServiceSectionResponse>(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/service_section?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { data } = response.data;

    if (!data || data.length === 0) {
      throw new Error("No service section data found");
    }

    const translations = data
      .map((section) => section.translations.find((t) => t.languages_code === lang))
      .filter((translation): translation is ServiceSectionTranslation => !!translation);

    if (translations.length === 0) {
      throw new Error(`No translations found for language: ${lang}`);
    }

    return translations;
  } catch (error) {
    console.error("Error fetching service section data:", error);
    return undefined;
  }
}