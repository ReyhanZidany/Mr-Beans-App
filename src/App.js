// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoffeeList from "./component/CoffeeList";
import CoffeeDetail from "./component/CoffeeDetail";
import Profile from './component/Profile';
import Navbar from "./component/Navbar"; 
import About from './component/About';
import Home from './component/Home';
import Cart from "./component/Cart";

const App = () => {
  // Initialize cartItems with data from localStorage if it exists, otherwise use an empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add coffee items to the cart
  const addToCart = (coffee) => {
    setCartItems((prevItems) => [...prevItems, coffee]);
  };

  // Function to clear the cart and remove data from localStorage
  const clearCart = () => {
    setCartItems([]); // Clear the cart items in state
    localStorage.removeItem("cartItems"); // Clear the cart items in localStorage
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col"> 
        <Navbar cartItemCount={cartItems.length} /> {/* Pass the cart item count to Navbar */}
        <main className="flex-grow pt-16"> 
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} /> {/* Pass addToCart to Home */}
            <Route path="/coffees" element={<CoffeeList />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/coffee/:id" 
              element={<CoffeeDetail addToCart={addToCart} />} 
            />
            <Route path="/profile" element={<Profile />} /> 
            <Route 
              path="/cart" 
              element={<Cart cartItems={cartItems} clearCart={clearCart} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
