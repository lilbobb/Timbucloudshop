import React from "react";
import { useLocation } from "react-router-dom";
import ProgressSteps from "../components/Progressteps";

const OrderComplete = () => {
  const location = useLocation();
  const {
    billingDetails,
    shippingDetails,
    orderSummary,
    subtotal,
    shippingCost,
    total,
    orderNumber,
    date,
    paymentMethod,
    note,
  } = location.state || {};

  if (!orderSummary) {
    return <div>Invalid order details. Please try again.</div>;
  }

  // Function to safely format price
  const formatPrice = (price) => {
    return !isNaN(price) && price !== undefined ? price.toFixed(2) : "0.00";
  };

  return (
    <div className="container mx-auto p-4" style={{ maxWidth: "90%" }}>
    <ProgressSteps/>

      <div className="md:flex justify-between items-start">
        {/* Bank Details Section */}
        <div className="border-b md:border-b-0 md:pr-8 pb-4 mb-4 md:mb-0 mt-10">
          <h2 className="text-lg font-semibold mb-5">Bank Details</h2>
          <p className="mb-2">WRIST'S LTD. Bank FCMB</p>
          <p className="mb-2">Account Number: 200233485</p>
          <p className="mb-2">WRIST'S LTD. Union FCMB</p>
          <p>Account Number: 110334568</p>
        </div>

        {/* Thank You Message and Order Details */}
        <div className="md:flex-2 md:pl-8 mt-10">
          <h1 className="text-xl font-semibold text-green-800 mb-4">
            Thank you, your order has been received!
          </h1>
          <div className="bg-gray-200 border-t mt-4 pt-4 py-2">
            <li className="mb-2 px-2">Order Number: {orderNumber}</li>
            <li className="mb-2 px-2">Date: {date}</li>
            <li className="mb-2 px-2 text-red-600">
              Total: ${formatPrice(total)}
            </li>
            <li className="mb-2 px-2">Payment Method: {paymentMethod}</li>
          </div>
        </div>
      </div>

      {/* Detailed Order Information */}
      <div className="bg-white mt-8">
        <h3 className="text-lg font-semibold text-left">Order Details</h3>
        <div className="border-t border-[#b3b3b3] mt-4 pt-4">
          <div className="flex justify-between py-2 font-semibold">
            <p>PRODUCT</p>
            <p>Total</p>
          </div>
          {orderSummary.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <p>{item.name}</p>
              <p>${formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
          <div className="flex justify-between py-1 font-semibold border-[#b3b3b3] border-t pt-2">
            <p>Subtotal</p>
            <p>${formatPrice(subtotal)}</p>
          </div>
          <div className="flex justify-between py-1 font-semibold">
            <p>Shipping</p>
            <p>${formatPrice(shippingCost)}</p>
          </div>
          <div className="flex justify-between py-1 font-semibold">
            <p>Payment Method</p>
            <p>{paymentMethod}</p>
          </div>
          <div className="flex justify-between py-1 font-semibold border-[#b3b3b3] border-t pt-2">
            <p>Total</p>
            <p className="text-red-500">${formatPrice(total)}</p>
          </div>
          {note && (
            <div className="py-1 font-semibold">
              <p>Note</p>
              <p>{note}</p>
            </div>
          )}
        </div>
      </div>

      {/* Billing and Shipping Details Section */}
      <div className="md:flex mt-10">
        <div className="md:flex-1 md:pr-8">
          <h2 className="text-lg font-semibold">Billing Details</h2>
          {billingDetails ? (
            <>
              <p>
                {billingDetails.firstName} {billingDetails.lastName}
              </p>
              <p>{billingDetails.address}</p>
              <p>
                {billingDetails.city}, {billingDetails.state}{" "}
                {billingDetails.zip}
              </p>
              <p>{billingDetails.country}</p>
              <p>Email: {billingDetails.email}</p>
              <p>Phone: {billingDetails.phone}</p>
            </>
          ) : (
            <p>Billing details not available.</p>
          )}
        </div>
        <div className="md:flex-1 md:pl-8">
          <h2 className="text-lg font-semibold">Shipping Details</h2>
          {shippingDetails ? (
            <>
              <p>
                {shippingDetails.firstName} {shippingDetails.lastName}
              </p>
              <p>{shippingDetails.address}</p>
              <p>
                {shippingDetails.city}, {shippingDetails.state}{" "}
                {shippingDetails.zip}
              </p>
              <p>{shippingDetails.country}</p>
              <p>Email: {shippingDetails.email}</p>
              <p>Phone: {shippingDetails.phone}</p>
            </>
          ) : (
            <p>Shipping details not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
