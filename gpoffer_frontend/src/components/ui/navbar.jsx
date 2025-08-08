import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, User, ShoppingCart, Settings } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">GPOFFER HUB</h1>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </a>
              <a href="/offers" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Browse Offers
              </a>
              <a href="/supplier" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Supplier Panel
              </a>
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm">
              Sign Up
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <a href="/" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">
              Home
            </a>
            <a href="/offers" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">
              Browse Offers
            </a>
            <a href="/supplier" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">
              Supplier Panel
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 space-x-3">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </div>
              <div className="mt-3 px-3">
                <Button size="sm" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

