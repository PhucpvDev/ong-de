
export interface LandingHomestayTranslation {
  id: number;
  landingHomestay_id: number;
  languages_code: string;
  title: string;
  content: string;
  background_color: string;
  images: string;
  image_position: string[];
}

export interface LandingHomestay {
  id: number;
  translations: LandingHomestayTranslation[];
}

export interface LandingHomestayResponse {
  data: LandingHomestay[];
}