import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import Spinner from "../../Shared/Spinner/Spinner";

const MyBuyers = () => {
  const { user } = useContext(AuthContext);
  const { data: myBuyers = [], isLoading } = useQuery({
    queryKey: ["my-buyers", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/my-buyers/${user?.email}`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  console.log(myBuyers);

  return (
    <>
      {myBuyers.length === 0 ? (
        <>
          <h1 className="text-center text-xl mt-5 lg:text-2xl font-semibold text-gray-700">
            Empty My Buyers
          </h1>
        </>
      ) : (
        <>
          <div className="my-4">
            <h1 className="text-center text-xl lg:text-2xl font-semibold text-gray-700">
              Total My Buyers {myBuyers.length}
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
                            Buyer Name
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                          >
                            Phone Number
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                          >
                            Email Address
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                          >
                            Location
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {myBuyers?.map((product, index) => (
                          <tr
                            key={product?._id}
                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                          >
                            <td className="px-3 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                              {product?.name}
                            </td>

                            <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                              {product?.phone}
                            </td>

                            <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                              {product?.email}
                            </td>

                            <td className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
                              {product?.location}
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

export default MyBuyers;
