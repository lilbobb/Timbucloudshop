import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // New state for cart visibility

  const addToCart = (product) => {
    if (
      !product.id ||
      !product.name ||
      product.price <= 0 ||
      product.quantity <= 0
    ) {
      console.error(`Invalid product data for product ${product.id}:`, product);
      return;
    }

    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product }];
      }
    });

    // Open the cart when an item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId);
      if (item) {
        if (item.quantity > 1) {
          return prevItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevItems.filter((item) => item.id !== productId);
        }
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity);

      if (
        !isNaN(itemPrice) &&
        itemPrice >= 0 &&
        !isNaN(itemQuantity) &&
        itemQuantity >= 0
      ) {
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

  // Function to toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Function to close the cart
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        isCartOpen,
        toggleCart,
        closeCart, // Expose closeCart function
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
