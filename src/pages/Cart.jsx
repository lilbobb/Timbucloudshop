// Cart.js
import React from "react";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cart = ({ onClose }) => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="bg-gray-300 shadow-md p-4 border-b-2 border-gray-900 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
      >
        <FontAwesomeIcon icon={faTimes} className="text-black"/>
      </button>
      <h2 className="text-2xl font-semibold mb-4 border-b-2 border-red-800">
        Cart
      </h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-2"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">
                  ${parseFloat(item.price).toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <p className="font-semibold ml-4">
                  $
                  {(parseFloat(item.price) * parseInt(item.quantity)).toFixed(
                    2
                  )}
                </p>
              </div>
            </div>
          ))}
          <div className="flex flex-col mt-4">
            <div className="flex justify-center mb-2">
              <p className="font-semibold px-2">Subtotal:</p>
              <p className="font-semibold">${getTotalPrice().toFixed(2)}</p>
            </div>
            <Link
              to="/viewcart"
              className="bg-[#943510] text-white px-4 py-2 hover:bg-gray-800 text-center justify-center sm:bg-[#000000]"
              onClick={onClose} // Close cart when navigating
            >
              VIEW CART
            </Link>
            <Link
              to="/checkout"
              className="bg-[#943510] text-white mt-2 px-4 py-2 hover:bg-gray-800 text-center justify-center sm:bg-[#000000]"
              onClick={onClose} // Close cart when navigating
            >
              CHECKOUT (${getTotalPrice().toFixed(2)})
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
