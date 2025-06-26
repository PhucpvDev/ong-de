export interface LandingActivitiesTranslation {
  id: number;
  landingActivities_id: number;
  languages_code: string;
  title: string;
  content: string;
  background_color: string;
  images: string;
  image_position: string[];
}

export interface LandingActivities {
  id: number;
  translations: LandingActivitiesTranslation[];
}

export interface LandingActivitiesResponse {
  data: LandingActivities[];
}