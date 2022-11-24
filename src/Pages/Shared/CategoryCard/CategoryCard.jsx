import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles.css";

const CategoryCard = ({ category }) => {
  const { category_name, image } = category;

  return (
    <div>
      <div className="">
        <div className="rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-200">
          <div className="bg-gray-200 category_images">
            <img src={image} alt="" />
          </div>
          <div className="p-4 flex justify-between items-center">
            <h5 className="text-gray-700 text-xl font-medium mb-2">
              {category_name}
            </h5>
            <Link to={`/category/${category_name}`}>
              <button
                type="button"
                className="inline-block px-4 py-2 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-medium text-lg leading-tight rounded-md shadow-md  hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-colors duration-200 ease-in-out"
              >
                See Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
