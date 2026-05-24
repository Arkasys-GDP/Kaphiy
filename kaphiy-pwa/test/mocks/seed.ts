import type { ApiCategory, ApiProduct } from "@/lib/api";

export const MOCK_CATEGORIES: ApiCategory[] = [
  { id: 1, name: "Cafés" },
  { id: 2, name: "Pastelería" },
];

export const MOCK_PRODUCTS: ApiProduct[] = [
  {
    id: 101,
    name: "Latte de Avena",
    price: "14.50",
    aiDescription: "Latte cremoso con leche de avena",
    isAvailable: true,
    categoryId: 1,
    category: { id: 1, name: "Cafés" },
    productIngredients: [
      { id: 1, isOptional: false, ingredient: { id: 10, name: "Avena" } },
      { id: 2, isOptional: false, ingredient: { id: 11, name: "Café" } },
    ],
  },
  {
    id: 102,
    name: "Croissant",
    price: 9.9,
    aiDescription: "Hojaldrado",
    isAvailable: true,
    categoryId: 2,
    category: { id: 2, name: "Pastelería" },
    productIngredients: [
      { id: 3, isOptional: false, ingredient: { id: 12, name: "Mantequilla" } },
    ],
  },
  {
    id: 103,
    name: "Espresso Doble",
    price: "8.00",
    aiDescription: "Doble shot",
    isAvailable: false,
    categoryId: 1,
    category: { id: 1, name: "Cafés" },
    productIngredients: [],
  },
];
