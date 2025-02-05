import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import PerfumeCard from '../components/PerfumeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { toast } from 'sonner';

interface Perfume {
  nombre: string;
  precio: number;
  descripcion: string;
  url_imagen: string;
  descuento: number;
  notas: string[];
}

interface PerfumeWithMatches extends Perfume {
  coincidencias: number;
}

const perfumesData = {
  "perfumes": [
    {
      "nombre": "24 Carat Pure Gold Perfume Mujer",
      "precio": 32.67,
      "descripcion": "24 quilates de oro puro, este perfume de Lattafa Perfumes captura la esencia de la feminidad y la masculinidad. Con notas cálidas de madera de oud, azafrán y canela, junto con sándalo y rosa, esta fragancia oriental y vainilla promete una experiencia sensorial lujosa y duradera. Formato 100ml.",
      "url_imagen": "https://d2j6dbq0eux0bg.cloudfront.net/images/30951154/2911675516.jpg",
      "descuento": 0,
      "notas": ["canela", "azafran", "sándalo", "madera de agar", "rosa"]
    },
    {
      "nombre": "9 AM Dive Perfume Unisex",
      "precio": 37.87,
      "descripcion": "Disfruta de la frescura y energía con 9am Dive de Afnan, un perfume unisex de la familia olfativa Aromática Acuática. Con notas de limón, menta y grosellas negras, te llenará de vitalidad desde el primer momento. Además, su combinación de manzana, incienso y sándalo le dan un toque único y duradero. Atrévete con esta nueva fragancia.Formato 100ml.",
      "url_imagen": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSelv0tMZ_2LSfaMtbUZYHcwGxfjEJojFn_U-zo_oi7AbQkH5AoENWA8luVhMddyBLtS32e7HuINxjaTQkuU6WQ7n23Bczx",
      "descuento": 0,
      "notas": ["menta", "grosellas", "limón", "pimienta roja", "manzana"]
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

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<{
    nombre: string;
    precio: number;
    descuento: number;
    cantidad: number;
  }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Enhanced error handling
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Detailed error information:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
      
      setError(event.error || new Error(event.message));
      toast.error('An error occurred. Please try again.');
      return false;
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  const filteredPerfumes = useMemo(() => {
    try {
      console.log('Filtering perfumes with search term:', searchTerm);
      const searchTerms = searchTerm.toLowerCase()
        .split(',')
        .map(term => term.trim())
        .filter(Boolean)
        .slice(0, 5);
      
      if (searchTerms.length === 0) return perfumesData.perfumes;
      
      const perfumesWithMatches: PerfumeWithMatches[] = perfumesData.perfumes.map(perfume => {
        let coincidencias = 0;
        
        searchTerms.forEach(term => {
          if (
            perfume.nombre.toLowerCase().includes(term) ||
            perfume.notas.some(nota => nota.toLowerCase().includes(term))
          ) {
            coincidencias++;
          }
        });
        
        return {
          ...perfume,
          coincidencias
        };
      });
      
      console.log('Filtered perfumes:', perfumesWithMatches);
      return perfumesWithMatches
        .filter(perfume => perfume.coincidencias > 0)
        .sort((a, b) => b.coincidencias - a.coincidencias);
    } catch (err) {
      console.error('Error in filteredPerfumes:', err);
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return [];
    }
  }, [searchTerm]);

  const handleAddToCart = (perfumeName: string) => {
    try {
      console.log('Adding to cart:', perfumeName);
      const perfume = perfumesData.perfumes.find(p => p.nombre === perfumeName);
      if (!perfume) {
        console.error('Perfume not found:', perfumeName);
        return;
      }

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
    } catch (err) {
      console.error('Error in handleAddToCart:', err);
      toast.error('Failed to add item to cart');
    }
  };

  const handleRemoveFromCart = (nombre: string) => {
    try {
      console.log('Removing from cart:', nombre);
      setCartItems(prevItems => prevItems.filter(item => item.nombre !== nombre));
      toast.success(`Removed ${nombre} from cart`);
    } catch (err) {
      console.error('Error in handleRemoveFromCart:', err);
      toast.error('Failed to remove item from cart');
    }
  };

  const handleUpdateQuantity = (nombre: string, cantidad: number) => {
    try {
      console.log('Updating quantity:', { nombre, cantidad });
      if (cantidad === 0) {
        handleRemoveFromCart(nombre);
        return;
      }
      
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.nombre === nombre ? { ...item, cantidad } : item
        )
      );
    } catch (err) {
      console.error('Error in handleUpdateQuantity:', err);
      toast.error('Failed to update quantity');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
          <p className="mt-2 text-gray-600">{error.message}</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

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