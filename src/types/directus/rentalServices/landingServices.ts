export interface LandingRentalServicesTranslation {
  id: number;
  landingRentalServices_id: number;
  languages_code: string;
  title: string;
  content: string;
  background_color: string;
  images: string;
  image_position: string[];
}

export interface LandingRentalServices {
  id: number;
  translations: LandingRentalServicesTranslation[];
}

export interface LandingRentalServicesResponse {
  data: LandingRentalServices[];
}