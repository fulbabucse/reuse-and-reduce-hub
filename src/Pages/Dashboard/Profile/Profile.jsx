import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthProvider";

const Profile = () => {
  const { user, userPasswordUpdate } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePasswordChange = (userData) => {
    userPasswordUpdate(userData.changePassword)
      .then((res) => {
        toast.success("Password change successfully");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-6 lg:mt-20">
        <div className="w-40 h-40 flex flex-col items-center p-1 overflow-hidden hover:bg-primaryColor transition-all duration-300 ring-4 ring-primaryColor rounded-full">
          <img
            className="hover:scale-125 transition-all duration-1000 ease-in-out transform-gpu rounded-full"
            src={user?.photoURL}
            alt=""
          />
          <h3 className="my-2 font-bold text-3xl text-purple-600">
            {user?.displayName}
          </h3>
        </div>
        <div>
          <ul
            className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 w-full"
            id="tabs-tab3"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-home3"
                className="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    "
                id="tabs-home-tab3"
                data-bs-toggle="pill"
                data-bs-target="#tabs-home3"
                role="tab"
                aria-controls="tabs-home3"
                aria-selected="true"
              >
                Profile
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-messages3"
                className="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
                id="tabs-messages-tab3"
                data-bs-toggle="pill"
                data-bs-target="#tabs-messages3"
                role="tab"
                aria-controls="tabs-messages3"
                aria-selected="false"
              >
                Changes Password
              </a>
            </li>
          </ul>
          <div className="tab-content w-full" id="tabs-tabContent3">
            <div
              className="tab-pane fade show active"
              id="tabs-home3"
              role="tabpanel"
              aria-labelledby="tabs-home-tab3"
            >
              <h3 className="text-2xl font-semibold text-gray-700">
                {user?.displayName}
              </h3>
              <a className="text-blue-600" href={`mailto:${user?.email}`}>
                {user?.email}
              </a>
              <p
                className={`font-bold ${
                  user?.emailVerified ? "text-purple-600" : "text-red-400"
                }`}
              >
                {user?.emailVerified ? "Verified" : "Not Verified"}
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="tabs-messages3"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab3"
            >
              <form
                onSubmit={handleSubmit(handlePasswordChange)}
                className="space-y-6"
              >
                <div className="relative z-0 w-full group">
                  <input
                    type="password"
                    {...register("changePassword", {
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
                    id="changePassword"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primaryColor focus:outline-none focus:ring-0 focus:border-primaryColor peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="changePassword"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primaryColor peer-focus:dark:text-primaryColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Change Password
                  </label>
                  {errors.changePassword && (
                    <p className="text-red-400 text-sm font-medium">
                      {errors.changePassword?.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="inline-block px-4 py-3 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-lg leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
