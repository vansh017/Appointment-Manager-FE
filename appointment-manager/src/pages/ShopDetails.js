import React from "react";
import { useParams } from "react-router-dom";
import CustomerQueue from "../components/CustomerQueue/CustomerQueue";
import ShopMenu from "../components/ShopMenu/ShopMenu";
import Header from "../components/Header/Header";
import "./ShopDetails.css";

const ShopDetails = () => {
  const { shopId } = useParams();

  return (
    <div
      className="shop-details-container"
      style={{ backgroundColor: "#091f2c" }}
    >
      <div className="shop-details-content">
        <div className="shop-info-grid">
          <div className="queue-section">
            <h2>Customer Queue</h2>
            <CustomerQueue shopId={shopId} />
          </div>
          <div className="menu-section">
            <h2>Services Menu</h2>
            <ShopMenu shopId={shopId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
