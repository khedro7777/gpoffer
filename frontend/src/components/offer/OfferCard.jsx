import React from 'react';

const OfferCard = ({ title, currentDiscount, currentParticipants, timeLeft, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer" onClick={onClick}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-1">Current Discount: <span className="font-medium text-green-600">{currentDiscount}</span></p>
      <p className="text-gray-600 mb-1">Participants: <span className="font-medium">{currentParticipants}</span></p>
      <p className="text-gray-600">Time Left: <span className="font-medium text-red-500">{timeLeft}</span></p>
    </div>
  );
};

export default OfferCard;


