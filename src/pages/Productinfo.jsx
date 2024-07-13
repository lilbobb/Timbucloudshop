import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../Api";
import { useCart } from "../components/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>No product details found.</p>;

  const { unique_id, name, photos, current_price, description } = product;

  const price = current_price?.[0]?.LRD?.[0] ?? 0;

  const priceDisplay = !isNaN(price) ? price.toFixed(2) : "N/A";

  const imageUrl =
    photos && photos.length > 0
      ? `https://api.timbu.cloud/images/${photos[0].url}`
      : "/fallback-image.png";

  return (
    <div className="container mx-auto p-4 max-w-5xl mb-20">
      <div className="bg-white shadow-md border border-red-700 overflow-hidden w-full mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-64"
          onError={(e) => {
            e.target.src = "/fallback-image.png"; 
          }}
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-red-800">{name}</h2>
          <p className="text-red-800 font-semibold mt-2">${priceDisplay}</p>
          <p className="mt-4">{description}</p>
          <button
            onClick={() =>
              addToCart({
                id: unique_id, 
                name,
                price,
                quantity: 1,
                imageUrl, 
              })
            }
            className="mt-4 px-4 py-2 bg-[#A02724] text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
