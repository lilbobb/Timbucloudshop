import React from "react";
import { useLocation } from "react-router-dom";

const OrderComplete = () => {
  const location = useLocation();
  const {
    orderDetails,
    orderSummary,
    total,
    orderNumber,
    date,
    paymentMethod,
  } = location.state || {};

  if (!orderDetails) {
    return <div>Invalid order details. Please try again.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p>Your order has been placed successfully. Here are the details:</p>

      <div className="bg-white shadow-md p-4 border border-gray-500 mt-4">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          {orderSummary.map((item, index) => (
            <div key={index} className="flex justify-between">
              <p className="text-gray-700">{item.product}</p>
              <p className="text-red-500">${item.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t pt-2">
            <p>Subtotal</p>
            <p className="text-red-500">${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <p>Total</p>
            <p className="text-red-500">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md p-4 border border-gray-500 mt-4">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="font-semibold">Order Number:</p>
            <p>{orderNumber}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Date:</p>
            <p>{date}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Payment Method:</p>
            <p>{paymentMethod}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Billing Details:</p>
            <p>
              {orderDetails.firstName} {orderDetails.lastName}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md p-4 border border-gray-500 mt-4">
        <h2 className="text-xl font-semibold mb-4">Our Bank Details</h2>
        <p>WRISTS LTD. Bank FCMB Account number: 200233485</p>
        <p>WRISTS LTD. Union FCMB Account number: 110334568</p>
      </div>
    </div>
  );
};

export default OrderComplete;
