"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { hydrateTableIdFromParams } from "@/lib/table-session";

function Inner() {
  const params = useSearchParams();
  useEffect(() => {
    hydrateTableIdFromParams(params);
  }, [params]);
  return null;
}

/**
 * Side-effect-only component. Mount once in the root layout — reads
 * `?tableId=N` from URL on every navigation and persists to sessionStorage.
 * Wrapped in Suspense so it does not opt the whole layout out of static rendering.
 */
export function TableHydrator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
