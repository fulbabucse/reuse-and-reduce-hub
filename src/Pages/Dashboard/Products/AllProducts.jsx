import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import Spinner from "../../Shared/Spinner/Spinner";

const AllProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await fetch(
        `https://reuse-and-reduce-server.vercel.app/all-products`,
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
    <div className="my-10">
      <Helmet>
        <title>All Products - Admin Reuse and Reduce</title>
      </Helmet>
      <h1 className="text-center text-xl lg:text-2xl font-semibold text-gray-700">
        Total Products {products.length}
      </h1>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Seller Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Contact Number
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Brand Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Posted Time
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, index) => (
                    <tr
                      key={product?._id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="px-3 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.seller_name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.model_name.slice(0, 12)}...
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.email.slice(0, 9)}...
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.contact_number}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.resalePrice}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.location}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.brand_name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        <img
                          src={product?.product_image}
                          className="h-10 w-10 rounded-md"
                          alt=""
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.postedTime}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
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
