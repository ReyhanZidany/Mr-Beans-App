import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CoffeeAPIService } from "../apiService";
import beansImage from '../assets/roast1.jpg';
import Footer from './Footer';

const Home = () => {
  const [coffeeList, setCoffeeList] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchCoffeeList() {
      if (typeof caches !== "undefined") {
        try {
          const cache = await caches.open("my-cache");
          const cachedData = await cache.match("/api/coffee");

          if (cachedData) {
            const cachedJson = await cachedData.json();
            setCoffeeList(cachedJson);
            return;
          }
          
          const beans = await CoffeeAPIService.fetchCoffeeBeans();
          setCoffeeList(beans);

          const response = new Response(JSON.stringify(beans));
          await cache.put("/api/coffee", response);
        } catch (error) {
          console.error("Caching error:", error);
          // Fallback to fetch data directly if caching fails
          const beans = await CoffeeAPIService.fetchCoffeeBeans();
          setCoffeeList(beans);
        }
      } else {
        // Fetch data directly if `caches` is unavailable
        const beans = await CoffeeAPIService.fetchCoffeeBeans();
        setCoffeeList(beans);
      }
    }

    fetchCoffeeList();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollBy({
          left: 1,
          behavior: 'smooth'
        });
      }
    };

    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-full mx-0 p-0">
        <img 
          src={beansImage} 
          alt="Coffee Beans" 
          className="w-full h-auto mb-5 md:h-64 lg:h-80 object-cover" 
        />
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-medium mb-4 font-permanent-marker text-center">
          Welcome to Mr.Beans
        </h1>
        <div ref={scrollContainerRef} className="flex overflow-hidden py-2">
          {coffeeList.map((coffee) => (
            <Link 
              key={coffee.id} 
              to={`/coffee/${coffee.id}`} 
              className="flex flex-col items-center text-gray-800 border border-gray-300 rounded-lg p-3 mr-4 flex-shrink-0 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <img 
                src={coffee.image_url} 
                alt={coffee.name} 
                className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 object-cover rounded-lg mb-2" 
              />
              <span className="text-xl font-medium mb-4 text-center font-permanent-marker">{coffee.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
