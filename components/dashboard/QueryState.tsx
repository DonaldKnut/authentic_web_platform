import type { ReactNode } from "react";
import { BrandSpinner } from "@/components/BrandSpinner";

export function QueryState({
  isLoading,
  error,
  loadingLabel,
  empty,
  isEmpty,
  children,
}: {
  isLoading: boolean;
  error: unknown;
  loadingLabel: string;
  empty?: string;
  isEmpty?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      {isLoading ? <BrandSpinner className="mt-10" label={loadingLabel} /> : null}
      {error ? (
        <p className="mt-6 text-risk">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      ) : null}
      {children}
      {!isLoading && isEmpty && empty ? <p className="text-sm text-muted">{empty}</p> : null}
    </>
  );
}
