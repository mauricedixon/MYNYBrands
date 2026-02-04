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
    images: ["/jacket.jpg", "/jacket-front-full.png", "/jacket-back.jpg", "/jacket-front-detail.png"],
    category: "Jackets",
  },
  {
    id: 2,
    name: "Culture First Hoodie",
    price: 85,
    image: "/shirt2.jpg",
    category: "Hoodies",
  },
  {
    id: 3,
    name: "MYNY Signature Snapback",
    price: 75,
    image: "/hat.png",
    category: "Headwear",
  },
  {
    id: 4,
    name: "Concrete Jungle LS",
    price: 55,
    image: "/shirt1.jpg",
    category: "T-Shirts",
  },
];
