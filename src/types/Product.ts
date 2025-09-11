export interface ProductSpec {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  number: number;
  name: string;
  category: string;
  subcategory: string;
  slug: string;
  image: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  longDescription?: string;
  specifications: ProductSpec[];
  hasDatasheet: boolean;
  datasheetUrl?: string;
  featured: boolean;
  tags: string[];
  seoTitle: string;
  metaDescription: string;
  productCode: string;
  brand: string;
  availability: string;
  priceCurrency: string;
  lastUpdated: string;
  keywords: string[];
  benefits?: string[];
  presentation?: string[];
  schemaType: string;
}

export interface ProductCategory {
  id: string;
  label: string;
  image: string;
  products: Product[];
}