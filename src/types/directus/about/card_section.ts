export interface CardSectionTranslation {
  id: number;
  card_section_id: number;
  languages_code: string;
  title: string;
  subtitle: string;
  content: string;
  button_text: string;
  bg_button_color: string;
  button_text_color: string;
  icon: string;
}

export interface CardSection {
  id: number;
  translations: CardSectionTranslation[];
}

export interface CardSectionResponse {
  data: CardSection[];
}