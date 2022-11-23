import React, { useState } from "react";
import signIn from "../../../assets/icons/sign-in.svg";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Contexts/AuthProvider";

const SignIn = () => {
  const [error, setError] = useState("");
  const { signUser, googleSignIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleUserSignIn = (data) => {
    signUser(data.email, data.password)
      .then(() => {})
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/user-not-found).") {
          setError("User not found");
        } else if (err.message === "Firebase: Error (auth/wrong-password).") {
          setError("You are entering the wrong password");
        }
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Successfully Google Sign In");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="my-6 lg:my-16">
      <Helmet>
        <title>Sign In - Doctors Portal</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        <div className="">
          <img src={signIn} alt="Sign Up Logo" />
        </div>
        <div className="w-full lg:w-4/5 mx-auto">
          <div className="text-primaryColor text-center mb-4">
            <h1 className="text-xl lg:text-4xl font-semibold uppercase">
              Sign In
            </h1>
            <p className="font-medium">Sign in to access your account</p>
          </div>
          <form onSubmit={handleSubmit(handleUserSignIn)} className="space-y-6">
            <div className="relative z-0 w-full group">
              <input
                type="email"
                {...register("email", {
                  required: "Email address is required",
                })}
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primaryColor focus:outline-none focus:ring-0 focus:border-primaryColor peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor peer-focus:dark:text-primaryColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
              {errors.email && (
                <p className="text-red-400 text-sm font-medium">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="password"
                {...register("password", {
                  required: "Password field are required",
                })}
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primaryColor focus:outline-none focus:ring-0 focus:border-primaryColor peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor peer-focus:dark:text-primaryColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {errors.password && (
                <p className="text-red-400 text-sm font-medium">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="inline-block px-4 py-3 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-lg leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
            >
              Sign in
            </button>
          </form>
          <div className="flex justify-between items-center mt-3">
            <p className="text-red-400 text-sm font-medium mt-2">{error}</p>
            <Link to="/forget-password">
              <button className="text-purple-600 hover:text-purple-700 focus:text-purple-700 active:text-purple-800 duration-200 transition ease-in-out">
                Forgot password?
              </button>
            </Link>
          </div>
          <div>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0 text-gray-700">
                OR
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="px-7 py-3 text-white font-medium text-sm leading-snug capitalize rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-amber-600"
              role="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              <FaGoogle className="mx-1"></FaGoogle> Continue with Google
            </button>
            <p className="text-md font-semibold text-gray-700 mt-3 text-center">
              Already have an account?
              <Link
                to="/sign-up"
                className="text-primaryColor hover:text-primaryColor focus:text-primaryColor transition duration-200 ease-in-out ml-1"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
