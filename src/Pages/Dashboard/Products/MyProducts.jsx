import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthProvider";
import ConfirmModal from "../../Shared/ConfirmModal/ConfirmModal";
import Spinner from "../../Shared/Spinner/Spinner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [modalData, setModalData] = useState({});

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
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

  const handleProductAdvertise = (product) => {
    fetch(`http://localhost:5000/products/${product?._id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success(`Advertise Running ${new Date().toLocaleString()}`);
          refetch();
        }
      });

    fetch(`http://localhost:5000/advertise`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Product delete successfully");
          refetch();
        }
      });
  };

  return (
    <div className="my-4">
      <Helmet>
        <title>My Products - Admin Reuse and Reduce</title>
      </Helmet>
      <h1 className="text-center text-xl lg:text-2xl font-semibold text-gray-700">
        My Total Products {products.length}
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
                      Product Name
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
                      Image
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Actions
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Status
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
                        {product?.model_name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {product?.resalePrice}
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
                      <td className="text-sm text-gray-900 font-light px-3 py-1">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#confirmModal"
                          onClick={() => setModalData(product)}
                          className="inline-block px-2 py-2 bg-primaryColor text-white font-medium text-sm leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1">
                        {product?.sold === true ? (
                          <>
                            <button className="inline-block px-2 py-2 bg-secondaryColor text-white font-medium text-sm leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out">
                              Sold
                            </button>
                          </>
                        ) : (
                          <>
                            {product?.advertise === true ? (
                              <>
                                <button className="inline-block px-2 py-2 bg-purple-500 text-white font-medium text-sm leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out">
                                  Advertise Running
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() =>
                                    handleProductAdvertise(product)
                                  }
                                  className="inline-block px-2 py-2 bg-baseColor text-white font-medium text-sm leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
                                >
                                  Advertise
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        modalData={modalData}
        handleDeleteProduct={handleDeleteProduct}
      ></ConfirmModal>
    </div>
  );
};

export default MyProducts;
