import React, { useState } from 'react';
import { Product, categories } from '../data/products';
import { Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const category = categories.find(c => c.id === product.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeInOut" } }}
      className="flex flex-col h-full"
    >
      <Link
        to={`/${product.section}/${product.category}/${product.id}`}
        className="group flex flex-col flex-1 block"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 rounded-2xl mb-4">
          {/* Skeleton shimmer shown until image loads */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-shimmer" />
          )}
          <img
            src={product.imageUrl}
            alt={product.title}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            referrerPolicy="no-referrer"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm z-10">
              {product.badge}
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-0">
            <div className="bg-white/95 backdrop-blur-md text-slate-900 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 px-1">
          {/* Category accent tag */}
          {category && (
            <span className={`self-start text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border mb-2 ${category.accent}`}>
              {category.name}
            </span>
          )}
          <div className="flex flex-col gap-1.5 mb-2">
            <h3 className="text-lg font-semibold text-slate-900 leading-snug group-hover:text-slate-600 transition-colors line-clamp-2">
              {product.title}
            </h3>
            <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
              {product.price}
            </span>
          </div>

          <p className="text-sm text-slate-500 mb-4 line-clamp-2 font-light">
            {product.description}
          </p>

          <div className="mt-auto flex items-center justify-between text-xs font-medium text-slate-400 uppercase tracking-wider">
            <span>{product.author}</span>
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-slate-400" />
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
