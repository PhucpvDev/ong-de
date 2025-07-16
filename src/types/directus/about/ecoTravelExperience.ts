
export interface EcoTravelExperienceTranslation {
  id: number;
  ecoTravel_experience_id: number;
  languages_code: string;
  name_category: string;
  description: string;
  image_category: string;
  name_review: string | null;
  avatar: string | null;
  review: string | null;
  rating: string | null;
}

export interface EcoTravelExperience {
  id: number;
  translations: EcoTravelExperienceTranslation[];
}

export interface EcoTravelExperienceResponse {
  data: EcoTravelExperience[];
}