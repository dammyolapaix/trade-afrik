import { Check, Globe, Mail, MessageSquare } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type Props = {
  sellerData: {
    id: string
    name: string
    verified: boolean
    location: string
    joinedDate: string
    rating: number
    reviewCount: number
    responseRate: string
    responseTime: string
    fulfillmentRate: string
    productsCount: number
    about: string
    specialties: string[]
    certifications: string[]
  }
}

export default function AboutSeller({ sellerData }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <h2 className="mb-4 text-xl font-semibold">About {sellerData.name}</h2>
        <div className="text-muted-foreground space-y-4">
          <p>{sellerData.about}</p>
        </div>

        <h3 className="mt-6 mb-2 text-lg font-medium">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {sellerData.specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>

        <h3 className="mt-6 mb-2 text-lg font-medium">Certifications</h3>
        <div className="flex flex-wrap gap-2">
          {sellerData.certifications.map((cert, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-green-500 bg-green-50 text-green-700"
            >
              <Check className="mr-1 h-3 w-3" />
              {cert}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="bg-card rounded-xl border p-6">
          <h3 className="mb-4 text-lg font-medium">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Globe className="text-muted-foreground mr-3 h-5 w-5" />
              <a href="#" className="text-primary hover:underline">
                akwaabacrafts.com
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="text-muted-foreground mr-3 h-5 w-5" />
              <a
                href="mailto:info@akwaabacrafts.com"
                className="text-primary hover:underline"
              >
                info@akwaabacrafts.com
              </a>
            </div>
            <Separator />
            <div className="pt-2">
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Seller
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-card mt-6 rounded-xl border p-6">
          <h3 className="mb-4 text-lg font-medium">Business Hours</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Monday - Friday</span>
              <span>9:00 AM - 5:00 PM GMT</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span>10:00 AM - 2:00 PM GMT</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
