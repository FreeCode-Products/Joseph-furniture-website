import { PRODUCT_IMAGE_BUCKET, supabase } from "@/lib/supabase";
import { products as staticProducts, Product } from "@/lib/products";

export type DbProduct = Product & {
  id?: string;
  isDynamic?: boolean;
  createdAt?: string;
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  category_slug: string;
  price: number;
  description: string | null;
  dimensions: string | null;
  material: string | null;
  colors: string[] | null;
  image_path: string | null;
  gallery: string[] | null;
  featured: boolean | null;
  created_at: string;
};

function rowToProduct(row: ProductRow): DbProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    categorySlug: row.category_slug,
    price: Number(row.price),
    description: row.description ?? "",
    dimensions: row.dimensions ?? "",
    material: row.material ?? "",
    colors: row.colors ?? [],
    imagePath: row.image_path ?? "",
    gallery: row.gallery ?? [],
    featured: Boolean(row.featured),
    isDynamic: true,
    createdAt: row.created_at,
  };
}

export async function fetchDbProducts(): Promise<DbProduct[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("fetchDbProducts", error);
    return [];
  }
  return (data as ProductRow[]).map(rowToProduct);
}

export async function fetchAllProducts(): Promise<DbProduct[]> {
  const dbProducts = await fetchDbProducts();
  const dbSlugs = new Set(dbProducts.map((p) => p.slug));
  const staticMerged: DbProduct[] = staticProducts
    .filter((p) => !dbSlugs.has(p.slug))
    .map((p) => ({ ...p, isDynamic: false }));
  return [...dbProducts, ...staticMerged];
}

export async function fetchProductBySlug(
  slug: string
): Promise<DbProduct | null> {
  if (!supabase) {
    const match = staticProducts.find((p) => p.slug === slug);
    return match ? { ...match, isDynamic: false } : null;
  }
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("fetchProductBySlug", error);
  }
  if (data) return rowToProduct(data as ProductRow);
  const match = staticProducts.find((p) => p.slug === slug);
  return match ? { ...match, isDynamic: false } : null;
}

export type ProductInput = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  description: string;
  dimensions: string;
  material: string;
  colors: string[];
  imagePath: string;
  gallery: string[];
  featured: boolean;
};

export async function upsertProduct(input: ProductInput, id?: string) {
  if (!supabase) throw new Error("Supabase not configured");
  const row = {
    slug: input.slug,
    name: input.name,
    category: input.category,
    category_slug: input.categorySlug,
    price: input.price,
    description: input.description,
    dimensions: input.dimensions,
    material: input.material,
    colors: input.colors,
    image_path: input.imagePath,
    gallery: input.gallery,
    featured: input.featured,
  };
  if (id) {
    const { error } = await supabase.from("products").update(row).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("products").insert(row);
    if (error) throw error;
  }
}

export async function seedStaticProducts(
  source: Product[]
): Promise<{ inserted: number; skipped: number }> {
  if (!supabase) throw new Error("Supabase not configured");
  const existing = await fetchDbProducts();
  const existingSlugs = new Set(existing.map((p) => p.slug));
  const rows = source
    .filter((p) => !existingSlugs.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      category_slug: p.categorySlug,
      price: p.price,
      description: p.description,
      dimensions: p.dimensions,
      material: p.material,
      colors: p.colors,
      image_path: p.imagePath,
      gallery: p.gallery ?? [],
      featured: p.featured,
    }));
  if (rows.length === 0) {
    return { inserted: 0, skipped: source.length };
  }
  const { error } = await supabase.from("products").insert(rows);
  if (error) throw error;
  return { inserted: rows.length, skipped: source.length - rows.length };
}

export async function deleteProduct(id: string) {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file: File): Promise<string> {
  if (!supabase) throw new Error("Supabase not configured");
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .getPublicUrl(path);
  return data.publicUrl;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type SortKey = "newest" | "price-asc" | "price-desc" | "name-asc" | "featured";

export function sortProducts(items: DbProduct[], key: SortKey): DbProduct[] {
  const copy = [...items];
  switch (key) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name-asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
      return copy.sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
    case "newest":
    default:
      return copy.sort((a, b) => {
        if (a.createdAt && b.createdAt)
          return b.createdAt.localeCompare(a.createdAt);
        if (a.createdAt) return -1;
        if (b.createdAt) return 1;
        return 0;
      });
  }
}
