
import React from 'react';
import { createPortal } from 'react-dom';
import { MenuItem } from '../types';
import { Plus, Star, Flame, X } from 'lucide-react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

// --- Button ---
// Fix: Use HTMLMotionProps to match motion.button requirements and avoid onDrag/event type conflicts between React and Framer Motion
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const variants = {
    primary: "bg-[#FF671F] hover:bg-[#E55A1A] text-white shadow-[0_10px_30px_rgba(255,103,31,0.2)]",
    secondary: "bg-[#0033A0] hover:bg-[#002B88] text-white shadow-[0_10px_30px_rgba(0,51,160,0.2)]",
    outline: "border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20"
  };
  const sizes = { 
    sm: "h-9 px-4 text-[10px]", 
    md: "h-11 px-6 text-[10px]", 
    lg: "h-14 px-8 text-sm" 
  };
  return (
    <motion.button 
      whileTap={{ scale: 0.95 }} 
      whileHover={{ scale: 1.01 }} 
      className={`inline-flex items-center justify-center rounded-[1.25rem] font-black uppercase tracking-widest transition-all disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};

// --- Input ---
export const Input: React.FC<any> = ({ label, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-[8px] font-black text-slate-500 mb-2 uppercase tracking-widest">{label}</label>}
    <input className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold text-white placeholder:text-slate-700 focus:ring-1 focus:ring-orange-500/30 focus:outline-none transition-all ${className}`} {...props} />
  </div>
);

// --- Star Rating ---
export const StarRating: React.FC<any> = ({ rating, max = 5, size = 16, interactive = false, onChange }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <motion.button 
        key={i} 
        type="button" 
        disabled={!interactive} 
        onClick={() => onChange?.(i + 1)} 
        whileTap={interactive ? { scale: 0.8 } : {}}
        className={`${interactive ? 'p-0.5 cursor-pointer' : ''}`}
      >
        <Star size={size} fill={i < rating ? "currentColor" : "none"} className={i < rating ? "text-yellow-400" : "text-white/10"} strokeWidth={2.5} />
      </motion.button>
    ))}
  </div>
);

// --- Modal ---
export const Modal: React.FC<any> = ({ isOpen, onClose, title, children }) => {
  if (typeof window === 'undefined') return null;
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key={`modal-backdrop-${title}`}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
        >
          <motion.div 
            key={`modal-content-${title}`}
            initial={{ scale: 0.9, y: 30 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.9, y: 30 }} 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#10141d] rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-3xl border border-white/10"
          >
            <div className="flex justify-between items-center p-5 border-b border-white/5">
              <h3 className="font-black text-white uppercase tracking-widest text-[9px]">{title}</h3>
              <button onClick={onClose} className="p-2 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// --- Product Card ---
export const ProductCard: React.FC<any> = ({ item, onAdd, onClick }) => (
  <motion.div 
    whileTap={{ scale: 0.97 }} 
    onClick={() => onClick?.(item)} 
    className="bg-white/5 backdrop-blur-md rounded-[2.2rem] shadow-xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-all p-3 flex flex-col h-full group"
  >
    <div className="relative aspect-square rounded-[1.8rem] overflow-hidden mb-3">
      <img 
        src={item.image} 
        alt={item.name} 
        onError={(e: any) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
      />
      <div className="absolute top-2 right-2 flex flex-col gap-1.5">
        {item.isPopular && <div className="bg-yellow-400 text-yellow-900 text-[6px] font-black px-1.5 py-0.5 rounded-md uppercase">Top</div>}
        {item.isSpicy && <div className="bg-red-500 text-white p-1 rounded-md"><Flame size={10} fill="currentColor" /></div>}
      </div>
    </div>
    <div className="px-1 flex-1 flex flex-col">
      <h3 className="font-black text-white text-[11px] leading-tight mb-1 line-clamp-1 group-hover:text-orange-400 transition-colors">{item.name}</h3>
      <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-3">{item.stallName}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-black text-white text-[12px] tracking-tighter">₱{item.price}</span>
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={(e) => { e.stopPropagation(); onAdd(item); }} 
          className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-[#FF671F] transition-all shadow-md"
        >
          <Plus size={14} strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

// --- Badge ---
export const Badge: React.FC<any> = ({ children, active, onClick }) => (
  <motion.button 
    whileTap={{ scale: 0.95 }} 
    onClick={onClick} 
    className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border shrink-0 ${active ? 'bg-[#FF671F] border-[#FF671F] text-white shadow-lg shadow-orange-500/20' : 'bg-white/5 text-slate-500 border-white/10 hover:bg-white/10'}`}
  >
    {children}
  </motion.button>
);
