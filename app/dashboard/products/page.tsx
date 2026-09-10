"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ProductCard } from "@/components/ProductPassport";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Overlay";
import { useToast } from "@/components/ui/Toast";

type Product = {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  _count: { units: number; batches: number };
};

export default function DashboardProductsPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/v1/products");
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Could not load products.");
      return json.products as Product[];
    },
  });

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        brand: form.get("brand"),
        sku: form.get("sku"),
        gtin: form.get("gtin"),
        category: form.get("category"),
        description: form.get("description"),
        countryOfManufacture: form.get("country") || "NG",
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      toast.push(json.error ?? "Could not register product.", "error");
      return;
    }
    setOpen(false);
    toast.push("Product registered.");
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="display mt-3 text-4xl">Products</h1>
          <p className="mt-2 text-muted">Register SKUs, then issue serialized identities.</p>
        </div>
        <Button onClick={() => setOpen(true)}>Register product</Button>
      </div>
      {isLoading ? <p className="mt-8 text-muted">Loading products…</p> : null}
      {error ? <p className="mt-8 text-risk">{(error as Error).message}</p> : null}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {(data ?? []).map((product) => (
          <ProductCard
            key={product.id}
            brand={product.brand}
            name={product.name}
            sku={product.sku}
            meta={`${product._count.units} identities · ${product._count.batches} batches`}
          />
        ))}
      </div>
      <Modal open={open} title="Register product" onClose={() => setOpen(false)}>
        <form onSubmit={create} className="grid gap-3">
          <Input name="name" label="Product name" required />
          <Input name="brand" label="Brand" required />
          <Input name="sku" label="SKU" required />
          <Input name="gtin" label="GTIN" />
          <Input name="category" label="Category" required />
          <Input name="country" label="Country of manufacture" defaultValue="NG" />
          <Textarea name="description" label="Description" />
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
