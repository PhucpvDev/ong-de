export interface PriceType {
  name: string;
}

export interface BasePrice {
  price: number;
  price_type?: PriceType;
}

export interface Category {
  name: string;
}

export interface Ticket {
  id: string;
  name: string;
  description: string;
  base_prices?: BasePrice[];
  categories?: Category[];
}