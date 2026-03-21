import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-slate-700 hover:-translate-y-1 transition-all duration-200"
    >
      <ArrowUp size={18} />
    </button>
  );
};
