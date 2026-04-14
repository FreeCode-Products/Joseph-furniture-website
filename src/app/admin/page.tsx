"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { supabase, supabaseEnabled } from "@/lib/supabase";
import { categories, products as staticProducts } from "@/lib/products";
import {
  DbProduct,
  deleteProduct,
  fetchDbProducts,
  seedStaticProducts,
  slugify,
  upsertProduct,
  uploadProductImage,
} from "@/lib/products-db";

const emptyForm = {
  id: "" as string | undefined,
  slug: "",
  name: "",
  categorySlug: categories[0]?.slug ?? "",
  price: "",
  description: "",
  dimensions: "",
  material: "",
  colors: "",
  imagePath: "",
  gallery: [] as string[],
  featured: false,
};

type FormState = typeof emptyForm;

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [form, setForm] = useState<FormState>({ ...emptyForm });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(Boolean(data.session));
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(Boolean(session));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed]);

  async function loadProducts() {
    setLoading(true);
    const list = await fetchDbProducts();
    setProducts(list);
    setLoading(false);
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setAuthError("");
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  }

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setAuthed(false);
  }

  function resetForm() {
    setForm({ ...emptyForm });
    setMessage("");
  }

  function editProduct(p: DbProduct) {
    setForm({
      id: p.id,
      slug: p.slug,
      name: p.name,
      categorySlug: p.categorySlug,
      price: String(p.price),
      description: p.description,
      dimensions: p.dimensions,
      material: p.material,
      colors: p.colors.join(", "),
      imagePath: p.imagePath,
      gallery: p.gallery ?? [],
      featured: p.featured,
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setForm((f) => ({ ...f, imagePath: url }));
    } catch (err) {
      setMessage(`Upload failed: ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleGalleryUpload(files: FileList) {
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadProductImage(file);
        uploaded.push(url);
      }
      setForm((f) => ({ ...f, gallery: [...f.gallery, ...uploaded] }));
    } catch (err) {
      setMessage(`Upload failed: ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  }

  function removeGalleryImage(index: number) {
    setForm((f) => ({
      ...f,
      gallery: f.gallery.filter((_, i) => i !== index),
    }));
  }

  function moveGalleryImage(index: number, direction: -1 | 1) {
    setForm((f) => {
      const next = [...f.gallery];
      const target = index + direction;
      if (target < 0 || target >= next.length) return f;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...f, gallery: next };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    const cat = categories.find((c) => c.slug === form.categorySlug);
    if (!cat) {
      setMessage("Invalid category");
      return;
    }
    const price = parseFloat(form.price);
    if (Number.isNaN(price) || price < 0) {
      setMessage("Invalid price");
      return;
    }
    const slug = form.slug.trim() || slugify(form.name);
    if (!slug || !form.name) {
      setMessage("Name is required");
      return;
    }
    try {
      await upsertProduct(
        {
          slug,
          name: form.name.trim(),
          category: cat.name,
          categorySlug: cat.slug,
          price,
          description: form.description.trim(),
          dimensions: form.dimensions.trim(),
          material: form.material.trim(),
          colors: form.colors
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
          imagePath: form.imagePath.trim(),
          gallery: form.gallery.map((g) => g.trim()).filter(Boolean),
          featured: form.featured,
        },
        form.id || undefined
      );
      setMessage(form.id ? "Product updated" : "Product added");
      resetForm();
      loadProducts();
    } catch (err) {
      setMessage(`Save failed: ${(err as Error).message}`);
    }
  }

  async function handleSeed() {
    if (
      !confirm(
        `Import ${staticProducts.length} built-in products into the database? Existing slugs will be skipped.`
      )
    )
      return;
    setLoading(true);
    try {
      const { inserted, skipped } = await seedStaticProducts(staticProducts);
      setMessage(`Seeded: ${inserted} added, ${skipped} already present.`);
      await loadProducts();
    } catch (err) {
      setMessage(`Seed failed: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      setMessage(`Delete failed: ${(err as Error).message}`);
    }
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-cream pt-28 flex items-center justify-center text-charcoal/60">
        Loading…
      </div>
    );
  }

  if (!supabaseEnabled) {
    return (
      <div className="min-h-screen bg-cream pt-28 px-4 text-center">
        <h1 className="text-2xl font-heading font-bold text-charcoal">
          Supabase not configured
        </h1>
        <p className="mt-2 text-charcoal/60">
          Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in
          .env.local, then rebuild.
        </p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-sm mx-auto bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-heading font-bold text-charcoal mb-6">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-charcoal/15 rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-charcoal/15 rounded-lg px-3 py-2 text-sm"
            />
            {authError && (
              <p className="text-sm text-red-600">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-walnut text-white rounded-lg py-2 text-sm font-medium hover:bg-charcoal transition-colors"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-xs text-charcoal/50">
            Create this admin user in Supabase → Authentication → Users.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-charcoal">
            Admin · Products
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSeed}
              disabled={loading}
              className="text-sm text-walnut hover:text-charcoal disabled:opacity-50"
              title="Import built-in products into the database"
            >
              Import built-in
            </button>
            <Link
              href="/products"
              className="text-sm text-charcoal/70 hover:text-walnut"
            >
              View site →
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-charcoal/70 hover:text-walnut"
            >
              Sign out
            </button>
          </div>
        </div>

        <section className="bg-white rounded-2xl p-6 shadow-sm mb-10">
          <h2 className="text-lg font-heading font-bold text-charcoal mb-4">
            {form.id ? "Edit product" : "Add new product"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="text-sm">
              <span className="block mb-1 text-charcoal/70">Name *</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-charcoal/15 rounded-lg px-3 py-2"
              />
            </label>
            <label className="text-sm">
              <span className="block mb-1 text-charcoal/70">
                Slug (auto from name if blank)
              </span>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder={form.name ? slugify(form.name) : "my-product"}
                className="w-full border border-charcoal/15 rounded-lg px-3 py-2"
              />
            </label>
            <label className="text-sm">
              <span className="block mb-1 text-charcoal/70">Category *</span>
              <select
                value={form.categorySlug}
                onChange={(e) =>
                  setForm({ ...form, categorySlug: e.target.value })
                }
                className="w-full border border-charcoal/15 rounded-lg px-3 py-2 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="block mb-1 text-charcoal/70">Price (₹) *</span>
              <input
                type="number"
                min="0"
                step="1"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-charcoal/15 rounded-lg px-3 py-2"
              />
            </label>
            <label className="sm:col-span-2 text-sm">
              <span className="block mb-1 text-charcoal/70">Description</span>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full border border-charcoal/15 rounded-lg px-3 py-2"
              />
            </label>
            <label className="text-sm">
              <span className="block mb-1 text-charcoal/70">Dimensions</span>
              <input
                value={form.dimensions}
                onChange={(e) =>
                  setForm({ ...form, dimensions: e.target.value })
                }
                placeholder='e.g. 78" L x 62" W x 42" H'
                className="w-full border border-charcoal/15 rounded-lg px-3 py-2"
              />
            </label>
            <label className="text-sm">
              <span className="block mb-1 text-charcoal/70">Material</span>
              <input
                value={form.material}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
                className="w-full border border-charcoal/15 rounded-lg px-3 py-2"
              />
            </label>
            <label className="sm:col-span-2 text-sm">
              <span className="block mb-1 text-charcoal/70">
                Colors (comma separated)
              </span>
              <input
                value={form.colors}
                onChange={(e) => setForm({ ...form, colors: e.target.value })}
                placeholder="Natural Teak, Walnut Brown"
                className="w-full border border-charcoal/15 rounded-lg px-3 py-2"
              />
            </label>
            <label className="sm:col-span-2 text-sm">
              <span className="block mb-1 text-charcoal/70">Image</span>
              <div className="flex flex-col sm:flex-row gap-3 items-start">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleImageUpload(f);
                  }}
                  className="text-sm"
                />
                <input
                  value={form.imagePath}
                  onChange={(e) =>
                    setForm({ ...form, imagePath: e.target.value })
                  }
                  placeholder="or paste URL"
                  className="flex-1 border border-charcoal/15 rounded-lg px-3 py-2"
                />
              </div>
              {uploading && (
                <p className="text-xs text-charcoal/50 mt-1">Uploading…</p>
              )}
              {form.imagePath && (
                <div className="relative mt-3 h-32 w-32 rounded-lg overflow-hidden border border-charcoal/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.imagePath}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </label>
            <label className="sm:col-span-2 text-sm">
              <span className="block mb-1 text-charcoal/70">
                Gallery (additional photos)
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length) handleGalleryUpload(files);
                  e.target.value = "";
                }}
                className="text-sm"
              />
              {form.gallery.length > 0 && (
                <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {form.gallery.map((url, i) => (
                    <div
                      key={`${url}-${i}`}
                      className="relative group rounded-lg overflow-hidden border border-charcoal/10 aspect-square"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`gallery ${i + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveGalleryImage(i, -1)}
                          disabled={i === 0}
                          className="bg-white/90 text-charcoal rounded px-1.5 py-0.5 text-xs disabled:opacity-40"
                          aria-label="Move left"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() => moveGalleryImage(i, 1)}
                          disabled={i === form.gallery.length - 1}
                          className="bg-white/90 text-charcoal rounded px-1.5 py-0.5 text-xs disabled:opacity-40"
                          aria-label="Move right"
                        >
                          →
                        </button>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          className="bg-red-600 text-white rounded px-1.5 py-0.5 text-xs"
                          aria-label="Remove"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured
            </label>
            <div className="sm:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={uploading}
                className="bg-walnut text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-charcoal transition-colors disabled:opacity-50"
              >
                {form.id ? "Update product" : "Add product"}
              </button>
              {form.id && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm text-charcoal/60 hover:text-walnut"
                >
                  Cancel edit
                </button>
              )}
              {message && (
                <span className="text-sm text-charcoal/70">{message}</span>
              )}
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-lg font-heading font-bold text-charcoal mb-4">
            Your products ({products.length})
          </h2>
          {loading ? (
            <p className="text-charcoal/50">Loading…</p>
          ) : products.length === 0 ? (
            <p className="text-charcoal/50 text-sm">
              No products yet. The static seed items still show on the site;
              anything you add here will appear alongside them.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl overflow-hidden border border-charcoal/10"
                >
                  <div className="relative h-36 bg-sand/20">
                    {p.imagePath ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.imagePath}
                        alt={p.name}
                        className="object-cover w-full h-full"
                      />
                    ) : null}
                  </div>
                  <div className="p-3">
                    <p className="text-xs uppercase tracking-wider text-charcoal/40">
                      {p.category}
                    </p>
                    <h3 className="text-sm font-semibold text-charcoal truncate">
                      {p.name}
                    </h3>
                    <p className="text-xs text-charcoal/60">₹{p.price}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => editProduct(p)}
                        className="text-xs text-walnut hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => p.id && handleDelete(p.id)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
