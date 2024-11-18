import React, { useState } from "react";
import "./ShopList.css";

const ShopList = () => {
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

  return (
    <div className="shop-list">
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Shop Name</th>
            <th>Owner</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((shop, index) => (
            <tr key={shop.id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{shop.name}</td>
              <td>{shop.owner}</td>
              <td>{shop.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>

        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`pagination-button ${
                currentPage === number ? "active" : ""
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>

        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="pagination-button items-select"
        >
          <option value="5">5 / page</option>
          <option value="10">10 / page</option>
          <option value="15">15 / page</option>
        </select>
      </div>
    </div>
  );
};

export default ShopList;
