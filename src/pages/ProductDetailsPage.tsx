import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { ChevronRight, ShoppingCart, ExternalLink, Star, StarHalf, CheckCircle, Clock, Shield, X } from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { section, categoryId, productId } = useParams<{ section: string, categoryId: string, productId: string }>();
  
  const product = products.find(p => p.id === productId && p.section === section && p.category === categoryId);
  const category = categories.find(c => c.id === categoryId && c.section === section);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  if (!product) {
    return <Navigate to={`/${section || 'marketplace'}`} replace />;
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} className="fill-slate-900 text-slate-900" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={16} className="fill-slate-900 text-slate-900" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-slate-200" />);
    }
    return stars;
  };

  const isExternal = product.ctaText.includes('Request') || product.ctaText.includes('Book') || product.ctaText.includes('Enroll');

  return (
    <div className="w-full min-h-screen bg-[#fcfcfc] pb-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-slate-500 font-medium">
            <Link to={`/${section}`} className="hover:text-slate-900 transition-colors capitalize">
              {section}
            </Link>
            <ChevronRight size={14} className="mx-3 text-slate-300" />
            <Link to={`/${section}/${categoryId}`} className="hover:text-slate-900 transition-colors">
              {category?.name || categoryId}
            </Link>
            <ChevronRight size={14} className="mx-3 text-slate-300" />
            <span className="text-slate-900 truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Title & Meta */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                {product.badge && (
                  <span className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {product.format}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-light text-slate-900 mb-6 leading-[1.1] tracking-tight">
                {product.title}
              </h1>
              
              <p className="text-xl text-slate-500 mb-8 font-light">
                by <span className="text-slate-900 font-medium hover:underline cursor-pointer">{product.author}</span>
              </p>
              
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-slate-500 border-y border-slate-100 py-6">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="font-medium text-slate-900 ml-1">{product.rating}</span>
                  <span>({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart size={16} className="text-slate-400" />
                  <span className="font-medium text-slate-900">{product.sales.toLocaleString()}</span> Sales
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-400" />
                  <span>Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Image/Preview */}
            <div className="aspect-[16/9] bg-slate-100 rounded-2xl overflow-hidden relative group">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                 <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-medium shadow-xl hover:scale-105 transition-transform">
                   Live Preview
                 </button>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-slate prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6 tracking-tight">About this resource</h2>
              <p className="text-slate-600 leading-relaxed mb-8 font-light">
                {product.description}
              </p>
              <p className="text-slate-600 leading-relaxed mb-10 font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <h3 className="text-xl font-semibold text-slate-900 mt-12 mb-6 tracking-tight">Key Features</h3>
              <ul className="space-y-4 list-none pl-0">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item} className="flex items-start gap-4 text-slate-600 font-light">
                    <CheckCircle size={24} className="text-slate-900 flex-shrink-0" />
                    <span className="pt-0.5">Comprehensive framework for immediate implementation in your organization.</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8 self-start">
            {/* Pricing Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="mb-8">
                <span className="text-5xl font-light text-slate-900 tracking-tight">{product.price}</span>
                {product.numericPrice > 0 && <span className="text-slate-500 ml-2 font-medium uppercase tracking-wider text-sm">USD</span>}
              </div>

              <button 
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all mb-8
                  ${isExternal 
                    ? 'bg-slate-900 text-white hover:bg-slate-800' 
                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                onClick={() => setIsPaymentOpen(true)}
              >
                {isExternal ? <ExternalLink size={20} /> : <ShoppingCart size={20} />}
                {product.ctaText}
              </button>

              <div className="space-y-5 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <Shield size={20} className="text-slate-400" />
                  <span>Quality checked by TriplettHub</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <CheckCircle size={20} className="text-slate-400" />
                  <span>Future updates included</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <Clock size={20} className="text-slate-400" />
                  <span>6 months support from author</span>
                </div>
              </div>
              
              <p className="text-xs text-center text-slate-400 mt-8 font-medium uppercase tracking-wider">
                Secure checkout via Lemonsqueezy
              </p>
            </div>

            {/* Author Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-6 tracking-tight">About the Author</h3>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-medium text-slate-900">
                  {product.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-slate-900 hover:underline cursor-pointer text-lg">{product.author}</div>
                  <div className="text-sm text-slate-500">Elite Author</div>
                </div>
              </div>
              <button className="w-full py-3 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                View Portfolio
              </button>
            </div>
          </div>
          
        </div>
      </div>
      {/* Payment Modal */}
      {isPaymentOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all flex flex-col items-center relative">
            <button 
              onClick={() => { setIsPaymentOpen(false); setPaymentStatus('idle'); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>

            {paymentStatus === 'idle' && (
              <>
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 border border-slate-100">
                  <Shield className="text-slate-900" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">Secure Checkout</h3>
                <p className="text-sm text-slate-500 text-center mb-6">By buying <span className="text-slate-900 font-medium">{product.title}</span></p>
                
                <div className="w-full space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Item Price</span>
                    <span className="text-slate-900 font-medium">{product.price}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t border-slate-100 pt-4">
                    <span className="text-slate-900">Total Charged</span>
                    <span className="text-slate-900">{product.price}</span>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <button 
                    onClick={() => {
                      setPaymentStatus('processing');
                      setTimeout(() => setPaymentStatus('success'), 1500);
                    }}
                    className="w-full py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 hover:shadow-lg"
                  >
                    Simulate Payment
                  </button>
                  <button 
                    onClick={() => setIsPaymentOpen(false)}
                    className="w-full py-4 bg-slate-100 text-slate-700 rounded-full font-medium hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {paymentStatus === 'processing' && (
              <div className="flex flex-col items-center py-12">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-6"></div>
                <p className="text-slate-800 font-semibold">Processing Simulated Payment...</p>
                <p className="text-xs text-slate-400 mt-1">Please do not refresh the page</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle className="text-emerald-500" size={36} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">Simulated Success!</h3>
                <p className="text-sm text-slate-500 mb-8 max-w-xs">Your payment simulation was processed successfully. Access point unlocked.</p>
                <button 
                  onClick={() => {
                    setIsPaymentOpen(false);
                    setPaymentStatus('idle');
                  }}
                  className="w-full py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
                >
                  Return to Product
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
