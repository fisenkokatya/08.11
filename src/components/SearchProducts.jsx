import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../api/queries";

export function SearchProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const isSearchEnabled = searchQuery.trim().length >= 3;

  const {
    data: searchData,
    isFetching: isSearchFetching,
    isError: isSearchError,
    error: searchError,
  } = useQuery({
    queryKey: ["productsSearch", { query: searchQuery }],
    queryFn: searchProducts,
    enabled: isSearchEnabled,
    staleTime: 1000 * 30,
  });

  return (
    <div
      style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Поиск товаров (enabled)</h2>
      <input
        type="text"
        placeholder="Поиск (от 3 символов)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
      />
      <div style={{ height: "20px", marginTop: "5px" }}>
        {!isSearchEnabled && <span>Введите не менее 3 символов</span>}
        {isSearchEnabled && isSearchFetching && <span>Загрузка...</span>}
      </div>

      {isSearchError && <p style={{ color: "red" }}>{searchError.message}</p>}

      {isSearchEnabled && searchData && (
        <ul>
          {searchData.products.map((product) => (
            <li key={product.id}>
              {product.title} — ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
