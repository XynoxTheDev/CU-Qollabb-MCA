'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = getCartCount();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-14 md:h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Shopiverse home"
            className="flex items-center gap-2 flex-shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div aria-hidden="true" className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-primary text-white font-bold">
              S
            </div>
            <span className="text-lg font-bold text-slate-900 hidden sm:block">Shopiverse</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.slice(0, 5).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors hover:text-primary rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isActive ? 'text-primary' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              aria-label={cartCount > 0 ? `Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}` : 'Cart, empty'}
              className="relative p-2 hover:bg-slate-100 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ShoppingCart aria-hidden="true" className="h-5 w-5 text-slate-700" />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-medium"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User - Desktop */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                {user?.role === 'admin' && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm" className="text-xs h-8">
                      <LayoutDashboard className="h-3 w-3 mr-1" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/profile" className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded-full">
                  <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-slate-700 hidden lg:block">{user?.name?.split(' ')[0]}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  aria-label="Log out"
                  className="h-8 w-8 text-slate-500 hover:text-red-500"
                >
                  <LogOut aria-hidden="true" className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-sm h-9">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="text-sm h-9 px-4">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu aria-hidden="true" className="h-5 w-5" />
              </Button>
              <SheetContent id="mobile-menu" side="right" className="w-[280px] sm:w-[320px]">
                <div className="flex flex-col gap-4 pt-12">
                  {/* Mobile Nav Links */}
                  <nav aria-label="Mobile" className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
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
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 px-3 py-2">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                          {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{user?.name}</p>
                          <p className="text-xs text-slate-500">{user?.email}</p>
                        </div>
                      </div>
                      {user?.role === 'admin' && (
                        <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                          <LayoutDashboard className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Button variant="outline" onClick={logout} className="w-full flex items-center gap-2 text-red-600">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2 px-3">
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
    </header>
  );
}