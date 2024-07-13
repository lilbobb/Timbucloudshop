import React from "react";
import { useLocation } from "react-router-dom";

const OrderComplete = () => {
  const location = useLocation();
  const {
    billingDetails,
    orderSummary,
    total,
    orderNumber,
    date,
    paymentMethod,
  } = location.state || {};

  if (!orderSummary) {
    return <div>Invalid order details. Please try again.</div>;
  }

  // Function to safely format price
  const formatPrice = (price) => {
    return !isNaN(price) && price !== undefined ? price.toFixed(2) : "0.00";
  };

  return (
    <div className="container mx-auto p-4">
      {/* Bank Details Section */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Bank Details</h2>
        <p className="mb-1">WRIST'S LTD . Bank FCMB</p>
        <p className="mb-1">Account Number: 200233485</p>
        <p className="mb-1">WRIST'S LTD . Union FCMB</p>
        <p>Account Number: 110334568</p>
      </div>

      {/* Thank You Message and Order Details */}
      <h1 className="text-xl font-semibold text-green-800 mb-4">
        Thank you, your order has been received!
      </h1>
      <div className="border-t mt-4 pt-4">
        <h2 className="text-lg font-semibold">Order Details</h2>
        <p className="mb-2">Order Number: {orderNumber}</p>
        <p className="mb-2">Date: {date}</p>
        <p className="mb-2">Payment Method: {paymentMethod}</p>
        <div className="border-t mt-4 pt-4">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          {orderSummary.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <p>{item.name}</p>
              <p>
                ${formatPrice(item.price)} x {item.quantity}
              </p>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t pt-2">
            <p>Total</p>
            <p className="text-red-500">${formatPrice(total)}</p>
          </div>
        </div>
      </div>

      {/* Billing Details Section */}
      <div className="border-t mt-4 pt-4">
        <h2 className="text-lg font-semibold">Billing Details</h2>
        <p>
          {billingDetails.firstName} {billingDetails.lastName}
        </p>
        <p>{billingDetails.address}</p>
        <p>
          {billingDetails.city}, {billingDetails.state} {billingDetails.zip}
        </p>
        <p>{billingDetails.country}</p>
        <p>Email: {billingDetails.email}</p>
        <p>Phone: {billingDetails.phone}</p>
      </div>
    </div>
  );
};

export default OrderComplete;
