import { useQuery } from "@tanstack/react-query";
import React from "react";
import CategoryCard from "../../Shared/CategoryCard/CategoryCard";

const Categories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/categories`);
      const data = await res.json();
      return data;
    },
  });

  const handleProduct = (id) => {
    console.log(id);
  };

  return (
    <div className="my-4 lg:my-10">
      <h1 className="text-center text-xl lg:text-2xl font-semibold text-primaryColor">
        Products
      </h1>
      <p className="text-center text-gray-600 font-semibold">
        Reuse & Reduce are the best websites to sale your old Mobile Phones
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4 lg:my-10">
        {categories?.map((category) => (
          <CategoryCard
            key={category?._id}
            category={category}
            handleProduct={handleProduct}
          ></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;