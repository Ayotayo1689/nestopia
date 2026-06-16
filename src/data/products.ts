import BlackJacket from "../asset/black.jpg";
import BlueJacket from "../asset/blue.jpg";
import GreyJacket from "../asset/grey.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  status: "in-stock" | "sold-out";
  front: string;
  back: string;
  sizes: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "HERO ARMLESS TEE - WHITE",
    price: 240000,
    status: "in-stock",
    front:
      "https://img.freepik.com/free-photo/zipper-fashion-casual-clothing-background_1203-6429.jpg",
    back: "https://img.freepik.com/free-photo/zipper-fashion-casual-clothing-background_1203-6429.jpg",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: 2,
    name: "HERO ARMLESS TEE - BLACK",
    price: 240000,
    status: "in-stock",
    front: BlackJacket,
    back: BlackJacket,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: 3,
    name: "SOUTIE VARSITY JACKET - WHITE",
    price: 720000,
    status: "in-stock",
    front: BlueJacket,
    back: BlueJacket,
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: 4,
    name: "SOUTIE VARSITY TRACKSUIT - BLACK",
    price: 720000,
    status: "sold-out",
    front: GreyJacket,
    back: GreyJacket,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "SOUTIE BROWN CAMO SHORTS",
    price: 320000,
    status: "in-stock",
    front:
      "https://img.freepik.com/free-photo/zipper-fashion-casual-clothing-background_1203-6429.jpg",
    back: "https://img.freepik.com/free-photo/zipper-fashion-casual-clothing-background_1203-6429.jpg",
    sizes: ["S", "M", "L", "XL"],
  },
];
