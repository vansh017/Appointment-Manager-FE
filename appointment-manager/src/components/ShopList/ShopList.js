import React from "react";
import "./ShopList.css";

const ShopList = () => {
  // This could later be replaced with real data from an API or props
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
  ];

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
          {shops.map((shop, index) => (
            <tr key={shop.id}>
              <td>{index + 1}</td>
              <td>{shop.name}</td>
              <td>{shop.owner}</td>
              <td>{shop.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopList;
