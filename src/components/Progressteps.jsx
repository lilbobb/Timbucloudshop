import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProgressSteps = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="hidden md:flex justify-center space-x-10 items-center mb-8">
      <Link
        to="/viewcart"
        className={`flex items-center ${
          path.includes("/viewcart") ? "text-red-700" : "text-gray-600"
        }`}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full border ${
            path.includes("/viewcart")
              ? "bg-red-700 text-white"
              : "bg-gray-600 text-white"
          }`}
        >
          1
        </div>
        <span className="ml-2">View Cart</span>
      </Link>
      <Link
        to="/checkout"
        className={`flex items-center ${
          path.includes("/checkout") ? "text-red-700" : "text-gray-600"
        }`}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full border ${
            path.includes("/checkout")
              ? "bg-red-700 text-white"
              : "bg-gray-600 text-white"
          }`}
        >
          2
        </div>
        <span className="ml-2">Checkout</span>
      </Link>
      <Link
        to="/ordercomplete"
        className={`flex items-center ${
          path.includes("/ordercomplete") ? "text-red-700" : "text-gray-600"
        }`}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full border ${
            path.includes("/ordercomplete")
              ? "bg-red-700 text-white"
              : "bg-gray-600 text-white"
          }`}
        >
          3
        </div>
        <span className="ml-2">Order Complete</span>
      </Link>
    </div>
  );
};

export default ProgressSteps;
