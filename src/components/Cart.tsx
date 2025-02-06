import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import CheckoutDialog from './CheckoutDialog';

interface CartItem {
  nombre: string;
  precio: number;
  descuento: number;
  cantidad: number;
}

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (nombre: string) => void;
  onUpdateQuantity: (nombre: string, cantidad: number) => void;
}

const Cart = ({ items, onClose, onRemoveItem, onUpdateQuantity }: CartProps) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const total = items.reduce((sum, item) => {
    const precio = item.precio * (1 - item.descuento / 100);
    return sum + precio * item.cantidad;
  }, 0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-xl p-6 z-50"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-muted-foreground">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.nombre} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.nombre}</h3>
                    <p className="text-sm text-muted-foreground">
                      €{(item.precio * (1 - item.descuento / 100)).toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateQuantity(item.nombre, Math.max(0, item.cantidad - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.cantidad}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateQuantity(item.nombre, item.cantidad + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.nombre)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">€{total.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </motion.div>
      
      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={total}
      />
    </>
  );
};

export default Cart;