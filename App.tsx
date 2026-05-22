
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Home, UtensilsCrossed, ShoppingBag, User, Search, MapPin, Bell, 
  ChevronLeft, LogOut, Clock, Phone, Filter, X, CreditCard, 
  Banknote, Smartphone, CheckCircle, ChevronRight, Edit2, 
  ClipboardList, Timer, Check, Loader, Flame, Leaf, ReceiptText, 
  Store, Star, MessageSquareQuote, ShieldCheck, Zap, Heart, Settings,
  Hash, GraduationCap, Map, Sparkles, Eye, Info, ArrowRight, Bot, Camera, Upload
} from 'lucide-react';
import { CartItem, MenuItem, Order, OrderStatus, User as UserType, Notification, PaymentMethod, Stall, Review } from './types';
import { CATEGORIES, MOCK_NOTIFICATIONS, STALLS, MENU_ITEMS, MOCK_REVIEWS, MOCK_USER } from './constants';
import { Button, ProductCard, Badge, Input, Modal, StarRating } from './components/Components';
import { ChatBot } from './components/ChatBot';
import { supabase, isSupabaseConfigured } from './services/supabase';
import { AnimatePresence, motion } from 'framer-motion';

// --- Theme Constants ---
const THEME = {
  bg: "bg-[#050810]",
  surface: "bg-white/[0.03] backdrop-blur-3xl border border-white/10",
  text: "text-slate-100",
  textDim: "text-slate-400",
  primary: "#FF671F", // BUPC Orange
  secondary: "#0033A0", // BUPC Blue
};

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
];

// --- Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
  }
};

// --- Page Animation Wrapper ---
const PageTransition: React.FC<{ children: React.ReactNode; noPadding?: boolean }> = ({ children, noPadding = false }) => (
  <motion.div
    initial={{ opacity: 0, x: 10, filter: 'blur(5px)' }}
    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, x: -10, filter: 'blur(5px)' }}
    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    className={`min-h-screen ${noPadding ? '' : 'pb-32 pt-4 px-4'} max-w-md mx-auto relative z-10`}
  >
    {children}
  </motion.div>
);

// --- Creative Onboarding Composition ---
const VisualComposition: React.FC<{ step: number }> = ({ step }) => {
  const compositions = [
    { color: "from-blue-600 to-indigo-900", icon: Sparkles, glow: "bg-blue-500/20" },
    { color: "from-orange-500 to-red-600", icon: Zap, glow: "bg-orange-500/20" },
    { color: "from-purple-500 to-pink-700", icon: Heart, glow: "bg-purple-500/20" }
  ];
  const item = compositions[step];
  
  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className={`absolute inset-0 ${item.glow} blur-[80px] rounded-full`}
      />
      <div className="relative z-10 w-48 h-48">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${THEME.surface} w-full h-full rounded-[3rem] border-white/20 flex flex-col items-center justify-center p-6 shadow-3xl`}
        >
          <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-[2rem] flex items-center justify-center mb-4 shadow-2xl`}>
            <item.icon size={36} className="text-white" />
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            <div className="w-6 h-1.5 bg-white/10 rounded-full" />
          </div>
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 backdrop-blur-3xl rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl"
        >
          <UtensilsCrossed className="text-[#FF671F]" size={24} />
        </motion.div>
      </div>
    </div>
  );
};

// --- Onboarding Page ---
const OnboardingPage: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const slides = [
    { title: "Smart Dining", desc: "Experience the smartest food ordering platform at BUPC, powered by AI recommendations." },
    { title: "Skip the Lines", desc: "Order from your lecture room and pick up your meal once it's ready. No more waiting." },
    { title: "Bicolano Flavors", desc: "Supporting local BUPC stalls with a seamless digital experience. Stay Oragon!" }
  ];

  return (
    <div className={`h-screen ${THEME.bg} text-white flex flex-col p-10 overflow-hidden relative`}>
      <div className="absolute top-[-20%] left-[-10%] w-full h-full bg-[#0033A0]/10 blur-[150px] rounded-full" />
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={step} 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -50 }} 
            className="w-full text-center"
          >
            <VisualComposition step={step} />
            <div className="mt-12 space-y-4">
              <h2 className="text-3xl font-black tracking-tighter">{slides[step].title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto font-medium">{slides[step].desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pb-10 space-y-8">
        <div className="flex justify-center gap-3">
          {slides.map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ width: i === step ? 32 : 8 }} 
              className={`h-2 rounded-full transition-all ${i === step ? 'bg-[#FF671F] shadow-[0_0_15px_rgba(255,103,31,0.5)]' : 'bg-white/10'}`} 
            />
          ))}
        </div>
        <Button 
          className="w-full h-16 rounded-[2rem] text-lg font-black" 
          onClick={() => step < 2 ? setStep(s => s + 1) : onComplete()}
        >
          {step < 2 ? "Next" : "Get Started"}
        </Button>
      </div>
    </div>
  );
};

