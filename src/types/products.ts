export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  pdf: string;
}

export interface ProductCategory {
  id: string;
  label: string;
  image: string;
  products: Product[];
}
