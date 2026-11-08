export const LIMIT = 10;

export const fetchProducts = async ({ queryKey }) => {
  const [, { page }] = queryKey;
  const skip = (page - 1) * LIMIT;
  const res = await fetch(
    `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
  );
  if (!res.ok) throw new Error("Ошибка загрузки данных");
  return res.json();
};

export const searchProducts = async ({ queryKey }) => {
  const [, { query }] = queryKey;
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  if (!res.ok) throw new Error("Ошибка поиска");
  return res.json();
};
