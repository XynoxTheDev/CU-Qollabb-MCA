import { NextResponse } from 'next/server';
import { stripe, createPaymentIntent } from '@/lib/server/stripe';
import { requireAuth } from '@/lib/server/auth-middleware';
import { prisma } from '@/lib/server/db';

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 500 }
    );
  }

  try {
    const user = await requireAuth(request);

    const body = await request.json();
    const { items, shippingAddress, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { error: 'Shipping address and payment method are required' },
        { status: 400 }
      );
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      subtotal += product.price * item.quantity;
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const order = await prisma.order.create({
      data: {
        userId: user.userId,
        total,
        status: 'pending',
        shippingAddress: JSON.stringify(shippingAddress),
        paymentMethod,
        items: {
          create: orderItems,
        },
      },
    });

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (product) {
        await prisma.product.update({
          where: { id: product.id },
          data: { stock: product.stock - item.quantity },
        });
      }
    }

    const paymentIntent = await createPaymentIntent(total, {
      orderId: order.id,
      userId: user.userId,
      items: JSON.stringify(items.map((i: { productId: string; quantity: number }) => ({
        productId: i.productId,
        quantity: i.quantity,
      }))),
    });

    return NextResponse.json({
      clientSecret: paymentIntent?.client_secret || '',
      orderId: order.id,
      amount: total,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}