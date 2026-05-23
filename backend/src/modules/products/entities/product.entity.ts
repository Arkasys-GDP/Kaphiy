import { Category } from "src/modules/categories/entities/category.entity";
import { Ingredient } from "src/modules/ingredients/entities/ingredient.entity";

export class ProductIngredient {
    product: Product;
    ingredient: Ingredient;
    isOptional: boolean;
}

export class Product {
  id: number;
  legacyId: number | null;
  category: Category;
  name: string;
  aiDescription: string | null;
  price: number;
  isAvailable: boolean;
  ingredients: ProductIngredient[];
}
