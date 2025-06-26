export interface LandingSectionTranslation {
  id: number;
  landing_sections_id: number;
  languages_code: string;
  title: string;
  description: string;
  button_text: string;
  background_color: string;
  button_color: string;
  bg_button_color: string;
  images: string;
  image_position: string[];
}

export interface LandingSection {
  id: number;
  translations: LandingSectionTranslation[];
}

export interface LandingSectionResponse {
  data: LandingSection[];
}