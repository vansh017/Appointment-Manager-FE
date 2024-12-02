import React from "react";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import ShopList from "../components/ShopList/ShopList";
import "./Home.css";

const Home = () => {
  return (
    <div className="home dark-bg">
      <SearchBar />
      <ShopList />
    </div>
  );
};

export default Home;
