import React, { useState, useMemo } from 'react';
import { useParams, Navigate, Link, useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ChevronRight, SlidersHorizontal, Search, X } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { section, categoryId } = useParams<{ section: string, categoryId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [sortBy, setSortBy] = useState('trending');
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
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
  }, [categoryId, query, selectedPrices, selectedFormats, sortBy]);

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
    setSelectedFormats([]);
    if (query) {
      setSearchParams({});
    }
  };

  const hasActiveFilters = selectedPrices.length > 0 || selectedFormats.length > 0 || query;

  const allFormats = Array.from(new Set(products.map(p => p.format))).sort();

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen pb-24">
      {/* Breadcrumbs & Title Header */}
      <div className="bg-white border-b border-slate-100 pt-4 pb-2">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-slate-500 mb-4 font-medium">
            <Link to={`/${section || 'marketplace'}`} className="hover:text-slate-900 transition-colors capitalize">
              {section || 'Marketplace'}
            </Link>
            <ChevronRight size={14} className="mx-3 text-slate-300" />
            <span className="text-slate-900">
              {query ? 'Search Results' : (category?.name || 'All Items')}
            </span>
          </nav>
          
          <h1 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
            {query ? `Search results for "${query}"` : (category?.name || 'All Items')}
          </h1>
          <p className="mt-2 text-slate-500 text-lg font-light">
            Explore {filteredProducts.length} premium {filteredProducts.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`flex items-center gap-2 px-5 py-2.5 border rounded-full text-sm font-medium transition-all
                ${isFiltersOpen 
                  ? 'border-slate-900 bg-slate-900 text-white' 
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
            >
              <SlidersHorizontal size={16} />
              {isFiltersOpen ? 'Hide Filters' : 'Filters'}
            </button>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium border-b border-dotted border-slate-400"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500 hidden md:block">
              Showing <span className="font-medium text-slate-900">{filteredProducts.length}</span> items
            </div>
            <div className="flex items-center gap-2 ">
              <label htmlFor="sort" className="text-sm text-slate-500">Sort:</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block pl-2 pr-8 py-1.5 text-sm border border-slate-200 bg-white rounded-xl focus:ring-0 text-slate-900 font-medium cursor-pointer"
              >
                <option value="trending">Trending</option>
                <option value="rating">Best Rated</option>
                <option value="price-low">Price Low-High</option>
                <option value="price-high">Price High-Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible Filters Panel */}
        {isFiltersOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-6 rounded-2xl border border-slate-100 mb-8 shadow-sm">
            {/* Price Filter */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Price Range</h3>
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
                    <input type="checkbox" className="hidden" checked={selectedPrices.includes(range)} onChange={() => handlePriceToggle(range)} />
                    <span className={`text-sm ${selectedPrices.includes(range) ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>{range}</span>
                  </label>
                ))}
              </div>
            </div>



            {/* Format Filter */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Format</h3>
              <div className="space-y-3 max-h-40 overflow-y-auto no-scrollbar">
                {allFormats.map((format) => (
                  <label key={format} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedFormats.includes(format) ? 'bg-slate-900 border-slate-900' : 'border-slate-300'}`}>
                      {selectedFormats.includes(format) && <Check size={12} className="text-white" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={selectedFormats.includes(format)} onChange={() => handleFormatToggle(format)} />
                    <span className="text-sm text-slate-500">{format}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {query && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                "{query}" <button onClick={() => setSearchParams({})} className="hover:text-slate-900"><X size={14} /></button>
              </span>
            )}
            {selectedPrices.map(price => (
              <span key={price} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                {price} <button onClick={() => handlePriceToggle(price)} className="hover:text-slate-900"><X size={14} /></button>
              </span>
            ))}

            {selectedFormats.map(format => (
              <span key={format} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                {format} <button onClick={() => handleFormatToggle(format)} className="hover:text-slate-900"><X size={14} /></button>
              </span>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">No items found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Try adjusting filters or categories to find what you're looking for.</p>
            <button onClick={clearFilters} className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium">
              Clear Filters
            </button>
          </div>
        )}

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
