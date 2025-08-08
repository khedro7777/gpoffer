import React from 'react';

const KYCStatusCheck = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
      <p className="font-bold">KYC Status:</p>
      <p>Pending verification. Please complete your KYC to publish offers.</p>
    </div>
  );
};

export default KYCStatusCheck;


