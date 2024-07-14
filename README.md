# Timbucloudshop

Timbucloudshop is a fully responsive and visually appealing e-commerce web application developed with Vite, React, Tailwind CSS, and Axios. Timbu Cloud shop is built using Timbu APIs for product management and a simulated checkout flow.

## Features
- **Product Catalog Management:** Display at least 10 products with images from the Timbu API, with proper pagination.
- **User Interaction:** Users can view products, add them to the cart, adjust quantities, and remove items.
- **Simulated Checkout Flow:** A complete checkout process without real payment processing.
- **Responsive Design:** The application is fully responsive, providing a seamless experience across different devices.
- **Error Handling:** Proper UI state management and error handling for a smooth user experience.

## Technologies Used
- **Vite:** A fast build tool for modern web projects.
- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Axios:** A promise-based HTTP client for making API requests.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/designers-shop.git
    cd designers-shop
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Setup environment variables:**
    Create a `.env` file in the root of the project and add your Timbu API credentials:
    ```env
    VITE_TIMBU_API_KEY=your_timbu_api_key
    VITE_TIMBU_API_BASE_URL=https://api.timbu.cloud/v1
    VITE_TIMBU_API_ID=your_timbu_api_id
    ```

### Running the Application
To start the development server:
```sh
npm run dev


Project Structure

src/
├── components/
│   ├── CartContext.jsx
│   ├── ProductList.jsx
│   └── ProductDetails.jsx
├── pages/
│   ├── Home.jsx
│   ├── Cart.jsx
│   └── Product.jsx
├── api/
│   ├── fetchProducts.js
│   └── fetchProductById.js
├── App.jsx
└── main.jsx

#API Integration
#Fetching Products

import axios from 'axios';

const Apikey = process.env.VITE_TIMBU_API_KEY;
const Appid = process.env.VITE_TIMBU_API_ID;
const organizationid = 'eb1b7ba0e53c4f7faa7a82ec423daae5';

export const fetchProducts = async (page = 1, size = 10) => {
  try {
    const url = `${process.env.VITE_TIMBU_API_BASE_URL}/products?organization_id=${organizationid}&reverse_sort=false&page=${page}&size=${size}&Appid=${Appid}&Apikey=${Apikey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const url = `${process.env.VITE_TIMBU_API_BASE_URL}/products/${id}?organization_id=${organizationid}&Appid=${Appid}&Apikey=${Apikey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

#Displaying Products

import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/fetchProducts';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 shadow-md">
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
          <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
          <p className="mt-1 text-red-800 font-semibold">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
Product Details
ProductDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/fetchProductById';
import { useCart } from '../components/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>No product details found.</p>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 shadow-md">
        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
        <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
        <p className="mt-1 text-red-800 font-semibold">${product.price.toFixed(2)}</p>
        <p className="mt-4">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 px-4 py-2 bg-red-700 text-white rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
Cart Functionality
CartContext.jsx


import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
Contribution
Feel free to fork this repository and create pull requests. For major changes, please open an issue first to discuss what you would like to change.

License
This project is licensed under the MIT License.
