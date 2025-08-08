import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, ShoppingCart, CreditCard, Truck, Shield, TrendingUp, Wallet, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const buyerSteps = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Browse Group Offers",
      description: "Explore active group purchasing offers from verified suppliers worldwide."
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Join a Group",
      description: "Click to join an offer that interests you. No upfront payment required."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Watch Discounts Grow",
      description: "As more people join, the price drops automatically based on volume tiers."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Purchase Directly",
      description: "When ready, buy directly from the supplier using PayPal, crypto, or cash on delivery."
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Receive Your Order",
      description: "The supplier ships directly to you. Track your order and leave feedback."
    }
  ];

  const sellerSteps = [
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Get GPO Points",
      description: "Purchase points from our platform using PayPal or cryptocurrency to publish offers."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Complete KYC Verification",
      description: "Verify your business credentials to become a trusted supplier on our platform."
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Create Group Offers",
      description: "Set up your products with volume-based pricing tiers and payment methods."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Attract Buyers",
      description: "Buyers join your offers to unlock better prices. No platform fees on sales."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Receive Payments",
      description: "Get paid directly through your own PayPal or crypto wallet. Keep 100% of sales."
    }
  ];

  const walletFlow = [
    {
      title: "For Buyers",
      description: "No wallet required! Browse and join offers for free. Pay suppliers directly when purchasing.",
      features: ["Free to browse offers", "No platform fees", "Direct payment to suppliers"]
    },
    {
      title: "For Sellers",
      description: "Use GPO Points to publish offers. Buy points from us, then earn directly from customers.",
      features: ["Purchase points with PayPal/Crypto", "15 points per offer publication", "Keep 100% of sales revenue"]
    },
    {
      title: "Platform Revenue",
      description: "We only earn from selling GPO Points to suppliers. No transaction fees or commissions.",
      features: ["Point sales to suppliers", "No buyer fees", "No sales commissions"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">How It Works</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Understanding group purchasing is simple. Join forces, save money, and grow your business.
          </p>
        </div>
      </div>

      {/* For Buyers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Buyers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join group offers to unlock better prices. No fees, no commitments until you're ready to buy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {buyerSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-blue-600">
                  {step.icon}
                </div>
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 mx-auto mb-4 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Sellers Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Sellers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reach more customers through group purchasing. Pay only to publish, keep 100% of your sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {sellerSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-green-600">
                  {step.icon}
                </div>
                <div className="bg-green-600 text-white rounded-full w-8 h-8 mx-auto mb-4 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wallet Flow Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Wallet Flow Explanation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our transparent payment system ensures fair pricing for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {walletFlow.map((flow, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{flow.title}</h3>
                <p className="text-gray-600 mb-6">{flow.description}</p>
                <ul className="space-y-2">
                  {flow.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Group Purchasing?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Better Prices</h3>
              <p className="text-gray-600 text-sm">Volume discounts mean lower prices for everyone</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Suppliers</h3>
              <p className="text-gray-600 text-sm">All suppliers go through KYC verification</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Power</h3>
              <p className="text-gray-600 text-sm">Join thousands of smart buyers worldwide</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Wallet className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Hidden Fees</h3>
              <p className="text-gray-600 text-sm">Transparent pricing with no surprise charges</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our platform today and start saving with group purchasing power.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Browse Offers
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
              Become a Supplier
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;

