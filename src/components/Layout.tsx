import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { categories, products, SectionId } from '../data/products';
import { Search, Menu, X, User, Sun, Moon, ChevronDown } from 'lucide-react';
import { BackToTop } from './BackToTop';
import { motion, AnimatePresence } from 'motion/react';

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'marketplace' | 'services' | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<'marketplace' | 'services' | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

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
    setSearchQuery(searchParams.get('q') || '');
    setShowSuggestions(false);
  }, [searchParams]);

  useEffect(() => {
    setShowSuggestions(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-dropdown') && !target.closest('.nav-trigger')) {
         setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(target) &&
          mobileSearchRef.current && !mobileSearchRef.current.contains(target)) {
        setShowSuggestions(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSection = (pathParts[0] as SectionId) || 'marketplace';
  
  const sectionCategories = categories.filter(c => c.section === currentSection);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/${currentSection}?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: typeof products[0]) => {
    setShowSuggestions(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    navigate(`/${product.section}/${product.category}/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans">
      
      {/* Top Header (Clean White) */}
      <header className="bg-white text-slate-900 sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Area */}
            <div className="flex items-center gap-12">
              <Link to="/marketplace" className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Triplett<span className="font-light text-slate-500">Hub</span>
                </span>
              </Link>
              
              {/* Desktop Top Links */}
              <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-500 h-full">
                
                {/* Marketplace Dropdown */}
                <div 
                  className="relative flex items-center h-full nav-trigger"
                  onMouseEnter={() => setActiveDropdown('marketplace')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link to="/marketplace" onClick={() => setActiveDropdown(null)} className={`flex items-center gap-1 py-6 transition-colors ${currentSection === 'marketplace' ? 'text-slate-900' : 'hover:text-slate-900'}`}>
                    Marketplace <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'marketplace' ? 'rotate-180' : ''}`} />
                  </Link>
                  <AnimatePresence>
                    {activeDropdown === 'marketplace' && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-16 left-0 w-60 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 nav-dropdown"
                      >
                        {categories.filter(c => c.section === 'marketplace').map((category) => (
                          <li key={category.id}>
                            <Link to={`/marketplace/${category.id}`} onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium">
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Services Dropdown */}
                <div 
                  className="relative flex items-center h-full nav-trigger"
                  onMouseEnter={() => setActiveDropdown('services')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link to="/services" onClick={() => setActiveDropdown(null)} className={`flex items-center gap-1 py-6 transition-colors ${currentSection === 'services' ? 'text-slate-900' : 'hover:text-slate-900'}`}>
                    Services <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                  </Link>
                  <AnimatePresence>
                    {activeDropdown === 'services' && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-16 left-0 w-60 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 nav-dropdown"
                      >
                        {categories.filter(c => c.section === 'services').map((category) => (
                          <li key={category.id}>
                            <Link to={`/services/${category.id}`} onClick={() => setActiveDropdown(null)} className="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium">
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/membership" className={`transition-colors ${currentSection === 'membership' ? 'text-slate-900' : 'hover:text-slate-900'}`}>Membership</Link>
              </nav>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-full leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-slate-900 sm:text-sm transition-all shadow-sm hover:shadow-md"
                  placeholder={`Search ${currentSection}...`}
                  autoComplete="off"
                />
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
                            className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-slate-800 truncate mr-4">{product.title}</span>
                            <span className="text-xs text-slate-400 whitespace-nowrap">{getCategoryName(product.category)}</span>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">

              
              <button 
                className="text-slate-500 hover:text-slate-900 transition-colors"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              

              
              <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                <User size={20} />
                <span>Sign In</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden text-slate-500 hover:text-slate-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Header (White - Categories) */}
      <nav className="bg-white border-b border-slate-100 hidden lg:block sticky top-16 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center space-x-10 h-14 overflow-x-auto no-scrollbar">
            <li>
              <Link 
                to={`/${currentSection}`} 
                className={`text-sm font-medium whitespace-nowrap transition-colors inline-block py-4 ${
                  location.pathname === `/${currentSection}` || location.pathname === '/'
                    ? 'text-slate-900 border-b-2 border-slate-900' 
                    : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
                }`}
              >
                All {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
              </Link>
            </li>
            {sectionCategories.map((category) => {
              const isActive = location.pathname === `/${currentSection}/${category.id}`;
              return (
                <li key={category.id}>
                  <Link
                    to={`/${currentSection}/${category.id}`}
                    className={`text-sm font-medium whitespace-nowrap transition-colors inline-block py-4 ${
                      isActive
                        ? 'text-slate-900 border-b-2 border-slate-900'
                        : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white text-slate-900 absolute top-16 left-0 right-0 z-50 shadow-xl border-t border-slate-100 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 py-6 space-y-8">
            <div ref={mobileSearchRef}>
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-full leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-slate-900 sm:text-sm"
                  placeholder="Search resources..."
                  autoComplete="off"
                />
              </form>
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="mt-2 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 overflow-hidden"
                  >
                    {suggestions.map(product => (
                      <li key={product.id}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(product)}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-slate-800 truncate mr-4">{product.title}</span>
                          <span className="text-xs text-slate-400 whitespace-nowrap">{getCategoryName(product.category)}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Sections</h3>
              
              {/* Marketplace Accordion */}
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setMobileAccordion(prev => prev === 'marketplace' ? null : 'marketplace')}
                  className={`flex items-center justify-between w-full px-4 py-3.5 font-medium transition-colors ${currentSection === 'marketplace' ? 'bg-slate-50 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span>Marketplace</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${mobileAccordion === 'marketplace' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileAccordion === 'marketplace' && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white px-4 pb-2 space-y-1"
                    >
                      {categories.filter(c => c.section === 'marketplace').map(category => (
                        <li key={category.id}>
                          <Link to={`/marketplace/${category.id}`} onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Services Accordion */}
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setMobileAccordion(prev => prev === 'services' ? null : 'services')}
                  className={`flex items-center justify-between w-full px-4 py-3.5 font-medium transition-colors ${currentSection === 'services' ? 'bg-slate-50 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span>Services</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${mobileAccordion === 'services' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileAccordion === 'services' && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white px-4 pb-2 space-y-1"
                    >
                      {categories.filter(c => c.section === 'services').map(category => (
                        <li key={category.id}>
                          <Link to={`/services/${category.id}`} onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/membership" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3.5 rounded-xl font-medium border border-transparent hover:bg-slate-50 transition-colors ${currentSection === 'membership' ? 'bg-slate-50 text-slate-900' : 'text-slate-600'}`}>Membership</Link>
            </div>
            <div className="border-t border-slate-100 pt-8 pb-4">
              <button className="block w-full text-center px-4 py-4 rounded-full font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors">Sign In / Register</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <Outlet />
        <BackToTop />
      </main>

      {/* Footer (Dark) */}
      <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-2xl mb-6 tracking-tight">Triplett<span className="font-light text-slate-500">Hub</span></h3>
              <p className="text-base leading-relaxed max-w-sm mb-8 font-light">
                The premier destination for professional resources, ethical leadership training, and institutional development services by Dr. William Triplett.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center"></div>
                <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center"></div>
                <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center"></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6 tracking-tight">Marketplace</h3>
              <ul className="space-y-4 text-sm font-light">
                <li><Link to="/marketplace/books" className="hover:text-white transition-colors">Books & Publications</Link></li>
                <li><Link to="/marketplace/audio" className="hover:text-white transition-colors">Audio & Video</Link></li>
                <li><Link to="/marketplace/toolkits" className="hover:text-white transition-colors">Leadership Toolkits</Link></li>
                <li><Link to="/marketplace/courses" className="hover:text-white transition-colors">Masterclasses</Link></li>
                <li><Link to="/membership/membership" className="hover:text-white transition-colors">Collective Membership</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6 tracking-tight">Services</h3>
              <ul className="space-y-4 text-sm font-light">
                <li><Link to="/services/consulting" className="hover:text-white transition-colors">1-on-1 Strategy Sessions</Link></li>
                <li><Link to="/services/speaking" className="hover:text-white transition-colors">Keynotes & Workshops</Link></li>
                <li><Link to="/services/organizational-development" className="hover:text-white transition-colors">Culture Audits</Link></li>
                <li><Link to="/services/faculty-services" className="hover:text-white transition-colors">Faculty Development</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6 tracking-tight">Support</h3>
              <ul className="space-y-4 text-sm font-light">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm font-light">
            <p>&copy; {new Date().getFullYear()} Dr. William Triplett. All rights reserved.</p>
            <p className="mt-4 md:mt-0 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All systems operational
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
