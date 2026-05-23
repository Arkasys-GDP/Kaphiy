"use client"

import { useMemo, useState } from "react"
import { Pencil, Trash2, Search, Plus, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { ApiError } from "@/src/shared/api/fetcher"
import { useCategoriesQuery } from "@/src/features/categories/hooks/useCategories"
import {
  useProductsQuery,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../hooks/useProducts"
import { ProductForm } from "./ProductForm"
import type { Product } from "../types"
import type { ProductInput } from "../lib/schema"

const PRICE_FORMATTER = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
})

export function ProductsTable() {
  const productsQuery = useProductsQuery()
  const categoriesQuery = useCategoriesQuery()
  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct()
  const deleteMutation = useDeleteProduct()

  const [search, setSearch] = useState("")
  const [createOpen, setCreateOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null)

  const categoryName = useMemo(() => {
    const map = new Map<number, string>()
    categoriesQuery.data?.forEach((c) => map.set(c.id, c.name))
    return (id: number) => map.get(id) ?? `#${id}`
  }, [categoriesQuery.data])

  const filtered = useMemo(() => {
    if (!productsQuery.data) return []
    const q = search.trim().toLowerCase()
    if (!q) return productsQuery.data
    return productsQuery.data.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        categoryName(p.categoryId).toLowerCase().includes(q)
    )
  }, [productsQuery.data, search, categoryName])

  async function handleCreate(values: ProductInput) {
    try {
      await createMutation.mutateAsync(values)
      toast.success(`Producto "${values.name}" creado`)
      setCreateOpen(false)
    } catch (err) {
      toast.error(formatError(err))
    }
  }

  async function handleUpdate(values: ProductInput) {
    if (!editing) return
    try {
      await updateMutation.mutateAsync({ id: editing.id, input: values })
      toast.success(`Producto "${values.name}" actualizado`)
      setEditing(null)
    } catch (err) {
      toast.error(formatError(err))
    }
  }

  async function handleDelete() {
    if (!pendingDelete) return
    try {
      await deleteMutation.mutateAsync(pendingDelete.id)
      toast.success(`Producto "${pendingDelete.name}" eliminado`)
      setPendingDelete(null)
    } catch (err) {
      toast.error(formatError(err))
    }
  }

  async function toggleAvailability(p: Product) {
    try {
      await updateMutation.mutateAsync({
        id: p.id,
        input: { isAvailable: !p.isAvailable },
      })
      toast.success(
        `${p.name} ${!p.isAvailable ? "marcado disponible" : "marcado agotado"}`
      )
    } catch (err) {
      toast.error(formatError(err))
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--muted-foreground)]"
            aria-hidden
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto o categoría…"
            className="pl-9"
            aria-label="Buscar producto"
          />
        </div>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" aria-hidden />
              Nuevo producto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nuevo producto</DialogTitle>
              <DialogDescription>
                Define el producto, su categoría, precio e ingredientes.
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              onSubmit={handleCreate}
              onCancel={() => setCreateOpen(false)}
              submitting={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead>Alérgenos</TableHead>
              <TableHead className="text-center">Disponible</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsQuery.isLoading && (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={7}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}

            {productsQuery.isError && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-sm text-[var(--sem-alert)]"
                >
                  Error al cargar productos.{" "}
                  <button
                    onClick={() => productsQuery.refetch()}
                    className="underline"
                  >
                    Reintentar
                  </button>
                </TableCell>
              </TableRow>
            )}

            {!productsQuery.isLoading &&
              !productsQuery.isError &&
              filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-8 text-center text-sm text-[var(--muted-foreground)]"
                  >
                    {search
                      ? "Sin coincidencias"
                      : "Aún no hay productos. Crea el primero."}
                  </TableCell>
                </TableRow>
              )}

            {filtered.map((p) => {
              const allergens =
                p.productIngredients
                  ?.filter((pi) => pi.ingredient?.isAllergen)
                  ?.map((pi) => pi.ingredient!.name) ?? []
              return (
                <TableRow key={p.id}>
                  <TableCell>
                    {p.imageUrl ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-md border border-[var(--border)] bg-zinc-950/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)] text-lg">
                        ☕
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">
                    {categoryName(p.categoryId)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {PRICE_FORMATTER.format(Number(p.price))}
                  </TableCell>
                  <TableCell>
                    {allergens.length === 0 ? (
                      <span className="text-xs text-[var(--muted-foreground)]">
                        —
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {allergens.slice(0, 2).map((a) => (
                          <Badge
                            key={a}
                            variant="destructive"
                            className="gap-1 text-[10px]"
                          >
                            <AlertTriangle className="size-3" aria-hidden />
                            {a}
                          </Badge>
                        ))}
                        {allergens.length > 2 && (
                          <span className="text-[10px] text-[var(--muted-foreground)]">
                            +{allergens.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={p.isAvailable}
                      onCheckedChange={() => toggleAvailability(p)}
                      disabled={updateMutation.isPending}
                      aria-label={`${p.isAvailable ? "Marcar agotado" : "Marcar disponible"} ${p.name}`}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Editar ${p.name}`}
                        onClick={() => setEditing(p)}
                      >
                        <Pencil className="size-4" aria-hidden />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Eliminar ${p.name}`}
                        onClick={() => setPendingDelete(p)}
                        className="text-[var(--sem-alert)] hover:text-[var(--sem-alert)]"
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Edit dialog */}
      <Dialog
        open={!!editing}
        onOpenChange={(open) => !open && setEditing(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar producto</DialogTitle>
            <DialogDescription>
              Cambia los datos del producto. La actualización se aplica de
              inmediato al menú.
            </DialogDescription>
          </DialogHeader>
          {editing && (
            <ProductForm
              defaultValues={editing}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(null)}
              submitting={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Vas a eliminar <strong>{pendingDelete?.name}</strong>. Si tiene
              órdenes vinculadas la operación fallará. Considera marcarlo como
              no disponible en lugar de eliminar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-[var(--sem-alert)] text-white hover:opacity-90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function formatError(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 401) return "Sesión expirada — vuelve a iniciar sesión"
    if (err.status === 409) return "Conflicto: el producto está en uso"
    return err.message || "Error del servidor"
  }
  return err instanceof Error ? err.message : "Error desconocido"
}
