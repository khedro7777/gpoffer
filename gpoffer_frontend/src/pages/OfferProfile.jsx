import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Shield, 
  CreditCard, 
  Truck, 
  FileText,
  Download,
  Bitcoin,
  DollarSign,
  Clock,
  TrendingDown
} from 'lucide-react';

export function OfferProfile({ offerId }) {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockOffer = {
      id: 1,
      title: "Premium Office Chairs - Bulk Purchase",
      description: "High-quality ergonomic office chairs perfect for corporate environments. Features adjustable height, lumbar support, and premium materials. Ideal for offices, co-working spaces, and home offices.",
      product_service: "Office Furniture",
      category: "Office Furniture",
      target_region: "MENA",
      base_price: 299,
      current_participants: 45,
      minimum_joiners: 10,
      deadline: "2025-09-15T23:59:59",
      status: "Active",
      images: [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
      ],
      pdf_file_path: "/documents/office-chairs-specs.pdf",
      terms_conditions: "All sales are final. Shipping within 2-3 weeks of order confirmation. Warranty included for 2 years.",
      payment_methods: ["paypal", "crypto", "cash_on_delivery"],
      discount_strategy: [
        { participants: 10, price: 289 },
        { participants: 25, price: 269 },
        { participants: 50, price: 249 },
        { participants: 100, price: 229 }
      ],
      supplier: {
        id: 1,
        store_name: "Premium Office Solutions",
        rating: 4.8,
        location: "Dubai, UAE",
        kyc_status: "verified",
        total_sales: 156
      }
    };

    setTimeout(() => {
      setOffer(mockOffer);
      setLoading(false);
    }, 1000);
  }, [offerId]);

  const handleJoinOffer = () => {
    if (!isAuthenticated) {
      // Trigger login/register modal
      alert('Please login or register to join this offer');
      return;
    }
    // Join offer logic
    console.log('Joining offer...');
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      // Trigger login/register modal
      alert('Please login or register to purchase');
      return;
    }
    // Purchase logic
    console.log('Proceeding to purchase...');
  };

  const getCurrentPrice = () => {
    if (!offer) return offer?.base_price;
    
    const strategy = offer.discount_strategy;
    const participants = offer.current_participants;
    
    for (let i = strategy.length - 1; i >= 0; i--) {
      if (participants >= strategy[i].participants) {
        return strategy[i].price;
      }
    }
    return offer.base_price;
  };

  const getNextDiscount = () => {
    if (!offer) return null;
    
    const strategy = offer.discount_strategy;
    const participants = offer.current_participants;
    
    for (let tier of strategy) {
      if (participants < tier.participants) {
        return {
          participants: tier.participants,
          price: tier.price,
          needed: tier.participants - participants
        };
      }
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Offer Not Found</h2>
          <p className="text-gray-600">The offer you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const currentPrice = getCurrentPrice();
  const nextDiscount = getNextDiscount();
  const savings = offer.base_price - currentPrice;
  const savingsPercentage = Math.round((savings / offer.base_price) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  <div className="space-y-4">
                    <img 
                      src={offer.images[0]} 
                      alt={offer.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      {offer.images.slice(1).map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={`${offer.title} ${index + 2}`}
                          className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={offer.status === 'Active' ? 'default' : 'secondary'}>
                        {offer.status}
                      </Badge>
                      <Badge variant="outline">{offer.category}</Badge>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900">{offer.title}</h1>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{offer.target_region}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Ends {new Date(offer.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-green-600">${currentPrice}</span>
                        {savings > 0 && (
                          <span className="text-lg text-gray-500 line-through">${offer.base_price}</span>
                        )}
                      </div>
                      {savings > 0 && (
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">
                            Save ${savings} ({savingsPercentage}% off)
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span>{offer.current_participants} people joined</span>
                    </div>

                    {nextDiscount && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>{nextDiscount.needed} more people</strong> needed to unlock 
                          <strong> ${nextDiscount.price}</strong> price!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{offer.description}</p>
              </CardContent>
            </Card>

            {/* Pricing Tiers */}
            <Card>
              <CardHeader>
                <CardTitle>Volume Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {offer.discount_strategy.map((tier, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        offer.current_participants >= tier.participants 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">{tier.participants}+ people</div>
                        <div className="text-2xl font-bold text-green-600">${tier.price}</div>
                        {offer.current_participants >= tier.participants && (
                          <Badge className="mt-2">Unlocked!</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Terms & Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Terms & Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Terms & Conditions</h4>
                  <p className="text-gray-700 text-sm">{offer.terms_conditions}</p>
                </div>
                
                {offer.pdf_file_path && (
                  <div>
                    <h4 className="font-semibold mb-2">Product Documentation</h4>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card>
              <CardHeader>
                <CardTitle>Join This Offer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">${currentPrice}</div>
                  <div className="text-sm text-gray-600">Current price per unit</div>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={handleJoinOffer}
                    className="w-full"
                    size="lg"
                  >
                    Join Group Offer
                  </Button>
                  <Button 
                    onClick={handleBuyNow}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Buy Now
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  No payment required to join. Pay only when you decide to purchase.
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {offer.payment_methods.includes('paypal') && (
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span>PayPal</span>
                    </div>
                  )}
                  {offer.payment_methods.includes('crypto') && (
                    <div className="flex items-center gap-2 text-sm">
                      <Bitcoin className="h-4 w-4 text-orange-500" />
                      <span>Cryptocurrency</span>
                    </div>
                  )}
                  {offer.payment_methods.includes('cash_on_delivery') && (
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-green-600" />
                      <span>Cash on Delivery</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {offer.supplier.store_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{offer.supplier.store_name}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{offer.supplier.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{offer.supplier.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  {offer.supplier.total_sales} successful sales
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  View Seller Profile
                </Button>
              </CardContent>
            </Card>

            {/* Deadline */}
            <Card>
              <CardHeader>
                <CardTitle>Time Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span>Ends on {new Date(offer.deadline).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Join now to secure your spot in this group offer
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferProfile;

