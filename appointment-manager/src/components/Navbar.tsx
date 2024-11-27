import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">StyleQueue</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-100">
              <User className="h-6 w-6 text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;