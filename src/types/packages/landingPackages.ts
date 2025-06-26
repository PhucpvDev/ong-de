export interface LandingPackagesTranslation {
  id: number;
  landingPackages_id: number;
  languages_code: string;
  title: string;
  content: string;
  background_color: string;
  images: string;
  image_position: string[];
}

export interface LandingPackages {
  id: number;
  translations: LandingPackagesTranslation[];
}

export interface LandingPackagesResponse {
  data: LandingPackages[];
}