import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postedTime = new Date().toLocaleString();

  const handleFormSubmit = (productData) => {
    const formData = new FormData();
    formData.append("image", productData.product_sample[0]);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((productPhoto) => {
        const product = {
          brand_name: productData.brand_name,
          category_name: productData.category_name,
          location: productData.location,
          contact_number: productData.contact_number,
          originalPrice: productData.original_price,
          resalePrice: productData.resale_price,
          product_color: productData.product_color,
          model_name: productData.model_name,
          product_image: productPhoto.data.url,
          seller_name: productData.seller_name,
          used_time: productData.used_time,
          product_features: productData.product_features,
          product_descriptions: productData.product_descriptions,
        };
        fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("reuseReduceToken")}`,
          },
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              toast.success("Successfully Product Added");
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="my-4">
      <div>
        <h1 className="text-center mb-4 text-xl lg:text-2xl font-semibold text-gray-700">
          Add Product
        </h1>
      </div>
      <div className="block p-6 bg-white w-full">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="form-group">
              <input
                type="text"
                {...register("seller_name", {
                  required: "Seller Name is required",
                })}
                className="form-control block
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
        focus:text-gray-700 focus:bg-white focus:shadow-none focus:border-primaryColor focus:outline-none"
                id="exampleInput7"
                placeholder="Seller Name"
              />

              {errors.seller_name && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.seller_name?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                {...register("contact_number", {
                  required: "Contact Number is required",
                })}
                className="form-control block
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
        focus:text-gray-700 focus:bg-white focus:shadow-none focus:border-primaryColor focus:outline-none"
                id="exampleInput7"
                placeholder="Contact Number"
              />

              {errors.contact_number && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.contact_number?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                {...register("model_name", {
                  required: "Product Name is required",
                })}
                className="form-control block
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
        focus:text-gray-700 focus:bg-white focus:shadow-none focus:border-primaryColor focus:outline-none"
                id="exampleInput7"
                placeholder="Model Name"
              />

              {errors.model_name && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.model_name?.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <select
                {...register("brand_name", {
                  required: "Category Name is required",
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
                <option selected>Select Brand</option>
                {categories?.map((brand) => (
                  <option key={brand?._id} defaultValue={brand?.category_name}>
                    {brand?.category_name}
                  </option>
                ))}
              </select>
              {errors.brand_name && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.brand_name?.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <select
                {...register("category_name", {
                  required: "Category Name is required",
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
                <option selected>Select Category</option>
                {categories?.map((category) => (
                  <option
                    key={category?._id}
                    defaultValue={category?.category_name}
                  >
                    {category?.category_name}
                  </option>
                ))}
              </select>
              {errors.category_name && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.category_name?.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <select
                {...register("location", {
                  required: "Location is required",
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
                <option selected>Select location</option>
                <option defaultValue="Rangpur">Rangpur</option>
                <option defaultValue="Dhaka">Dhaka</option>
                <option defaultValue="Chattogram">Chattogram</option>
                <option defaultValue="Rajshahi">Rajshahi</option>
                <option defaultValue="Sylhet">Sylhet</option>
                <option defaultValue="Barishal">Barishal</option>
                <option defaultValue="Khulna">Khulna</option>
                <option defaultValue="Mymensingh">Mymensingh</option>
              </select>
              {errors.location && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.location?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <input
                type="number"
                {...register("resale_price", {
                  required: "Resale Price is required",
                })}
                className="form-control block
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
        focus:text-gray-700 focus:bg-white focus:shadow-none focus:border-primaryColor focus:outline-none"
                id="exampleInput7"
                placeholder="Resale Price"
              />
              {errors.resale_price && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.resale_price?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <input
                type="number"
                {...register("original_price", {
                  required: "Product size is required",
                })}
                className="form-control block
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
        focus:text-gray-700 focus:bg-white focus:shadow-none focus:border-primaryColor focus:outline-none"
                id="exampleInput7"
                placeholder="Original Price"
              />
              {errors.original_price && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.original_price?.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <select
                {...register("product_color", {
                  required: "Product Color is required",
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
                <option selected>Select Color</option>
                <option defaultValue="Black">Black</option>
                <option defaultValue="Green">Green</option>
                <option defaultValue="Blue">Blue</option>
                <option defaultValue="White">White</option>
                <option defaultValue="Deep Sea Blue">Deep Sea Blue</option>
                <option defaultValue="Red">Red</option>
                <option defaultValue="Gold">Gold</option>
                <option defaultValue="Navy Blue">Navy Blue</option>
                <option defaultValue="Yellow">Yellow</option>
                <option defaultValue="Silver">Silver</option>
                <option defaultValue="Multicolors">Multicolors</option>
              </select>
              {errors.product_color && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.product_color?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                {...register("used_time", {
                  required: "Used Time is required",
                })}
                className="form-control block
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
        focus:text-gray-700 focus:bg-white focus:shadow-none focus:border-primaryColor focus:outline-none"
                id="exampleInput7"
                placeholder="How many months used"
              />
              {errors.used_time && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.used_time?.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Products Sample Pictures
              </label>
              <input
                type="file"
                id="image"
                {...register("product_sample", {
                  required: "Sample Picture is required",
                })}
                accept="image"
              />
              {errors.product_sample && (
                <p className="text-red-400 font-semibold text-sm">
                  {errors?.product_sample?.message}
                </p>
              )}
            </div>

            <br />

            <div className="flex justify-center">
              <div className="w-full xl:w-96">
                <textarea
                  {...register("product_features", {
                    required: "Product features is required",
                  })}
                  className="
        form-control
        focus:shadow-none
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
        focus:text-gray-700 focus:bg-white focus:border-primaryColor focus:outline-none
      "
                  rows="3"
                  placeholder="Product Features"
                ></textarea>
                {errors.product_features && (
                  <p className="text-red-400 font-semibold text-sm">
                    {errors?.product_features?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full xl:w-96">
                <textarea
                  {...register("product_descriptions", {
                    required: "Product Descriptions is required",
                  })}
                  className="
        form-control
        focus:shadow-none
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
        focus:text-gray-700 focus:bg-white focus:border-primaryColor focus:outline-none
      "
                  rows="3"
                  placeholder="Product Descriptions"
                ></textarea>
                {errors.product_descriptions && (
                  <p className="text-red-400 font-semibold text-sm">
                    {errors?.product_descriptions?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="
      px-6
      py-2.5
      bg-primaryColor
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-primaryColor hover:shadow-lg
      focus:bg-primaryColor focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-primaryColor active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
