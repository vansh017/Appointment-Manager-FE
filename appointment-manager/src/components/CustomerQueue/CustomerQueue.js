import React from "react";
import "./CustomerQueue.css";

const CustomerQueue = () => {
  const queueData = [
    { id: 1, name: "John Doe", expectedTime: "10:30 AM", status: "Waiting" },
    {
      id: 2,
      name: "Jane Smith",
      expectedTime: "10:45 AM",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Mike Johnson",
      expectedTime: "11:00 AM",
      status: "Waiting",
    },
    {
      id: 4,
      name: "Sarah Williams",
      expectedTime: "11:15 AM",
      status: "Waiting",
    },
    { id: 5, name: "Tom Brown", expectedTime: "11:30 AM", status: "Completed" },
  ];

  const getStatusClass = (status) => {
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
        {queueData.map((customer, index) => (
          <div key={customer.id} className="customer-card">
            <div className="card-header">
              <span className="customer-number">#{index + 1}</span>
              <h3 className="customer-name">{customer.name}</h3>
            </div>
            <div className="card-content">
              <div className="info-row">
                <span className="info-label">Expected Time:</span>
                <span className="info-value">{customer.expectedTime}</span>
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
    </div>
  );
};

export default CustomerQueue;