// --- Auth Page ---
const AuthPage: React.FC<{ onAuth: (user: any) => void }> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (signInError) throw signInError;
        
        if (data?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          if (profile) {
            onAuth(profile);
          } else {
            const newProfile = { 
              id: data.user.id, 
              name: data.user.user_metadata?.full_name || 'BUPC User',
              email: data.user.email,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.user_metadata?.full_name || 'User')}&background=random`,
              userType: 'Student'
            };
            await supabase.from('profiles').insert([newProfile]);
            onAuth(newProfile);
          }
        }
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: form.name } }
        });
        if (signUpError) throw signUpError;
        
        if (data?.user) {
          const newProfile = { 
            id: data.user.id, 
            name: form.name, 
            email: form.email, 
            userType: 'Student',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=random`
          };
          await supabase.from('profiles').insert([newProfile]);
          onAuth(newProfile);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoMode = () => {
    onAuth(MOCK_USER);
  };

  return (
    <div className={`min-h-screen ${THEME.bg} flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0033A0]/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF671F]/20 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className={`${THEME.surface} p-10 rounded-[3.5rem] w-full max-w-sm shadow-3xl relative z-10 border-white/20`}
      >
        <div className="relative w-20 h-20 mx-auto mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-tr from-[#FF671F] to-[#0033A0] rounded-[2rem] blur-xl opacity-30"
          />
          <div className="relative z-10 w-full h-full bg-[#1A1F2C] border border-white/20 rounded-[2rem] flex items-center justify-center text-white shadow-2xl">
            <UtensilsCrossed size={36} strokeWidth={2.5} />
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white tracking-tighter mb-1">{isLogin ? 'Welcome' : 'Join Us'}</h2>
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.4em]">DineTime Polangui</p>
        </div>

        {error && <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black rounded-2xl text-center">{error}</div>}

        <div className="space-y-4">
          {!isLogin && <Input label="Full Name" placeholder="Juan Dela Cruz" value={form.name} onChange={(e:any) => setForm({...form, name: e.target.value})} />}
          <Input label="Email Address" placeholder="user@bupc.edu.ph" value={form.email} onChange={(e:any) => setForm({...form, email: e.target.value})} />
          <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={(e:any) => setForm({...form, password: e.target.value})} />
          
          <Button className="w-full h-16 rounded-[2rem] mt-4 text-base shadow-2xl" onClick={handleAuth} disabled={loading}>
            {loading ? <Loader className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>

          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="w-full py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest hover:text-white transition-colors"
          >
            {isLogin ? "New to DineTime? Create Account" : "Already have an account? Sign In"}
          </button>

          <div className="pt-4 border-t border-white/5">
             <button 
               onClick={handleDemoMode}
               className="w-full py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase text-blue-400 tracking-widest border border-blue-500/20 hover:bg-blue-500/10 transition-all"
             >
               Try Demo Mode
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Review List Component ---
const ReviewSection: React.FC<{ 
  targetId: string; 
  targetType: 'stall' | 'menu_item'; 
  reviews: Review[];
  onAddReview: (rating: number, comment: string) => void;
}> = ({ targetId, targetType, reviews, onAddReview }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const filtered = reviews.filter(r => r.targetId === targetId && r.targetType === targetType);
  
  const handleSubmit = () => {
    if (!comment.trim()) return;
    onAddReview(rating, comment);
    setComment('');
    setRating(5);
    setIsAdding(false);
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Community Feedback</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="text-[9px] font-black text-[#FF671F] uppercase tracking-widest bg-[#FF671F]/10 px-3 py-1.5 rounded-xl border border-[#FF671F]/20"
        >
          Add Review
        </button>
      </div>
      
      {filtered.length === 0 ? (
        <p className="text-[10px] text-slate-600 font-bold text-center py-6 border border-dashed border-white/5 rounded-2xl">No reviews yet. Share your experience!</p>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => (
            <div key={r.id} className={`${THEME.surface} p-4 rounded-2xl border-white/5`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <img src={`https://ui-avatars.com/api/?name=${r.userName}&background=random`} className="w-6 h-6 rounded-lg" alt="" />
                  <div>
                    <p className="text-[10px] font-black text-white leading-none">{r.userName}</p>
                    <p className="text-[8px] text-slate-500 font-bold mt-1">{new Date(r.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <StarRating rating={r.rating} size={8} />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed italic">"{r.comment}"</p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="New Review">
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] font-black text-slate-500 uppercase">Rate your meal</p>
            <StarRating rating={rating} interactive onChange={setRating} size={28} />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase">Details</p>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the flavor? (e.g. Oragon! Spicy!)"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-[11px] font-medium text-white min-h-[80px] outline-none focus:border-[#FF671F]/50"
            />
          </div>
          <Button className="w-full h-12 rounded-xl text-xs" onClick={handleSubmit}>Post Review</Button>
        </div>
      </Modal>
    </div>
  );
};

// --- Header ---
const Header: React.FC<{ title?: string; showLocation?: boolean; backUrl?: string; rightAction?: React.ReactNode }> = ({ title, showLocation, backUrl, rightAction }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-[60] mb-6 pt-2">
      <div className={`${THEME.surface} rounded-[2rem] px-5 h-14 flex items-center justify-between shadow-2xl`}>
        {backUrl ? (
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(backUrl)} className="p-2 bg-white/10 rounded-xl text-white">
            <ChevronLeft size={18} />
          </motion.button>
        ) : showLocation ? (
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                backgroundColor: ['#0033A0', '#0044C0', '#0033A0']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-9 h-9 bg-[#0033A0] rounded-xl flex items-center justify-center text-white shadow-lg border border-white/10"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <MapPin size={18} strokeWidth={2.5} />
              </motion.div>
            </motion.div>
            <div>
              <p className="text-[7px] font-black uppercase text-blue-400 tracking-widest leading-none mb-1">Campus</p>
              <h2 className="text-[12px] font-black text-white leading-none">BU Polangui</h2>
            </div>
          </div>
        ) : (
          <h1 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{title}</h1>
        )}
        <div className="flex items-center gap-2">
          {rightAction}
          {!rightAction && showLocation && (
            <Link to="/notifications" className="relative p-2 bg-white/10 rounded-xl text-white">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF671F] rounded-full border border-[#050810]"></span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

// --- Navigation ---
const BottomNav: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: UtensilsCrossed, label: 'Menu', path: '/menu' },
    { icon: ShoppingBag, label: 'Cart', path: '/cart', badge: cartCount },
    { icon: ClipboardList, label: 'Orders', path: '/orders' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  if (['/login', '/signup', '/onboarding'].includes(location.pathname)) return null;
  return (
    <div className="fixed bottom-6 left-6 right-6 z-[70] max-w-md mx-auto pointer-events-none">
      <div className={`${THEME.surface} rounded-[2rem] h-14 px-4 flex items-center justify-around shadow-3xl border border-white/20 pointer-events-auto`}>
        {navItems.map((item) => (
          <Link key={item.label} to={item.path} className="relative flex flex-col items-center justify-center w-10 h-10">
            <motion.div whileTap={{ scale: 0.8 }} className={`${isActive(item.path) ? 'text-[#FF671F]' : 'text-slate-500'} transition-all duration-300`}>
              <item.icon size={18} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0033A0] text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-[#050810]">{item.badge}</span>
              )}
            </motion.div>
            {isActive(item.path) && (
              <motion.div layoutId="nav-glow" className="absolute inset-0 bg-white/5 rounded-xl -z-10" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- View Components ---

const OrdersListView: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const [tab, setTab] = useState<'current' | 'history'>('current');
  const navigate = useNavigate();

  const currentStatus = [OrderStatus.PENDING, OrderStatus.PREPARING, OrderStatus.READY];
  const historyStatus = [OrderStatus.COMPLETED, OrderStatus.CANCELLED];

  const filteredOrders = orders.filter(o => 
    tab === 'current' ? currentStatus.includes(o.status) : historyStatus.includes(o.status)
  );

  return (
    <div className="space-y-6">
      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
        <button 
          onClick={() => setTab('current')}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'current' ? 'bg-[#FF671F] text-white shadow-lg' : 'text-slate-500'}`}
        >
          Current
        </button>
        <button 
          onClick={() => setTab('history')}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'history' ? 'bg-[#FF671F] text-white shadow-lg' : 'text-slate-500'}`}
        >
          History
        </button>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {filteredOrders.map(o => (
          <motion.div 
            variants={staggerItem}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/orders/${o.id}`)}
            key={o.id} 
            className={`${THEME.surface} p-5 rounded-[2.5rem] flex items-center justify-between cursor-pointer border-white/10 shadow-2xl hover:bg-white/5 transition-all group`}
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#FF671F] border border-white/5 group-hover:border-[#FF671F]/50 transition-colors">
                <ReceiptText size={24} />
              </div>
              <div>
                <h4 className="font-black text-white text-sm tracking-tight leading-none mb-1.5">#{o.id.slice(-6)}</h4>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${o.status === OrderStatus.READY ? 'bg-green-500' : 'bg-[#FF671F]'}`}></div>
                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{o.status}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xs font-black text-white mb-1">₱{o.total}</p>
              <ChevronRight className="text-slate-700" size={16} />
            </div>
          </motion.div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="text-center py-24 opacity-10">
            <ClipboardList size={80} className="mx-auto" />
            <p className="font-black uppercase tracking-[0.3em] text-[10px] mt-6">No {tab} orders</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const OrderDetailView: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = orders.find(o => o.id === id);

  if (!order) return <div className="p-10 text-center">Order Not Found</div>;

  return (
    <div className="space-y-8">
      <Header title="Order Detail" backUrl="/orders" />
      <div className={`${THEME.surface} p-8 rounded-[3rem] border-white/10 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-6">
           <div className="bg-[#FF671F]/10 text-[#FF671F] px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border border-[#FF671F]/20">
              {order.status}
           </div>
        </div>
        <div className="mb-8">
          <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.4em] mb-2">Order Tracking</p>
          <h2 className="text-3xl font-black text-white">#{order.id.slice(-6)}</h2>
          <p className="text-[10px] text-slate-400 font-bold mt-2">{new Date(order.date).toLocaleString()}</p>
        </div>
        <div className="space-y-4">
          <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em]">Items Summary</p>
          {order.items.map(i => (
            <div key={i.id} className="flex justify-between items-center py-2">
              <div className="flex gap-4 items-center">
                <span className="text-[10px] font-black text-[#FF671F] w-5 h-5 flex items-center justify-center bg-[#FF671F]/10 rounded-lg">{i.quantity}x</span>
                <span className="text-xs font-black text-white">{i.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-400">₱{i.price * i.quantity}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-dashed border-white/10 space-y-3">
          <div className="flex justify-between text-xs font-black">
            <span className="text-slate-500 uppercase">Subtotal</span>
            <span className="text-white">₱{order.subtotal}</span>
          </div>
          <div className="flex justify-between text-xs font-black">
            <span className="text-slate-500 uppercase">Handling Fee</span>
            <span className="text-white">₱15</span>
          </div>
          <div className="flex justify-between text-xl font-black pt-4 border-t border-white/10">
            <span className="text-white uppercase tracking-tighter">Total Paid</span>
            <span className="text-[#FF671F]">₱{order.total}</span>
          </div>
        </div>
      </div>
      <Button variant="outline" className="w-full h-14 rounded-2xl" onClick={() => navigate('/menu')}>Reorder Items</Button>
    </div>
  );
};

const MarketplaceView: React.FC<{ menuItems: MenuItem[], addToCart: any }> = ({ menuItems, addToCart }) => {
  const [cat, setCat] = useState('All');
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);
  const navigate = useNavigate();

  const filtered = menuItems.filter(i => 
    (cat === 'All' || i.category === cat) && 
    i.name.toLowerCase().includes(query.toLowerCase()) &&
    i.price <= maxPrice
  );

  return (
    <>
      <Header title="Discover" />
      <div className="space-y-6">
        <div className="relative">
          <Input 
            placeholder="What's your craving?" 
            className="pl-12 h-14 bg-white/10 border-white/10 text-white rounded-xl text-xs" 
            value={query}
            onChange={(e:any) => setQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        </div>
        <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-2">
             <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Price Limit</p>
             <p className="text-[10px] font-black text-[#FF671F]">₱{maxPrice}</p>
          </div>
          <input 
            type="range" min="20" max="300" step="5" value={maxPrice} 
            onChange={(e) => setMaxPrice(parseInt(e.target.value))} 
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
          {CATEGORIES.map(c => (
            <Badge key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Badge>
          ))}
        </div>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 pb-10"
        >
          {filtered.map(item => (
            <motion.div key={item.id} variants={staggerItem}>
              <ProductCard item={item} onAdd={addToCart} onClick={() => navigate(`/food/${item.id}`)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

const FoodDetailsView: React.FC<{ 
  menuItems: MenuItem[], 
  reviews: Review[], 
  favorites: string[],
  toggleFavorite: (id: string) => void,
  addToCart: any, 
  onAddReview: any 
}> = ({ menuItems, reviews, favorites, toggleFavorite, addToCart, onAddReview }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = menuItems.find(i => i.id === id);
  const isFavorited = item ? favorites.includes(item.id) : false;

  if (!item) return <div className="p-10 text-center">Not Found</div>;

  return (
    <PageTransition noPadding>
      <div className="min-h-screen bg-[#050810] text-white">
        <div className="relative h-[35vh]">
          <img src={item.image} className="w-full h-full object-cover" />
          <div className="absolute top-6 left-6 right-6 flex justify-between z-30">
            <button onClick={() => navigate(-1)} className="p-2.5 bg-black/50 backdrop-blur-xl rounded-xl">
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }} 
              className={`p-2.5 backdrop-blur-xl rounded-xl transition-colors ${isFavorited ? 'bg-[#FF671F] text-white' : 'bg-black/50 text-white'}`}
            >
              <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent" />
        </div>
        <div className={`${THEME.surface} -mt-10 rounded-t-[3rem] p-8 border-t border-white/20 min-h-[70vh] relative z-20`}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-black tracking-tight">{item.name}</h1>
              <p className="text-[#FF671F] text-[10px] font-black uppercase tracking-widest">{item.stallName}</p>
            </div>
            <div className="text-2xl font-black">₱{item.price}</div>
          </div>
          <div className="flex gap-2 mb-8">
            <div className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-black">{item.rating}</span>
            </div>
            {item.isPopular && <div className="bg-[#FF671F]/10 text-[#FF671F] px-4 py-2 rounded-xl text-[9px] font-black uppercase border border-[#FF671F]/20">Polangui Fave</div>}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-10">{item.description}</p>
          <ReviewSection targetId={item.id} targetType="menu_item" reviews={reviews} onAddReview={(r:number, c:string) => onAddReview(item.id, 'menu_item', r, c)} />
          <div className="h-24" />
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-6 z-[80] pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <Button className="w-full h-16 rounded-[2rem] text-lg font-black shadow-3xl" onClick={() => { addToCart(item); navigate('/cart'); }}>
              Add to Bag • ₱{item.price}
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// --- App Root Logic ---
const AppContent: React.FC = () => {
  const [user, setUser] = useState<UserType | any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [stalls, setStalls] = useState<Stall[]>(STALLS);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Session Recovery on Mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
            
          if (profile) {
            setUser(profile);
            setOnboardingComplete(true);
          }
        }
      } catch (err) {
        console.error("Session Recovery Error:", err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const toggleFavorite = async (itemId: string) => {
    const isFav = favorites.includes(itemId);
    const newFavs = isFav ? favorites.filter(id => id !== itemId) : [...favorites, itemId];
    setFavorites(newFavs);
    if (user && isSupabaseConfigured()) {
        await supabase.from('profiles').update({ favorites: newFavs }).eq('id', user.id);
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleAddReview = async (targetId: string, targetType: 'stall' | 'menu_item', rating: number, comment: string) => {
    const newReview: Review = { id: `rev-${Date.now()}`, userId: user?.id || 'guest', userName: user?.name || 'Guest User', targetId, targetType, rating, comment, date: new Date() };
    setReviews(prev => [newReview, ...prev]);
    if (isSupabaseConfigured()) {
      await supabase.from('reviews').insert([newReview]);
    }
  };

  const placeOrder = (items: CartItem[], method: PaymentMethod) => {
    const subtotal = items.reduce((s, i) => s + (i.price * i.quantity), 0);
    const total = subtotal + 15;
    const newOrder: Order = { id: `ORD-${Math.floor(Math.random() * 900000 + 100000)}`, items: [...items], subtotal, fee: 15, total, status: OrderStatus.PENDING, date: new Date(), paymentMethod: method };
    setOrders(prev => [newOrder, ...prev]);
  };

  if (loading) return (
    <div className={`h-screen ${THEME.bg} flex items-center justify-center`}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="text-[#FF671F]">
        <Loader size={48} />
      </motion.div>
    </div>
  );

  return (
    <div className={`min-h-screen ${THEME.bg} text-white selection:bg-[#FF671F]/30 overflow-x-hidden relative`}>
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#0033A0]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF671F]/10 blur-[150px] rounded-full pointer-events-none" />
      <AnimatePresence mode="wait">
        {!onboardingComplete ? (
          <Routes location={location} key="onboarding">
            <Route path="*" element={<OnboardingPage onComplete={() => setOnboardingComplete(true)} />} />
          </Routes>
        ) : !user ? (
          <Routes location={location} key="auth">
            <Route path="*" element={<AuthPage onAuth={setUser} />} />
          </Routes>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <PageTransition>
                    <Header showLocation />
                    <div className="space-y-10">
                      <motion.div whileHover={{ scale: 1.02 }} className={`${THEME.surface} p-10 rounded-[3rem] shadow-3xl relative overflow-hidden group border-white/20`}>
                        <div className="relative z-10">
                          <p className="text-[9px] font-black uppercase text-[#FF671F] tracking-[0.2em] mb-3">Today's Suggestion</p>
                          <h1 className="text-3xl font-black mb-1 tracking-tighter leading-none">Stay Oragon,</h1>
                          <h1 className="text-3xl font-black mb-6 tracking-tighter text-blue-400">{user.name.split(' ')[0]}!</h1>
                          <Button size="md" className="rounded-xl h-11 px-8" onClick={() => navigate('/menu')}>Explore Menu</Button>
                        </div>
                        
                        <motion.div
                          animate={{ 
                            rotate: [12, 372],
                            scale: [1, 1.05, 1],
                            opacity: [0.05, 0.1, 0.05]
                          }}
                          transition={{ 
                            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                          }}
                          className="absolute -right-12 -bottom-12 pointer-events-none"
                        >
                          <Sparkles className="text-white group-hover:text-blue-200 transition-colors duration-1000" size={280} />
                        </motion.div>
                      </motion.div>
                      <div>
                        <div className="flex justify-between items-center mb-6 px-4">
                          <h3 className="text-[9px] font-black uppercase text-slate-500 tracking-[0.3em]">Featured Stalls</h3>
                          <div className="w-8 h-1 bg-white/10 rounded-full" />
                        </div>
                        <motion.div 
                          variants={staggerContainer}
                          initial="hidden"
                          animate="show"
                          className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-6"
                        >
                          {stalls.map(s => (
                            <motion.div key={s.id} variants={staggerItem} whileTap={{ scale: 0.95 }} onClick={() => navigate(`/stalls/${s.id}`)} className="min-w-[200px] h-36 relative rounded-[2.5rem] overflow-hidden border border-white/10 group cursor-pointer">
                              <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-5 flex flex-col justify-end"><h4 className="text-[12px] font-black text-white">{s.name}</h4><p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{s.openTime} - {s.closeTime}</p></div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                      <div>
                        <h3 className="text-[9px] font-black uppercase text-slate-500 tracking-[0.3em] mb-6 px-4">Most Loved (5★)</h3>
                        <motion.div 
                          variants={staggerContainer}
                          initial="hidden"
                          animate="show"
                          className="grid grid-cols-2 gap-4 pb-20"
                        >
                          {menuItems.filter(i => i.isPopular).slice(0, 4).map(i => (
                            <motion.div key={i.id} variants={staggerItem}>
                              <ProductCard item={i} onAdd={addToCart} onClick={() => navigate(`/food/${i.id}`)} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </PageTransition>
                } />
                <Route path="/menu" element={<PageTransition><MarketplaceView menuItems={menuItems} addToCart={addToCart} /></PageTransition>} />
                <Route path="/food/:id" element={<FoodDetailsView menuItems={menuItems} reviews={reviews} favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} onAddReview={handleAddReview} />} />
                <Route path="/stalls/:id" element={<PageTransition><StallDetailsView stalls={stalls} menuItems={menuItems} addToCart={addToCart} reviews={reviews} onAddReview={handleAddReview} /></PageTransition>} />
                <Route path="/cart" element={<PageTransition><Header title="Your Cart" /><CartView cart={cart} setCart={setCart} placeOrder={placeOrder} addToCart={addToCart} /></PageTransition>} />
                <Route path="/orders" element={<PageTransition><Header title="My Orders" /><OrdersListView orders={orders} /></PageTransition>} />
                <Route path="/orders/:id" element={<PageTransition><OrderDetailView orders={orders} /></PageTransition>} />
                <Route path="/profile" element={<PageTransition><Header title="Profile" /><ProfileView user={user} setUser={setUser} /></PageTransition>} />
                <Route path="/notifications" element={<PageTransition><Header title="Alerts" backUrl="/" />
                  <div className="space-y-4">
                    {MOCK_NOTIFICATIONS.map(n => (
                      <div key={n.id} className={`${THEME.surface} p-5 rounded-[2rem] relative border-white/10`}>
                        <h4 className="font-black text-white text-xs mb-1">{n.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{n.message}</p>
                        {!n.isRead && <span className="absolute top-5 right-5 w-2 h-2 bg-[#FF671F] rounded-full" />}
                      </div>
                    ))}
                  </div>
                </PageTransition>} />
              </Routes>
            </AnimatePresence>
            <BottomNav cartCount={cart.length} />
            <ChatBot menuItems={menuItems} stalls={stalls} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- View Components (Restored/Enhanced) ---

const StallDetailsView: React.FC<any> = ({ stalls, menuItems, addToCart, reviews, onAddReview }) => {
  const { id } = useParams();
  const stall = stalls.find((s:any) => s.id === id);
  const stallItems = menuItems.filter((i:any) => i.stallId === id);
  const navigate = useNavigate();
  if (!stall) return <div className="p-10 text-center">Stall Not Found</div>;
  return (
    <>
      <Header backUrl="/" />
      <div className={`${THEME.surface} rounded-[2.5rem] overflow-hidden mb-8 border-white/20`}>
        <div className="h-40 relative">
          <img src={stall.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div className="p-7">
          <h2 className="text-2xl font-black mb-2">{stall.name}</h2>
          <p className="text-slate-400 text-xs mb-6 leading-relaxed">{stall.description}</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><Clock size={14} className="text-[#FF671F]" /><span className="text-[10px] font-black">{stall.openTime} - {stall.closeTime}</span></div>
            <div className="flex items-center gap-2"><MapPin size={14} className="text-[#0033A0]" /><span className="text-[10px] font-black">Stall {stall.id.replace('s', '')}</span></div>
          </div>
        </div>
      </div>
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4"
      >
        {stallItems.map((i:any) => (
          <motion.div key={i.id} variants={staggerItem}>
            <ProductCard item={i} onAdd={addToCart} onClick={() => navigate(`/food/${i.id}`)} />
          </motion.div>
        ))}
      </motion.div>
      <ReviewSection targetId={stall.id} targetType="stall" reviews={reviews} onAddReview={(r:number, c:string) => onAddReview(stall.id, 'stall', r, c)} />
    </>
  );
};

const CartView: React.FC<any> = ({ cart, setCart, placeOrder, addToCart }) => {
  const [method, setMethod] = useState<PaymentMethod>('GCash');
  const navigate = useNavigate();
  const handleCheckout = () => { placeOrder(cart, method); setCart([]); navigate('/orders'); };
  if (cart.length === 0) return <div className="text-center py-20 opacity-10"><ShoppingBag size={100} className="mx-auto" /><p className="font-black mt-4 uppercase tracking-widest">Empty Bag</p></div>;
  return (
    <div className="space-y-4">
      {cart.map((i:any) => (
        <div key={i.id} className={`${THEME.surface} p-4 rounded-3xl flex items-center gap-4`}>
          <img src={i.image} className="w-16 h-16 rounded-2xl object-cover" />
          <div className="flex-1">
            <h4 className="text-xs font-black">{i.name}</h4>
            <p className="text-[9px] text-slate-500 font-bold uppercase mb-2">{i.stallName}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-black text-[#FF671F]">₱{i.price * i.quantity}</span>
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                <button onClick={() => setCart((prev:any) => prev.map((item:any) => item.id === i.id ? {...item, quantity: Math.max(0, item.quantity - 1)} : item).filter((item:any) => item.quantity > 0))} className="w-6 h-6 rounded-lg bg-white/10">-</button>
                <span className="text-[10px] font-black w-3 text-center">{i.quantity}</span>
                <button onClick={() => addToCart(i)} className="w-6 h-6 rounded-lg bg-[#0033A0]">+</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={`${THEME.surface} p-8 rounded-[3rem] space-y-6 border-white/20 mt-10`}>
        <div className="space-y-4">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center">Payment Options</p>
          <div className="grid grid-cols-3 gap-2">
            {[ { id: 'GCash', icon: Smartphone, label: 'GCash' }, { id: 'PayMaya', icon: CreditCard, label: 'Maya' }, { id: 'Cash', icon: Banknote, label: 'Cash' } ].map((p:any) => (
              <button key={p.id} onClick={() => setMethod(p.id)} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${method === p.id ? 'bg-[#FF671F]/20 border-[#FF671F] text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                <p.icon size={16} /><span className="text-[7px] font-black uppercase">{p.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400"><span>Subtotal</span><span>₱{cart.reduce((s:any, i:any) => s + (i.price * i.quantity), 0)}</span></div>
          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400"><span>Fee</span><span>₱15</span></div>
          <div className="flex justify-between text-2xl font-black pt-4 border-t border-dashed border-white/10"><span>Total</span><span className="text-[#FF671F]">₱{cart.reduce((s:any, i:any) => s + (i.price * i.quantity), 0) + 15}</span></div>
        </div>
        <Button className="w-full h-16 rounded-[2rem] text-lg font-black" onClick={handleCheckout}>Order Now</Button>
      </div>
    </div>
  );
};

const ProfileView: React.FC<any> = ({ user, setUser }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({...user});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setForm({...user});
  }, [user]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const save = async () => { 
    if (!isSupabaseConfigured()) {
        setUser(form);
        setIsEdit(false);
        return;
    }

    setLoading(true);
    try {
      const parsedAge = parseInt(form.age?.toString() || "");
      const ageValue = isNaN(parsedAge) ? null : parsedAge;

      const payload = { 
        id: user.id, 
        name: String(form.name || ''),
        userType: String(form.userType || 'Student'),
        course: form.userType === 'Student' ? String(form.course || '') : null,
        department: form.userType !== 'Student' ? String(form.department || '') : null,
        age: ageValue,
        phone: form.phone ? String(form.phone) : null,
        address: form.address ? String(form.address) : null,
        email: form.email ? String(form.email) : null,
        avatar: form.avatar ? String(form.avatar) : null
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(payload)
        .select()
        .single();

      if (error) { 
        console.error("Supabase Save Error Details:", error);
        const msg = error.message || (typeof error === 'string' ? error : "Unknown database error");
        const fullErrorMessage = typeof error === 'object' && !error.message 
          ? `Error Structure: ${JSON.stringify(error, null, 2)}`
          : `Supabase Error: ${msg}`;
        alert(fullErrorMessage); 
      } else if (data) { 
        setUser(data); 
        setIsEdit(false); 
      }
    } catch (err: any) {
      console.error("Unexpected Catch Block Error:", err);
      const errorMsg = err.message || JSON.stringify(err);
      alert(`Unexpected System Error:\n${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${THEME.surface} p-8 rounded-[3rem] text-center relative overflow-hidden border-white/10`}>
        <div className="relative w-24 h-24 mx-auto mb-4 group">
          <img src={user.avatar} className="w-full h-full rounded-[2rem] border-4 border-white/10 object-cover" />
          <button onClick={() => setIsEdit(true)} className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FF671F] rounded-xl flex items-center justify-center border-4 border-[#050810] shadow-xl hover:scale-110 transition-transform"><Edit2 size={14} /></button>
        </div>
        <h2 className="text-lg font-black text-white">{user.name}</h2>
        <div className="mt-2"><span className="text-[8px] font-black uppercase text-[#FF671F] tracking-widest bg-[#FF671F]/10 px-4 py-1.5 rounded-full border border-[#FF671F]/20">Account Type: {user.userType}</span></div>
      </div>

      <div className="space-y-3">
        <div className={`${THEME.surface} p-5 rounded-3xl flex items-center gap-5 border-white/10 hover:bg-white/[0.05] transition-colors`}>
          <div className="w-11 h-11 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400"><GraduationCap size={22} /></div>
          <div><p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Campus Identity</p><p className="text-xs font-black text-white">{user.userType} — {user.course || user.department || 'BUPC Community'}</p></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className={`${THEME.surface} p-5 rounded-3xl flex items-center gap-4 border-white/10`}>
            <div className="w-9 h-9 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400"><Clock size={18} /></div>
            <div><p className="text-[7px] font-black text-slate-500 uppercase">Age</p><p className="text-xs font-black text-white">{user.age || '—'}</p></div>
          </div>
          <div className={`${THEME.surface} p-5 rounded-3xl flex items-center gap-4 border-white/10`}>
            <div className="w-9 h-9 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400"><Phone size={18} /></div>
            <div><p className="text-[7px] font-black text-slate-500 uppercase">Phone</p><p className="text-[10px] font-black text-white">{user.phone || '—'}</p></div>
          </div>
        </div>
        <div className={`${THEME.surface} p-5 rounded-3xl flex items-center gap-5 border-white/10`}><div className="w-11 h-11 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400"><MapPin size={22} /></div><div><p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Home Address</p><p className="text-[10px] font-black text-white line-clamp-1">{user.address || 'Polangui, Albay'}</p></div></div>
        <div className={`${THEME.surface} p-5 rounded-3xl flex items-center gap-5 border-white/10`}><div className="w-11 h-11 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-400"><Hash size={22} /></div><div><p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">BUPC ID Reference</p><p className="text-xs font-black text-white">{user.id?.slice(0, 10).toUpperCase()}</p></div></div>
      </div>
      
      <Button variant="outline" className="w-full h-14 rounded-2xl border-red-500/20 text-red-500 hover:bg-red-500/5 mt-6" onClick={() => setUser(null)}><LogOut size={18} className="mr-3" /> Sign Out from Account</Button>
      
      <Modal isOpen={isEdit} onClose={() => setIsEdit(false)} title="Update Account Information">
        <div className="space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar px-1">
          {/* Avatar Section */}
          <div className="space-y-4">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center">Change Profile Picture</p>
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-20 h-20">
                 <img src={form.avatar} className="w-full h-full rounded-[2rem] border-4 border-[#FF671F]/30 object-cover" />
                 <motion.button 
                   whileTap={{ scale: 0.9 }}
                   onClick={() => fileInputRef.current?.click()}
                   className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FF671F] rounded-lg flex items-center justify-center text-white border-4 border-[#1A1F2C]"
                 >
                   <Camera size={12} />
                 </motion.button>
                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
              </div>
              
              <div className="w-full">
                <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-3">Quick Presets</p>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_AVATARS.map((url, i) => (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setForm({ ...form, avatar: url })}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${form.avatar === url ? 'border-[#FF671F] scale-105 shadow-lg' : 'border-white/5 opacity-60 hover:opacity-100'}`}
                    >
                      <img src={url} className="w-full h-full object-cover" />
                      {form.avatar === url && <div className="absolute inset-0 bg-[#FF671F]/20 flex items-center justify-center"><Check size={12} className="text-white" /></div>}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <Input label="Full Display Name" value={form.name || ''} onChange={(e:any) => setForm({...form, name: e.target.value})} />
            
            <div className="space-y-2">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Select Account Type</p>
              <div className="flex gap-2"> 
                {['Student', 'Faculty', 'Staff'].map(type => ( 
                  <button 
                    key={type} 
                    type="button"
                    onClick={() => setForm({
                      ...form, 
                      userType: type as any,
                      course: type === 'Student' ? form.course : null,
                      department: type !== 'Student' ? form.department : null
                    })} 
                    className={`flex-1 py-3 rounded-xl text-[9px] font-black border transition-all ${form.userType === type ? 'bg-[#FF671F] border-[#FF671F] text-white shadow-lg' : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'}`}
                  > 
                    {type} 
                  </button> 
                ))} 
              </div>
            </div>

            {form.userType === 'Student' ? (
              <Input label="Academic Course" value={form.course || ''} onChange={(e:any) => setForm({...form, course: e.target.value})} />
            ) : (
              <Input label="Academic Department" value={form.department || ''} onChange={(e:any) => setForm({...form, department: e.target.value})} />
            )}

            <div className="grid grid-cols-2 gap-3">
              <Input label="Age" type="number" value={form.age || ''} onChange={(e:any) => setForm({...form, age: e.target.value})} />
              <Input label="Mobile Phone" value={form.phone || ''} onChange={(e:any) => setForm({...form, phone: e.target.value})} />
            </div>
            
            <Input label="Residential Address" value={form.address || ''} onChange={(e:any) => setForm({...form, address: e.target.value})} />
          </div>

          <Button className="w-full h-14 rounded-2xl text-xs sticky bottom-0 mt-6 shadow-3xl" onClick={save} disabled={loading}>
            {loading ? <Loader className="animate-spin" size={16} /> : "Update Identity"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const App: React.FC = () => (<HashRouter><AppContent /></HashRouter>);
export default App;
