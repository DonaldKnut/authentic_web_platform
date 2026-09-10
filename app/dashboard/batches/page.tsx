"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Table } from "@/components/ui/Overlay";
import { useToast } from "@/components/ui/Toast";

type Product = { id: string; name: string };
type Batch = { id: string; lotNumber: string; productId: string; product: { name: string } };

export default function BatchesPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const json = await fetch("/api/v1/products").then((r) => r.json());
      return (json.products ?? []) as Product[];
    },
  });
  const units = useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const json = await fetch("/api/v1/units").then((r) => r.json());
      if (json.error) throw new Error(json.error);
      return json as { batches: Batch[] };
    },
  });

  async function createBatch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/v1/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: form.get("productId"),
        lotNumber: form.get("lotNumber"),
        manufacturedAt: form.get("manufacturedAt"),
        expiresAt: form.get("expiresAt") || undefined,
        quantity: Number(form.get("quantity")),
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      toast.push(json.error ?? "Could not create batch.", "error");
      return;
    }
    toast.push("Batch created.");
    queryClient.invalidateQueries({ queryKey: ["units"] });
  }

  return (
    <div>
      <h1 className="display text-4xl">Batches</h1>
      <p className="mt-2 text-muted">Lots connected to product identities.</p>
      <form onSubmit={createBatch} className="mt-8 grid gap-3 rounded-2xl border border-line bg-elev p-6 md:grid-cols-2">
        <Select name="productId" label="Product" required>
          {(products.data ?? []).map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Select>
        <Input name="lotNumber" label="Lot number" required />
        <Input name="manufacturedAt" label="Manufactured" type="date" required />
        <Input name="expiresAt" label="Expires" type="date" />
        <Input name="quantity" label="Quantity" type="number" defaultValue={100} />
        <div className="flex items-end">
          <Button type="submit">Save batch</Button>
        </div>
      </form>
      <div className="mt-8">
        <Table headers={["Product", "Lot", "Batch ID"]}>
          {(units.data?.batches ?? []).map((batch) => (
            <tr key={batch.id}>
              <td className="px-4 py-3">{batch.product.name}</td>
              <td className="px-4 py-3 font-mono text-sm">{batch.lotNumber}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted">{batch.id}</td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
