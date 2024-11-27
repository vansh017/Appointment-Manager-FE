import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import UserSelection from './components/UserSelection';
import CustomerView from './components/CustomerView';
import ShopOwnerView from './components/ShopOwnerView';
import ShopDetails from './components/ShopDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/customer" element={<CustomerView />} />
          <Route path="/shop-owner" element={<ShopOwnerView />} />
          <Route path="/shop/:id" element={<ShopDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;