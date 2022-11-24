import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import BookModal from "./BookModal";

const HomeProducts = () => {
  const products = useLoaderData();
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-4 lg:my-10 px-4 lg:px-0">
        {products?.map((product) => (
          <ProductCard key={product?._id} product={product}></ProductCard>
        ))}
      </div>
      <BookModal></BookModal>
    </div>
  );
};

export default HomeProducts;
