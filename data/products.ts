export type Category =
  | "ALL"
  | "VEGETABLES"
  | "MEATS"
  | "BEVERAGES"
  | "FRUITS"
  | "SNACKS"
  | "BREADS";

export type ProductImageKey =
  | "broccoli"
  | "carrot"
  | "spinach"
  | "salmon"
  | "chicken"
  | "beef"
  | "orange_juice"
  | "apple_cider"
  | "water"
  | "banana"
  | "strawberry"
  | "apple"
  | "chips"
  | "chocolate"
  | "granola"
  | "bread"
  | "wheat_bread"
  | "croissant";

export interface Product {
  id: string;
  name: string;
  pricePerKg: number;
  promoPrice: string;
  discount: number;
  imageKey: ProductImageKey;
  finalPrice: number;
  category: Exclude<Category, "ALL">;
}

export interface CartItem extends Product {
  quantity: number;
}

export const categories: { key: Category; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "VEGETABLES", label: "Vegetables" },
  { key: "MEATS", label: "Meats" },
  { key: "BEVERAGES", label: "Beverages" },
  { key: "FRUITS", label: "Fruits" },
  { key: "SNACKS", label: "Snacks" },
  { key: "BREADS", label: "Breads" },
];

export const productImages = {
  broccoli: require("../assets/images/broccoli.png"),
  carrot: require("../assets/images/carrot.png"),
  spinach: require("../assets/images/spinach.png"),
  salmon: require("../assets/images/salmon.png"),
  chicken: require("../assets/images/chicken.png"),
  beef: require("../assets/images/beef.png"),
  orange_juice: require("../assets/images/orange_juice.png"),
  apple_cider: require("../assets/images/apple_cider.png"),
  water: require("../assets/images/water.png"),
  banana: require("../assets/images/banana.png"),
  strawberry: require("../assets/images/strawberry.png"),
  apple: require("../assets/images/apple.png"),
  chips: require("../assets/images/chips.png"),
  chocolate: require("../assets/images/chocolate.png"),
  granola: require("../assets/images/granola.png"),
  bread: require("../assets/images/bread.png"),
  wheat_bread: require("../assets/images/wheat_bread.png"),
  croissant: require("../assets/images/croissant.png"),
} as const;

export const products: Product[] = [
  {
    id: "broccoli",
    name: "Broccoli",
    pricePerKg: 4.5,
    promoPrice: "$8/2kg",
    discount: 10,
    imageKey: "broccoli",
    finalPrice: 8.0,
    category: "VEGETABLES",
  },
  {
    id: "carrot",
    name: "Carrot",
    pricePerKg: 3.0,
    promoPrice: "$5/2kg",
    discount: 5,
    imageKey: "carrot",
    finalPrice: 5.0,
    category: "VEGETABLES",
  },
  {
    id: "spinach",
    name: "Spinach",
    pricePerKg: 5.0,
    promoPrice: "$5/1kg",
    discount: 15,
    imageKey: "spinach",
    finalPrice: 5.0,
    category: "VEGETABLES",
  },

  {
    id: "salmon",
    name: "Salmon Fillet",
    pricePerKg: 9.5,
    promoPrice: "$18/2kg",
    discount: 20,
    imageKey: "salmon",
    finalPrice: 18.0,
    category: "MEATS",
  },
  {
    id: "chicken",
    name: "Chicken Breast",
    pricePerKg: 7.0,
    promoPrice: "$6.5/1kg",
    discount: 10,
    imageKey: "chicken",
    finalPrice: 6.5,
    category: "MEATS",
  },
  {
    id: "beef",
    name: "Beef Steak",
    pricePerKg: 12.0,
    promoPrice: "$22/2kg",
    discount: 25,
    imageKey: "beef",
    finalPrice: 22.0,
    category: "MEATS",
  },

  {
    id: "orange_juice",
    name: "Orange Juice",
    pricePerKg: 3.5,
    promoPrice: "$6/2L",
    discount: 5,
    imageKey: "orange_juice",
    finalPrice: 6.0,
    category: "BEVERAGES",
  },
  {
    id: "apple_cider",
    name: "Apple Cider",
    pricePerKg: 4.0,
    promoPrice: "$4/1L",
    discount: 8,
    imageKey: "apple_cider",
    finalPrice: 4.0,
    category: "BEVERAGES",
  },
  {
    id: "water",
    name: "Water bottle",
    pricePerKg: 2.5,
    promoPrice: "$4/2L",
    discount: 6,
    imageKey: "water",
    finalPrice: 4.0,
    category: "BEVERAGES",
  },

  {
    id: "banana",
    name: "Banana",
    pricePerKg: 2.0,
    promoPrice: "$3/2kg",
    discount: 12,
    imageKey: "banana",
    finalPrice: 3.0,
    category: "FRUITS",
  },
  {
    id: "strawberry",
    name: "Strawberry",
    pricePerKg: 6.0,
    promoPrice: "$6/1kg",
    discount: 18,
    imageKey: "strawberry",
    finalPrice: 6.0,
    category: "FRUITS",
  },
  {
    id: "apple",
    name: "Apple",
    pricePerKg: 3.5,
    promoPrice: "$6/2kg",
    discount: 10,
    imageKey: "apple",
    finalPrice: 6.0,
    category: "FRUITS",
  },

  {
    id: "chips",
    name: "Potato Chips",
    pricePerKg: 2.5,
    promoPrice: "$2.5/1bag",
    discount: 7,
    imageKey: "chips",
    finalPrice: 2.5,
    category: "SNACKS",
  },
  {
    id: "chocolate",
    name: "Chocolate Bar",
    pricePerKg: 1.5,
    promoPrice: "$2.5/2units",
    discount: 5,
    imageKey: "chocolate",
    finalPrice: 2.5,
    category: "SNACKS",
  },
  {
    id: "granola",
    name: "Granola Bar",
    pricePerKg: 2.0,
    promoPrice: "$3/2units",
    discount: 10,
    imageKey: "granola",
    finalPrice: 3.0,
    category: "SNACKS",
  },

  {
    id: "bread",
    name: "Baguette Bread",
    pricePerKg: 3.0,
    promoPrice: "$5/2kg",
    discount: 10,
    imageKey: "bread",
    finalPrice: 5.0,
    category: "BREADS",
  },
  {
    id: "wheat_bread",
    name: "Whole Wheat Bread",
    pricePerKg: 3.5,
    promoPrice: "$7/2kg",
    discount: 12,
    imageKey: "wheat_bread",
    finalPrice: 7.0,
    category: "BREADS",
  },
  {
    id: "croissant",
    name: "Croissant",
    pricePerKg: 4.0,
    promoPrice: "$4/1kg",
    discount: 15,
    imageKey: "croissant",
    finalPrice: 4.0,
    category: "BREADS",
  },
];
