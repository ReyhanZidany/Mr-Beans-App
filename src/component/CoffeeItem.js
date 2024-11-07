// src/components/CoffeeItem.js
import React from "react";

const CoffeeItem = ({ coffee, onClick }) => {
  return (
    <div
      onClick={() => onClick(coffee)}
      className="cursor-pointer border border-gray-300 p-4 m-2 flex items-center hover:shadow-lg transition duration-200"
    >
      <img
        src={coffee.image_url}
        alt={coffee.name}
        className="w-12 h-12 mr-4 object-cover"
      />
      <div>
        <h3 className="text-lg font-medium text-gray-800">{coffee.name}</h3>
        <p className="text-gray-600">${coffee.price}</p>
      </div>
    </div>
  );
};

export default CoffeeItem;
