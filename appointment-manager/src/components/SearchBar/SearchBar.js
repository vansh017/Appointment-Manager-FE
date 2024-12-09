import React, { useState } from "react";
import "./SearchBar.css";
import { FaPlus } from "react-icons/fa";
import Button from "../Button/Button";
import ShopDetailsModal from "../ShopDetailsModal/ShopDetailsModal";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleSaveShopDetails = (shopDetails) => {
    console.log("Saving shop details:", shopDetails);
    setShowModal(false);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button className="search-button" onClick={handleSearch}>
        Search
      </Button>

      <Button className="search-button" onClick={() => setShowModal(true)}>
        <FaPlus />
      </Button>

      {showModal && (
        <ShopDetailsModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveShopDetails}
        />
      )}
    </div>
  );
};

export default SearchBar;
