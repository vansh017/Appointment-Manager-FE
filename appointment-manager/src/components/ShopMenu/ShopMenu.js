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
    <div className="shop-menu">
      <div className="menu-items">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <h3>{item.item}</h3>
            <div className="item-details">
              <span className="duration">{item.duration}</span>
              <span className="price">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopMenu;
