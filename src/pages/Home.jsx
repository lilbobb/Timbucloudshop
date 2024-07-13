import React, { useEffect, useState } from "react";
import { fetchProducts } from "../Api";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useCart } from "../components/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { cartItems } = useCart();

  useEffect(() => {
    const getProducts = async (page) => {
      try {
        setLoading(true);
        const data = await fetchProducts(page, 10); // Fetch 10 products per page
        console.log(data)
        setProducts(data.items);
        setTotalPages(Math.ceil(data.total / 10)); // Assuming the API returns the total count of products
        setError(null);
      } catch (error) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProducts(currentPage);
  }, [currentPage]);

  return (
    <div>
      <header className="text-center bg-[url('/image.png')] bg-cover bg-center flex flex-col items-center justify-center h-64 text-white w-full">
        <h1 className="text-3xl font-bold mb-2 text-[#A22D2A]">
          ALL PRODUCTS CATEGORIES
        </h1>
        <p>
          All categories of watches available at WRIST'S, both male and female
        </p>
        <p>Also available in different sizes.</p>
      </header>
      <div className="container mx-auto p-4 max-w-5xl mb-20">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.unique_id} product={product} />
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
