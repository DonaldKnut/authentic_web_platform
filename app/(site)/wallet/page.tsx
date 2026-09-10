"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductPassport";
import { Container } from "@/components/ui/Card";

export default function WalletPage() {
  const [items, setItems] = useState<
    Array<{
      id: string;
      unit?: {
        authenticId?: string;
        serial?: string;
        product?: { name?: string; brand?: string };
      };
      identity?: {
        id?: string;
        serialNumber?: string;
        productName?: string;
        brandName?: string;
      };
    }>
  >([]);

  useEffect(() => {
    fetch("/api/v1/wallet")
      .then((res) => res.json())
      .then((json) => setItems(json.items ?? []));
  }, []);

  return (
    <Container className="py-16">
      <h1 className="display text-5xl">Product wallet</h1>
      <p className="mt-3 max-w-xl text-muted">
        A vault for physical possessions you have verified — authenticity, serial,
        and product identity in one place.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const id = item.unit?.authenticId ?? item.identity?.id ?? item.id;
          const name = item.unit?.product?.name ?? item.identity?.productName ?? "Product";
          const brand = item.unit?.product?.brand ?? item.identity?.brandName ?? "AUTHENTIC";
          const serial = item.unit?.serial ?? item.identity?.serialNumber;
          return (
            <ProductCard
              key={item.id}
              href={`/v/${encodeURIComponent(id)}`}
              brand={brand}
              name={name}
              sku={serial}
            />
          );
        })}
      </div>
    </Container>
  );
}
