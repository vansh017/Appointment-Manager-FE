import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Calendar, Scissors } from 'lucide-react';
import './ShopDetails.css';

const MOCK_SERVICES = [
  { id: 1, name: "Haircut", price: 30, duration: "30 min" },
  { id: 2, name: "Styling", price: 45, duration: "45 min" },
  { id: 3, name: "Color", price: 85, duration: "90 min" },
  { id: 4, name: "Shave", price: 25, duration: "20 min" },
];

const MOCK_QUEUE = [
  { id: 1, name: "John D.", time: "10:30 AM", status: "in-progress" },
  { id: 2, name: "Sarah M.", time: "11:00 AM", status: "waiting" },
  { id: 3, name: "Mike R.", time: "11:30 AM", status: "waiting" },
];

const ShopDetails = () => {
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div className="shop-container">
      <div className="shop-grid">
        <div>
          <div className="shop-card shop-card-mb">
            <h2 className="shop-title">Elite Cuts</h2>
            <div className="shop-info-row">
              <Clock className="shop-info-icon" />
              <span>Current Queue: {MOCK_QUEUE.length} people</span>
            </div>
            <div className="shop-info-row">
              <Calendar className="shop-info-icon" />
              <span>Est. Wait Time: 45 minutes</span>
            </div>
          </div>

          <div className="shop-card">
            <h3 className="shop-title">Services</h3>
            <div className="services-list">
              {MOCK_SERVICES.map((service) => (
                <div
                  key={service.id}
                  className={`service-item ${
                    selectedService === service.id
                      ? 'service-item-selected'
                      : 'service-item-default'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="service-content">
                    <div className="service-info">
                      <h4 className="service-info h4">{service.name}</h4>
                      <p className="service-info p">{service.duration}</p>
                    </div>
                    <div className="service-price">
                      ${service.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Queue</h3>
          <div className="space-y-4">
            {MOCK_QUEUE.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Scissors className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">{appointment.name}</h4>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {appointment.status === 'in-progress' ? 'In Progress' : 'Waiting'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {selectedService && (
            <button
              className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Join Queue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopDetails;