import React from "react";
import { Helmet } from "react-helmet";
import Advertise from "../Advertise/Advertise";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - Reuse and Reduce</title>
      </Helmet>
      <Banner></Banner>
      <Advertise></Advertise>
      <Categories></Categories>
    </div>
  );
};

export default Home;
