export interface BannerAboutTranslation {
  id: number;
  banner_about_id: number;
  languages_code: string;
  images: string;
  title: string;
  content: string;
  intro_image: string;
}

export interface BannerAbout {
  id: number;
  translations: BannerAboutTranslation[];
}

export interface BannerAboutResponse {
  data: BannerAbout[];
}