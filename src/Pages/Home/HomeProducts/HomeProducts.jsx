import React from "react";
import { useLoaderData } from "react-router-dom";

const HomeProducts = () => {
  const products = useLoaderData();
  return (
    <div>
      <h1>All Products {products.length}</h1>
    </div>
  );
};

export default HomeProducts;
