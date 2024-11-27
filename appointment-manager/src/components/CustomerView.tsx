import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock } from 'lucide-react';
import './CustomerView.css';

const MOCK_SHOPS = [
  {
    id: 1,
    name: "Elite Cuts",
    address: "123 Main St",
    rating: 4.8,
    queueLength: 3,
    estimatedWait: "30 min",
    services: [
      { name: "Haircut", price: 30, duration: "30 min" },
      { name: "Styling", price: 45, duration: "45 min" },
    ]
  },
  {
    id: 2,
    name: "Modern Salon",
    address: "456 Oak Ave",
    rating: 4.6,
    queueLength: 2,
    estimatedWait: "20 min",
    services: [
      { name: "Haircut", price: 35, duration: "30 min" },
      { name: "Color", price: 85, duration: "90 min" },
    ]
  }
];

const CustomerView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="customer-view-container">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search for salons..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="shops-grid">
        {MOCK_SHOPS.map((shop) => (
          <div
            key={shop.id}
            className="shop-card"
            onClick={() => navigate(`/shop/${shop.id}`)}
          >
            <div className="shop-card-content">
              <div className="shop-header">
                <div>
                  <h2 className="shop-name">{shop.name}</h2>
                  <div className="shop-address">
                    <MapPin className="icon" />
                    <span>{shop.address}</span>
                  </div>
                </div>
                <div className="shop-rating">
                  ⭐️ {shop.rating}
                </div>
              </div>

              <div className="shop-footer">
                <div className="queue-info">
                  <Clock className="icon" />
                  <span>Queue: {shop.queueLength} people</span>
                </div>
                <div className="wait-time">
                  Est. wait: {shop.estimatedWait}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerView;