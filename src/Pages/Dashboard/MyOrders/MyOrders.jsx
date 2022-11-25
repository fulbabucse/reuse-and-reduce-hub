import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import Spinner from "../../Shared/Spinner/Spinner";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="my-4">
      <h1 className="text-center text-xl lg:text-2xl font-semibold text-gray-700">
        My Total Orders {bookings.length}
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
                      Image
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                    >
                      Payments
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((booking, index) => (
                    <tr
                      key={booking?._id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="px-3 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {booking?.seller_name}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {booking?.product}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {booking?.sellerContact}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {booking?.price}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {booking?.brand_name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        <img
                          src={booking?.product_image}
                          className="h-10 w-10 rounded-md"
                          alt=""
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                        {!booking?.paid && (
                          <Link to="/">
                            <button
                              type="button"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                              className="inline-block px-4 py-1 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-lg leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
                            >
                              Pay
                            </button>
                          </Link>
                        )}

                        {booking?.paid && (
                          <h4 className="text-md font-semibold text-primaryColor">
                            Paid
                          </h4>
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
    </div>
  );
};

export default MyOrders;
