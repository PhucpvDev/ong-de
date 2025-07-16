export interface ServiceSectionTranslation {
  id: number;
  service_section_id: number;
  languages_code: string;
  name: string;
  address: string;
  image: string;
}

export interface ServiceSection {
  id: number;
  translations: ServiceSectionTranslation[];
}

export interface ServiceSectionResponse {
  data: ServiceSection[];
}