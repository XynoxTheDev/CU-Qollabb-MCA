'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Minimal */}
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4">
              New Collection 2026
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Elevate Your Style
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Discover premium products at unbeatable prices
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories - Compact Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.name}`}
                className="group relative aspect-square rounded-xl overflow-hidden"
              >
                <Image
                  src={index === 0 
                    ? 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop'
                    : index === 1 
                    ? 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop'
                    : index === 2 
                    ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'
                    : 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop'
                  }
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-semibold text-lg">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Featured</h2>
            <Link href="/products" className="text-primary hover:underline text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=600&fit=crop"
              alt="Banner"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Flat 20% Off</h2>
                <p className="text-white/80 mb-4">On selected electronics</p>
                <Link href="/products?category=Electronics">
                  <Button variant="secondary" className="rounded-full">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Minimal */}
      <section className="py-12 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-xl font-bold text-white mb-2">Stay Updated</h2>
            <p className="text-slate-400 text-sm mb-4">Subscribe for exclusive offers and updates</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-primary"
              />
              <Button className="px-6 rounded-full text-sm">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}