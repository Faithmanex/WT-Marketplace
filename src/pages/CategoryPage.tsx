import React, { useState, useMemo } from 'react';
import { useParams, Navigate, Link, useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ChevronRight, SlidersHorizontal, Star, Search, X } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { section, categoryId } = useParams<{ section: string, categoryId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [sortBy, setSortBy] = useState('trending');
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  
  const category = categories.find(c => c.id === categoryId && c.section === section);
  
  if (!category && categoryId) {
    return <Navigate to={`/${section || 'marketplace'}`} replace />;
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = categoryId 
      ? products.filter(p => p.category === categoryId)
      : products.filter(p => p.section === section);

    // Apply Search Query
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply Price Filter
    if (selectedPrices.length > 0) {
      result = result.filter(p => {
        const price = p.numericPrice;
        return selectedPrices.some(range => {
          if (range === 'Under $50') return price < 50;
          if (range === '$50 to $150') return price >= 50 && price <= 150;
          if (range === '$150 to $500') return price > 150 && price <= 500;
          if (range === 'Over $500') return price > 500;
          return false;
        });
      });
    }

    // Apply Rating Filter
    if (selectedRating !== null) {
      result = result.filter(p => p.rating >= selectedRating);
    }

    // Apply Format Filter
    if (selectedFormats.length > 0) {
      result = result.filter(p => selectedFormats.includes(p.format));
    }

    // Apply Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // trending (sales)
      result.sort((a, b) => b.sales - a.sales);
    }

    return result;
  }, [categoryId, query, selectedPrices, selectedRating, selectedFormats, sortBy]);

  const handlePriceToggle = (range: string) => {
    setSelectedPrices(prev => 
      prev.includes(range) ? prev.filter(p => p !== range) : [...prev, range]
    );
  };

  const handleFormatToggle = (format: string) => {
    setSelectedFormats(prev => 
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
  };

  const clearFilters = () => {
    setSelectedPrices([]);
    setSelectedRating(null);
    setSelectedFormats([]);
    if (query) {
      setSearchParams({});
    }
  };

  const hasActiveFilters = selectedPrices.length > 0 || selectedRating !== null || selectedFormats.length > 0 || query;

  const allFormats = Array.from(new Set(products.map(p => p.format))).sort();

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen pb-24">
      {/* Breadcrumbs & Title Header */}
      <div className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-slate-500 mb-6 font-medium">
            <Link to={`/${section || 'marketplace'}`} className="hover:text-slate-900 transition-colors capitalize">
              {section || 'Marketplace'}
            </Link>
            <ChevronRight size={14} className="mx-3 text-slate-300" />
            <span className="text-slate-900">
              {query ? 'Search Results' : (category?.name || 'All Items')}
            </span>
          </nav>
          
          <h1 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight">
            {query ? `Search results for "${query}"` : (category?.name || 'All Items')}
          </h1>
          <p className="mt-4 text-slate-500 text-lg font-light">
            Explore {filteredProducts.length} premium {filteredProducts.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-medium">
              <SlidersHorizontal size={18} />
              Filters
            </div>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Price Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-slate-900 text-sm uppercase tracking-wider">Price</h3>
            <div className="space-y-3">
              {['Under $50', '$50 to $150', '$150 to $500', 'Over $500'].map((range) => (
                <label key={range} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    selectedPrices.includes(range) 
                      ? 'bg-slate-900 border-slate-900' 
                      : 'border-slate-300 group-hover:border-slate-400'
                  }`}>
                    {selectedPrices.includes(range) && <Check size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedPrices.includes(range)}
                    onChange={() => handlePriceToggle(range)}
                  />
                  <span className={`text-sm transition-colors ${
                    selectedPrices.includes(range) ? 'text-slate-900 font-medium' : 'text-slate-500 group-hover:text-slate-900'
                  }`}>
                    {range}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-slate-900 text-sm uppercase tracking-wider">Rating</h3>
            <div className="space-y-3">
              {[5, 4, 3].map((rating) => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    selectedRating === rating 
                      ? 'border-slate-900 border-[5px]' 
                      : 'border-slate-300 group-hover:border-slate-400'
                  }`}></div>
                  <input 
                    type="radio" 
                    name="rating"
                    className="hidden" 
                    checked={selectedRating === rating}
                    onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < rating ? "fill-slate-900 text-slate-900" : "text-slate-200"} />
                    ))}
                    <span className={`text-sm ml-1 ${selectedRating === rating ? 'text-slate-900 font-medium' : 'text-slate-500 group-hover:text-slate-900'}`}>
                      & Up
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Format/Type Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-slate-900 text-sm uppercase tracking-wider">Format</h3>
            <div className="space-y-3">
              {allFormats.map((format) => (
                <label key={format} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    selectedFormats.includes(format) 
                      ? 'bg-slate-900 border-slate-900' 
                      : 'border-slate-300 group-hover:border-slate-400'
                  }`}>
                    {selectedFormats.includes(format) && <Check size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedFormats.includes(format)}
                    onChange={() => handleFormatToggle(format)}
                  />
                  <span className={`text-sm transition-colors ${
                    selectedFormats.includes(format) ? 'text-slate-900 font-medium' : 'text-slate-500 group-hover:text-slate-900'
                  }`}>
                    {format}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Active Filters Tags & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex flex-wrap gap-2">
              {hasActiveFilters ? (
                <>
                  {query && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                      Search: "{query}"
                      <button onClick={() => setSearchParams({})} className="hover:text-slate-900"><X size={14} /></button>
                    </span>
                  )}
                  {selectedPrices.map(price => (
                    <span key={price} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                      {price}
                      <button onClick={() => handlePriceToggle(price)} className="hover:text-slate-900"><X size={14} /></button>
                    </span>
                  ))}
                  {selectedRating && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                      {selectedRating} Stars & Up
                      <button onClick={() => setSelectedRating(null)} className="hover:text-slate-900"><X size={14} /></button>
                    </span>
                  )}
                  {selectedFormats.map(format => (
                    <span key={format} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                      {format}
                      <button onClick={() => handleFormatToggle(format)} className="hover:text-slate-900"><X size={14} /></button>
                    </span>
                  ))}
                </>
              ) : (
                <div className="text-sm text-slate-500">
                  Showing <span className="font-medium text-slate-900">{filteredProducts.length}</span> items
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <label htmlFor="sort" className="text-sm text-slate-500">Sort by:</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block pl-3 pr-8 py-2 text-sm border-none bg-transparent focus:ring-0 text-slate-900 font-medium cursor-pointer"
              >
                <option value="trending">Trending</option>
                <option value="rating">Best Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-2xl border border-slate-100">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-6">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">No items found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your filters or browsing a different category to find what you're looking for.</p>
              <button 
                onClick={clearFilters}
                className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-slate-200 rounded-full text-sm font-medium text-slate-900 bg-white hover:bg-slate-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple Check icon component since we need it for the custom checkboxes
function Check({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
