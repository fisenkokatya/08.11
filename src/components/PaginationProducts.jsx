import React, { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchProducts, LIMIT } from "../api/queries";

export function PaginationProducts() {
  const [page, setPage] = useState(1);

  const {
    data: paginationData,
    isPending: isPaginationPending,
    isFetching: isPaginationFetching,
    isError: isPaginationError,
    error: paginationError,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: fetchProducts,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });

  return (
    <div
      style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h2>Список товаров (Пагинация & placeholderData)</h2>

      <div style={{ height: "20px", marginBottom: "10px" }}>
        {isPaginationFetching && (
          <span style={{ color: "blue" }}>Фоновое обновление...</span>
        )}
      </div>

      {isPaginationPending ? (
        <p>Загрузка...</p>
      ) : isPaginationError ? (
        <p style={{ color: "red" }}>{paginationError.message}</p>
      ) : (
        <>
          <ul>
            {paginationData.products.map((product) => (
              <li key={product.id}>
                {product.title} — ${product.price}
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              Назад
            </button>
            <span>Страница {page}</span>
            <button
              onClick={() => setPage((old) => old + 1)}
              disabled={page * LIMIT >= (paginationData?.total || 0)}
            >
              Вперед
            </button>
          </div>
        </>
      )}
    </div>
  );
}
