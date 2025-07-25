'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/components/ecommerce/cart-provider';

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (cartItems.length === 0 && !isComplete) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-4">
          You need to add items to your cart before checking out.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="container mx-auto max-w-md px-4 py-12">
        <Card className="text-center">
          <CardHeader>
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Thank you for your purchase. Your order has been confirmed and
              will be shipped soon.
            </p>
            <div className="bg-muted rounded-lg p-4">
              <p className="font-medium">Order #12345</p>
              <p className="text-muted-foreground text-sm">
                A confirmation email has been sent to your email address.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/public">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      clearCart();
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/cart">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="mb-6 text-2xl font-bold">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-lg font-medium">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="mb-4 text-lg font-medium">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment">
                      Apartment, suite, etc. (optional)
                    </Label>
                    <Input id="apartment" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" required />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="mb-4 text-lg font-medium">Payment Method</h2>
                <Tabs defaultValue="card">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        <CreditCard className="text-muted-foreground absolute top-2.5 right-3 h-5 w-5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="paypal" className="pt-4">
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="mb-4">
                        You will be redirected to PayPal to complete your
                        purchase securely.
                      </p>
                      <Button type="button" className="w-full">
                        Continue with PayPal
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="cod" className="pt-4">
                    <div className="flex flex-col space-y-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h3 className="mb-2 font-medium">Cash on Delivery</h3>
                        <p className="text-muted-foreground text-sm">
                          Pay with cash when your order is delivered to your
                          doorstep. A small COD fee may apply.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                          <ShieldCheck className="text-primary h-5 w-5" />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Secure and convenient</p>
                          <p className="text-muted-foreground">
                            No need to share payment details online
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                          <CreditCard className="text-primary h-5 w-5" />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">
                            Pay only when you receive
                          </p>
                          <p className="text-muted-foreground">
                            Inspect your items before payment
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Separator />

              <div>
                <h2 className="mb-4 text-lg font-medium">Shipping Method</h2>
                <RadioGroup defaultValue="standard" className="space-y-3">
                  <div className="flex items-center space-y-0 space-x-3">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1">
                      <div className="flex justify-between">
                        <span>Standard Shipping</span>
                        <span>Free</span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        Delivery in 5-7 business days
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-y-0 space-x-3">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1">
                      <div className="flex justify-between">
                        <span>Express Shipping</span>
                        <span>$9.99</span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        Delivery in 2-3 business days
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="lg:hidden">
                <OrderSummary cartItems={cartItems} subtotal={subtotal} />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden lg:block">
          <OrderSummary cartItems={cartItems} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}

function OrderSummary({ cartItems, subtotal }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {item.quantity || 1} ×
                </span>
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium">
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>Calculated at checkout</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
