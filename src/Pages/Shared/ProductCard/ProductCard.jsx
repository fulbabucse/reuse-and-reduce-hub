import React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthProvider";

const ProductCard = ({ product, handleBookingProduct }) => {
  const { user } = useContext(AuthContext);
  const {
    _id,
    brand_name,
    contact_number,
    location,
    model_name,
    originalPrice,
    postedTime,
    product_image,
    resalePrice,
    seller_name,
    used_time,
    sold,
  } = product;

  const handleReportProduct = (id) => {
    if (!user?.email) {
      toast.error("You must login to report");
      return;
    }

    fetch(`http://localhost:5000/products/report/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Successfully reported this product");
        }
      });
  };

  return (
    <div className={`${sold && "hidden"}`}>
      <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full lg:h-[300px] rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={product_image}
          alt=""
        />
        <div className="flex flex-col w-full justify-between p-4 leading-normal lg:space-y-2">
          <div>
            <h5 className="text-xl font-semibold tracking-tight text-gray-700 dark:text-white">
              {model_name}
            </h5>
            <p>Posted on {postedTime}</p>
          </div>
          <div className="text-gray-700 font-medium">
            <p>Brand: {brand_name}</p>
            <p>Original Price: TK {originalPrice}</p>
            <p>Resale Price: TK {resalePrice}</p>
            <p>Used Period: {used_time} Months</p>
            <p>Location: {location}</p>
            <p>Seller: {seller_name}</p>
            <p>Contact: {contact_number}</p>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleBookingProduct(product)}
                className="inline-block px-6 py-2.5 bg-secondaryColor text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-secondaryColor hover:shadow-lg focus:bg-secondaryColor focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondaryColor active:shadow-lg transition duration-150 ease-in-out"
                data-bs-toggle="modal"
                data-bs-target="#productModal"
              >
                Book Now
              </button>
              <button
                onClick={() => handleReportProduct(_id)}
                className="inline-block px-2 py-2 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-500 hover:shadow-lg focus:bg-red-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out"
              >
                Report to Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
