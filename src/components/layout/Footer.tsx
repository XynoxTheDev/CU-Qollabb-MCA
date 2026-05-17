import Link from 'next/link';
import { Send, Truck, RotateCcw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FacebookIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
  { name: 'X (Twitter)', href: 'https://twitter.com', icon: TwitterIcon },
  { name: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { name: 'YouTube', href: 'https://youtube.com', icon: YoutubeIcon },
];

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Electronics', href: '/products?category=Electronics' },
    { label: 'Fashion', href: '/products?category=Fashion' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
  ],
  support: [
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'FAQs', href: '/faqs' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Minimal Top Bar */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <span className="flex items-center gap-1.5 sm:gap-2"><Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" /> <span className="hidden xs:inline">Free shipping over $50</span><span className="xs:hidden">Free $50+</span></span>
              <span className="flex items-center gap-1.5 sm:gap-2"><RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" /> <span className="hidden sm:inline">30-day returns</span><span className="sm:hidden">30 days</span></span>
              <span className="hidden md:flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Secure checkout</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-slate-400 text-xs sm:text-sm whitespace-nowrap">
              <span className="hidden xs:inline">+1 (555) 123-4567</span>
              <span>support@shopiverse.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-white font-bold">
                S
              </div>
              <span className="text-lg font-bold text-white">Shopiverse</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4 max-w-xs hidden sm:block">
              Your trusted online store for quality products at great prices.
            </p>
            
            {/* Newsletter - Compact */}
            <div className="mb-4 hidden sm:block">
              <p className="text-sm text-white mb-2">Subscribe for updates</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                />
                <Button className="px-3 py-2 bg-primary hover:bg-primary/90 text-sm">
                  <Send className="h-3 w-3" />
                </Button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 hover:bg-primary transition-colors text-white"
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-medium text-sm mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-medium text-sm mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-medium text-sm mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Shopiverse. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
              <Link href="/cookies" className="hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}