export interface Car {
  id: number;
  brand: string;
  model: string;
  image: string;
  year_of_production: string;
  condition: string;
  engine: string;
  extras: string[];
  description: string[];
  price: number;
  dateAdded: string;
}

export interface Spotlight {
  ids: number[];
}
