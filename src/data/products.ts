export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "MYNY Signature Jacket",
    price: 400,
    image: "/jacket.jpg",
    images: ["/jacket.jpg", "/jacket-back.jpg"],
    category: "Jackets",
  },
  {
    id: 2,
    name: "MYNY Quarter Zip",
    price: 500,
    image: "/quarter-zip.jpg",
    images: ["/quarter-zip.jpg", "/quarter-zip-back.jpg", "/quarter-zip-detail.jpg"],
    category: "Sweaters",
  },
  {
    id: 3,
    name: "MYNY Signature Snapback",
    price: 150,
    image: "/hat.png",
    category: "Headwear",
  },
  {
    id: 4,
    name: "Fear No Garments 1/1 Tee",
    price: 2500,
    image: "/tee.jpg",
    images: ["/tee.jpg"],
    category: "T-Shirts",
  },
];
