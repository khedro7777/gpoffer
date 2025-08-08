import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Calendar, Upload, AlertCircle, CheckCircle } from 'lucide-react'

export function SupplierPanel() {
  const [formData, setFormData] = useState({
    title: '',
    productService: '',
    targetRegion: '',
    basePrice: '',
    deadline: '',
    minimumJoiners: '',
    termsConditions: '',
    visibility: 'public'
  })

  const [discountStrategy, setDiscountStrategy] = useState([
    { participants: 10, price: 0 },
    { participants: 50, price: 0 },
    { participants: 100, price: 0 }
  ])

  const [kycStatus] = useState('verified') // Mock KYC status

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDiscountChange = (index, field, value) => {
    setDiscountStrategy(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', { formData, discountStrategy })
    // In a real app, this would submit to the API
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Supplier Panel</h1>
          <p className="text-gray-600 mt-2">Create and manage your group offers</p>
        </div>

        {/* KYC Status */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              {kycStatus === 'verified' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">KYC Verified</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Verified Supplier
                  </Badge>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-yellow-600 font-medium">KYC Pending</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Verification Required
                  </Badge>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Offer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Offer Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter a compelling offer title"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productService">Product / Service *</Label>
                  <Select onValueChange={(value) => handleInputChange('productService', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Office Furniture</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="clothing">Clothing & Textiles</SelectItem>
                      <SelectItem value="industrial">Industrial Equipment</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="targetRegion">Target Region *</Label>
                  <Select onValueChange={(value) => handleInputChange('targetRegion', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MENA">MENA</SelectItem>
                      <SelectItem value="EU">Europe</SelectItem>
                      <SelectItem value="Asia">Asia</SelectItem>
                      <SelectItem value="Africa">Africa</SelectItem>
                      <SelectItem value="Americas">Americas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="basePrice">Base Price (USD) *</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => handleInputChange('basePrice', e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="deadline">Deadline to Join *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="minimumJoiners">Minimum Joiners (Optional)</Label>
                <Input
                  id="minimumJoiners"
                  type="number"
                  value={formData.minimumJoiners}
                  onChange={(e) => handleInputChange('minimumJoiners', e.target.value)}
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Discount Strategy */}
          <Card>
            <CardHeader>
              <CardTitle>Discount Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Set pricing tiers based on participant count</Label>
                {discountStrategy.map((tier, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label>Participants</Label>
                      <Input
                        type="number"
                        value={tier.participants}
                        onChange={(e) => handleDiscountChange(index, 'participants', parseInt(e.target.value))}
                        placeholder="Number of participants"
                      />
                    </div>
                    <div>
                      <Label>Price per unit (USD)</Label>
                      <Input
                        type="number"
                        value={tier.price}
                        onChange={(e) => handleDiscountChange(index, 'price', parseFloat(e.target.value))}
                        placeholder="Price at this tier"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="termsConditions">Terms & Conditions</Label>
                <Textarea
                  id="termsConditions"
                  value={formData.termsConditions}
                  onChange={(e) => handleInputChange('termsConditions', e.target.value)}
                  placeholder="Enter your terms and conditions..."
                  rows={4}
                />
              </div>

              <div>
                <Label>Upload PDF or Terms File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, DOC up to 10MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Offer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Visibility</Label>
                <RadioGroup
                  value={formData.visibility}
                  onValueChange={(value) => handleInputChange('visibility', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public - Anyone can see and join</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="invite" id="invite" />
                    <Label htmlFor="invite">Invite Only - Only invited users can join</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Label>GPO Points Required to Publish</Label>
                  <Badge variant="secondary">15 Points</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  You currently have enough points to publish this offer
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              Create Offer
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

