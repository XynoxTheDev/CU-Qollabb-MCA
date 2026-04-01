'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, LogOut, LayoutDashboard, Search, Heart, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/products?category=Electronics', label: 'Electronics' },
  { href: '/products?category=Fashion', label: 'Fashion' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = getCartCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}
    >
      {/* Top Bar */}
      <div className="hidden lg:block bg-slate-900 text-white text-xs py-1">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>Free shipping on orders over $50</span>
            <span className="text-slate-400">|</span>
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex items-center gap-4">
            <span>USD</span>
            <span className="text-slate-400">|</span>
            <span>English</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white font-bold text-lg shadow-lg">
                S
              </div>
              <span className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Shopiverse</span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  type="search"
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 h-10 bg-slate-50 border-slate-200 rounded-full focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </form>

            {/* Right Side Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Wishlist - Desktop */}
              <Link href="#" className="hidden md:flex p-2 hover:bg-slate-100 rounded-full transition-colors">
                <Heart className="h-5 w-5 text-slate-700" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ShoppingCart className="h-5 w-5 text-slate-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu - Desktop */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-3">
                  {user?.role === 'admin' && (
                    <Link href="/admin">
                      <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary">
                        <LayoutDashboard className="h-4 w-4 mr-1" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{user?.name?.split(' ')[0]}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={logout} className="text-slate-500 hover:text-red-500">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-slate-600">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="rounded-full px-6">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col gap-6 mt-6">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        type="search"
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 h-11 bg-slate-50"
                      />
                    </form>

                    {/* Mobile Nav Links */}
                    <nav className="space-y-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            pathname === link.href 
                              ? 'bg-primary text-white' 
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>

                    <hr className="border-slate-100" />

                    {/* Mobile User Section */}
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 px-4">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-medium">
                            {user?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{user?.name}</p>
                            <p className="text-sm text-slate-500">{user?.email}</p>
                          </div>
                        </div>
                        {user?.role === 'admin' && (
                          <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                            <LayoutDashboard className="h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        )}
                        <Button variant="outline" onClick={logout} className="w-full mx-4 flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3 px-4">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="outline" className="w-full">Login</Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button className="w-full">Sign Up</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation - Desktop */}
      <div className="hidden md:block border-t border-slate-100">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-8 h-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary' : 'text-slate-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex-1"></div>
            <Link href="/products?category=Home%20&%20Garden" className="text-sm font-medium text-slate-600 hover:text-primary">
              Home & Garden
            </Link>
            <Link href="/products?category=Sports" className="text-sm font-medium text-slate-600 hover:text-primary">
              Sports
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}