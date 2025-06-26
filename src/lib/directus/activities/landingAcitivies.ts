import { LandingActivitiesTranslation, LandingActivities, LandingActivitiesResponse } from "@/types/directus/activities/landingAcitivies";

export async function GetLandingActivities(locale: string): Promise<LandingActivitiesTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) {
      throw new Error("Directus URL is not defined");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/landingActivities?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: LandingActivitiesResponse = await response.json();

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid API response format");
    }

    const translations = data.map((activity) => {
      const translation = activity.translations.find((t) => t.languages_code === lang);
      if (!translation) {
        throw new Error(`No translation found for language: ${lang} in activity ID: ${activity.id}`);
      }
      return translation;
    });

    return translations;
  } catch (error) {
    console.error("Error fetching landing activities data:", error);
    return undefined;
  }
}

