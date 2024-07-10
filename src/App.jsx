import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Viewcart from "./pages/Viewcart";
import Checkout from "./pages/Checkout"; // Ensure correct capitalization
import OrderComplete from "./pages/Ordercomplete";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/viewcart" element={<Viewcart />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/Ordercomplete" element={<OrderComplete />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
