import React, { useState } from "react";

const Checkout = () => {
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  // Dummy order data for demonstration
  const orderSummary = [
    { product: "Product 1", price: 20.0 },
    { product: "Product 2", price: 30.0 },
  ];

  // Calculate total order price
  const total = orderSummary.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={billingDetails.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={billingDetails.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={billingDetails.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={billingDetails.state}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Zip Code</label>
              <input
                type="text"
                name="zip"
                value={billingDetails.zip}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {orderSummary.map((item, index) => (
              <div key={index} className="flex justify-between">
                <p className="text-gray-700">{item.product}</p>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between font-semibold border-t pt-2">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
