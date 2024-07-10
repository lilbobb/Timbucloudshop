import React from "react";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ViewCart = () => {
  const { cartItems, setCartItems } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity);

      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        return total + itemPrice * itemQuantity;
      } else {
        console.error(`Invalid price or quantity for item ${item.id}`);
        return total;
      }
    }, 0);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 bg-gray-100 p-4 rounded-lg shadow-md mb-4 lg:mb-0">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-2"
              >
                <img
                  src={item.image}
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
            ))
          )}
        </div>
        <div className="w-full lg:w-1/4 bg-gray-200 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
          <div className="flex justify-between mb-2">
            <p className="font-semibold">Subtotal:</p>
            <p className="font-semibold">${getTotalPrice().toFixed(2)}</p>
          </div>
          <button className="w-full bg-black text-white px-4 py-2 hover:bg-gray-800 mb-2">
            Checkout
          </button>
          <button className="w-full bg-black text-white px-4 py-2 hover:bg-gray-800">
            Order Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
