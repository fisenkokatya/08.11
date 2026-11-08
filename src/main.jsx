import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SearchProducts } from "./components/SearchProducts";
import { PaginationProducts } from "./components/PaginationProducts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          padding: "20px",
          fontFamily: "sans-serif",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1>Приложение товаров (DummyJSON + React Query)</h1>
        <SearchProducts />
        <PaginationProducts />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
