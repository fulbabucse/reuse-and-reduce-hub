import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../../Shared/Spinner/Spinner";

const Home = () => {
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
      <main>
        <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
              <div className="col-span-12 mt-8">
                <div className="grid grid-cols-12 gap-6 mt-5">
                  <p className="transform cursor-pointer hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white">
                    <div className="p-5">
                      <div className="flex justify-between">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        <div className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center">90%</span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-3xl font-bold leading-8">
                            4510+
                          </div>

                          <div className="mt-1 text-base text-gray-600">
                            Products Sale
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                  <p className="transform cursor-pointer hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white">
                    <div className="p-5">
                      <div className="flex justify-between">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        <div className="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center">99%</span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-3xl font-bold leading-8">
                            5000+
                          </div>

                          <div className="mt-1 text-base text-gray-600">
                            Happy Customers
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                  <p className="transform cursor-pointer  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white">
                    <div className="p-5">
                      <div className="flex justify-between">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-pink-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                          />
                        </svg>
                        <div className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center">90%</span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-3xl font-bold leading-8">
                            3+
                          </div>

                          <div className="mt-1 text-base text-gray-600">
                            Verified Sellers
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                  <p className="transform cursor-pointer  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white">
                    <div className="p-5">
                      <div className="flex justify-between">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                          />
                        </svg>
                        <div className="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center">100%</span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-3xl font-bold leading-8">
                            8+
                          </div>

                          <div className="mt-1 text-base text-gray-600">
                            Different type Categories
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
              <div className="col-span-12 mt-5">
                <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
                  <div className="bg-white p-4 shadow-lg rounded-lg">
                    <h1 className="font-bold text-base">Products Table</h1>
                    <div className="mt-4">
                      <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto">
                          <div className="py-2 align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                  <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div className="flex cursor-pointer">
                                        <span className="mr-2">No</span>
                                      </div>
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div className="flex cursor-pointer">
                                        <span className="mr-2">
                                          Product Name
                                        </span>
                                      </div>
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div className="flex cursor-pointer">
                                        <span className="mr-2">
                                          Seller Name
                                        </span>
                                      </div>
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div className="flex cursor-pointer">
                                        <span className="mr-2">Price</span>
                                      </div>
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div className="flex cursor-pointer">
                                        <span className="mr-2">Category</span>
                                      </div>
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div className="flex cursor-pointer">
                                        <span className="mr-2">Contact</span>
                                      </div>
                                    </th>

                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div className="flex cursor-pointer">
                                        <span className="mr-2">
                                          Posted Time
                                        </span>
                                      </div>
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div className="flex cursor-pointer">
                                        <span className="mr-2">Location</span>
                                      </div>
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div className="flex cursor-pointer">
                                        <span className="mr-2">ACTION</span>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {products?.map((product, index) => (
                                    <tr key={product?._id}>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        <p>{index + 1}</p>
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        <p>{product?.model_name}</p>
                                        <p className="text-xs text-gray-400">
                                          {product?.category_name}
                                        </p>
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        <p>{product?.seller_name}</p>
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        <p>{product?.resalePrice}</p>
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        {product?.category_name}
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        {product?.contact_number}
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        {product?.postedTime}
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        {product?.location}
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        <div className="flex space-x-4">
                                          <a
                                            href="#"
                                            className="text-red-500 hover:text-red-600"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="w-5 h-5 mr-1 ml-3"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                              />
                                            </svg>
                                            <p>Delete</p>
                                          </a>
                                        </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
