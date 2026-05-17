'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const ratingLabel = `Rated ${product.rating.toFixed(1)} out of 5 by ${product.reviewCount} customers`;

  return (
    <Link
      href={`/products/${product.id}`}
      aria-label={`${product.name}, ${product.category}, $${product.price.toFixed(2)}`}
      className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          {imgError ? (
            <div role="img" aria-label="Image unavailable" className="absolute inset-0 flex items-center justify-center bg-slate-200">
              <span className="text-slate-400 text-sm">No Image</span>
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}
          {product.originalPrice && (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg px-4 py-1">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-slate-500 mb-1">{product.category}</p>
          <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div role="img" aria-label={ratingLabel} className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span aria-hidden="true" className="text-xs text-slate-500">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-500 line-through">
                  <span className="sr-only">Original price </span>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              aria-label={`Add ${product.name} to cart`}
              className="opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity"
            >
              <ShoppingCart aria-hidden="true" className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}