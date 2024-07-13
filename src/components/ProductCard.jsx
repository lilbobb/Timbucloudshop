import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = async () => {
    setLoading(true);
    await addToCart({ ...product, price, quantity, imageUrl });
    setLoading(false);
  };

  const { name, photos, current_price } = product;

  // Safely access current_price[0].LRD[0] using optional chaining
  const price = current_price?.[0]?.LRD?.[0] ?? 0;

  // Ensure price is a number and default to "N/A" if not available
  const priceDisplay = !isNaN(price) ? price.toFixed(2) : "N/A";

  const imageUrl =
    photos && photos.length > 0
      ? `https://api.timbu.cloud/images/${photos[0].url}`
      : "/fallback-image.png";

  return (
    <div className="bg-white shadow-md border border-[#943510] overflow-hidden w-full mb-4">
      <Link to={`/product/${product.unique_id}`}>
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-40 md:h-64"
          onError={(e) => {
            e.target.src = "/fallback-image.png"; // Fallback image
          }}
        />
      </Link>
      <div className="p-4">
        <h2 className="text-lg text-center font-semibold text-[#943510]">
          {name}
        </h2>
        <p className="text-[#943510] text-center font-semibold mt-2">
          ${priceDisplay}
        </p>
      </div>
      <div className="p-4 flex items-center justify-center">
        <div className="flex items-center space-x-4 px-2 font-bold">
          <div className="flex items-center justify-center border border-[#943510] p-2 rounded">
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              aria-label="Select quantity"
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
          disabled={loading}
          className={`bg-[#A02724] text-white px-4 py-2 hover:bg-red-800 flex items-center justify-center font-semibold text-sm md:text-base rounded transition ${
            loading ? "opacity-50" : ""
          }`}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
