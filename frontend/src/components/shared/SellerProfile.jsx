import React from 'react';

const SellerProfile = ({ name, kyc, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">Seller: {name}</h2>
      <p className="text-gray-600 mb-1">KYC Status: <span className="font-medium text-green-600">{kyc}</span></p>
      <p className="text-gray-600">Rating: <span className="font-medium">{rating}</span></p>
    </div>
  );
};

export default SellerProfile;


