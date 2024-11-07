// src/components/CoffeeDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CoffeeAPIService } from "../apiService";
import { FaShoppingCart } from "react-icons/fa";

const CoffeeDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [coffee, setCoffee] = useState(null);
  const [coffeeList, setCoffeeList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    async function fetchCoffeeDetail() {
      const beans = await CoffeeAPIService.fetchCoffeeBeans();
      // Menyimpan data coffee ke localStorage untuk akses offline
      localStorage.setItem('coffeeBeans', JSON.stringify(beans));

      const selectedCoffee = beans.find((coffee) => coffee.id === parseInt(id));
      setCoffee(selectedCoffee);
      setCoffeeList(beans);
    }

    // Mengecek apakah data tersedia di localStorage
    const storedBeans = localStorage.getItem('coffeeBeans');
    if (storedBeans) {
      const beans = JSON.parse(storedBeans);
      const selectedCoffee = beans.find((coffee) => coffee.id === parseInt(id));
      setCoffee(selectedCoffee);
      setCoffeeList(beans);
    } else {
      fetchCoffeeDetail();
    }
  }, [id]);

  if (!coffee) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(coffee);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const sameRegionCoffees = coffeeList.filter(
    (coffeeItem) => coffeeItem.region === coffee.region && coffeeItem.id !== coffee.id
  );

  return (
    <div className="p-4 max-w-7xl mx-auto rounded-lg bg-white">
      <div className="flex flex-col md:flex-row items-start md:mb-5 gap-4">
        <img
          src={coffee.image_url}
          alt={coffee.name}
          className="w-full md:w-1/2 h-64 md:h-96 rounded-lg object-cover"
        />
        <div className="w-full md:w-1/2">
          <h2 className="text-xl md:text-2xl font-medium text-gray-800 font-permanent-marker">{coffee.name}</h2>
          <p className="text-base md:text-lg text-gray-600 mb-3">{coffee.description}</p>
          <p className="text-sm md:text-base text-gray-700">Region: {coffee.region}</p>
          <p className="text-sm md:text-base text-gray-700">Weight: {coffee.weight}g</p>
          <p className="text-sm md:text-base text-gray-700">Price: ${coffee.price}</p>
          <p className="text-sm md:text-base text-gray-700">Roast Level: {coffee.roast_level}</p>

          <h4 className="mt-4 md:mt-5 text-lg font-semibold text-gray-800">Flavor Profile:</h4>
          <ul className="list-disc list-inside pl-5 text-gray-700 text-sm md:text-base">
            {coffee.flavor_profile.map((flavor) => (
              <li key={flavor}>{flavor}</li>
            ))}
          </ul>
          <h4 className="mt-4 md:mt-5 text-lg font-semibold text-gray-800">Grind Options:</h4>
          <ul className="list-disc list-inside pl-5 text-gray-700 text-sm md:text-base">
            {coffee.grind_option.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>

          <button
            onClick={handleAddToCart}
            className="mt-4 flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300 font-permanent-marker z-50"
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded shadow-lg font-permanent-marker">
          Item added to cart!
        </div>
      )}

      <h4 className="text-xl md:text-2xl font-medium mt-8 md:mt-12 mb-4 text-center font-permanent-marker">
        More Coffees from the Same Region:
      </h4>

      <div className="flex flex-wrap justify-center gap-4">
        {sameRegionCoffees.map((coffeeItem) => (
          <Link
            key={coffeeItem.id}
            to={`/coffee/${coffeeItem.id}`}
            className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 w-full sm:w-48"
          >
            <img
              src={coffeeItem.image_url}
              alt={coffeeItem.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex justify-center items-center">
              <span className="text-center font-medium text-base md:text-lg text-gray-800 font-permanent-marker">
                {coffeeItem.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoffeeDetail;
