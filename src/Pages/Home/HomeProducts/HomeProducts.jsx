import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import Spinner from "../../Shared/Spinner/Spinner";
import BookModal from "./BookModal";

const HomeProducts = () => {
  const { user } = useContext(AuthContext);
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
        `https://reuse-and-reduce-server.vercel.app/products?category=${category?.category_name}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleBookingProduct = (productInfo) => {
    if (!user?.email) {
      toast.error(
        "If you want to make a booking, you have to sign in or sign up first"
      );
      return;
    }

    setProductData(productInfo);
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="mx-4 lg:mx-0">
      <Helmet>
        <title>Category - Reuse and Reduce</title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-4 lg:my-10 lg:px-0">
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
