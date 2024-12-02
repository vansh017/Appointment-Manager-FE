import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShopDetails from "./pages/ShopDetails";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import OtpVerification from "./pages/OtpVerification";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header className="header" />
        <Routes>
          <Route path="/" element={<Home className="shop-list" />} />
          <Route path="/shop/:shopId" element={<ShopDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
