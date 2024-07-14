// ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Apikey = "9f0107ebc147481caa81275271e10a6920240712132305877558";
const Appid = "Y9A66PC22ZLJORZ";
const organizationid = "eb1b7ba0e53c4f7faa7a82ec423daae5";

const fetchProductById = async (id) => {
  try {
    const response = await axios.get(
      `https://timbu-get-single-product.reavdev.workers.dev/?organization_id=${organizationid}&product_id=${id}&Appid=${Appid}&Apikey=${Apikey}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw new Error("Failed to fetch product details");
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch (error) {
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

  const {
    unique_id,
    name,
    photos = [],
    current_price = [],
    description = "",
  } = product;

  const price = current_price?.[0]?.LRD?.[0] ?? 0;
  const priceDisplay = !isNaN(price) ? price.toFixed(2) : "N/A";

  const imageUrl =
    photos.length > 0
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
            e.target.onerror = null; // Prevent infinite fallback loop
            e.target.src = "/fallback-image.png"; // Fallback image
          }}
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-red-800">{name}</h2>
          <p className="text-red-800 font-semibold mt-2">${priceDisplay}</p>
          <p className="mt-4">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
