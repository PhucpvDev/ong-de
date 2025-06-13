export interface TicketBannerTranslation {
  id: number;
  ticketBanner_id: number;
  languages_code: string;
  location: string;
  title: string;
  highlight_title: string;
  description: string;
  features_1: string;
  features_2: string;
  images: string;
}

export interface TicketBanner {
  id: number;
  translations: TicketBannerTranslation[];
}

export interface TicketBannerResponse {
  data: TicketBanner;
}