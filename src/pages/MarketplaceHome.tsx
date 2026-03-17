import React, { useState } from 'react';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, ChevronRight, BookOpen, Lightbulb, Building2, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const MarketplaceHome: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const currentSection = section || 'marketplace';
  const sectionProducts = products.filter(p => p.section === currentSection);
  const sectionCategories = categories.filter(c => c.section === currentSection);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/${currentSection}?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Featured items logic
  const topSellers = [...sectionProducts].sort((a, b) => b.sales - a.sales).slice(0, 4);
  const newReleases = [...sectionProducts].reverse().slice(0, 4);
  const institutionalServices = products.filter(p => p.section === 'services').slice(0, 4);

  return (
    <div className="w-full bg-[#fcfcfc]">
      {/* Editorial Hero Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-7xl font-light text-slate-900 mb-8 tracking-tight leading-[1.1]">
            Curated resources for <br />
            <span className="font-semibold">ethical leadership.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl font-light leading-relaxed">
            Discover premium books, masterclasses, and enterprise consulting services designed to transform organizational culture and personal leadership.
          </p>
          
          {/* Clean Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-16 pr-32 py-5 border border-slate-200 rounded-full text-lg bg-white placeholder-slate-400 focus:ring-0 focus:border-slate-900 transition-all outline-none shadow-sm hover:shadow-md"
              placeholder={`Search ${currentSection}...`}
            />
            <button type="submit" className="absolute right-3 top-3 bottom-3 bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-full font-medium transition-colors">
              Search
            </button>
          </form>
          
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="font-medium text-slate-900">Trending:</span>
            <Link to={`/${currentSection}/courses`} className="hover:text-slate-900 transition-colors">Leadership Masterclass</Link>
            <span className="text-slate-300">•</span>
            <Link to={`/${currentSection}/organizational-development`} className="hover:text-slate-900 transition-colors">Culture Audit</Link>
            <span className="text-slate-300">•</span>
            <Link to={`/${currentSection}/books`} className="hover:text-slate-900 transition-colors">Sacred Resistance</Link>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="border-y border-slate-100 bg-white py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
            {sectionCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/${category.section}/${category.id}`}
                className="flex-none px-6 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700 transition-colors whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        
        {/* Weekly Bestsellers */}
        <section>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Trending Resources</h2>
              <p className="text-slate-500 mt-3 text-lg font-light">The most sought-after materials by leaders this week.</p>
            </div>
            <Link to={`/${currentSection}`} className="hidden sm:flex items-center gap-2 text-slate-900 font-medium hover:opacity-70 transition-opacity">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {topSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Institutional & Enterprise */}
        {currentSection !== 'services' && (
        <section className="bg-slate-900 rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-light text-white mb-6 tracking-tight">Institutional Services</h2>
              <p className="text-slate-400 text-xl leading-relaxed font-light mb-10">
                Comprehensive organizational development, faculty coaching, and culture transformation programs designed for universities and corporations.
              </p>
              <Link to="/services/organizational-development" className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-medium hover:bg-slate-100 transition-colors">
                Explore Enterprise Services <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {institutionalServices.map(product => (
              <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <h3 className="text-white font-medium text-lg mb-2">{product.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">{product.description}</p>
                <Link to={`/${product.section}/${product.category}/${product.id}`} className="text-white text-sm font-medium flex items-center gap-2 hover:opacity-70 transition-opacity">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* New Releases */}
        <section>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">New Arrivals</h2>
              <p className="text-slate-500 mt-3 text-lg font-light">Freshly updated courses, books, and toolkits.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {newReleases.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
