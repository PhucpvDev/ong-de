export interface FeatureTranslation {
  id: number;
  features_id: number;
  languages_code: string;
  title: string;
  description: string;
  images: string;
}

export interface Feature {
  id: number;
  translations: FeatureTranslation[];
}

export interface FeatureResponse {
  data: Feature[];
}