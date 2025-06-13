import { TicketBannerTranslation, TicketBannerResponse } from "@/types/directus/tickets/banner";

export async function GetTicketBanner(locale: string): Promise<TicketBannerTranslation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/ticketBanner?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: TicketBannerResponse = await response.json();

    const translation = data.translations.find((t) => t.languages_code === lang);
    if (!translation) {
      throw new Error(`No translation found for language: ${lang} in ticketBanner ID: ${data.id}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching ticket banner data:", error);
    return undefined;
  }
}