import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

const CheckoutDialog = ({ isOpen, onClose, total }: CheckoutDialogProps) => {
  const handlePayPalApprove = (data: any, actions: any) => {
    return actions.order.capture().then(() => {
      toast.success('Payment successful!');
      onClose();
    });
  };

  const handleStripePayment = async () => {
    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY || '');
    if (!stripe) {
      toast.error('Payment configuration error');
      return;
    }

    // Here you would typically make a call to your backend to create a payment intent
    // For now, we'll just show a success message
    toast.success('Stripe payment integration pending backend setup');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Total to Pay: ${total.toFixed(2)}</h3>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: total.toString(),
                      },
                    },
                  ],
                });
              }}
              onApprove={handlePayPalApprove}
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