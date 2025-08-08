import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { OfferCard } from '@/components/ui/offer-card'
import { Search, Filter, TrendingUp, Users, ShoppingBag } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function Home() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for demonstration
  useEffect(() => {
    const mockOffers = [
      {
        id: 1,
        title: "Premium Office Chairs - Bulk Purchase",
        product_service: "Office Furniture",
        target_region: "MENA",
        base_price: 299,
        current_participants: 45,
        deadline: "2025-09-15",
        status: "Active"
      },
      {
        id: 2,
        title: "Industrial Laptops for Businesses",
        product_service: "Electronics",
        target_region: "EU",
        base_price: 899,
        current_participants: 23,
        deadline: "2025-09-20",
        status: "Active"
      },
      {
        id: 3,
        title: "Organic Coffee Beans - Restaurant Supply",
        product_service: "Food & Beverage",
        target_region: "Asia",
        base_price: 45,
        current_participants: 67,
        deadline: "2025-09-10",
        status: "Active"
      }
    ]
    
    setTimeout(() => {
      setOffers(mockOffers)
      setLoading(false)
    }, 1000)
  }, [])

  const handleViewDetails = (offer) => {
    console.log('View details for offer:', offer)
    // In a real app, this would navigate to offer details page
  }

  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.product_service.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Group Purchasing Made Simple
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Join forces with other buyers to unlock better prices and exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Browse Offers
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Become a Supplier
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">30%</h3>
              <p className="text-gray-600">Average Savings</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Successful Deals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Offers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Active Group Offers
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {!loading && filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No offers found matching your search.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of smart buyers who are already saving with group purchasing
          </p>
          <Button size="lg" variant="secondary">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  )
}

