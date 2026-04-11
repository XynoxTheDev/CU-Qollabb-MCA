import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('Created admin user:', admin.email);

  // Create customer user
  const customerPassword = await bcrypt.hash('password123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      password: customerPassword,
      role: 'customer',
    },
  });
  console.log('Created customer user:', customer.email);

  // Products data
  const products = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.',
      price: 249.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      images: JSON.stringify(['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop']),
      category: 'Electronics',
      rating: 4.8,
      reviewCount: 124,
      stock: 50,
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      description: 'Advanced smartwatch with health monitoring, GPS, water resistance, and 7-day battery life.',
      price: 399.99,
      originalPrice: 449.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
      category: 'Electronics',
      rating: 4.6,
      reviewCount: 89,
      stock: 35,
    },
    {
      id: '3',
      name: 'Portable Bluetooth Speaker',
      description: 'Compact and powerful Bluetooth speaker with 360-degree sound, waterproof design, and 20-hour playtime.',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
      category: 'Electronics',
      rating: 4.5,
      reviewCount: 67,
      stock: 80,
    },
    {
      id: '4',
      name: 'Wireless Earbuds Pro',
      description: 'True wireless earbuds with noise cancellation and premium audio quality. Includes charging case.',
      price: 179.99,
      originalPrice: 229.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop',
      category: 'Electronics',
      rating: 4.7,
      reviewCount: 156,
      stock: 100,
    },
    {
      id: '5',
      name: 'Mechanical Gaming Keyboard',
      description: 'RGB mechanical keyboard with customizable keys, detachable cable, and durable construction.',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=800&fit=crop',
      category: 'Electronics',
      rating: 4.4,
      reviewCount: 45,
      stock: 60,
    },
    {
      id: '6',
      name: 'Ultra HD Action Camera',
      description: '4K action camera with image stabilization, waterproof case, and Wi-Fi connectivity.',
      price: 299.99,
      originalPrice: 349.99,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
      category: 'Electronics',
      rating: 4.3,
      reviewCount: 38,
      stock: 25,
    },
    {
      id: '7',
      name: 'Smart Home Hub',
      description: 'Central control hub for your smart home devices. Compatible with Alexa, Google Home, and Apple HomeKit.',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&h=800&fit=crop',
      category: 'Electronics',
      rating: 4.2,
      reviewCount: 52,
      stock: 40,
    },
    {
      id: '9',
      name: 'Classic Denim Jacket',
      description: 'Timeless denim jacket with premium quality denim, comfortable fit, and versatile style.',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=800&fit=crop',
      category: 'Fashion',
      rating: 4.5,
      reviewCount: 34,
      stock: 70,
    },
    {
      id: '10',
      name: 'Premium Leather Wallet',
      description: 'Genuine leather wallet with multiple card slots, ID window, and bill compartment.',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop',
      category: 'Fashion',
      rating: 4.6,
      reviewCount: 89,
      stock: 85,
    },
    {
      id: '11',
      name: 'Running Shoes Pro',
      description: 'Lightweight running shoes with advanced cushioning, breathable mesh, and durable outsole.',
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      category: 'Fashion',
      rating: 4.7,
      reviewCount: 112,
      stock: 95,
    },
    {
      id: '12',
      name: 'Designer Sunglasses',
      description: 'Stylish sunglasses with UV400 protection, polarized lenses, and premium frame quality.',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
      category: 'Fashion',
      rating: 4.4,
      reviewCount: 56,
      stock: 45,
    },
    {
      id: '13',
      name: 'Casual Cotton T-Shirt Pack',
      description: 'Pack of 3 premium cotton t-shirts. Comfortable, durable, and perfect for everyday wear.',
      price: 49.99,
      originalPrice: 69.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      category: 'Fashion',
      rating: 4.3,
      reviewCount: 78,
      stock: 120,
    },
    {
      id: '14',
      name: 'Leather Crossbody Bag',
      description: 'Elegant leather crossbody bag with adjustable strap, multiple compartments, and secure closure.',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop',
      category: 'Fashion',
      rating: 4.5,
      reviewCount: 45,
      stock: 55,
    },
    {
      id: '15',
      name: 'Modern Table Lamp',
      description: 'Sleek modern table lamp with adjustable brightness, touch control, and elegant design.',
      price: 69.99,
      originalPrice: 89.99,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
      category: 'Home & Garden',
      rating: 4.4,
      reviewCount: 34,
      stock: 40,
    },
    {
      id: '16',
      name: 'Indoor Plant Set',
      description: 'Set of 3 easy-care indoor plants with decorative pots. Add greenery to your space.',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=800&fit=crop',
      category: 'Home & Garden',
      rating: 4.2,
      reviewCount: 28,
      stock: 30,
    },
    {
      id: '17',
      name: 'Cozy Throw Blanket',
      description: 'Soft and warm throw blanket perfect for cold evenings. Machine washable.',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
      category: 'Home & Garden',
      rating: 4.6,
      reviewCount: 67,
      stock: 75,
    },
    {
      id: '19',
      name: 'Yoga Mat Premium',
      description: 'Extra thick yoga mat with non-slip surface. Eco-friendly material and included carrying strap.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
      category: 'Sports',
      rating: 4.7,
      reviewCount: 145,
      stock: 100,
    },
    {
      id: '20',
      name: 'Adjustable Dumbbells Set',
      description: 'Space-saving adjustable dumbbells with weight range 5-25 lbs. Quick-change weight system.',
      price: 249.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop',
      category: 'Sports',
      rating: 4.6,
      reviewCount: 78,
      stock: 35,
    },
    {
      id: '22',
      name: 'Cycling Helmet',
      description: 'Safety-certified cycling helmet with adjustable fit, ventilation system, and aerodynamic design.',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=800&fit=crop',
      category: 'Sports',
      rating: 4.5,
      reviewCount: 56,
      stock: 60,
    },
  ];

  // Create products
  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
    console.log('Created product:', created.name);
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });