/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react"; // Fixed: Added missing hooks
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import CartProvider from "./service/CartProvider";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoutes from "./components/ProtectedRoutes"; // Note: Ensure this matches your filename
import ViewUsers from "./pages/ViewUsers";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import ForgetPassword from "./pages/ForgetPassword";
import ViewProducts from "./pages/ViewProducts";

const App = () => {
  // Fixed: Standardized camelCase naming convention
  const [isLogin, setIsLogin] = useState(null);

  // Function to get stored token
  const getToken = () => {
    const token = localStorage.getItem("token");
    setIsLogin(token); // Fixed: Casing matched with state setter
  };

  useEffect(() => {
    getToken();
  }, []); // Fixed: Now correctly contained inside the App component scope

  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<Products />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="forget" element={<ForgetPassword />} />

          {/* Protected Routes - Fixed: Used ProtectedRoutes to match your import */}
          <Route
            path="home"
            element={
              <ProtectedRoutes authenticated={isLogin}>
                <Home />
              </ProtectedRoutes>
            }
          />

          {/* Fallback Catch-All Route */}
          <Route path="*" element={<ErrorPage />} />

          <Route path="ViewUsers" element={<ViewUsers />} />
          <Route path="view-products" element={<ViewProducts/>}/>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}; // Fixed: Properly closed the App component here

export default App;