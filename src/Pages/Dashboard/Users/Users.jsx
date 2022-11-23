import { useQuery } from "@tanstack/react-query";
import React from "react";

const Users = () => {
  const { data: users = [] } = useQuery({
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
  return (
    <div className="my-4">
      <h1 className="text-center text-xl lg:text-2xl text-gray-700 font-semibold my-3">
        All Users
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
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Email
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
                  {users?.map((user, index) => (
                    <tr
                      key={user?._id}
                      class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td class="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                        {user?.name}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                        {user?.email}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                        Actions
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
