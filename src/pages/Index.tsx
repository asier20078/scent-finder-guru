import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import PerfumeCard from '../components/PerfumeCard';
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

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPerfumes = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return perfumesData.perfumes.filter(perfume => 
      perfume.nombre.toLowerCase().includes(term) ||
      perfume.notas.some(nota => nota.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const handleAddToCart = (perfumeName: string) => {
    toast.success(`Added ${perfumeName} to cart`);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Luxury Fragrances</h1>
          <p className="text-muted-foreground">
            Discover your perfect scent through our curated collection
          </p>
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

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
      </div>
    </div>
  );
};

export default Index;