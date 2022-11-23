import { Carousel } from "flowbite-react";
import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="h-56 sm:h-64 xl:h-96 2xl:h-96">
        <Carousel slideInterval={3000}>
          <img
            src="https://www.thnk.org/content/uploads/2018/04/how-recycling-your-phone-can-save-the-planet-4.jpg"
            alt="..."
          />
          <img
            src="https://d2cbg94ubxgsnp.cloudfront.net/Pictures/2000xAny/2/4/9/129249_iStock-636655004---Hero.jpg"
            alt="..."
          />
          <img
            src="https://c.files.bbci.co.uk/41C0/production/_101823861_mediaitem101823860.jpg"
            alt="..."
          />
          <img
            src="https://sm.pcmag.com/pcmag_uk/gallery/1/12-uses-fo/12-uses-for-your-old-smartphone_jxhk.jpg"
            alt="..."
          />
          <img
            src="https://www.macworld.com/wp-content/uploads/2022/10/where-to-buy-a-second-hand-iphone-main.png?w=1024"
            alt="..."
          />
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
