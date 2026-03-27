'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientNav } from '@/components/qrius/ClientNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/lib/state-provider';
import { Order, OrderItem } from '@/lib/types';
import { MENU_ITEMS } from '@/lib/mock-data';
import { ArrowLeft, Smartphone, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { addOrder } = useAppContext();
  const [step, setStep] = useState<'payment' | 'confirm' | 'success'>('payment');
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'orange_money' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const tableNumber = 12;
  const totalAmount = 5500; // From mock cart

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod || !phoneNumber.trim()) {
      alert('Please select payment method and enter phone number');
      return;
    }

    setStep('confirm');
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pin || pin.length !== 4) {
      alert('Please enter a valid 4-digit PIN');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create order
    const orderItems: OrderItem[] = [
      { menuItemId: '1', name: 'DG Poulet', quantity: 1, price: 3500 },
      { menuItemId: '5', name: 'Jus de Foléré', quantity: 2, price: 800 },
    ];

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      tableNumber,
      items: orderItems,
      status: 'reçue',
      createdAt: new Date(),
      totalAmount,
      paymentMethod,
      customerPhoneNumber: phoneNumber,
    };

    addOrder(newOrder);
    setIsProcessing(false);
    setStep('success');
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <ClientNav />

      <main className="flex-1 flex flex-col pb-24 md:pb-0 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 z-10 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Checkout</h1>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full">
          {step === 'payment' && (
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Order Summary */}
              <Card className="p-4 bg-muted/30">
                <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span>DG Poulet x1</span>
                    <span>3,500 F</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jus de Foléré x2</span>
                    <span>1,600 F</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">{totalAmount.toLocaleString()} F</span>
                  </div>
                </div>
              </Card>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Payment Method</h3>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mtn')}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    paymentMethod === 'mtn'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-foreground" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">MTN Money</p>
                    <p className="text-xs text-muted-foreground">USSD *126#</p>
                  </div>
                  {paymentMethod === 'mtn' && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-primary" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('orange_money')}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    paymentMethod === 'orange_money'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-foreground" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Orange Money</p>
                    <p className="text-xs text-muted-foreground">USSD *144#</p>
                  </div>
                  {paymentMethod === 'orange_money' && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-primary" />
                  )}
                </button>
              </div>

              {/* Phone Number Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="250 XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 py-6"
                disabled={!paymentMethod || !phoneNumber.trim()}
              >
                Continue
              </Button>
            </form>
          )}

          {step === 'confirm' && (
            <form onSubmit={handleConfirm} className="space-y-6">
              <Card className="p-6 border-primary bg-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-foreground">Enter PIN</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  A prompt has been sent to {phoneNumber}. Enter your 4-digit PIN to confirm.
                </p>
                <Input
                  type="password"
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.slice(0, 4))}
                  maxLength={4}
                  className="h-12 text-center text-2xl tracking-widest"
                />
              </Card>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 py-6"
                  disabled={pin.length !== 4 || isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Payment'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep('payment')}
                  disabled={isProcessing}
                >
                  Back
                </Button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center min-h-96">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground mb-6">Your order has been placed</p>
              <div className="bg-muted/30 rounded-lg p-4 mb-6 w-full text-center">
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="text-xl font-bold text-primary font-mono">ORD-{Date.now() % 1000000}</p>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 py-6"
                onClick={() => router.push('/client/order-tracking')}
              >
                Track Order
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
