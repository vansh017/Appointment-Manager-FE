import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopList.css";
import Button from "../Button/Button";

const ShopList = () => {
  const navigate = useNavigate();
  // Sample data with 15 shops
  const shops = [
    {
      id: 1,
      name: "Corner Store",
      owner: "John Smith",
      address: "123 Main St, City, State",
    },
    {
      id: 2,
      name: "Fashion Boutique",
      owner: "Emma Johnson",
      address: "456 Oak Ave, City, State",
    },
    {
      id: 3,
      name: "Electronics Hub",
      owner: "Mike Brown",
      address: "789 Pine Rd, City, State",
    },
    {
      id: 4,
      name: "Grocery Market",
      owner: "Sarah Wilson",
      address: "321 Elm St, City, State",
    },
    {
      id: 5,
      name: "Book Haven",
      owner: "David Lee",
      address: "654 Maple Dr, City, State",
    },
    {
      id: 6,
      name: "Sports Gear",
      owner: "Lisa Anderson",
      address: "987 Cedar Ln, City, State",
    },
    {
      id: 7,
      name: "Pet Shop",
      owner: "Tom Harris",
      address: "147 Birch Ave, City, State",
    },
    {
      id: 8,
      name: "Music Store",
      owner: "Amy Chen",
      address: "258 Walnut St, City, State",
    },
    {
      id: 9,
      name: "Toy World",
      owner: "James Wilson",
      address: "369 Cherry Rd, City, State",
    },
    {
      id: 10,
      name: "Hardware Plus",
      owner: "Robert Taylor",
      address: "741 Spruce Way, City, State",
    },
    {
      id: 11,
      name: "Beauty Salon",
      owner: "Maria Garcia",
      address: "852 Ash Blvd, City, State",
    },
    {
      id: 12,
      name: "Coffee House",
      owner: "Kevin Park",
      address: "963 Pine Ave, City, State",
    },
    {
      id: 13,
      name: "Art Supplies",
      owner: "Jennifer Lee",
      address: "159 Oak St, City, State",
    },
    {
      id: 14,
      name: "Phone Repair",
      owner: "Michael Chang",
      address: "753 Maple Ln, City, State",
    },
    {
      id: 15,
      name: "Bakery Delight",
      owner: "Laura Martinez",
      address: "951 Cedar Rd, City, State",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate total pages
  const totalPages = Math.ceil(shops.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shops.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleShopClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  return (
    <div className="shop-list">
      <div className="cards-container">
        {currentItems.map((shop, index) => (
          <div
            key={shop.id}
            className="shop-card"
            onClick={() => handleShopClick(shop.id)}
          >
            <div className="card-header">
              <span className="shop-number">
                {indexOfFirstItem + index + 1}
              </span>
              <h3 className="shop-name">{shop.name}</h3>
            </div>
            <div className="card-content">
              <div className="info-row">
                <span className="label">Owner:</span>
                <span className="value">{shop.owner}</span>
              </div>
              <div className="info-row">
                <span className="label">Address:</span>
                <span className="value">{shop.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
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
  );
};

export default ShopList;
