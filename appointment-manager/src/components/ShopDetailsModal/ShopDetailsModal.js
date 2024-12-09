import React, { useState, useRef } from "react";
import "./ShopDetailsModal.css";
import Button from "../Button/Button";
import { InputText } from "primereact/inputtext";
import { saveShopDetails } from "../../services/api";
import { Toast } from "primereact/toast";

const ShopDetailsModal = ({ onClose, onSave }) => {
  const [shopDetails, setShopDetails] = useState({
    // Shop Details
    shopName: "",
    startTime: "",
    endTime: "",
    // Address
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
    // Contact
    cellphone: "",
    email: "",
    fax: "",
    // Menu
    menuItems: [{ item_name: "", expected_time: "", price: "" }],
  });
  const userData = JSON.parse(localStorage.getItem("userData"));

  // Add new state for validation
  const [errors, setErrors] = useState({});
  const toast = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!shopDetails.shopName.trim())
      newErrors.shopName = "Shop name is required";
    if (!shopDetails.addressLine1.trim())
      newErrors.addressLine1 = "Address is required";
    if (!shopDetails.city.trim()) newErrors.city = "City is required";
    if (!shopDetails.state.trim()) newErrors.state = "State is required";
    if (!shopDetails.zipcode.trim()) newErrors.zipcode = "Pincode is required";
    if (!shopDetails.cellphone.trim())
      newErrors.phone = "Contact number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      var shopData = {
        shop_name: shopDetails.shopName,
        start_time: shopDetails.startTime,
        end_time: shopDetails.endTime,
        address: {
          address_line_1: shopDetails.addressLine1,
          address_line_2: shopDetails.addressLine2,
          city: shopDetails.city,
          state: shopDetails.state,
          zipcode: shopDetails.zipcode,
        },
        contact_details: {
          email: shopDetails.email,
          cellphone: shopDetails.cellphone,
          website: shopDetails.website,
        },
        catalog_list: shopDetails.menuItems,
      };

      try {
        const response = await saveShopDetails(shopData, userData.user_id);
        if (response.status === "failure") {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: response.data.error_description || "An error occurred",
            life: 3000,
          });
        } else {
          onSave(shopDetails);
        }
      } catch (err) {
        setErrors(err.message || "An error occurred during login");
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.message || "An error occurred during login",
          life: 3000,
        });
      }
    }
  };

  const handleAddMenuItem = () => {
    setShopDetails({
      ...shopDetails,
      menuItems: [
        ...shopDetails.menuItems,
        { item_name: "", expected_time: "", price: "" },
      ],
    });
  };

  const handleInputChange = (e, section, field, index = null) => {
    if (index !== null) {
      // Handle menu items
      const updatedMenuItems = [...shopDetails.menuItems];
      updatedMenuItems[index][field] = e.target.value;
      setShopDetails({
        ...shopDetails,
        menuItems: updatedMenuItems,
      });
    } else {
      // Handle other fields
      setShopDetails({
        ...shopDetails,
        [field]: e.target.value,
      });
    }
  };

  return (
    <div className="modal">
      <Toast ref={toast} />
      <div className="modal-content">
        <h2>Add Shop Details</h2>

        {/* Shop Details Section */}
        <section>
          <h3>Shop Details</h3>
          <span className="p-float-label">
            <InputText
              id="shopName"
              value={shopDetails.shopName}
              onChange={(e) => handleInputChange(e, "shop", "shopName")}
              className={errors.shopName ? "p-invalid" : ""}
            />
            <label htmlFor="shopName">Shop Name *</label>
          </span>
          {errors.shopName && (
            <small className="p-error">{errors.shopName}</small>
          )}
          <input
            type="time"
            placeholder="Start Time"
            value={shopDetails.startTime}
            onChange={(e) => handleInputChange(e, "shop", "startTime")}
          />
          <input
            type="time"
            placeholder="End Time"
            value={shopDetails.endTime}
            onChange={(e) => handleInputChange(e, "shop", "endTime")}
          />
        </section>

        {/* Address Section */}
        <section>
          <h3>Address</h3>
          <span className="p-float-label">
            <InputText
              id="addressLine1"
              value={shopDetails.addressLine1}
              onChange={(e) => handleInputChange(e, "address", "addressLine1")}
              className={errors.addressLine1 ? "p-invalid" : ""}
            />
            <label htmlFor="addressLine1">Address Line 1 *</label>
          </span>
          {errors.addressLine1 && (
            <small className="p-error">{errors.addressLine1}</small>
          )}

          <span className="p-float-label">
            <InputText
              id="addressLine2"
              value={shopDetails.addressLine2}
              onChange={(e) => handleInputChange(e, "address", "addressLine2")}
            />
            <label htmlFor="addressLine2">Address Line 2</label>
          </span>

          <span className="p-float-label">
            <InputText
              id="city"
              value={shopDetails.city}
              onChange={(e) => handleInputChange(e, "address", "city")}
              className={errors.city ? "p-invalid" : ""}
            />
            <label htmlFor="city">City *</label>
          </span>
          {errors.city && <small className="p-error">{errors.city}</small>}

          <span className="p-float-label">
            <InputText
              id="state"
              value={shopDetails.state}
              onChange={(e) => handleInputChange(e, "address", "state")}
              className={errors.state ? "p-invalid" : ""}
            />
            <label htmlFor="state">State *</label>
          </span>
          {errors.state && <small className="p-error">{errors.state}</small>}

          <span className="p-float-label">
            <InputText
              id="zipcode"
              value={shopDetails.zipcode}
              onChange={(e) => handleInputChange(e, "address", "zipcode")}
              className={errors.zipcode ? "p-invalid" : ""}
            />
            <label htmlFor="zipcode">Pincode *</label>
          </span>
          {errors.zipcode && (
            <small className="p-error">{errors.zipcode}</small>
          )}
        </section>

        {/* Contact Section */}
        <section>
          <h3>Contact</h3>
          <span className="p-float-label">
            <InputText
              id="phone"
              value={shopDetails.cellphone}
              onChange={(e) => handleInputChange(e, "contact", "cellphone")}
              className={errors.phone ? "p-invalid" : ""}
            />
            <label htmlFor="phone">Phone Number *</label>
          </span>
          {errors.phone && <small className="p-error">{errors.phone}</small>}

          <span className="p-float-label">
            <InputText
              id="email"
              value={shopDetails.email}
              onChange={(e) => handleInputChange(e, "contact", "email")}
            />
            <label htmlFor="email">Email</label>
          </span>

          <span className="p-float-label">
            <InputText
              id="fax"
              value={shopDetails.fax}
              onChange={(e) => handleInputChange(e, "contact", "fax")}
            />
            <label htmlFor="fax">Fax</label>
          </span>
        </section>

        {/* Menu Section */}
        <section>
          <h3>Menu Items</h3>
          {shopDetails.menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <input
                type="text"
                placeholder="Item Name"
                value={item.item_name}
                onChange={(e) =>
                  handleInputChange(e, "menu", "item_name", index)
                }
              />
              <input
                type="time"
                placeholder="Expected Time"
                value={item.expected_time}
                onChange={(e) =>
                  handleInputChange(e, "menu", "expected_time", index)
                }
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleInputChange(e, "menu", "price", index)}
              />
            </div>
          ))}
          <Button onClick={handleAddMenuItem}>Add Menu Item</Button>
        </section>

        <div className="modal-actions">
          <Button className="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsModal;
