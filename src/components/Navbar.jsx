import React from 'react';
import { useCart } from '../components/CartContext';
import {
  faSearch, faCartShopping, faBars, faUser, faQuestion, faTimes, faHome, faReceipt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Cart from '../pages/Cart';

const Navbar = () => {
  const { isCartOpen, toggleCart, closeCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // State for hamburger menu

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCartToggle = () => {
    toggleCart();
    setIsMenuOpen(false); // Optionally close the menu when cart is toggled
  };

  return (
    <nav className="bg-[#D9D9D9] p-4">
      <div className="container mx-auto flex items-center justify-between md:justify-start relative">
        {/* Hamburger Icon for Mobile */}
        <FontAwesomeIcon
          icon={faBars}
          className="text-black md:hidden cursor-pointer mr-2"
          onClick={handleMenuToggle} // Toggle hamburger menu
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
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-black px-4 hover:text-gray-700 cursor-pointer"
            onClick={handleCartToggle} // Toggle cart
          />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 flex items-center justify-center md:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-gray-200 w-full h-[50px] flex items-center justify-around shadow-lg">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-black text-2xl cursor-pointer"
              onClick={handleMenuToggle} // Close hamburger menu
            />
            <Link
              to="/"
              className="text-black text-xl flex items-center"
              onClick={() => { handleMenuToggle(); closeCart(); }}
            >
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-black text-xl flex items-center cursor-pointer"
              onClick={() => { handleMenuToggle(); handleCartToggle(); }}
            />
            <Link
              to="/checkout"
              className="text-black text-xl flex items-center"
              onClick={() => { handleMenuToggle(); closeCart(); }}
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
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-black px-4 hover:text-gray-700 cursor-pointer"
            onClick={handleCartToggle} // Toggle cart
          />
        </div>
      </div>
      {isCartOpen && <Cart onClose={closeCart} />}
    </nav>
  );
};

export default Navbar;
