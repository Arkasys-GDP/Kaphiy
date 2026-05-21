export interface ProductIngredientLink {
  ingredientId: number;
  isOptional: boolean;
  ingredient?: {
    id: number;
    name: string;
    isAllergen: boolean;
  };
}

/** Backend Product shape (Prisma camelCase). */
export interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: string | number; // Prisma Decimal serializes to string
  aiDescription?: string | null;
  isAvailable: boolean;
  imageUrl?: string | null;
  productIngredients?: Array<{
    ingredientId: number;
    isOptional: boolean;
    ingredient?: { id: number; name: string; isAllergen: boolean };
  }>;
  category?: { id: number; name: string };
}
