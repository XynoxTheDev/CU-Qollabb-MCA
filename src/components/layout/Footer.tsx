import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  quickLinks: [
    { label: 'Products', href: '/products' },
    { label: 'Cart', href: '/cart' },
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
  ],
  customerService: [
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

const socialLinks = [
  { href: '#', label: 'Facebook' },
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
                Q
              </div>
              <span className="text-xl font-bold text-white">Shopiverse</span>
            </Link>
            <p className="text-slate-400 mb-4">
              Your one-stop shop for premium products at unbeatable prices. Shop with confidence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full bg-slate-800 hover:bg-primary transition-colors text-white text-sm font-medium"
                  aria-label={social.label}
                >
                  {social.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>123 Commerce Street, Business City, BC 12345</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@qollabb.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Shopiverse. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.customerService.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}