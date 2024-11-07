import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 text-center mt-10">
      <p className="text-gray-700 text-sm m-0">&copy; {new Date().getFullYear()} Mr. Beans. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
