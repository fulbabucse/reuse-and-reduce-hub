import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Contexts/AuthProvider";

const BookModal = ({ productData }) => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { model_name, resalePrice } = productData;

  const handleBookingOrder = (bookingData) => {
    console.log(bookingData);
  };

  return (
    <div>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="productModal"
        tabIndex="-1"
        aria-labelledby="productBookingModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
          <div className="modal-content border-none p-5 shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between  rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="productBookingModal"
              >
                {model_name}
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative">
              <div className="block rounded-lg bg-white mt-2">
                <form
                  onSubmit={handleSubmit(handleBookingOrder)}
                  className="space-y-2 p-1"
                >
                  <div className="form-group">
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      disabled
                      className="form-control focus:shadow-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-secondaryColor focus:outline-none"
                      aria-describedby="emailHelp"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      defaultValue={user?.email}
                      disabled
                      className="form-control focus:shadow-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-secondaryColor focus:outline-none"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      defaultValue={resalePrice}
                      disabled
                      className="form-control focus:shadow-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-secondaryColor focus:outline-none"
                      aria-describedby="emailHelp"
                      placeholder="Price"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      defaultValue={model_name}
                      disabled
                      className="form-control focus:shadow-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-secondaryColor focus:outline-none"
                      aria-describedby="emailHelp"
                      placeholder="Product Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                        minLength: {
                          value: 11,
                          message: "11 Character Correct Number",
                        },
                      })}
                      className="form-control focus:shadow-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-secondaryColor focus:outline-none"
                      aria-describedby="emailHelp"
                      placeholder="Phone Number"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-400 text-sm font-medium">
                        {errors.phoneNumber?.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      {...register("meetingPlace", {
                        required: "Meeting Place is required",
                      })}
                      className="form-control focus:shadow-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-secondaryColor focus:outline-none"
                      aria-describedby="emailHelp"
                      placeholder="Meeting Place"
                    />
                    {errors.meetingPlace && (
                      <p className="text-red-400 text-sm font-medium">
                        {errors.meetingPlace?.message}
                      </p>
                    )}
                  </div>

                  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md">
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
