import React from "react";
import "./ShopMenu.css";
import Button from "../Button/Button";

const ShopMenu = () => {
  const menuItems = [
    { id: 1, item: "Haircut", duration: "30 min", price: "$25" },
    { id: 2, item: "Shave", duration: "20 min", price: "$15" },
    { id: 3, item: "Hair Color", duration: "60 min", price: "$50" },
    { id: 4, item: "Styling", duration: "45 min", price: "$35" },
    { id: 5, item: "Facial", duration: "40 min", price: "$30" },
  ];

  const [currentPage, setCurrentPage] = React.useState(1);
  const [customersPerPage, setCustomersPerPage] = React.useState(5);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = menuItems.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(menuItems.length / customersPerPage);

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
