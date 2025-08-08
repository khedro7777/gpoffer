import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, TrendingDown, MapPin } from 'lucide-react'

export function OfferCard({ offer, onViewDetails }) {
  const {
    title,
    product_service,
    target_region,
    base_price,
    current_participants,
    deadline,
    status
  } = offer

  const timeLeft = deadline ? new Date(deadline).toLocaleDateString() : 'No deadline'
  const discountPercentage = Math.min(current_participants * 2, 30) // Simple discount calculation

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">{title}</CardTitle>
          <Badge variant={status === 'Active' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{product_service}</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {target_region}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <TrendingDown className="h-4 w-4 mr-1 text-green-600" />
            <span className="font-medium text-green-600">{discountPercentage}% OFF</span>
          </div>
          <div className="text-lg font-bold">${base_price}</div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            {current_participants} participants
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            {timeLeft}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((current_participants / 100) * 100, 100)}%` }}
          ></div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onViewDetails(offer)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

