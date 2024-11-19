import React from "react";
import { useParams } from "react-router-dom";
import CustomerQueue from "../components/CustomerQueue/CustomerQueue";
import ShopMenu from "../components/ShopMenu/ShopMenu";
import Header from "../components/Header/Header";
import "./ShopDetails.css";

const ShopDetails = () => {
  const { shopId } = useParams();

  return (
    <div>
      <Header />
      <div className="shop-details">
        <div className="shop-info">
          <h1>Shop Details</h1>
          {/* You can add shop information here using the shopId */}
        </div>
        <div className="queue-section">
          <CustomerQueue shopId={shopId} />
        </div>
        <div className="menu-section">
          <ShopMenu shopId={shopId} />
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
