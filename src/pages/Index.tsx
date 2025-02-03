import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import PerfumeCard from '../components/PerfumeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { toast } from 'sonner';

const perfumesData = {
  "perfumes": [
    {
      "nombre": "Eternity for Women",
      "precio": 65.99,
      "descripcion": "Un clásico atemporal con notas de flor de loto, almizcle y sándalo.",
      "url_imagen": "https://example.com/eternity-for-women.jpg",
      "descuento": 10,
      "notas": ["flor de loto", "almizcle", "sándalo", "madera de cachemira", "rosa"]
    },
    {
      "nombre": "Acqua di Gio",
      "precio": 72.50,
      "descripcion": "Una fragancia fresca y elegante inspirada en el mar Mediterráneo.",
      "url_imagen": "https://example.com/acqua-di-gio.jpg",
      "descuento": 0,
      "notas": ["romero", "bergamota", "limón", "alga marina", "madera"]
    },
    {
      "nombre": "J'adore by Dior",
      "precio": 89.99,
      "descripcion": "Una fragancia floral sofisticada con toques de frutas exóticas.",
      "url_imagen": "https://example.com/j-adore-dior.jpg",
      "descuento": 15,
      "notas": ["damasco", "pétalos de rosa", "ylang-ylang", "jazmín", "vainilla"]
    },
    {
      "nombre": "Chanel No. 5",
      "precio": 120.00,
      "descripcion": "El icónico perfume femenino con una combinación única de flores y almizcle.",
      "url_imagen": "https://example.com/chanel-no5.jpg",
      "descuento": 5,
      "notas": ["rosa", "jazmín", "violeta", "almizcle", "vainilla"]
    },
    {
      "nombre": "Paco Rabanne Invictus",
      "precio": 68.75,
      "descripcion": "Una fragancia masculina fresca y energética con notas afrutadas y amaderadas.",
      "url_imagen": "https://example.com/paco-rabanne-invictus.jpg",
      "descuento": 0,
      "notas": ["grapefruit", "cilantro", "canela", "patchouli", "cedro"]
    }
  ]
};

interface CartItem {
  nombre: string;
  precio: number;
  descuento: number;
  cantidad: number;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredPerfumes = useMemo(() => {
    const searchTerms = searchTerm.toLowerCase().split(',').map(term => term.trim()).filter(Boolean);
    
    if (searchTerms.length === 0) return perfumesData.perfumes;
    
    return perfumesData.perfumes.filter(perfume => 
      searchTerms.some(term => 
        perfume.nombre.toLowerCase().includes(term) ||
        perfume.notas.some(nota => nota.toLowerCase().includes(term))
      )
    );
  }, [searchTerm]);

  const handleAddToCart = (perfumeName: string) => {
    const perfume = perfumesData.perfumes.find(p => p.nombre === perfumeName);
    if (!perfume) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.nombre === perfumeName);
      if (existingItem) {
        return prevItems.map(item =>
          item.nombre === perfumeName
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevItems, {
        nombre: perfume.nombre,
        precio: perfume.precio,
        descuento: perfume.descuento,
        cantidad: 1
      }];
    });
    
    toast.success(`Added ${perfumeName} to cart`);
  };

  const handleRemoveFromCart = (nombre: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.nombre !== nombre));
    toast.success(`Removed ${nombre} from cart`);
  };

  const handleUpdateQuantity = (nombre: string, cantidad: number) => {
    if (cantidad === 0) {
      handleRemoveFromCart(nombre);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.nombre === nombre ? { ...item, cantidad } : item
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/20">
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.cantidad, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="flex-1 container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Luxury Fragrances</h1>
          <p className="text-muted-foreground">
            Discover your perfect scent through our curated collection
          </p>
        </div>

        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPerfumes.map((perfume, index) => (
            <PerfumeCard
              key={index}
              perfume={perfume}
              onAddToCart={() => handleAddToCart(perfume.nombre)}
            />
          ))}
        </div>

        {filteredPerfumes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No perfumes found matching your search.</p>
          </div>
        )}
      </main>

      <Footer />

      <AnimatePresence>
        {isCartOpen && (
          <Cart
            items={cartItems}
            onClose={() => setIsCartOpen(false)}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;