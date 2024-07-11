import React, { useState } from "react";
import { useCart } from "./CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="bg-white shadow-md border border-red-700 overflow-hidden w-full mb-">
      <img
        src={product.image}
        alt={product.name}
        className="object-cover w-full h-40 md:h-64"
      />
      <div className="p-4">
        <h2 className="text-lg text-center font-semibold text-red-800">
          {product.name}
        </h2>
        <p className="text-red-800 text-center font-semibold mt-2">
          ${product.price}
        </p>
      </div>
      <div className="p-4 flex items-center justify-center">
        <div className="flex items-center space-x-4 px-2 font-bold">
          <div className="flex items-center justify-center border border-orange-800 p-2 rounded">
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="bg-white border-none focus:outline-none"
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-red-700 text-white px-2 py-2 hover:bg-red-800 h-11 flex items-center justify-center font-semibold text-sm sm:text-sm md:text-base-text-sm rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
