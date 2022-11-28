import React from "react";
import { Helmet } from "react-helmet";
import Overview from "../../Overview/Overview";
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
      <Overview></Overview>
    </div>
  );
};

export default Home;
