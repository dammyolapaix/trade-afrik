'use client'

import Image from 'next/image'
import Link from 'next/link'

import { IconEye, IconHeart, IconShoppingCart } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { ProductWithRelationships } from '@/features/products/types'

type Props = {
  product: ProductWithRelationships
}

export function ProductCard({ product }: Props) {
  console.log('product', product)

  const { name, image, category, price } = product

  return (
    <div className="flex flex-col rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
      {/* Category Name */}
      <div className="mb-2">
        <Link
          href="#"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          {category.name}
        </Link>
      </div>

      {/* Product Image */}
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={''}
          width={100}
          height={100}
          className="h-full w-full object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{name}</h3>

        {/* Price */}
        <div className="mb-4">
          <span className="text-xl font-bold text-blue-600">
            ${price.toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="flex-1">
            <IconShoppingCart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <IconHeart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <IconEye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
