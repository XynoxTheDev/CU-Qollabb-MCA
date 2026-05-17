'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-slate-100 mb-6">
              <ShoppingBag className="h-12 w-12 text-slate-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
            <p className="text-slate-500 mb-6">Looks like you haven&apos;t added any items to your cart yet.</p>
            <Link href="/products">
              <Button size="lg">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="overflow-hidden">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-slate-100">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="font-semibold text-slate-900 hover:text-primary transition-colors line-clamp-2 mb-1">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-500 mb-2">{item.product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal ({items.length} items)</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Estimated Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  {subtotal < 50 && (
                    <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-semibold text-slate-900">Total</span>
                  <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout" className="block">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}