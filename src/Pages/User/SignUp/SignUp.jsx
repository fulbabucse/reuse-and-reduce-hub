import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import signUp from "../../../assets/icons/sign-up.svg";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useToken } from "../../../hooks/useToken";

const SignUp = () => {
  const [error, setError] = useState("");
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [token] = useToken(userEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  if (token) {
    navigate("/");
  }

  const handleSignUp = (userData) => {
    const formData = new FormData();
    formData.append("image", userData.image[0]);

    const password = userData.password;
    const confirmPassword = userData.confirmPassword;

    if (password !== confirmPassword) {
      setError("Password did not match");
      return;
    }
    const fullName = `${userData.firstName} ${userData.lastName}`;

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_Imgbb_API_KEY}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        createUser(userData.email, userData.password)
          .then((res) => {
            const updateInfo = {
              displayName: fullName,
              photoURL: data.data.display_url,
            };

            updateUserProfile(updateInfo)
              .then(() => {
                savedToDatabase(
                  res.user?.displayName,
                  userData.email,
                  userData.userType
                );
              })
              .catch((err) => console.error(err));
          })

          .catch((err) => {
            if (
              err.message === "Firebase: Error (auth/email-already-in-use)."
            ) {
              setError("This Email already used");
            } else if (
              err.message ===
              "Firebase: Password should be at least 6 characters (auth/weak-password)."
            ) {
              setError("Password should be at least 6 characters");
            }
          });
      })
      .catch((err) => console.error(err));
  };

  const savedToDatabase = (name, email, userType) => {
    const user = {
      name,
      email,
      userType,
    };
    fetch(`https://reuse-and-reduce-server.vercel.app/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success("Successfully created Account");
          setUserEmail(email);
        }
      });
  };

  return (
    <div className="my-6 lg:my-16">
      <Helmet>
        <title>Sign Up - Reuse and Reduce</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        <div className="">
          <img src={signUp} alt="Sign Up Logo" />
        </div>
        <div className="w-full lg:w-4/5 mx-auto">
          <div className="text-primaryColor text-center mb-4">
            <h1 className="text-xl lg:text-4xl font-semibold uppercase">
              Sign Up
            </h1>
            <p className="font-medium">Create a new Account</p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
            <div className="grid md:grid-cols-2 md:gap-4 space-y-4 lg:space-y-0">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  id="firstName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primaryColor focus:outline-none focus:ring-0 focus:border-primaryColor peer"
                  placeholder=" "
                />
                <label
                  htmlFor="firstName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor peer-focus:dark:text-primaryColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
                {errors.firstName && (
                  <p className="text-red-400 text-sm font-medium">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  {...register("lastName")}
                  id="lastName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primaryColor focus:outline-none focus:ring-0 focus:border-primaryColor peer"
                  placeholder=" "
                />
                <label
                  htmlFor="lastName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor peer-focus:dark:text-primaryColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last name (optional)
                </label>
              </div>
            </div>
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
            <div className="grid md:grid-cols-2 md:gap-4 space-y-4 lg:space-y-0">
              <div className="relative z-0 w-full group">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password field are required",
                    minLength: {
                      value: 6,
                      message: "Password length should be 6 character",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      message: `At least 1 special character, 1 uppercase letter, and Number character make the password stronger`,
                    },
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

              <div className="relative z-0 w-full group">
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Password field are required",
                    minLength: {
                      value: 6,
                      message: "Password length should be 6 character",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      message: `At least 1 special character, 1 uppercase letter, and Number character make the password stronger`,
                    },
                  })}
                  id="confirmPassword"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primaryColor focus:outline-none focus:ring-0 focus:border-primaryColor peer"
                  placeholder=" "
                />
                <label
                  htmlFor="confirmPassword"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor peer-focus:dark:text-primaryColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm Password
                </label>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm font-medium">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="">
                <select
                  {...register("userType", {
                    required: "Account Type is required",
                  })}
                  className="form-select focus:shadow-none appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-primaryColor focus:outline-none"
                  aria-label="Default select example"
                >
                  <option selected>Select One</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                </select>
                {errors.userType && (
                  <p className="text-red-400 text-sm font-medium">
                    {errors.userType?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image
              </label>
              <input
                type="file"
                id="image"
                {...register("image", { required: "Image is required" })}
                accept="image/*"
              />
              {errors.image && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.image?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-block px-4 py-3 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-lg leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
            >
              Sign Up
            </button>
          </form>
          <p className="text-red-400 text-sm font-medium mt-2">{error}</p>
          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0 text-gray-700">
              OR
            </p>
          </div>
          <p className="text-md font-semibold text-gray-700 mt-3 text-center">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primaryColor hover:text-primaryColor focus:text-primaryColor transition duration-200 ease-in-out ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
