import { z } from "zod";

export const productIngredientLinkSchema = z.object({
  ingredientId: z.number().int().positive(),
  isOptional: z.boolean(),
});

export const productSchema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(255),
  categoryId: z.number().int().positive("Selecciona una categoría"),
  price: z
    .number({ message: "Precio debe ser un número" })
    .positive("Precio debe ser mayor a 0")
    .max(9999.99, "Precio fuera de rango"),
  aiDescription: z.string().max(1000).optional().or(z.literal("")),
  isAvailable: z.boolean(),
  imageUrl: z.string().url("Debe ser una URL válida").max(2048).optional().or(z.literal("")),
  ingredients: z.array(productIngredientLinkSchema),
});

export type ProductInput = z.infer<typeof productSchema>;
