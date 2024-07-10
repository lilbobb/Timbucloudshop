import React, { useState } from "react";
import {
  faSearch,
  faCartShopping,
  faBars,
  faUser,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon
            icon={faBars}
            className="text-black md:hidden cursor-pointer"
            onClick={toggleMenu}
          />
          <Link
            to="/"
            className="text-orange-700 text-lg font-bold mx-auto md:ml-0"
          >
            WRIST'S
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-0 left-0 w-full bg-gray-200 md:hidden ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center mt-12">
            <Link to="/" className="text-black text-lg font-semibold my-3">
              Home
            </Link>
            <Link to="/cart" className="text-black text-lg font-semibold my-3">
              Cart
            </Link>
            <Link
              to="/checkout"
              className="text-black text-lg font-semibold my-3"
            >
              Checkout
            </Link>
            {/* Add more links as needed */}
          </div>
        </div>

        {/* Desktop Search */}
        <div className="relative text-black flex-1 mx-6 hidden md:flex items-center">
          <input
            type="text"
            className="bg-white border-2 border-red-900 h-10 px-10 py-2 w-full text-sm focus:outline-none"
            placeholder="Search watch categories"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <button className="border-2 border-red-900 text-black px-4 py-2 ml-2 transition duration-300">
            Search
          </button>
        </div>

        {/* Desktop Account and Help */}
        <div className="hidden md:flex items-center space-x-4 ml-6">
          <div className="flex items-center space-x-1">
            <FontAwesomeIcon
              icon={faUser}
              className="text-black hover:text-gray-700"
            />
            <Link to="#" className="text-black hover:text-gray-700">
              Account
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-black hover:text-gray-700"
            />
            <Link to="#" className="text-black hover:text-gray-700">
              Help
            </Link>
          </div>
        </div>

        {/* Cart Icon */}
        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-black px-4 hover:text-gray-700"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
