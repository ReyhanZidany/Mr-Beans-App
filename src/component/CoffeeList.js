// src/components/CoffeeList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CoffeeAPIService } from "../apiService";
import bakedImage from '../assets/excelso1.png';
import Footer from "./Footer";

const CoffeeList = () => {
  const [coffeeBeans, setCoffeeBeans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (typeof caches !== "undefined") {
        try {
          const cache = await caches.open("coffee-cache");
          const cachedData = await cache.match("/api/coffee");

          if (cachedData) {
            const cachedJson = await cachedData.json();
            setCoffeeBeans(cachedJson);
            return;
          }

          const beans = await CoffeeAPIService.fetchCoffeeBeans();
          setCoffeeBeans(beans);

          const response = new Response(JSON.stringify(beans));
          await cache.put("/api/coffee", response);
        } catch (error) {
          console.error("Caching error:", error);
          // Fallback to fetch data directly if caching fails
          const beans = await CoffeeAPIService.fetchCoffeeBeans();
          setCoffeeBeans(beans);
        }
      } else {
        // Fetch data directly if `caches` is unavailable
        const beans = await CoffeeAPIService.fetchCoffeeBeans();
        setCoffeeBeans(beans);
      }
    }

    fetchData();
  }, []);

  const groupByRegion = (beans) => {
    return beans.reduce((groups, coffee) => {
      const region = coffee.region || "Unknown";
      if (!groups[region]) {
        groups[region] = [];
      }
      groups[region].push(coffee);
      return groups;
    }, {});
  };

  const filteredCoffeeBeans = coffeeBeans.filter(coffee =>
    coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedCoffeeBeans = groupByRegion(filteredCoffeeBeans);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-full mx-0 p-0">
        <div className="w-full">
          <img src={bakedImage} alt="Baked Coffee" className="w-full h-auto mb-5 md:h-64 lg:h-80 object-cover" />
        </div>
        <h1 className="text-3xl font-medium mb-4 font-permanent-marker text-center">Coffee Beans Menu</h1>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4 w-full max-w-xs"
          />
        </div>

        {Object.keys(groupedCoffeeBeans).map(region => (
          <div key={region} className="mb-8">
            <h2 className="text-2xl font-medium mb-2 font-permanent-marker">{region}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedCoffeeBeans[region].map((coffee) => (
                <Link to={`/coffee/${coffee.id}`} key={coffee.id} className="block p-4 border border-gray-300 rounded hover:shadow-lg transition-shadow duration-200">
                  <img src={coffee.image_url} alt={coffee.name} className="w-40 h-40 object-cover rounded-lg mb-2" />
                  <h3 className="text-lg font-medium font-permanent-marker">{coffee.name}</h3>
                  <p className="text-gray-600">${coffee.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CoffeeList;
