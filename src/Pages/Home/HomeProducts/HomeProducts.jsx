import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import Spinner from "../../Shared/Spinner/Spinner";
import BookModal from "./BookModal";

const HomeProducts = () => {
  const category = useLoaderData();
  const [productData, setProductData] = useState({});

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products?category=${category?.category_name}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleBookingProduct = (productInfo) => {
    setProductData(productInfo);
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-4 lg:my-10 px-4 lg:px-0">
        {products?.map((product) => (
          <ProductCard
            key={product?._id}
            product={product}
            handleBookingProduct={handleBookingProduct}
          ></ProductCard>
        ))}
      </div>
      <BookModal productData={productData} refetch={refetch}></BookModal>
    </div>
  );
};

export default HomeProducts;
