export interface LandingTicketsTranslation {
  id: number;
  landingTickets_id: number;
  languages_code: string;
  title: string;
  content: string;
  background_color: string;
  images: string;
  image_position: string[];
}

export interface LandingTickets {
  id: number;
  translations: LandingTicketsTranslation[];
}

export interface LandingTicketsResponse {
  data: LandingTickets[];
}
