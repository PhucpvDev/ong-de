export interface CareersBannerTranslation {
  id: number;
  careers_banner_id: number;
  languages_code: string;
  title: string;
  description: string;
  button_text: string;
  bg_button: string;
  button_url: string;
  image: string;
}

export interface CareersBanner {
  id: number;
  translations: CareersBannerTranslation[];
}

export interface CareersBannerResponse {
  data: CareersBanner[];
}