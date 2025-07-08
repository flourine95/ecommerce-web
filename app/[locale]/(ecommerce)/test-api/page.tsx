'use client';

import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return setProducts(data.data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {products.map((p: any) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
