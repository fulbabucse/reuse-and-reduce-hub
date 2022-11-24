import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import Spinner from "../../Shared/Spinner/Spinner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["my-products", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/my-products?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
          },
        }
      );
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="my-4">
      <h1 className="text-center text-xl lg:text-2xl font-semibold text-gray-700">
        My Total Products {products.length}
      </h1>

      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Brand Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, index) => (
                    <tr
                      key={product?._id}
                      class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.model_name}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.resalePrice}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.brand_name}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        <img
                          src={product?.product_image}
                          className="h-10 w-10 rounded-md"
                          alt=""
                        />
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        Action
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
