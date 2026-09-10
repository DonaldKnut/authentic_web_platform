"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Table } from "@/components/ui/Overlay";
import { useToast } from "@/components/ui/Toast";

type Product = { id: string; name: string };
type Batch = { id: string; lotNumber: string; product: { name: string } };
type Unit = { authenticId: string; serial: string; status: string; product: { name: string } };

export default function IdentitiesPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [issued, setIssued] = useState<Array<{ authenticId: string; serial: string }>>([]);
  const [qr, setQr] = useState<string | null>(null);

  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await fetch("/api/v1/products").then((r) => r.json())).products as Product[],
  });
  const units = useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const json = await fetch("/api/v1/units").then((r) => r.json());
      if (json.error) throw new Error(json.error);
      return json as { units: Unit[]; batches: Batch[] };
    },
  });

  async function issue(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/v1/serials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: form.get("productId"),
        batchId: form.get("batchId"),
        count: Number(form.get("count") || 1),
        withSecurityCode: form.get("security") === "on",
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      toast.push(json.error ?? "Could not issue identities.", "error");
      return;
    }
    setIssued(json.units ?? []);
    toast.push("Identities issued.");
    queryClient.invalidateQueries({ queryKey: ["units"] });
  }

  async function showQr(code: string) {
    const json = await fetch(`/api/v1/qr?code=${encodeURIComponent(code)}`).then((r) => r.json());
    setQr(json.dataUrl);
  }

  return (
    <div>
      <h1 className="display text-4xl">Product identities</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Serialization is the core of AUTHENTIC. Each unit receives a unique ID and optional security code.
      </p>
      <form onSubmit={issue} className="mt-8 grid gap-3 rounded-2xl border border-line bg-elev p-6 md:grid-cols-2">
        <Select name="productId" label="Product">
          {(products.data ?? []).map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Select>
        <Select name="batchId" label="Batch">
          {(units.data?.batches ?? []).map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.product.name} · {batch.lotNumber}
            </option>
          ))}
        </Select>
        <Input name="count" label="Count" type="number" defaultValue={5} />
        <label className="flex items-end gap-2 pb-2 text-sm text-muted">
          <input name="security" type="checkbox" /> Scratch-off security codes
        </label>
        <Button type="submit">Generate identities</Button>
      </form>
      {issued.length > 0 ? (
        <section className="mt-8 rounded-2xl border border-line bg-elev p-6">
          <h2 className="font-semibold">Just issued</h2>
          {issued.map((unit) => (
            <div key={unit.authenticId} className="mt-3 flex items-center justify-between font-mono text-sm">
              <span>{unit.authenticId}</span>
              <button type="button" onClick={() => showQr(unit.authenticId)} className="text-blue">
                QR
              </button>
            </div>
          ))}
        </section>
      ) : null}
      {qr ? (
        <div className="mt-6 max-w-xs rounded-2xl border border-line bg-elev p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr} alt="Product identity QR code" />
        </div>
      ) : null}
      <div className="mt-8">
        <Table headers={["Product", "Serial", "Identity", "Status"]}>
          {(units.data?.units ?? []).slice(0, 40).map((unit) => (
            <tr key={unit.authenticId}>
              <td className="px-4 py-3">{unit.product.name}</td>
              <td className="px-4 py-3 font-mono text-sm">{unit.serial}</td>
              <td className="px-4 py-3 font-mono text-xs">{unit.authenticId}</td>
              <td className="px-4 py-3">
                <StatusBadge status={unit.status} />
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
