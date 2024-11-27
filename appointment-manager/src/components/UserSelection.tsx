import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Store } from 'lucide-react';

const UserSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Welcome to StyleQueue
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <button
          onClick={() => navigate('/customer')}
          className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <Users className="h-16 w-16 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">I'm a Customer</h2>
          <p className="text-gray-600 text-center">
            Book appointments and view waiting times at nearby salons
          </p>
        </button>

        <button
          onClick={() => navigate('/shop-owner')}
          className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <Store className="h-16 w-16 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">I'm a Shop Owner</h2>
          <p className="text-gray-600 text-center">
            Manage your salon's queue and appointments
          </p>
        </button>
      </div>
    </div>
  );
}

export default UserSelection;