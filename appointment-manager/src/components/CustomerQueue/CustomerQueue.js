import React, { useEffect, useState } from "react";
import "./CustomerQueue.css";
import Button from "../Button/Button";
import { addCustomerToQueue, getCustomerQueue } from "../../services/api";
import { CUSTOMER_ROLE } from "../../constants";

const CustomerQueue = ({ shopId }) => {
  const [customerQueue, setCustomerQueue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(5);
  const [showJoinQueue, setShowJoinQueue] = useState(false);
  const [isUserInQueue, setIsUserInQueue] = useState(false);
  const [websocket, setWebSocket] = useState(null);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customerQueue.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(customerQueue.length / customersPerPage);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const flagForUserQueue = async (data) => {
      const isInQueue = data.some(
        (customer) => customer.customer_id === userData.user_id
      );
      setIsUserInQueue(isInQueue);
      setShowJoinQueue(userRole === CUSTOMER_ROLE && !isInQueue);
    };

    const ws = new WebSocket(`ws://localhost:3500/ws/queue/${shopId}`);

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (event) => {
      console.log("event data", event);
      const data = JSON.parse(event.data);

      if (data) {
        setCustomerQueue(data);
        flagForUserQueue(data);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    setWebSocket(ws);
    const fetchCustomers = async () => {
      try {
        const result = await getCustomerQueue(userData.user_id, shopId);
        setCustomerQueue(result.data);
        flagForUserQueue(result.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchCustomers();
  }, [userData.user_id, shopId, userRole]);

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setCustomersPerPage(newSize);
    setCurrentPage(1);
  };

  const handleSubmit = async () => {
    try {
      // Call API to add new menu item
      const shopData = {
        shop_id: shopId,
      };
      await addCustomerToQueue(shopData, userData.user_id);

      // Refresh the menu items list
      const result = await getCustomerQueue(userData.user_id, shopId);
      setCustomerQueue(result.data);

      // Close overlay and reset form
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const getStatusClass = (status) => {
    if (!status) {
      return "";
    }
    switch (status.toLowerCase()) {
      case "waiting":
        return "status-waiting";
      case "in progress":
        return "status-progress";
      case "completed":
        return "status-completed";
      default:
        return "";
    }
  };

  return (
    <div className="customer-queue-container">
      <div className="customer-cards-container">
        {currentCustomers.map((customer, index) => (
          <div className="customer-card">
            <div className="card-header">
              <span className="customer-number">#{index + 1}</span>
              <h3 className="customer-name">{customer.customer_name}</h3>
            </div>
            <div className="card-content">
              <div className="info-row">
                <span className="info-label">Expected Time:</span>
                <span className="info-value">10</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span
                  className={`info-value ${getStatusClass(customer.status)}`}
                >
                  {customer.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

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

      {showJoinQueue && (
        <div className="queue-actions">
          <Button onClick={() => handleSubmit()} className="join-queue-button">
            Join Queue
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerQueue;
