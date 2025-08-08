import React from 'react';

const AdminActions = ({ editOffer, cancelOffer }) => {
  return (
    <div className="flex space-x-4">
      {editOffer && (
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Edit Offer
        </button>
      )}
      {cancelOffer && (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Cancel Offer
        </button>
      )}
    </div>
  );
};

export default AdminActions;


