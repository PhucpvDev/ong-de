export interface Price {
  price: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Package {
  id: string;
  title: string;
  main_image?: string;
  images?: string[];
  categories: Category[];
  duration?: string;
  summary: string;
  base_prices: Price[];
  capacity_prices: Price[];
  is_featured?: boolean;
  min_quantity: number;
  conditions?: string;
}

export interface PackageTourItemProps {
  data: Package;
  onSelect?: (data: Package) => void;
}

export interface ServiceCarouselProps {
  data: Package[];
  onPackageSelect?: (data: Package) => void;
}