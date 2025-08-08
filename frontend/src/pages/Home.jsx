import React from 'react';
import OfferCard from '../components/offer/OfferCard';

const Home = () => {
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, you'd use react-router-dom's useNavigate hook here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OfferCard
          title="Product Name"
          currentDiscount="20%"
          currentParticipants="55"
          timeLeft="2 days"
          onClick={() => navigate('/offer/123')}
        />
        {/* Add more OfferCard components as needed */}
      </div>
    </div>
  );
};

export default Home;


