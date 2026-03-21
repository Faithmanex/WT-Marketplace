import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, ArrowRight, Lightbulb, Mic, ShieldCheck, Users } from 'lucide-react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useScrollAnimate } from '../hooks/useScrollAnimate';
import { CategoryPage } from './CategoryPage';

export const MarketplaceHome: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products
      .filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .slice(0, 6);
  }, [searchQuery]);

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (heroSearchRef.current && !heroSearchRef.current.contains(e.target as HTMLElement)) {
        setShowSuggestions(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowSuggestions(false);
    };
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const currentSection = section || 'marketplace';
  const sectionProducts = products.filter(p => p.section === currentSection);
  const sectionCategories = categories.filter(c => c.section === currentSection);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/${currentSection}?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: typeof products[0]) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(`/${product.section}/${product.category}/${product.id}`);
  };

  // Featured items logic
  const topSellers = [...sectionProducts].sort((a, b) => b.sales - a.sales).slice(0, 4);
  const newReleases = [...sectionProducts].reverse().slice(0, 4);
  const institutionalServices = products.filter(p => p.section === 'services').slice(0, 4);
  const section1 = useScrollAnimate();
  const section2 = useScrollAnimate();
  const section3 = useScrollAnimate();

  const getServiceIcon = (catId: string) => {
    if (catId.includes('consulting')) return <Lightbulb size={20} className="text-white" />;
    if (catId.includes('speaking')) return <Mic size={20} className="text-white" />;
    if (catId.includes('organizational')) return <ShieldCheck size={20} className="text-white" />;
    return <Users size={20} className="text-white" />;
  };

  const heroContent = {
    marketplace: {
      title: <>Curated resources for <br /><span className="font-semibold">ethical leadership.</span></>,
      description: "Discover premium books, masterclasses, and digital products designed to transform organizational culture and personal leadership.",
      placeholder: "Search books, courses, toolkits..."
    },
    services: {
      title: <>Professional advice to <br /><span className="font-semibold">scale your impact.</span></>,
      description: "Book Dr. Triplett for executive consulting, high-impact keynotes, and organizational ethics audits.",
      placeholder: "Explore consulting, keynotes, audits..."
    },
    membership: {
      title: <>Join the circle of <br /><span className="font-semibold">ethical practitioners.</span></>,
      description: "Unlock ongoing subscription support, community archives, and leadership ethics advisory circles.",
      placeholder: "Search membership benefits..."
    }
  };

  const currentHero = heroContent[currentSection as keyof typeof heroContent] || heroContent.marketplace;

  // If we have an active search query, hand off the rendering to the Catalog/Category UI
  // ensuring this conditional return happens AFTER all hooks (useParams, useState, useNavigate, useScrollAnimate).
  if (searchParams.get('q')) {
    return <CategoryPage />;
  }

  return (
    <div className="w-full bg-[#fcfcfc]">
      {/* Editorial Hero Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 }
            }
          }}
          className="max-w-4xl"
        >
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="text-3xl sm:text-5xl font-light text-slate-900 mb-6 tracking-tight leading-[1.1]"
          >
            {currentHero.title}
          </motion.h1>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="text-lg text-slate-500 mb-8 max-w-2xl font-light leading-relaxed"
          >
            {currentHero.description}
          </motion.p>
          
            {/* Clean Search Bar */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="max-w-2xl relative"
              ref={heroSearchRef}
            >
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  className="block w-full pl-14 pr-24 sm:pr-32 py-4 border border-slate-200 rounded-full text-base sm:text-lg bg-white placeholder-slate-400 focus:ring-0 focus:border-slate-900 transition-all outline-none shadow-sm hover:shadow-md"
                  placeholder={currentHero.placeholder}
                  autoComplete="off"
                />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-slate-900 hover:bg-slate-800 text-white px-5 sm:px-8 rounded-full font-medium text-sm sm:text-base transition-colors">
                  Search
                </button>
              </form>
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 z-50 overflow-hidden"
                  >
                    {suggestions.map(product => (
                      <li key={product.id}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(product)}
                          className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-slate-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-slate-800 truncate mr-4">{product.title}</span>
                          <span className="text-xs text-slate-400 whitespace-nowrap">{getCategoryName(product.category)}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500"
          >
            <span className="font-medium text-slate-900">Trending:</span>
            <Link to={`/${currentSection}/courses`} className="hover:text-slate-900 transition-colors">Leadership Masterclass</Link>
            <span className="text-slate-300">•</span>
            <Link to={`/${currentSection}/organizational-development`} className="hover:text-slate-900 transition-colors">Culture Audit</Link>
            <span className="text-slate-300">•</span>
            <Link to={`/${currentSection}/books`} className="hover:text-slate-900 transition-colors">Sacred Resistance</Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Category Pills */}
      <div className="border-y border-slate-100 bg-white py-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
            {sectionCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/${category.section}/${category.id}`}
                className={`flex-none px-5 py-2.5 rounded-full text-sm font-medium border hover:-translate-y-0.5 hover:shadow-sm transition-all ${category.accent} whitespace-nowrap`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        
        {/* Weekly Bestsellers */}
        <section ref={section1.ref as React.Ref<HTMLElement>} className={`transition-all duration-700 ${section1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-end justify-between mb-8">
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
        <section ref={section2.ref as React.Ref<HTMLElement>} className={`bg-slate-950 rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden transition-all duration-700 ${section2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Accent Glow Backgrounds */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-light text-white mb-6 tracking-tight">Institutional Services</h2>
              <p className="text-slate-400 text-xl leading-relaxed font-light mb-10">
                Comprehensive organizational development, faculty coaching, and culture transformation programs designed for universities and corporations.
              </p>
              <Link to="/services/organizational-development" className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-medium hover:bg-slate-100 transition-all hover:shadow-lg hover:-translate-y-0.5">
                Explore Enterprise Services <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {institutionalServices.map(product => (
              <div key={product.id} className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 transform flex flex-col h-full">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {getServiceIcon(product.category)}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 leading-snug group-hover:text-blue-200 transition-colors">{product.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 font-light leading-relaxed flex-1">{product.description}</p>
                <Link to={`/${product.section}/${product.category}/${product.id}`} className="text-white text-sm font-medium flex items-center gap-2 group/link">
                  <span className="group-hover/link:underline">Learn more</span> 
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* New Releases */}
        <section ref={section3.ref as React.Ref<HTMLElement>} className={`transition-all duration-700 ${section3.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
