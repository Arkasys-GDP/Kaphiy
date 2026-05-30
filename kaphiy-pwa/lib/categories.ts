import type { ApiCategory } from "@/lib/api";

export function categoryKey(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function uniqueCategories(categories: ApiCategory[]): ApiCategory[] {
  const seen = new Set<string>();
  return categories.filter((category) => {
    const key = categoryKey(category.name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
