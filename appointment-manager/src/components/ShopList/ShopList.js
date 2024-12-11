import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopList.css";
import Button from "../Button/Button";
import { getShopList } from "../../services/api";

const ShopList = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRole = localStorage.getItem("userRole");
  console.log(userData);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const result = await getShopList(userData.user_id, userRole);
        setShops(result.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, [userData.user_id, userRole]);

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
              <h3 className="shop-name">{shop.shop_name}</h3>
            </div>
            <div className="card-content">
              <div className="info-row">
                <span className="label">Owner:</span>
                <span className="value">{shop.owner_name}</span>
              </div>
              <div className="info-row">
                <span className="label">Address:</span>
                <span className="value">{shop.address_line_1}</span>
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
