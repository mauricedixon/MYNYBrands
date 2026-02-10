export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  description?: string;
  details?: string[];
  materials?: string[];
  care?: string[];
  sizes?: string[];
  limited?: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "MYNY Signature Jacket",
    price: 400,
    image: "/jacket-clean.png",
    images: ["/jacket-clean.png", "/jacket-back-clean.png"],
    category: "Jackets",
    description: "The definitive MYNY statement piece. This signature jacket features a classic work-wear silhouette reimagined with premium materials and our iconic denim patchwork back panel. Designed in New York City for those who represent the culture.",
    details: [
      "Heavyweight cotton shell with quilted lining",
      "Vintage-wash denim collar and hem accents",
      "Custom embroidered MY logo patch",
      "Patchwork NY logo back panel",
      "YKK brass zipper with custom pull",
      "Dual hand pockets and interior pocket",
    ],
    materials: ["100% Premium Cotton Shell", "Quilted Polyester Lining", "Vintage Denim Accents"],
    care: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Iron on low if needed"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "MYNY Quarter Zip",
    price: 500,
    image: "/quarter-zip-clean.png",
    images: ["/quarter-zip-clean.png", "/quarter-zip-back-clean.png"],
    category: "Sweaters",
    description: "Luxury meets streetwear in this premium sherpa fleece quarter zip. The contrast between the plush cream sherpa and sleek black nylon panels creates a bold statement. Reflective piping adds visibility and style for the night owls.",
    details: [
      "Ultra-soft sherpa fleece construction",
      "Black nylon contrast panels",
      "Reflective 3M piping details",
      "Quarter zip with custom metal pull",
      "Embroidered MY logo on chest",
      "Kangaroo pocket with hidden zip",
    ],
    materials: ["100% Polyester Sherpa Fleece", "Nylon Ripstop Panels", "3M Reflective Tape"],
    care: ["Machine wash cold inside out", "Hang dry recommended", "Do not iron directly on sherpa"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "MYNY Signature Snapback",
    price: 150,
    image: "/snapback-clean.png",
    category: "Headwear",
    description: "What goes around comes around. This signature snapback features our iconic NY logo with the tiger mascot, embodying the spirit and hustle of New York. Premium construction with a classic fit that represents the culture.",
    details: [
      "'What Goes Around Comes Around' embroidery",
      "Tiger mascot with NY logo",
      "Classic 6-panel construction",
      "Adjustable snapback closure",
      "Flat brim design",
      "Premium embroidered details",
    ],
    materials: ["Cotton Twill", "Plastic Snapback"],
    care: ["Spot clean only", "Do not machine wash", "Air dry"],
    sizes: ["One Size"],
  },
  {
    id: 4,
    name: "Fear No Garments 1/1 Tee",
    price: 2500,
    image: "/tee.jpg",
    images: ["/tee.jpg", "/tee-back.png"],
    category: "T-Shirts",
    description: "A one-of-one wearable art piece. Each Fear No Garments tee is hand-painted with original graffiti artwork featuring the 'We Made It From Nothing' motif. No two pieces are alike—this is true luxury streetwear at its finest.",
    details: [
      "Hand-painted original artwork",
      "One-of-one unique design",
      "'We Made It From Nothing' theme",
      "Multiple character illustrations",
      "Signed by the artist",
      "Includes certificate of authenticity",
    ],
    materials: ["100% Premium Cotton", "Non-toxic Fabric Paints"],
    care: ["Hand wash cold only", "Do not machine wash", "Lay flat to dry", "Do not iron on artwork"],
    sizes: ["M", "L", "XL"],
    limited: true,
  },
];

