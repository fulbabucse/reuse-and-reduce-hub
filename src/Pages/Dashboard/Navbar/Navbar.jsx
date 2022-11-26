import React, { useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/reuse-logo.jpg";
import userThumb from "../../../assets/user_thumbnail.jpg";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useAdmin } from "../../../hooks/useAdmin";
import { useCombineUser } from "../../../hooks/useCombineUser";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { user, userSignOut } = useContext(AuthContext);

  const [isAdmin] = useAdmin(user?.email);
  const [isCombineUser] = useCombineUser(user?.email);

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
                  <h1 className="flex items-center gap-1 text-xl lg:text-3xl font-bold text-gray-800">
                    <img className="10-4 h-10" src={logo} alt="" /> Reuse and
                    Reduce
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
                  className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Home
                </Link>

                <Link
                  to="/dashboard/my-orders"
                  className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  My Orders
                </Link>

                {(isCombineUser || isAdmin) && (
                  <>
                    <li className="list-none">
                      <Link
                        to="/dashboard/my-products"
                        className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                      >
                        My Products
                      </Link>
                    </li>
                    <li className="list-none lg:mr-5">
                      <Link
                        to="/dashboard/add-product"
                        className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                      >
                        Add Product
                      </Link>
                    </li>

                    <li className="list-none lg:mr-5">
                      <Link
                        to="/dashboard/my-buyers"
                        className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                      >
                        My Buyers
                      </Link>
                    </li>
                  </>
                )}

                {isAdmin && (
                  <li className="list-none">
                    <Link
                      to="/dashboard/all-products"
                      className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                    >
                      All Products
                    </Link>
                  </li>
                )}

                {isAdmin && (
                  <Link
                    to="/dashboard/users"
                    className="transition-colors font-medium duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    Users
                  </Link>
                )}

                <div className="flex justify-center lg:flex lg:mt-0 lg:-mx-2">
                  <div>
                    <div className="flex justify-center">
                      <div className="dropdown relative">
                        <button
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            className="h-12 w-12 text-xs rounded-full"
                            src={user?.photoURL || userThumb}
                            alt="User Picture"
                          />
                        </button>
                        <ul
                          className=" dropdown-menu px-2 min-w-max absolute hidden bg-white text-base z-50 space-y-2 py-2 list-none text-left rounded-md shadow-2xl mt-1 m-0 bg-clip-padding border-none"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          {user?.email && (
                            <li>
                              <Link
                                to="/profile"
                                className="dropdown-item text-center rounded-md text-md py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                              >
                                {user?.displayName || "User Profile"}
                              </Link>
                            </li>
                          )}

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
