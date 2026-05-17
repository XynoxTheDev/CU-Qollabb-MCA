'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Minus, Plus, ShoppingCart, Truck, RotateCcw, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { getProductById, products } from '@/lib/data/mock-data';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const product = getProductById(params.id as string);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>('description');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <Button onClick={() => router.push('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <span className="text-slate-400">/</span>
          <Link href="/products" className="text-sm text-slate-500 hover:text-primary">Products</Link>
          <span className="text-slate-400">/</span>
          <span className="text-sm text-slate-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
              <Image
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-lg px-3 py-1">
                  Sale
                </Badge>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <Badge variant="outline" className="text-sm">{product.category}</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-500">({product.reviewCount} reviews)</span>
              <span className={`px-2 py-1 rounded text-sm ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  <Badge className="bg-red-500">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            <p className="text-slate-600 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Product Info Accordion */}
            <div className="space-y-4">
              <div 
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => toggleSection('description')}
              >
                <span className="font-medium">Description</span>
                {expandedSection === 'description' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
              {expandedSection === 'description' && (
                <p className="text-slate-600 text-sm pb-4">{product.description}</p>
              )}

              <div 
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => toggleSection('shipping')}
              >
                <span className="font-medium">Shipping Information</span>
                {expandedSection === 'shipping' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
              {expandedSection === 'shipping' && (
                <div className="flex items-center gap-3 pb-4 text-sm text-slate-600">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Free shipping on orders over $50. Standard delivery 3-5 business days.</span>
                </div>
              )}

              <div 
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => toggleSection('returns')}
              >
                <span className="font-medium">Returns & Refunds</span>
                {expandedSection === 'returns' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
              {expandedSection === 'returns' && (
                <div className="flex items-center gap-3 pb-4 text-sm text-slate-600">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>30-day return policy. Items must be in original condition with tags attached.</span>
                </div>
              )}

              <div 
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => toggleSection('warranty')}
              >
                <span className="font-medium">Warranty</span>
                {expandedSection === 'warranty' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
              {expandedSection === 'warranty' && (
                <div className="flex items-center gap-3 pb-4 text-sm text-slate-600">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>1-year manufacturer warranty covering defects in materials and workmanship.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}