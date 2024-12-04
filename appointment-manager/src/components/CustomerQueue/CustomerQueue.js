import React from "react";
import "./CustomerQueue.css";
import Button from "../Button/Button";

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
    { id: 6, name: "John Doe", expectedTime: "10:30 AM", status: "Waiting" },
    {
      id: 7,
      name: "Jane Smith",
      expectedTime: "10:45 AM",
      status: "In Progress",
    },
    {
      id: 8,
      name: "Mike Johnson",
      expectedTime: "11:00 AM",
      status: "Waiting",
    },
    {
      id: 9,
      name: "Sarah Williams",
      expectedTime: "11:15 AM",
      status: "Waiting",
    },
    {
      id: 10,
      name: "Tom Brown",
      expectedTime: "11:30 AM",
      status: "Completed",
    },
  ];

  const [currentPage, setCurrentPage] = React.useState(1);
  const [customersPerPage, setCustomersPerPage] = React.useState(5);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = queueData.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(queueData.length / customersPerPage);

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setCustomersPerPage(newSize);
    setCurrentPage(1);
  };

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
        {currentCustomers.map((customer, index) => (
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
  );
};

export default CustomerQueue;
