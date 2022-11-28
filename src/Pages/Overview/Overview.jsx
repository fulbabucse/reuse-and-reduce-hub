import React from "react";
import marketplace from "../../assets/marketplace.jpg";

const Overview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:my-32 mx-4">
      <div className="p-1 overflow-hidden hover:bg-primaryColor transition-all duration-300 rounded-md ring-4 ring-primaryColor">
        <img
          className="rounded-md hover:scale-125 transition-all duration-1000 ease-in-out transform-gpu"
          src={marketplace}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center space-y-4">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold text-baseColor uppercase secondary-font tracking-wider">
            Reuse & Reduce Hub
          </h1>
          <p className="text-xl font-semibold text-baseColor/80 italic ternary-font">
            We produd to have great marketplace which help sell!
          </p>
        </div>
        <p className="text-justify text-baseColor">
          Reuse and Reduce Hub is a second hand mobile phone buying and selling
          website. You can buy the mobile of your choice from here. And you can
          sell your used phone if you want.
        </p>
        <button className="inline-block w-40 p-4 bg-secondaryColor text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-secondaryColor hover:shadow-lg focus:bg-secondaryColor focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondaryColor active:shadow-lg transition duration-150 ease-in-out">
          Start Selling
        </button>
      </div>
    </div>
  );
};

export default Overview;
