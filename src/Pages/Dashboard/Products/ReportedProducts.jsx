import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../../Shared/Spinner/Spinner";

const ReportedProducts = () => {
  const { data: reportedProducts = [], isLoading } = useQuery({
    queryKey: ["reported-products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reported-products");
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteReportProduct = (id) => {
    console.log(id);
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      {reportedProducts.length === 0 ? (
        <>
          <h1 className="text-center text-xl mt-5 lg:text-2xl font-semibold text-gray-700">
            Empty Reported Products
          </h1>
        </>
      ) : (
        <>
          <div className="my-4">
            <h1 className="text-center text-xl lg:text-2xl font-semibold text-gray-700">
              Total Reported Products {reportedProducts.length}
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
                            Image
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                          >
                            Seller Contact
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
                            Brand Name
                          </th>

                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportedProducts?.map((product, index) => (
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
                              {product?.model_name}
                            </td>

                            <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                              <img
                                src={product?.product_image}
                                className="h-10 w-10 rounded-md"
                                alt=""
                              />
                            </td>

                            <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                              {product?.contact_number}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                              {product?.resalePrice}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                              {product?.brand_name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                              <button
                                onClick={() =>
                                  handleDeleteReportProduct(product?._id)
                                }
                                className="inline-block px-4 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-500 hover:shadow-lg focus:bg-red-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out"
                              >
                                Remove
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
        </>
      )}
    </>
  );
};

export default ReportedProducts;
