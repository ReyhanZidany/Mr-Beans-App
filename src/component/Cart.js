// src/components/Cart.js
import React, { useState } from "react";

const Cart = ({ cartItems, clearCart }) => {
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const [notification, setNotification] = useState(""); 

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process user data and cart
    console.log({
      contact,
      name,
      address,
      shippingMethod,
      cartItems,
    });

    // Clear cart after submission
    clearCart();

    // Show notification after successful submission
    setNotification("Thank you for your purchase! Your order has been placed.");

    // Reset form fields
    setContact("");
    setName("");
    setAddress("");
    setShippingMethod("Standard");

    // Hide notification after 5 seconds
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <div className="p-5 max-w-4xl mx-auto bg-white rounded-lg mt-10">
      <h2 className="text-3xl font-medium mb-5 text-center font-permanent-marker">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-700">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 p-4 border border-gray-200 rounded-lg"
            >
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <span className="text-lg font-medium text-gray-800">{item.name}</span>
                <div className="text-gray-600">${item.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
          <div className="text-right font-semibold text-lg mb-4">
            Total: ${totalAmount.toFixed(2)}
          </div>

          <h3 className="text-2xl font-medium mb-4">Shipping Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Contact (Email or Mobile Phone Number):</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Address:</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Shipping Method:</label>
              <select
                value={shippingMethod}
                onChange={(e) => setShippingMethod(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              >
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Payment Method:</label>
              <p className="text-gray-600">Cash on Delivery (COD)</p>
            </div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 font-permanent-marker"
            >
              Complete Purchase
            </button>
          </form>

          {notification && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              {notification}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
