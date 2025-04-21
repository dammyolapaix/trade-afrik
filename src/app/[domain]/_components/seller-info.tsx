import Image from 'next/image'

import {
  Calendar,
  Check,
  Clock,
  Filter,
  MapPin,
  MessageSquare,
  Package,
  Share2,
  Star,
  Truck,
  VerifiedIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import AboutSeller from './about-seller'
import Products from './products'

// Mock data for the seller
const sellerData = {
  id: 'akwaaba-crafts',
  name: 'Akwaaba Crafts',
  verified: true,
  location: 'Accra, Ghana',
  joinedDate: 'June 2022',
  rating: 4.8,
  reviewCount: 124,
  responseRate: '98%',
  responseTime: 'Under 24 hours',
  fulfillmentRate: '99.5%',
  productsCount: 42,
  about:
    'Akwaaba Crafts specializes in handmade Ghanaian textiles, baskets, and home decor items. Our artisans use traditional techniques passed down through generations, combined with contemporary designs to create unique pieces that bring the spirit of Ghana into homes worldwide. We work directly with local artisan communities to ensure fair compensation and sustainable practices.',
  specialties: [
    'Hand-woven baskets',
    'Kente cloth products',
    'Carved wooden items',
    'Beaded jewelry',
  ],
  certifications: ['Fair Trade Certified', 'Sustainable Materials'],
}

type Props = {
  storeId: string
}
export default function SellerInfo({ storeId }: Props) {
  return (
    <div>
      <div className="bg-muted relative h-[200px] w-full overflow-hidden sm:h-[300px]">
        <Image
          src="http://localhost:3000/images/cody-berg-ZUzF8lqTVrc-unsplash.jpg"
          alt="Store banner"
          fill
          className="object-cover"
          priority
        />
        <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-6 md:px-6">
        {/* Store Info */}
        <div className="relative mb-8 flex flex-col gap-6 md:flex-row md:items-end">
          <div className="border-background bg-muted relative -mt-12 h-24 w-24 overflow-hidden rounded-xl border-4 md:h-32 md:w-32">
            <Image
              src="http://localhost:3000/images/traders.jpg"
              alt={sellerData.name}
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold md:text-3xl">
                {sellerData.name}
              </h1>
              {sellerData.verified && (
                <Badge
                  variant="outline"
                  className="border-green-500 bg-green-50 text-green-700"
                >
                  <VerifiedIcon className="mr-1 h-3 w-3 bg-green-50" /> Verified
                  Seller
                </Badge>
              )}
            </div>

            <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {sellerData.location}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Member since {sellerData.joinedDate}
              </div>
              <div className="flex items-center">
                <Star className="fill-primary text-primary mr-1 h-4 w-4" />
                {sellerData.rating} ({sellerData.reviewCount} reviews)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Seller
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Store Stats */}
        <div className="bg-card mb-8 grid grid-cols-2 gap-4 rounded-xl border p-4 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <div className="text-muted-foreground flex items-center">
              <Package className="mr-2 h-4 w-4" />
              <span>Products</span>
            </div>
            <p className="text-2xl font-bold">{sellerData.productsCount}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <div className="text-muted-foreground flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>Response Time</span>
            </div>
            <p className="text-2xl font-bold">{sellerData.responseTime}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <div className="text-muted-foreground flex items-center">
              <Check className="mr-2 h-4 w-4" />
              <span>Response Rate</span>
            </div>
            <p className="text-2xl font-bold">{sellerData.responseRate}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <div className="text-muted-foreground flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              <span>Fulfillment</span>
            </div>
            <p className="text-2xl font-bold">{sellerData.fulfillmentRate}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:px-6">
        {/* Tabs */}
        <Tabs defaultValue="products" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">All Products</h2>
                <p className="text-muted-foreground text-sm">
                  {sellerData.productsCount} items
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Home Decor</DropdownMenuItem>
                    <DropdownMenuItem>Textiles</DropdownMenuItem>
                    <DropdownMenuItem>Kitchen</DropdownMenuItem>
                    <DropdownMenuItem>Jewelry</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Products storeId={storeId} />
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="mt-6">
            <AboutSeller sellerData={sellerData} />
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Customer Reviews</h2>
              <div className="flex items-center">
                <Star className="fill-primary text-primary mr-1 h-5 w-5" />
                <span className="font-medium">{sellerData.rating}</span>
                <span className="text-muted-foreground ml-1">
                  ({sellerData.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-muted-foreground text-center">
                Reviews will be displayed here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
