import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import Spinner from "../../Shared/Spinner/Spinner";
import BookModal from "../HomeProducts/BookModal";

const Advertise = () => {
  const [productData, setProductData] = useState({});
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advertiseProduct"],
    queryFn: async () => {
      const res = await fetch(
        "https://reuse-and-reduce-server.vercel.app/advertiseProduct"
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: advertisement = [] } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await fetch(
        "https://reuse-and-reduce-server.vercel.app/advertise"
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
    <div
      className={`my-4 lg:my-20 ${
        advertisement.length === 0 && "hidden"
      } mx-4 lg:mx-0`}
    >
      <h1 className="text-center text-xl lg:text-3xl font-semibold text-primaryColor uppercase secondary-font tracking-wider">
        Top Advertise Products
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-4 lg:px-0">
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

export default Advertise;
