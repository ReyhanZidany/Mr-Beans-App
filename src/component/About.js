// src/components/About.js
import React from 'react';
import coffeeImage from '../assets/mrbeans.png';
import Footer from './Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-4xl mx-auto p-6 text-center rounded-lg mt-10 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">About Us</h1>
        <img src={coffeeImage} alt="Coffee Beans" className="w-full h-auto md:h-64 object-cover rounded-lg mb-6" />
        <p className="mb-4 text-gray-700 text-lg">
          Welcome to our Coffee Beans website! We are passionate about providing you with the finest selection of coffee beans from around the world.
        </p>
        <p className="mb-4 text-gray-700 text-lg">
          Our mission is to connect coffee lovers with high-quality coffee products and educate them about the different varieties of coffee.
        </p>
        <p className="text-gray-700 text-lg">
          Explore our Coffee List to discover new flavors and aromas!
        </p>
        <a href="/coffees" className="mt-6 inline-block bg-black text-white font-permanent-marker font-medium py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
          View Menu
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default About;
