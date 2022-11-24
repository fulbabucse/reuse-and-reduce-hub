import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../../Shared/Spinner/Spinner";

const AllProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/all-products`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  console.log(products);

  return (
    <div>
      <h1 className="text-center text-xl lg:text-2xl font-semibold text-gray-700">
        Total Products {products.length}
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
                      Seller Name
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
                      Email
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Contact Number
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
                      Location
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
                      class="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Posted Time
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
                        {product?.seller_name}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.model_name.slice(0, 12)}...
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.email.slice(0, 9)}...
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.contact_number}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.resalePrice}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.location}
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
                        {product?.postedTime}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        <button className="inline-block px-2 py-1 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-lg leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out">
                          Delete
                        </button>
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

export default AllProducts;
