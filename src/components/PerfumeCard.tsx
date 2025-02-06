import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface Perfume {
  nombre: string;
  precio: number;
  descripcion: string;
  url_imagen: string;
  descuento: number;
  notas: string[];
}

interface PerfumeCardProps {
  perfume: Perfume;
  onAddToCart: () => void;
}

const PerfumeCard = ({ perfume, onAddToCart }: PerfumeCardProps) => {
  const finalPrice = perfume.precio * (1 - perfume.descuento / 100);
  const notas = perfume.notas || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 flex flex-col h-full"
    >
      <div className="relative mb-4 aspect-square rounded-xl overflow-hidden">
        <img
          src={perfume.url_imagen}
          alt={perfume.nombre}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Perfume';
          }}
        />
        {perfume.descuento > 0 && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            -{perfume.descuento}%
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2">{perfume.nombre}</h3>
      
      <p className="text-muted-foreground text-sm mb-4 flex-grow">
        {perfume.descripcion}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {notas.map((nota, index) => (
          <span key={index} className="note-tag">
            {nota}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          {perfume.descuento > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              €{perfume.precio.toFixed(2)}
            </span>
          )}
          <span className="text-xl font-semibold text-primary">
            €{finalPrice.toFixed(2)}
          </span>
        </div>
        
        <button
          onClick={onAddToCart}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default PerfumeCard;