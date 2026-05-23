"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, X } from "lucide-react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useAuthStore } from "@/src/features/auth/store/authSlice"
import { useCategoriesQuery } from "@/src/features/categories/hooks/useCategories"
import { useIngredientsQuery } from "@/src/features/ingredients/hooks/useIngredients"
import { productSchema, type ProductInput } from "../lib/schema"
import type { Product } from "../types"

interface Props {
  defaultValues?: Product | null
  onSubmit: (values: ProductInput) => Promise<void>
  onCancel: () => void
  submitting?: boolean
}

export function ProductForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitting,
}: Props) {
  const { data: categories = [] } = useCategoriesQuery()
  const { data: ingredients = [] } = useIngredientsQuery()
  const token = useAuthStore((s) => s.token)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/products/upload`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await res.json()
      form.setValue("imageUrl", data.url, { shouldDirty: true })
      toast.success("Imagen subida con éxito")
    } catch (error) {
      console.error(error)
      toast.error("Error al subir la imagen. Por favor, intenta de nuevo.")
    } finally {
      setUploading(false)
    }
  }

  const initialIngredients = useMemo(
    () =>
      defaultValues?.productIngredients?.map((pi) => ({
        ingredientId: pi.ingredientId,
        isOptional: pi.isOptional,
      })) ?? [],
    [defaultValues]
  )

  const form = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      categoryId: defaultValues?.categoryId ?? 0,
      price: defaultValues ? Number(defaultValues.price) : 0,
      aiDescription: defaultValues?.aiDescription ?? "",
      isAvailable: defaultValues?.isAvailable ?? true,
      imageUrl: defaultValues?.imageUrl ?? "",
      ingredients: initialIngredients,
    },
  })

  const watchedIngredients = form.watch("ingredients") ?? []
  const [pendingIngredientId, setPendingIngredientId] = useState<string>("")

  const availableIngredients = ingredients.filter(
    (ing) => !watchedIngredients.some((w) => w.ingredientId === ing.id)
  )

  function addIngredient() {
    const id = Number(pendingIngredientId)
    if (!id) return
    form.setValue(
      "ingredients",
      [...watchedIngredients, { ingredientId: id, isOptional: false }],
      { shouldDirty: true }
    )
    setPendingIngredientId("")
  }

  function removeIngredient(id: number) {
    form.setValue(
      "ingredients",
      watchedIngredients.filter((w) => w.ingredientId !== id),
      { shouldDirty: true }
    )
  }

  function toggleOptional(id: number) {
    form.setValue(
      "ingredients",
      watchedIngredients.map((w) =>
        w.ingredientId === id ? { ...w, isOptional: !w.isOptional } : w
      ),
      { shouldDirty: true }
    )
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="prod-name">Nombre</Label>
          <Input
            id="prod-name"
            {...form.register("name")}
            autoComplete="off"
            placeholder="ej. Latte de Avellana"
            aria-invalid={!!form.formState.errors.name}
          />
          {form.formState.errors.name && (
            <p role="alert" className="text-xs text-[var(--sem-alert)]">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="prod-price">Precio ($)</Label>
          <Input
            id="prod-price"
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            {...form.register("price", { valueAsNumber: true })}
            aria-invalid={!!form.formState.errors.price}
          />
          {form.formState.errors.price && (
            <p role="alert" className="text-xs text-[var(--sem-alert)]">
              {form.formState.errors.price.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="prod-category">Categoría</Label>
        <Controller
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <Select
              value={field.value ? String(field.value) : ""}
              onValueChange={(v) => field.onChange(Number(v))}
            >
              <SelectTrigger
                id="prod-category"
                aria-invalid={!!form.formState.errors.categoryId}
              >
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((c) => c.isActive)
                  .map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        />
        {form.formState.errors.categoryId && (
          <p role="alert" className="text-xs text-[var(--sem-alert)]">
            {form.formState.errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="prod-desc">Descripción IA (opcional)</Label>
        <Textarea
          id="prod-desc"
          {...form.register("aiDescription")}
          rows={2}
          placeholder="Notas para el agente IA — sabores, sugerencias…"
        />
      </div>

      {/* Sección de Imagen */}
      <div className="flex flex-col gap-1.5">
        <Label>Imagen del Producto</Label>
        <div className="flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <Controller
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <div className="flex flex-col gap-3">
                {field.value ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--border)] bg-zinc-950/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={field.value}
                      alt="Vista previa del producto"
                      className="h-full w-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                      onClick={() => field.onChange("")}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--background)] hover:border-amber-500/50 hover:bg-amber-500/5 transition-all">
                    {uploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                        <span className="text-xs text-[var(--muted-foreground)]">Subiendo imagen...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[var(--muted-foreground)]">
                        <Plus className="h-8 w-8" />
                        <span className="text-xs">Selecciona una imagen del producto</span>
                        <span className="text-[10px] text-zinc-500">PNG, JPG hasta 5MB</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </label>
                )}
                
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="prod-image-url" className="text-xs text-[var(--muted-foreground)]">
                    O ingresa la URL de la imagen directamente:
                  </Label>
                  <Input
                    id="prod-image-url"
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    disabled={uploading}
                  />
                  {form.formState.errors.imageUrl && (
                    <p role="alert" className="text-xs text-[var(--sem-alert)]">
                      {form.formState.errors.imageUrl.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
        <div>
          <Label htmlFor="prod-available" className="text-sm font-semibold">
            Disponible
          </Label>
          <p className="text-[11px] text-[var(--muted-foreground)]">
            Los productos no disponibles no aparecen en el menú del cliente
          </p>
        </div>
        <Switch
          id="prod-available"
          checked={form.watch("isAvailable")}
          onCheckedChange={(v) =>
            form.setValue("isAvailable", v, { shouldDirty: true })
          }
        />
      </div>

      {/* Ingredients editor */}
      <div className="flex flex-col gap-2">
        <Label>Ingredientes</Label>
        {watchedIngredients.length === 0 ? (
          <p className="text-[11px] text-[var(--muted-foreground)]">
            Sin ingredientes. Añade los que componen el producto.
          </p>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {watchedIngredients.map((w) => {
              const ing = ingredients.find((i) => i.id === w.ingredientId)
              return (
                <li
                  key={w.ingredientId}
                  className="flex items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate">
                      {ing?.name ?? `Ingrediente #${w.ingredientId}`}
                    </span>
                    {ing?.isAllergen && (
                      <Badge variant="destructive" className="text-[10px]">
                        Alérgeno
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                      <Switch
                        checked={w.isOptional}
                        onCheckedChange={() => toggleOptional(w.ingredientId)}
                        aria-label={`${ing?.name} opcional`}
                      />
                      Opcional
                    </label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeIngredient(w.ingredientId)}
                      aria-label={`Quitar ${ing?.name}`}
                    >
                      <X className="size-4" aria-hidden />
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        {availableIngredients.length > 0 && (
          <div className="flex gap-2">
            <Select
              value={pendingIngredientId}
              onValueChange={setPendingIngredientId}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Añadir ingrediente…" />
              </SelectTrigger>
              <SelectContent>
                {availableIngredients.map((ing) => (
                  <SelectItem key={ing.id} value={String(ing.id)}>
                    {ing.name} {ing.isAllergen && "⚠"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              onClick={addIngredient}
              disabled={!pendingIngredientId}
            >
              <Plus className="size-4" aria-hidden />
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting && (
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
          )}
          {defaultValues ? "Guardar cambios" : "Crear producto"}
        </Button>
      </div>
    </form>
  )
}
