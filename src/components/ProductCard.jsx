// ProductCard.js
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, closeCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = async () => {
    setLoading(true);
    await addToCart({ ...product, price, quantity, imageUrl });
    setLoading(false);
    closeCart(); // Close the cart after adding the item
    navigate("/"); // Navigate to home or another route
  };

  const { name, photos, current_price } = product;
  const price = current_price?.[0]?.LRD?.[0] ?? 0;
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
            e.target.src = "/fallback-image.png";
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
              className="bg-white border rounded"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-[#943510] text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
