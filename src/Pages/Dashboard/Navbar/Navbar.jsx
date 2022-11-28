import React, { useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import userThumb from "../../../assets/user_thumbnail.jpg";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useAdmin } from "../../../hooks/useAdmin";
import { useCombineUser } from "../../../hooks/useCombineUser";
import "../../../assets/styles.css";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { user, userSignOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isCombineUser] = useCombineUser(user?.email);

  const { data: adminRoleCheck = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleUserSignOut = () => {
    userSignOut()
      .then(() => {
        toast.success("Sign Out Success");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="sticky sticky-top">
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container px-4 lg:px-0 py-2 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between w-full">
            <div className="flex items-center justify-between">
              <div>
                <Link to="/dashboard">
                  <h1 className="flex items-center gap-1 text-xl lg:text-3xl font-bold text-baseColor uppercase secondary-font tracking-wider">
                    Reuse and Reduce Hub
                  </h1>
                </Link>
              </div>

              <div className="flex lg:hidden">
                <button
                  className="p-2 text-slate-700 rounded-md outline-none focus:border-slate-700 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? <FaTimes></FaTimes> : <FaBars></FaBars>}
                </button>
              </div>
            </div>

            <div
              className={`${
                navbar
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              } absolute z-10 inset-x-0 flex-1 px-4 shadow-lg lg:shadow-none pb-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-end`}
            >
              <div className="capitalize space-y-3 md:space-y-0 mt-4 lg:mt-0 lg:space-y-0 flex flex-col transition-all duration-300 ease-in-out  text-gray-600  dark:text-gray-300 lg:flex lg:px-0 lg:flex-row lg:items-center">
                <Link
                  to="/"
                  className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-2 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Home
                </Link>

                <Link
                  to="/dashboard/my-orders"
                  className={`${
                    adminRoleCheck?.role === "admin" && "hidden"
                  } transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-2 hover:text-gray-900 dark:hover:text-gray-200`}
                >
                  My Orders
                </Link>

                {(isCombineUser || isAdmin) && (
                  <>
                    <li className="list-none">
                      <Link
                        to="/dashboard/my-products"
                        className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-2 hover:text-gray-900 dark:hover:text-gray-200"
                      >
                        My Products
                      </Link>
                    </li>
                    <li className="list-none">
                      <Link
                        to="/dashboard/add-product"
                        className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-2 hover:text-gray-900 dark:hover:text-gray-200"
                      >
                        Add Product
                      </Link>
                    </li>

                    <li className="list-none">
                      <Link
                        to="/dashboard/my-buyers"
                        className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-2 hover:text-gray-900 dark:hover:text-gray-200"
                      >
                        My Buyers
                      </Link>
                    </li>
                  </>
                )}

                {isAdmin && (
                  <>
                    <Link
                      to="/dashboard/reported-products"
                      className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-2 hover:text-gray-900 dark:hover:text-gray-200"
                    >
                      Reported Items
                    </Link>

                    <div className="flex justify-center">
                      <div>
                        <div className="dropdown relative">
                          <a
                            className="dropdown-toggle
          font-medium
          leading-tight
          transition
          duration-150
          ease-in-out
          flex
          items-center cursor-pointer
          whitespace-nowrap"
                            type="button"
                            id="dropdownMenuButton2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Users
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="caret-down"
                              className="w-2 ml-2"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512"
                            >
                              <path
                                fill="currentColor"
                                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                              ></path>
                            </svg>
                          </a>
                          <ul
                            className="user-dropdown
          dropdown-menu
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          m-0
          bg-clip-padding
          border-none
        "
                            aria-labelledby="dropdownMenuButton2"
                          >
                            <li>
                              <Link
                                to="/dashboard/make-admin"
                                className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-medium text-center
              block
              w-32
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                              >
                                Make Admin
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dashboard/all-sellers"
                                className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-medium text-center
              block
              w-32
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                              >
                                All Sellers
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dashboard/all-buyers"
                                className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-medium text-center
              block
              w-32
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                              >
                                All buyers
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-center lg:flex lg:mt-0 lg:-mx-2">
                  <div className="lg:ml-8">
                    <div className="flex justify-center">
                      <div className="dropdown relative">
                        <button
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            className="h-12 w-12 text-xs rounded-full p-1 ring-2 ring-primaryColor"
                            src={user?.photoURL || userThumb}
                            alt="User Picture"
                          />
                        </button>
                        <ul
                          className=" dropdown-menu px-2 min-w-max absolute hidden bg-white text-base z-50 space-y-2 py-2 list-none text-left rounded-md shadow-2xl mt-1 m-0 bg-clip-padding border-none"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          {!user?.email && (
                            <li>
                              <Link
                                to="/sign-up"
                                className="text-sm font-normal block w-full whitespace-nowrap bg-transparent"
                              >
                                <button
                                  type="button"
                                  className="inline-block px-4 py-2 bg-purple-600 text-white font-medium text-md leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0  w-full active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  Sign Up
                                </button>
                              </Link>
                            </li>
                          )}
                          <li>
                            {user?.email ? (
                              <button
                                onClick={handleUserSignOut}
                                className="inline-block w-full px-4 py-2 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-md leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
                              >
                                Sign Out
                              </button>
                            ) : (
                              <Link to="/sign-in" className="w-full">
                                <button className="inline-block w-full px-4 py-2 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-md leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out">
                                  Sign In
                                </button>
                              </Link>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
