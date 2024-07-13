import React from "react";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ViewCart = () => {
  const { cartItems, setCartItems } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity);

      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        return total + itemPrice * itemQuantity;
      } else {
        console.error(`Invalid price or quantity for item ${item.id}:`, {
          price: item.price,
          quantity: item.quantity,
        });
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
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/4 p-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">
                      ${parseFloat(item.price || 0).toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400"
                        onClick={() =>
                          setCartItems((prevItems) =>
                            prevItems.map((cartItem) =>
                              cartItem.id === item.id && cartItem.quantity > 1
                                ? {
                                    ...cartItem,
                                    quantity: cartItem.quantity - 1,
                                  }
                                : cartItem
                            )
                          )
                        }
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400"
                        onClick={() =>
                          setCartItems((prevItems) =>
                            prevItems.map((cartItem) =>
                              cartItem.id === item.id
                                ? {
                                    ...cartItem,
                                    quantity: cartItem.quantity + 1,
                                  }
                                : cartItem
                            )
                          )
                        }
                      >
                        +
                      </button>
                    </div>
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
                      {(
                        parseFloat(item.price || 0) * parseInt(item.quantity)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <button className="w-full border border-red-700 text-red-600 px-4 py-2 hover:bg-gray-200 mt-4">
                <Link to="/"> CONTINUE SHOPPING</Link>
              </button>
            </>
          )}
        </div>
        <div className="w-full lg:w-1/4 p-4">
          <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <p className="font-semibold">Subtotal:</p>
              <p className="font-semibold">${getTotalPrice().toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Shipping:</p>
              <p className="font-semibold">$5.00</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Total:</p>
              <p className="font-semibold">
                ${(getTotalPrice() + 5).toFixed(2)}
              </p>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-red-700 text-white text-center px-4 py-2 hover:bg-red-500 mt-4 lg:bg-blue-700 lg:hover:bg-blue-500"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
