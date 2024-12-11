import React, { useEffect, useState } from "react";
import "./ShopMenu.css";
import Button from "../Button/Button";
import { getShopMenu } from "../../services/api";

const ShopMenu = ({ shopId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [customersPerPage, setCustomersPerPage] = React.useState(5);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = menuItems.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(menuItems.length / customersPerPage);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const result = await getShopMenu(userData.user_id, shopId);
        setMenuItems(result.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, [userData.user_id, shopId]);

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setCustomersPerPage(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="shop-menu-container">
      <div className="shop-cards-container">
        {menuItems.map((item, index) => (
          <div key={item.id} className="shop-card">
            <div className="card-header">
              <span className="shop-number">#{index + 1}</span>
              <h3 className="shop-name">{item.item_name}</h3>
            </div>
            <div className="card-content">
              <div className="info-row">
                <span className="info-label">Duration:</span>
                <span className="info-value">{item.expected_time}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Price:</span>
                <span className="info-value">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="pagination-controls">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopMenu;
