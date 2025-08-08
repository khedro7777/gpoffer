import React from 'react';

const DeliveryTerms = ({ text }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Delivery Terms</h2>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default DeliveryTerms;


