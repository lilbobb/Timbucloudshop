import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center bg-[url('/image.png')] bg-cover bg-center flex flex-col items-center justify-center h-64 text-white">
        <h1 className="text-3xl font-bold mb-2 text-red-700">
          ALL PRODUCTS CATEGORIES
        </h1>
        <p>
          All categories of watches available at WRIST'S, both male and female
        </p>
        <p>also available in different sizes.</p>
      </div>
      <div className="grid grid-cols-1 lg:w-auto md:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
