import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { categories, SectionId } from '../data/products';
import { Search, ShoppingCart, Menu, X, User, Bell } from 'lucide-react';

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSection = (pathParts[0] as SectionId) || 'marketplace';
  
  const sectionCategories = categories.filter(c => c.section === currentSection);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/${currentSection}?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans">
      
      {/* Top Header (Clean White) */}
      <header className="bg-white text-slate-900 sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Area */}
            <div className="flex items-center gap-12">
              <Link to="/marketplace" className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Triplett<span className="font-light text-slate-500">Hub</span>
                </span>
              </Link>
              
              {/* Desktop Top Links */}
              <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-500">
                <Link to="/marketplace" className={`transition-colors ${currentSection === 'marketplace' ? 'text-slate-900' : 'hover:text-slate-900'}`}>Marketplace</Link>
                <Link to="/services" className={`transition-colors ${currentSection === 'services' ? 'text-slate-900' : 'hover:text-slate-900'}`}>Services</Link>
                <Link to="/membership" className={`transition-colors ${currentSection === 'membership' ? 'text-slate-900' : 'hover:text-slate-900'}`}>Membership</Link>
              </nav>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-full leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-slate-900 sm:text-sm transition-all shadow-sm hover:shadow-md"
                  placeholder={`Search ${currentSection}...`}
                />
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-500 border-r border-slate-200 pr-6">
                <button className="hover:text-slate-900 transition-colors">Start Selling</button>
                <button className="hover:text-slate-900 transition-colors">For Enterprise</button>
              </div>
              
              <button className="text-slate-500 hover:text-slate-900 transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-slate-900 w-2 h-2 rounded-full"></span>
              </button>
              
              <button className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                <ShoppingCart size={20} />
                <span className="hidden sm:flex items-center justify-center bg-slate-100 text-slate-900 text-xs font-bold w-5 h-5 rounded-full">0</span>
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
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Header (White - Categories) */}
      <nav className="bg-white border-b border-slate-100 hidden lg:block sticky top-20 z-30">
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
        <div className="lg:hidden bg-white text-slate-900 absolute top-20 left-0 right-0 z-50 shadow-xl border-t border-slate-100 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-6 space-y-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-full leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-slate-900 sm:text-sm"
                placeholder="Search resources..."
              />
            </form>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">Sections</h3>
              <Link to="/marketplace" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl font-medium ${currentSection === 'marketplace' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}>Marketplace</Link>
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl font-medium ${currentSection === 'services' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}>Services</Link>
              <Link to="/membership" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-xl font-medium ${currentSection === 'membership' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}>Membership</Link>
            </div>

            <div className="space-y-2 pt-6 border-t border-slate-100">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">Categories</h3>
              <div className="px-3">
                <select 
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-0 focus:border-slate-900 appearance-none font-medium"
                  value={location.pathname}
                  onChange={(e) => {
                    navigate(e.target.value);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <option value={`/${currentSection}`}>All {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}</option>
                  {sectionCategories.map((category) => (
                    <option key={category.id} value={`/${currentSection}/${category.id}`}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
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
