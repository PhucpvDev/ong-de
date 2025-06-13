export interface TourExperienceTranslation {
  id: number;
  tourExperience_id: number;
  languages_code: string;
  title: string;
  subtitle: string;
  description: string;
  images: string;
}

export interface TourExperience {
  id: number;
  translations: TourExperienceTranslation[];
}

export interface TourExperienceResponse {
  data: TourExperience[];
}