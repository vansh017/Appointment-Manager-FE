import React from "react";
import "./ShopMenu.css";

const ShopMenu = () => {
  const menuItems = [
    { id: 1, item: "Haircut", duration: "30 min", price: "$25" },
    { id: 2, item: "Shave", duration: "20 min", price: "$15" },
    { id: 3, item: "Hair Color", duration: "60 min", price: "$50" },
    { id: 4, item: "Styling", duration: "45 min", price: "$35" },
    { id: 5, item: "Facial", duration: "40 min", price: "$30" },
  ];

  return (
    <div className="shop-menu-container">
      <div className="shop-cards-container">
        {menuItems.map((item, index) => (
          <div key={item.id} className="shop-card">
            <div className="card-header">
              <span className="shop-number">#{index + 1}</span>
              <h3 className="shop-name">{item.item}</h3>
            </div>
            <div className="card-content">
              <div className="info-row">
                <span className="info-label">Duration:</span>
                <span className="info-value">{item.duration}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Price:</span>
                <span className="info-value">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopMenu;
