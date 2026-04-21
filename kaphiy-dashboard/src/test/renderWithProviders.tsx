import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const [qc] = React.useState(makeQueryClient);
  return (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
}

export function renderWithProviders(ui: React.ReactElement, opts?: RenderOptions) {
  return render(ui, { wrapper: Wrapper, ...opts });
}

export function makeTestQueryClient() {
  return makeQueryClient();
}
