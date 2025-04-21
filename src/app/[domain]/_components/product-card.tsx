'use client'

import Image from 'next/image'

import { Heart, Star } from 'lucide-react'

import { AddToCartButton } from '@/components/add-to-cart-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ProductWithRelationships } from '@/features/products/types'

type Props = {
  product: ProductWithRelationships
}

export function ProductCard({ product }: Props) {
  const { name, image, category, price, id, salePrice, quantity } = product

  const rating = 4.9
  const reviewCount = 124

  return (
    <Card key={product.id} className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="bg-background/80 absolute top-2 right-2 h-8 w-8 rounded-full backdrop-blur-sm"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="text-muted-foreground mb-1 text-sm">
          {category.name}
        </div>
        <h3 className="line-clamp-2 font-medium">{name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold">${price.toFixed(2)}</span>
          <div className="flex items-center text-sm">
            <Star className="fill-primary text-primary mr-1 h-3 w-3" />
            {rating} ({reviewCount})
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton
          product={{
            id,
            name,
            price,
            salePrice,
            image,
            quantity,
          }}
        />
      </CardFooter>
    </Card>
  )
}
