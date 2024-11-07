// src/component/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mrbeans.png';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ cartItemCount }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerButtonRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target) && !hamburgerButtonRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside); 
    };
  }, [isSidebarOpen]);

  return (
    <nav className="bg-white p-4 shadow-md fixed w-full z-10">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="Bean Roast Logo" className="h-10 cursor-pointer" />
        </Link>

        <button
          ref={hamburgerButtonRef}
          onClick={toggleSidebar}
          className="text-gray-800 md:hidden"
        >
          <FaBars className="h-6 w-6" />
        </button>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-800 font-medium font-permanent-marker hover:text-black focus:text-black transition duration-300">Home</Link>
          <Link to="/about" className="text-gray-800 font-medium font-permanent-marker hover:text-black focus:text-black transition duration-300">About</Link>
          <Link to="/coffees" className="text-gray-800 font-medium font-permanent-marker hover:text-black focus:text-black transition duration-300">Menu</Link>
          <Link to="/profile" className="text-gray-800 font-medium font-permanent-marker hover:text-black focus:text-black transition duration-300">Profile</Link>
          
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-gray-800 h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20">
          <div ref={sidebarRef} className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-4">
            <button onClick={toggleSidebar} className="text-gray-800 mb-4">
              <FaTimes className="h-6 w-6" />
            </button>
            <Link to="/" onClick={toggleSidebar} className="block text-gray-800 font-medium font-permanent-marker py-2 hover:text-black focus:text-black transition duration-300">Home</Link>
            <Link to="/about" onClick={toggleSidebar} className="block text-gray-800 font-medium font-permanent-marker py-2 hover:text-black focus:text-black transition duration-300">About</Link>
            <Link to="/coffees" onClick={toggleSidebar} className="block text-gray-800 font-medium font-permanent-marker py-2 hover:text-black focus:text-black transition duration-300">Menu</Link>
            <Link to="/profile" onClick={toggleSidebar} className="block text-gray-800 font-medium font-permanent-marker py-2 hover:text-black focus:text-black transition duration-300">Profile</Link>
            <Link to="/cart" onClick={toggleSidebar} className="block text-gray-800 font-medium font-permanent-marker py-2 hover:text-black focus:text-black transition duration-300">
              Cart
              {cartItemCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
