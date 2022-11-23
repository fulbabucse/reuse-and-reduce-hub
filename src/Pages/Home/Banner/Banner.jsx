import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="h-56 sm:h-64 xl:h-96 2xl:h-96">
        <div
          id="carouselExampleCrossfade"
          className="carousel slide carousel-fade relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
            <button
              type="button"
              data-bs-target="#carouselExampleCrossfade"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCrossfade"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCrossfade"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner relative w-full overflow-hidden">
            <div className="carousel-item active float-left w-full">
              <img
                className="w-full lg:h-screen"
                src="https://www.macworld.com/wp-content/uploads/2022/10/where-to-buy-a-second-hand-iphone-main.png?w=1024"
                alt="..."
              />
            </div>
            <div className="carousel-item float-left w-full">
              <img
                className="w-full lg:h-screen"
                src="https://sm.pcmag.com/pcmag_uk/gallery/1/12-uses-fo/12-uses-for-your-old-smartphone_jxhk.jpg"
                alt="..."
              />
            </div>
            <div className="carousel-item float-left w-full">
              <img
                className="w-full lg:h-screen"
                src="https://c.files.bbci.co.uk/41C0/production/_101823861_mediaitem101823860.jpg"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            data-bs-target="#carouselExampleCrossfade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            data-bs-target="#carouselExampleCrossfade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
