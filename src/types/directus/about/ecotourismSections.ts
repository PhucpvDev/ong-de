export interface EcotourismSectionTranslation {
  id: number;
  ecotourism_sections_id: number;
  languages_code: string;
  title: string;
  description: string;
  content: string;
  images: string;
  image_position: string[];
}

export interface EcotourismSection {
  id: number;
  translations: EcotourismSectionTranslation[];
}

export interface EcotourismSectionResponse {
  data: EcotourismSection[];
}