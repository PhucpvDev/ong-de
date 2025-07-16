export interface StayInSectionTranslation {
  id: number;
  stayIn_section_id: number;
  languages_code: string;
  title: string;
  button_text: string;
  bg_button: string;
  button_url: string;
}

export interface StayInSection {
  id: number;
  translations: StayInSectionTranslation[];
}

export interface StayInSectionResponse {
  data: StayInSection[];
}