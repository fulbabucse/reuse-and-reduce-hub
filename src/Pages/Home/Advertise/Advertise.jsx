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
      const res = await fetch("http://localhost:5000/advertiseProduct");
      const data = await res.json();
      return data;
    },
  });

  const { data: advertisement = [] } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/advertise");
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
      <p className="text-center text-baseColor text-lg font-medium">
        Reuse & Reduce Hub are the best websites to sale your old Mobile Phones
      </p>

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
