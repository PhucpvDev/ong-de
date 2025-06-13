import { LocationInfoResponse, Translation } from '@/types/directus/home/locationInfo';

export async function LocationInfo(locale: string): Promise<Translation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/location_info?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    const locationData: LocationInfoResponse['data'] = Array.isArray(data) ? data[0] : data;

    const translation = locationData.translations.find((t: Translation) => t.languages_code === lang);

    if (!translation) {
      throw new Error(`No translation found for language: ${lang}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching location info:", error);
  }
}