import React, { useState } from "react";
import { useCart } from "./CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="bg-white shadow-md border-2 border-red-800 overflow-hidden rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="object-cover w-full h-48 md:h-64"
      />
      <div className="p-4">
        <h2 className="text-lg text-center font-semibold text-red-800">
          {product.name}
        </h2>
        <p className="text-red-800 text-center font-semibold mt-2">
          ${product.price}
        </p>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-orange-800">
            <button
              onClick={decrement}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-l"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 text-center bg-white border-none focus:outline-none"
            />
            <button
              onClick={increment}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-r"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-red-700 text-white px-4 py-2 hover:bg-red-800 h-10 flex items-center justify-center text-sm md:text-base"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
