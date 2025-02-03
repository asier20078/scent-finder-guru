import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Scent Finder</h1>
        </div>
        <Button variant="outline" onClick={onCartClick} className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;