import React, { useRef } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Profile = () => {
  const { user, updateUserProfile, userPasswordUpdate, deleteUserAccount } =
    useContext(AuthContext);

  const nameRef = useRef(user?.displayName);
  const photoLinkRef = useRef(user?.photoURL);

  const handleUserInfoUpdate = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const photoLink = photoLinkRef.current.value;
    const updatesInfo = {
      displayName: name,
      photoURL: photoLink,
    };

    updateUserProfile(updatesInfo)
      .then(() => {
        toast.success("Update successfully");
        e.target.reset();
      })
      .catch((err) => console.error(err));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    userPasswordUpdate(e.target.password.value)
      .then((res) => {
        toast.success("Password change successfully");
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteAccount = () => {
    const agree = window.confirm("Are you sure delete your account");
    if (agree) {
      deleteUserAccount()
        .then(() => {
          toast.error("Account deleted successfully");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-6">
        <div className="flex flex-col items-center">
          <img
            className="w-40 h-40 rounded-full ring-4 ring-purple-500"
            src={user?.photoURL}
            alt=""
          />
          <h3 className="my-2 font-bold text-3xl text-purple-600">
            {user?.displayName}
          </h3>
        </div>
        <div>
          <ul
            className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
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
                href="#tabs-profile3"
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
                id="tabs-profile-tab3"
                data-bs-toggle="pill"
                data-bs-target="#tabs-profile3"
                role="tab"
                aria-controls="tabs-profile3"
                aria-selected="false"
              >
                Edit Profile
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
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-messages4"
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
                id="tabs-messages-tab4"
                data-bs-toggle="pill"
                data-bs-target="#tabs-messages4"
                role="tab"
                aria-controls="tabs-messages4"
                aria-selected="false"
              >
                Danger Zone
              </a>
            </li>
          </ul>
          <div className="tab-content" id="tabs-tabContent3">
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
              id="tabs-profile3"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab3"
            >
              <form onSubmit={handleUserInfoUpdate} className="space-y-3">
                <div>
                  <input
                    type="text"
                    name="name"
                    ref={nameRef}
                    defaultValue={user?.displayName}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                    placeholder="Name"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="photoLink"
                    ref={photoLinkRef}
                    defaultValue={user?.photoURL}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                    placeholder="Photo URL"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    disabled
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                    placeholder="Email address"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-block px-4 py-2 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-2/5"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Save
                </button>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="tabs-messages3"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab3"
            >
              <form onSubmit={handlePasswordChange} className="space-y-3">
                <div>
                  <input
                    type="password"
                    name="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-block px-4 py-2 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-2/5"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Change Password
                </button>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="tabs-messages4"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab4"
            >
              <button
                type="submit"
                onClick={handleDeleteAccount}
                className="inline-block px-4 py-2 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-2/5"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
