import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { User, LogOut, Settings, ShoppingBag, Wallet, Download } from 'lucide-react'
import LoginModal from '@/components/auth/LoginModal'

export function Navbar() {
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  // PWA Install functionality
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowInstallButton(false)
    }
  }

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const getDashboardLink = () => {
    if (!user) return '/dashboard'
    
    switch (user.userType) {
      case 'seller':
        return '/supplier'
      case 'office':
        return '/admin'
      default:
        return '/buyer'
    }
  }

  return (
    <>
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-blue-600">
                GPOFFER HUB
              </a>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="/offers" className="text-gray-700 hover:text-blue-600 transition-colors">
                Browse Offers
              </a>
              <a href="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              {user?.userType === 'seller' && (
                <a href="/supplier" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Supplier Panel
                </a>
              )}
              {user?.userType === 'office' && (
                <a href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Admin Panel
                </a>
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Install App Button */}
              {showInstallButton && (
                <Button 
                  onClick={handleInstallClick}
                  variant="outline" 
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Install App
                </Button>
              )}

              {user ? (
                <div className="flex items-center space-x-4">
                  {/* Points Display for Sellers */}
                  {user.userType === 'seller' && (
                    <div className="flex items-center space-x-2">
                      <Wallet className="h-4 w-4 text-blue-600" />
                      <Badge variant="outline">
                        {user.gpoPoints || 0} Points
                      </Badge>
                    </div>
                  )}

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">{user.username}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <a href={getDashboardLink()} className="flex items-center">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Dashboard
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="/profile" className="flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          Profile Settings
                        </a>
                      </DropdownMenuItem>
                      {user.userType === 'seller' && (
                        <DropdownMenuItem asChild>
                          <a href="/wallet" className="flex items-center">
                            <Wallet className="h-4 w-4 mr-2" />
                            Wallet & Points
                          </a>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  )
}

