import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

const CheckoutDialog = ({ isOpen, onClose, total }: CheckoutDialogProps) => {
  const handlePayPalCreateOrder = (data: any, actions: any) => {
    console.log('Creating PayPal order for amount:', total);
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total.toFixed(2)
              }
            }
          }
        },
      ],
    });
  };

  const handlePayPalApprove = (data: any, actions: any) => {
    console.log('PayPal payment approved, capturing payment...');
    return actions.order.capture().then((details: any) => {
      console.log('Payment completed:', details);
      toast.success(`Payment completed! Thank you ${details.payer.name?.given_name || 'valued customer'}!`);
      onClose();
    }).catch((error: any) => {
      console.error('PayPal payment error:', error);
      toast.error('Payment failed. Please try again.');
    });
  };

  const handleStripePayment = async () => {
    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY || '');
    if (!stripe) {
      toast.error('Payment configuration error');
      return;
    }

    // Here you would typically make a call to your backend to create a payment intent
    toast.success('Stripe payment integration pending backend setup');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
          <DialogDescription>
            Select your preferred payment method to complete your purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Total to Pay: €{total.toFixed(2)}</h3>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={handlePayPalCreateOrder}
              onApprove={handlePayPalApprove}
              onError={(err) => {
                console.error('PayPal error:', err);
                toast.error('Payment failed. Please try again.');
              }}
            />
          </div>
          <div className="rounded-lg border p-4">
            <Button 
              className="w-full"
              onClick={handleStripePayment}
            >
              Pay with Card
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;