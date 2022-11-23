import React from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import forgetImg from "../../../assets/icons/forget-password.gif";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const ForgetPassword = () => {
  const { passwordReset } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleForgetPassword = (data) => {
    passwordReset(data.email)
      .then(() => {
        toast.success("Check your mail Inbox or Spam folder");
        navigate("/sign-in");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-6 lg:my-16 items-center">
      <Helmet>
        <title>Forget Password - Doctors Portal</title>
      </Helmet>
      <div>
        <img src={forgetImg} alt="Forget Password" />
      </div>
      <div>
        <form
          onSubmit={handleSubmit(handleForgetPassword)}
          className="space-y-6"
        >
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
          <button
            type="submit"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-4 py-3 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-lg leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
          >
            Forget Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
