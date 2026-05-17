'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '@/context/AuthContext';

let stripePromiseSingleton: ReturnType<typeof loadStripe> | null = null;
function getStripePromise() {
  if (typeof window === 'undefined') return null;
  if (!stripePromiseSingleton) {
    stripePromiseSingleton = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
  }
  return stripePromiseSingleton;
}

function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'Payment failed');
      setProcessing(false);
    } else if (paymentIntent?.status === 'succeeded') {
      onSuccess();
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 bg-slate-50 rounded-lg">
        <PaymentElement />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <Button type="submit" disabled={!stripe || processing} className="w-full mt-4">
        {processing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>('');
  const [fallbackOrderId] = useState<string>(() => 'ORD-' + Date.now().toString().slice(-6));
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  if (items.length === 0 && !orderComplete) {
    router.push('/products');
    return null;
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-slate-500 mb-6">
              Thank you for your purchase. You will receive an email confirmation shortly.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-slate-600">Order ID: <span className="font-mono font-medium">{orderId || fallbackOrderId}</span></p>
            </div>
            <Link href="/products">
              <Button>Continue Shopping</Button>
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

  const handleCreatePayment = async () => {
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zip) {
      alert('Please fill in all shipping fields');
      return;
    }
    setIsProcessing(true);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({ productId: item.product.id, quantity: item.quantity })),
          shippingAddress: shippingInfo,
          paymentMethod,
        }),
      });

      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setOrderId(data.orderId);
      } else {
        alert(data.error || 'Failed to create payment');
      }
      setIsProcessing(false);
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed');
      setIsProcessing(false);
    }
  };

  const handleOrderSuccess = () => {
    clearCart();
    setOrderComplete(true);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={shippingInfo.fullName} onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })} required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} required className="mt-1" />
                  </div>
                  <div><Label htmlFor="city">City</Label><Input id="city" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} required className="mt-1" /></div>
                  <div><Label htmlFor="state">State</Label><Input id="state" value={shippingInfo.state} onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} required className="mt-1" /></div>
                  <div><Label htmlFor="zip">ZIP</Label><Input id="zip" value={shippingInfo.zip} onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })} required className="mt-1" /></div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={shippingInfo.country} onValueChange={(v) => setShippingInfo({ ...shippingInfo, country: v || 'US' })}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">UK</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="credit-card" id="cc" />
                    <Label htmlFor="cc" className="flex items-center gap-2"><CreditCard className="h-5 w-5" />Credit / Debit Card</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'credit-card' && (
                  clientSecret ? (
                    <Elements stripe={getStripePromise()} options={{ clientSecret }}>
                      <PaymentForm onSuccess={handleOrderSuccess} />
                    </Elements>
                  ) : (
                    <Button type="button" onClick={handleCreatePayment} disabled={isProcessing} className="w-full mt-4">
                      {isProcessing ? 'Processing...' : 'Continue to Payment'}
                    </Button>
                  )
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>
                <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded bg-slate-100">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover rounded" />
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-600 text-xs text-white">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{item.product.name}</p></div>
                      <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-500 text-center">Secured by Stripe</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /> Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}