export interface MainProduct {
  id: string;
  name: string;
  images: Image[];
  availableForSale: boolean;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  handle: string;
  productType: string;
  title: string;
  vendor: string;
}

export interface Image {
  src: string;
  altText: string;
}
