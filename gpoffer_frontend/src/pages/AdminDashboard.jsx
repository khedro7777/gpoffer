import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2
} from 'lucide-react'

export function AdminDashboard() {
  const [settings, setSettings] = useState({
    groupOffersEnabled: true,
    dynamicDiscountsEnabled: true,
    autoKycApproval: false
  })

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeOffers: 0,
    pendingOffers: 0,
    totalRevenue: 0
  })

  const [offers, setOffers] = useState([])
  const [users, setUsers] = useState([])

  // Mock data
  useEffect(() => {
    setStats({
      totalUsers: 1247,
      activeOffers: 23,
      pendingOffers: 8,
      totalRevenue: 125000
    })

    setOffers([
      {
        id: 1,
        title: "Premium Office Chairs",
        supplier: "Office Solutions Inc.",
        status: "Active",
        participants: 45,
        created: "2025-08-01"
      },
      {
        id: 2,
        title: "Industrial Laptops",
        supplier: "Tech Supplies Ltd.",
        status: "Pending",
        participants: 0,
        created: "2025-08-05"
      },
      {
        id: 3,
        title: "Organic Coffee Beans",
        supplier: "Green Coffee Co.",
        status: "Active",
        participants: 67,
        created: "2025-07-28"
      }
    ])

    setUsers([
      {
        id: 1,
        username: "supplier1",
        email: "supplier@example.com",
        type: "supplier",
        kycStatus: "pending",
        isActive: true
      },
      {
        id: 2,
        username: "buyer1",
        email: "buyer@example.com",
        type: "buyer",
        kycStatus: "verified",
        isActive: true
      }
    ])
  }, [])

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const handleApproveOffer = (offerId) => {
    setOffers(prev => 
      prev.map(offer => 
        offer.id === offerId ? { ...offer, status: 'Active' } : offer
      )
    )
  }

  const handleRejectOffer = (offerId) => {
    setOffers(prev => 
      prev.map(offer => 
        offer.id === offerId ? { ...offer, status: 'Rejected' } : offer
      )
    )
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getKycBadge = (status) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage platform settings and monitor activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Offers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeOffers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Offers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingOffers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Settings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="groupOffers" className="text-base font-medium">
                  Enable Group Offers from Suppliers
                </Label>
                <p className="text-sm text-gray-600">Allow suppliers to create group purchasing offers</p>
              </div>
              <Switch
                id="groupOffers"
                checked={settings.groupOffersEnabled}
                onCheckedChange={(checked) => handleSettingChange('groupOffersEnabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dynamicDiscounts" className="text-base font-medium">
                  Enable Dynamic Discounts
                </Label>
                <p className="text-sm text-gray-600">Automatically adjust discounts based on participation</p>
              </div>
              <Switch
                id="dynamicDiscounts"
                checked={settings.dynamicDiscountsEnabled}
                onCheckedChange={(checked) => handleSettingChange('dynamicDiscountsEnabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoKyc" className="text-base font-medium">
                  Auto KYC Approval
                </Label>
                <p className="text-sm text-gray-600">Automatically approve KYC for low-risk users</p>
              </div>
              <Switch
                id="autoKyc"
                checked={settings.autoKycApproval}
                onCheckedChange={(checked) => handleSettingChange('autoKycApproval', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Offers Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>All Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">{offer.title}</TableCell>
                    <TableCell>{offer.supplier}</TableCell>
                    <TableCell>{getStatusBadge(offer.status)}</TableCell>
                    <TableCell>{offer.participants}</TableCell>
                    <TableCell>{offer.created}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {offer.status === 'Pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApproveOffer(offer.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectOffer(offer.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Users Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.type}</Badge>
                    </TableCell>
                    <TableCell>{getKycBadge(user.kycStatus)}</TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          {user.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

