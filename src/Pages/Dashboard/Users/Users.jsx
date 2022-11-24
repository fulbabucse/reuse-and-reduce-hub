import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const Users = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("You are Now Admin");
          refetch();
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div className="my-4">
      <h1 className="text-center text-xl lg:text-2xl text-gray-700 font-semibold my-3">
        All Users
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
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Actions
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      User Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, index) => (
                    <tr
                      key={user?._id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                        {user?.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                        {user?.email}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                        {user?.role === "admin" ? (
                          <button
                            type="button"
                            className="inline-block px-2 py-2 bg-baseColor text-white font-medium text-sm leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
                          >
                            Remove Admin
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleMakeAdmin(user?._id)}
                            className="inline-block px-2 py-2 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-sm leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
                          >
                            Make Admin
                          </button>
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                        {user?.userType === "Seller" ? "Seller" : "Buyer"}
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

export default Users;
