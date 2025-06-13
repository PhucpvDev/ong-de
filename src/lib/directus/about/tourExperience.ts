import { TourExperienceTranslation, TourExperienceResponse } from "@/types/directus/about/tourExperience";

export async function GetTourExperiences(locale: string): Promise<TourExperienceTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/tourExperience?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: TourExperienceResponse = await response.json();

    const translations = data.map((tour) => {
      const translation = tour.translations.find((t) => t.languages_code === lang);
      if (!translation) {
        throw new Error(`No translation found for language: ${lang} in tourExperience ID: ${tour.id}`);
      }
      return translation;
    });

    return translations;
  } catch (error) {
    console.error("Error fetching tour experience data:", error);
    return undefined;
  }
}