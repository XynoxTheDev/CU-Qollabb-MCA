'use client';

import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Search, Eye, ChevronDown, ChevronUp, Menu, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { orders as initialOrders } from '@/lib/data';
import { Order } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as Order['status'] } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
            S
          </div>
          <span className="text-lg font-bold text-slate-900">Shopiverse</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
                  S
                </div>
                <span className="text-lg font-bold text-slate-900">Shopiverse</span>
              </Link>
              <p className="text-xs text-slate-500 mt-1">Admin Dashboard</p>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
                <Package className="h-5 w-5" />
                Dashboard
              </Link>
              <Link href="/admin/products" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link href="/admin/orders" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary text-white">
                <Package className="h-5 w-5" />
                Orders
              </Link>
            </nav>

            <div className="p-4 border-t">
              <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
                <Settings className="h-5 w-5" />
                Back to Store
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex pt-14 md:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r h-screen sticky top-0">
          <div className="p-6 border-b">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
                S
              </div>
              <span className="text-xl font-bold text-slate-900">Shopiverse</span>
            </Link>
            <p className="text-xs text-slate-500 mt-1">Admin Dashboard</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
              <Package className="h-5 w-5" />
              Dashboard
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary text-white">
              <Package className="h-5 w-5" />
              Orders
            </Link>
          </nav>

          <div className="p-4 border-t">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
              <Settings className="h-5 w-5" />
              Back to Store
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Orders</h1>
            <p className="text-slate-500">Manage and track customer orders</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <Fragment key={order.id}>
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.shippingAddress.fullName}</TableCell>
                        <TableCell className="text-slate-500">{order.createdAt}</TableCell>
                        <TableCell>
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(order.status)}`}
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </TableCell>
                        <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                          >
                            {expandedOrder === order.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedOrder === order.id && (
                        <TableRow>
                          <TableCell colSpan={6} className="bg-slate-50">
                            <div className="p-4">
                              <h4 className="font-medium mb-3">Order Details</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-slate-500 mb-1">Shipping Address:</p>
                                  <p className="font-medium">
                                    {order.shippingAddress.fullName}<br />
                                    {order.shippingAddress.address}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-slate-500 mb-1">Payment Method:</p>
                                  <p className="font-medium">{order.paymentMethod}</p>
                                </div>
                              </div>
                              <div className="mt-4">
                                <p className="text-slate-500 mb-2">Items:</p>
                                <div className="space-y-2">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-white p-2 rounded">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">{item.product.name}</span>
                                        <span className="text-slate-500">x{item.quantity}</span>
                                      </div>
                                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}