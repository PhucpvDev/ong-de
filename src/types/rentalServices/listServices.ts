export interface RentalService {
  id: number;
  title: string;
  slug: string;
  images: string[];
  description: string;
  price: number;
  availability: string;
}

export interface RentalItemProps {
  data: RentalService;
}

export interface RentalCarouselProps {
  title: string;
  data: RentalService[];
}