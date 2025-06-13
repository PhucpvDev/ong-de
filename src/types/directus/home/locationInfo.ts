export interface Translation {
  id: number;
  location_info_id: number;
  languages_code: string;
  operating_hours: string;
  address: string;
  distance: string;
  area: string;
}

export interface LocationInfoItem {
  id: number;
  translations: Translation[];
}

export interface LocationInfoResponse {
  data: LocationInfoItem;
}