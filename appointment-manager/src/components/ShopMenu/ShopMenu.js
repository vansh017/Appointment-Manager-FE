import React, { useEffect, useState } from "react";
import "./ShopMenu.css";
import Button from "../Button/Button";
import { getShopMenu } from "../../services/api";

const ShopMenu = ({ shopId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [customersPerPage, setCustomersPerPage] = React.useState(5);
  const [showOverlay, setShowOverlay] = useState(false);
  const [newItem, setNewItem] = useState({
    item_name: '',
    expected_time: '',
    price: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to save new menu item
    setShowOverlay(false);
    setNewItem({
      item_name: '',
      expected_time: '',
      price: ''
    });
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
        <div className="add-item-container">
          <Button onClick={() => setShowOverlay(true)}>
            Add Item
          </Button>
          {showOverlay && (
            <div className="overlay">
              <h2>Add New Menu Item</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="item_name">Name:</label>
                  <input
                    type="text"
                    id="item_name"
                    name="item_name"
                    value={newItem.item_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expected_time">Expected Time:</label>
                  <input
                    type="text"
                    id="expected_time"
                    name="expected_time"
                    value={newItem.expected_time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={newItem.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-buttons">
                  <Button type="submit">Save</Button>
                  <Button type="button" onClick={() => setShowOverlay(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopMenu;
