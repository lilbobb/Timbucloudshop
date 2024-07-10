import React from "react";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartItems, getTotalPrice } = useCart(); // Ensure setCartItems is included

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <div className="bg-gray-300 shadow-md p-4 border-b-2 border-gray-900">
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
              {/* Product Image */}
              <img
                src={item.image} // Replace with your image URL or source
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center">
                {/* Delete Icon */}
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <p className="font-semibold ml-4">
                  ${parseFloat(item.price) * parseInt(item.quantity)}
                </p>
              </div>
            </div>
          ))}
          {/* Subtotal and Checkout */}
          <div className="flex flex-col mt-4">
            <div className="flex justify-center mb-2">
              <p className="font-semibold px-2">Subtotal:</p>
              <p className="font-semibold">${getTotalPrice().toFixed(2)}</p>
            </div>
            <Link
              to="/Viewcart"
              className="bg-black m:bg-orange-900 text-white px-4 py-2 hover:bg-gray-800 text-center justify-center"
            >
              VIEW CART
            </Link>
            <Link
              to="/checkout"
              className="bg-black text-white mt-2 px-4 py-2 hover:bg-gray-800 text-center justify-center"
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
