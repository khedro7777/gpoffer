import React from 'react';
import PDFViewer from '../components/shared/PDFViewer';
import SellerProfile from '../components/shared/SellerProfile';
import DiscountGraph from '../components/shared/DiscountGraph';
import DeliveryTerms from '../components/shared/DeliveryTerms';
import JoinOfferButton from '../components/offer/JoinOfferButton';

const OfferDetails = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Offer Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <PDFViewer url="/files/offer.pdf" />
          <DeliveryTerms text="Delivery in 14 days. Payment via bank." />
        </div>
        <div>
          <SellerProfile name="Supplier Inc." kyc="Verified" rating="4.8" />
          <DiscountGraph data={{}} /> {/* Placeholder for actual data */}
          <JoinOfferButton />
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;


