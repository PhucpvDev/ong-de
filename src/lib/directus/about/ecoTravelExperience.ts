import axios from "axios";
import { EcoTravelExperienceTranslation, EcoTravelExperienceResponse } from "@/types/directus/about/ecoTravelExperience";

export async function GetEcoTravelExperience(locale: string): Promise<EcoTravelExperienceTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await axios.get<EcoTravelExperienceResponse>(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/ecoTravel_experience?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { data } = response.data;

    if (!data || data.length === 0) {
      throw new Error("No eco travel experience data found");
    }

    const translations = data
      .map((section) => section.translations.find((t) => t.languages_code === lang))
      .filter((translation): translation is EcoTravelExperienceTranslation => !!translation);

    if (translations.length === 0) {
      throw new Error(`No translations found for language: ${lang}`);
    }

    return translations;
  } catch (error) {
    console.error("Error fetching eco travel experience data:", error);
    return undefined;
  }
}