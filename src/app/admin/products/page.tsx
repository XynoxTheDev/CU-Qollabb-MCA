'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Package, Menu, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { products as initialProducts, categories } from '@/lib/data';
import { Product } from '@/lib/types';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function AdminProductsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchSuery, setSearchSuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    stock: '',
    image: '',
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchSuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchSuery.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAddProduct = () => {
    const product: Product = {
      id: String(products.length + 1),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      image: newProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
      category: newProduct.category,
      rating: 4.0,
      reviewCount: 0,
      stock: parseInt(newProduct.stock) || 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts([...products, product]);
    setIsAddDialogOpen(false);
    setNewProduct({ name: '', description: '', price: '', category: 'Electronics', stock: '', image: '' });
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
              <Link href="/admin/products" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary text-white">
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link href="/admin/orders" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
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
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary text-white">
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
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
        <main className="flex-1 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Products</h1>
              <p className="text-slate-500">Manage your product inventory</p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Product Name</Label>
                    <Input 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Enter product name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input 
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Enter description"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Price</Label>
                      <Input 
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="0.00"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Stock</Label>
                      <Input 
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        placeholder="0"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <select 
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <Button onClick={handleAddProduct} className="w-full">Add Product</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search products..."
                  value={searchSuery}
                  onChange={(e) => setSearchSuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded bg-slate-100 overflow-hidden">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge className={product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
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