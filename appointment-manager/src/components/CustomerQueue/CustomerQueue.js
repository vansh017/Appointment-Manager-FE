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
    <div className="customer-queue">
      <h2>Customer Queue</h2>
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Customer Name</th>
            <th>Expected Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {queueData.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.expectedTime}</td>
              <td>
                <span
                  className={`status-badge ${getStatusClass(customer.status)}`}
                >
                  {customer.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerQueue;
