export interface Variant {
  id: number;
  featuredImage: string;
  regularPrice: number;
  sellPrice: number;
  stock: number;
  status: "DRAFT" | "ACTIVE" | "INACTIVE";
  unitValue: number;
}

export interface Product {
  id: number;
  name: string;
  category: { name: string };
  unit: { name: string; abbr: string };
  ProductVariant: Variant[];
}
