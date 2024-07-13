import React, { useState } from "react";
import {
  faSearch,
  faCartShopping,
  faBars,
  faUser,
  faQuestion,
  faTimes,
  faHome,
  faShoppingBag,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#D9D9D9] p-4">
      <div className="container mx-auto flex items-center justify-between md:justify-start relative">
        {/* Hamburger Icon for Mobile */}
        <FontAwesomeIcon
          icon={faBars}
          className="text-black md:hidden cursor-pointer mr-2"
          onClick={toggleMenu}
        />

        {/* Logo */}
        <Link
          to="/"
          className="text-[#943510] text-lg font-bold absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none md:ml-0"
        >
          WRIST'S
        </Link>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center space-x-4">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-black cursor-pointer"
            onClick={() => alert("Search icon clicked")}
          />
          <Link to="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-black px-4 hover:text-gray-700"
            />
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 flex items-center justify-center md:hidden ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-gray-200 w-full h-[50px] flex items-center justify-around shadow-lg">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-black text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
            <Link
              to="/"
              className="text-black text-xl flex items-center"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link
              to="/cart"
              className="text-black text-xl flex items-center"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <Link
              to="/checkout"
              className="text-black text-xl flex items-center"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faReceipt} />
            </Link>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 mx-6 relative">
          <input
            type="text"
            className="bg-white border-2 border-red-900 h-10 px-10 py-5 w-full text-sm focus:outline-none md:w-auto md:flex-grow"
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

        {/* Cart Icon for Large Screens */}
        <div className="hidden md:flex items-center space-x-4 ml-6">
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
