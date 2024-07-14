import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import ProgressSteps from "../components/Progressteps";

const Checkout = () => {
  const { cartItems, getTotalPrice } = useCart();
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    orderNote: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Calculate total order price from cart items
  const total = getTotalPrice();

  const handlePlaceOrder = () => {
    const orderNumber = Math.floor(Math.random() * 1000000000);
    const date = new Date().toLocaleDateString();

    const orderDetails = {
      billingDetails,
      orderSummary: cartItems,
      total,
      orderNumber,
      date,
      paymentMethod,
    };

    navigate("/ordercomplete", { state: orderDetails });
  };

  return (
    <div className="container mx-auto p-4">
      <ProgressSteps />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md p-4 border border-gray-600">
          <h2 className="text-xl text-red-900 font-semibold mb-4">
            BILLING DETAILS
          </h2>
          <form className="space-y-4">
            {/* Billing details form fields */}
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                className="w-full border border-gray-500 p-2"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={billingDetails.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-500 p-2"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={billingDetails.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-500 p-2 rounded"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Country/Region</label>
              <input
                type="text"
                name="country"
                value={billingDetails.country}
                onChange={handleInputChange}
                className="w-full border border-gray-500 p-2"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={billingDetails.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-500 p-2"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Apartment</label>
                <input
                  type="text"
                  name="apartment"
                  value={billingDetails.apartment}
                  onChange={handleInputChange}
                  className="w-full border border-gray-500 p-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Town/City</label>
              <input
                type="text"
                name="city"
                value={billingDetails.city}
                onChange={handleInputChange}
                className="w-full border border-gray-500 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">State</label>
              <select
                name="state"
                value={billingDetails.state}
                onChange={handleInputChange}
                className="w-full border border-gray-500 p-2"
                required
              >
                <option value="">Select an option</option>
                {/* Add state options here */}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={billingDetails.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-500 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Order Note</label>
              <textarea
                name="orderNote"
                value={billingDetails.orderNote}
                onChange={handleInputChange}
                className="w-full border border-gray-500 p-2"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md p-4 border border-gray-500">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <div className="space-y-2">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <p className="text-gray-700">{item.name}</p>
                    <p className="text-red-500">
                      ${item.price ? item.price.toFixed(2) : "N/A"} x{" "}
                      {item.quantity}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between font-semibold border-t pt-2">
                  <p>Subtotal</p>
                  <p className="text-red-500">
                    ${total ? total.toFixed(2) : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <p>Total</p>
                  <p className="text-red-500">
                    ${total ? total.toFixed(2) : "N/A"}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="mt-4">
            <div className="mb-2">
              <input
                type="radio"
                id="bankTransfer"
                name="paymentMethod"
                value="Direct Bank Transfer"
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="bankTransfer" className="ml-2">
                Direct Bank Transfer (faster shipping)
              </label>
              <p className="text-gray-600 text-sm ml-6">
                Make your payment directly into our bank account. Please use
                your order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
            </div>
            <div className="mb-4">
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="Cash on Delivery"
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="cashOnDelivery" className="ml-2 border-gray-500">
                Cash on Delivery
              </label>
            </div>
            <button
              className="w-full bg-red-900 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
