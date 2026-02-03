export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "MNYB Signature Tee",
    price: 45,
    image: "/shirt1.jpg",
    category: "T-Shirts",
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
    name: "Downtown Snapback",
    price: 35,
    image: "/shirt3.jpg",
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
