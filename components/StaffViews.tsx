import React, { useState } from 'react';
import { 
  TrendingUp, Plus, Trash2, Edit, Check, X, Clock, 
  Utensils, Store, DollarSign, ClipboardList, Package, 
  MapPin, AlertCircle, Eye, Power, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, Stall, Order, OrderStatus } from '../types';
import { Button, Input, Modal, StarRating } from './Components';

// Theme configuration
const THEME = {
  bg: "bg-[#050810]",
  surface: "bg-[#10141d]/90 backdrop-blur-md border border-white/10",
  primary: "#FF671F", // Orange
  secondary: "#0033A0" // Blue
};

// --- STAFF DASHBOARD VIEW ---
export const StaffDashboard: React.FC<{
  orders: Order[];
  stalls: Stall[];
  menuItems: MenuItem[];
  setStalls: React.Dispatch<React.SetStateAction<Stall[]>>;
  user: any;
}> = ({ orders, stalls, menuItems, setStalls, user }) => {
  const [editingStall, setEditingStall] = useState<Stall | null>(null);

  // Compute stats
  const pendingOrders = orders.filter(o => o.status === OrderStatus.PENDING);
  const activeOrders = orders.filter(o => o.status === OrderStatus.PREPARING || o.status === OrderStatus.READY);
  const completedOrders = orders.filter(o => o.status === OrderStatus.COMPLETED);
  
  // Total Revenue from completed orders
  const revenue = completedOrders.reduce((sum, o) => sum + o.total, 0);

  const toggleStallStatus = (stallId: string) => {
    setStalls(prev => prev.map(s => {
      if (s.id === stallId) {
        const isOpenNow = s.openTime !== "Closed";
        return {
          ...s,
          openTime: isOpenNow ? "Closed" : "08:00 AM",
          closeTime: isOpenNow ? "Closed" : "07:00 PM"
        };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Banner */}
      <div className={`${THEME.surface} p-8 rounded-[3rem] relative overflow-hidden`}>
        <div className="relative z-10">
          <p className="text-[9px] font-black uppercase text-[#FF671F] tracking-[0.2em] mb-2">Staff Hub Dashboard</p>
          <h1 className="text-3xl font-black mb-1 tracking-tighter">Stay Active,</h1>
          <h1 className="text-3xl font-black mb-6 tracking-tighter text-blue-400">{user?.name}!</h1>
          <div className="inline-flex items-center gap-2 bg-[#FF671F]/10 px-4 py-2 rounded-full border border-[#FF671F]/20 text-xs font-black text-[#FF671F]">
            <Clock size={12} className="animate-pulse" /> Live Store Controller Open
          </div>
        </div>
      </div>

      {/* Grid of Key Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`${THEME.surface} p-5 rounded-3xl flex items-center justify-between`}>
          <div>
            <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Revenue</p>
            <h3 className="text-xl font-black text-white">₱{revenue}</h3>
          </div>
          <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
            <DollarSign size={20} />
          </div>
        </div>

        <div className={`${THEME.surface} p-5 rounded-3xl flex items-center justify-between`}>
          <div>
            <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Pending Requests</p>
            <h3 className="text-xl font-black text-orange-400">{pendingOrders.length}</h3>
          </div>
          <div className="w-10 h-10 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400">
            <AlertCircle size={20} />
          </div>
        </div>

        <div className={`${THEME.surface} p-5 rounded-3xl flex items-center justify-between`}>
          <div>
            <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Orders</p>
            <h3 className="text-xl font-black text-blue-400">{activeOrders.length}</h3>
          </div>
          <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
            <Package size={20} />
          </div>
        </div>

        <div className={`${THEME.surface} p-5 rounded-3xl flex items-center justify-between`}>
          <div>
            <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Menu Items</p>
            <h3 className="text-xl font-black text-white">{menuItems.length}</h3>
          </div>
          <div className="w-10 h-10 bg-[#FF671F]/10 rounded-2xl flex items-center justify-center text-[#FF671F]">
            <Utensils size={20} />
          </div>
        </div>
      </div>

      {/* Stall Management Controller */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-[9px] font-black uppercase text-slate-500 tracking-[0.3em]">Campus Food Stalls</h3>
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md">Live Switches</span>
        </div>

        <div className="space-y-3">
          {stalls.map(s => {
            const isOpen = s.openTime !== "Closed";
            return (
              <div key={s.id} className={`${THEME.surface} p-4 rounded-3xl flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <img 
                    src={s.image} 
                    onError={(e: any) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }}
                    className="w-12 h-12 rounded-2xl object-cover" 
                  />
                  <div>
                    <h4 className="text-xs font-black text-white">{s.name}</h4>
                    <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">
                      {isOpen ? `Open: ${s.openTime} - ${s.closeTime}` : "Closed / Off Duty"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setEditingStall(s)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
                  >
                    <Edit size={14} />
                  </button>

                  <button 
                    onClick={() => toggleStallStatus(s.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[8px] font-black uppercase transition-all ${
                      isOpen 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}
                  >
                    <Power size={10} className="mr-0.5" />
                    {isOpen ? "Open" : "Closed"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Orders Alert Panel */}
      {pendingOrders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-[9px] font-black uppercase text-[#FF671F] tracking-[0.3em] px-2 animate-pulse flex items-center gap-2">
            <AlertCircle size={12} /> Critical Pending Orders
          </h3>
          <div className="space-y-3">
            {pendingOrders.slice(0, 2).map(o => (
              <div key={o.id} className="bg-orange-500/5 border border-[#FF671F]/30 p-5 rounded-3xl flex justify-between items-center">
                <div>
                  <h4 className="font-black text-white text-xs">#{o.id.slice(-6)}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">{o.customerName}</p>
                  <p className="text-[9px] text-[#FF671F] font-black mt-1">₱{o.total} • {o.items.length} items</p>
                </div>
                <div className="text-xs text-slate-500">
                  Pending Accept
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Stall Modal */}
      <Modal isOpen={!!editingStall} onClose={() => setEditingStall(null)} title="Update Stall Parameters">
        {editingStall && (
          <form 
            onSubmit={(e: any) => {
              e.preventDefault();
              setStalls(prev => prev.map(s => s.id === editingStall.id ? editingStall : s));
              setEditingStall(null);
            }}
            className="space-y-4"
          >
            <Input 
              label="Stall Name" 
              value={editingStall.name || ''} 
              onChange={(e: any) => setEditingStall((prev: any) => prev ? { ...prev, name: e.target.value } : null)} 
            />
            <Input 
              label="Description Summary" 
              value={editingStall.description || ''} 
              onChange={(e: any) => setEditingStall((prev: any) => prev ? { ...prev, description: e.target.value } : null)} 
            />
            <div className="grid grid-cols-2 gap-3">
              <Input 
                label="Opening Clock" 
                value={editingStall.openTime || ''} 
                onChange={(e: any) => setEditingStall((prev: any) => prev ? { ...prev, openTime: e.target.value } : null)} 
              />
              <Input 
                label="Closing Clock" 
                value={editingStall.closeTime || ''} 
                onChange={(e: any) => setEditingStall((prev: any) => prev ? { ...prev, closeTime: e.target.value } : null)} 
              />
            </div>
            <Input 
              label="Photo Image Link" 
              value={editingStall.image || ''} 
              onChange={(e: any) => setEditingStall((prev: any) => prev ? { ...prev, image: e.target.value } : null)} 
            />
            
            <div className="pt-2">
              <Button 
                type="submit"
                className="w-full h-12 rounded-xl text-xs" 
              >
                Save Stall Profile
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};


// --- STAFF MENU / DISH MANAGER ---
export const StaffMenuManager: React.FC<{
  menuItems: MenuItem[];
  stalls: Stall[];
  onAdd: (item: MenuItem) => void;
  onUpdate: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}> = ({ menuItems, stalls, onAdd, onUpdate, onDelete }) => {
  const [query, setQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [form, setForm] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 50,
    category: 'Chicken Meals',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    stallId: stalls[0]?.id || 's1',
    stallName: stalls[0]?.name || 'Kapi Kita',
    isPopular: false,
    isSpicy: false,
    isVeg: false,
    rating: 4.8
  });

  const filtered = menuItems.filter(i => 
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.category.toLowerCase().includes(query.toLowerCase()) ||
    i.stallName.toLowerCase().includes(query.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.name || !form.price) return;
    const selectedStall = stalls.find(s => s.id === form.stallId) || stalls[0];
    
    const newItem: MenuItem = {
      id: `dish-${Date.now()}`,
      name: form.name,
      description: form.description || 'Delicious freshly served campus meal.',
      price: Number(form.price),
      category: form.category || 'Snacks',
      image: form.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      stallId: form.stallId || 's1',
      stallName: selectedStall?.name || 'Kapi Kita',
      rating: 4.8,
      isPopular: !!form.isPopular,
      isSpicy: !!form.isSpicy,
      isVeg: !!form.isVeg
    };

    onAdd(newItem);
    setIsAdding(false);
    resetForm();
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    const selectedStall = stalls.find(s => s.id === editingItem.stallId) || stalls[0];
    const updated = {
      ...editingItem,
      stallName: selectedStall?.name || editingItem.stallName
    };
    onUpdate(updated);
    setEditingItem(null);
  };

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      price: 50,
      category: 'Chicken Meals',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      stallId: stalls[0]?.id || 's1',
      stallName: stalls[0]?.name || 'Kapi Kita',
      isPopular: false,
      isSpicy: false,
      isVeg: false,
      rating: 4.8
    });
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-white">Dish Inventory</h2>
          <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">Manage BUPC Canteen Items</p>
        </div>
        <Button 
          size="sm" 
          className="rounded-xl h-10 px-4 flex items-center gap-1.5"
          onClick={() => { resetForm(); setIsAdding(true); }}
        >
          <Plus size={14} /> Add Item
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Input 
          placeholder="Filter by dish, category or stall..." 
          className="h-12 bg-white/5 text-xs text-white"
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
        />
      </div>

      {/* Grid of Dishes */}
      <div className="space-y-3">
        {filtered.map(item => (
          <div key={item.id} className={`${THEME.surface} p-4 rounded-3xl flex items-center justify-between gap-4`}>
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <img 
                src={item.image} 
                onError={(e: any) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'; }}
                className="w-14 h-14 rounded-2xl object-cover shrink-0" 
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-black text-white truncate">{item.name}</h4>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">
                  {item.category} • {item.stallName}
                </p>
                <p className="text-xs font-black text-[#FF671F] mt-1">₱{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setEditingItem({ ...item })}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
              >
                <Edit size={12} />
              </button>
              <button 
                onClick={() => { if (confirm(`Remove ${item.name}?`)) onDelete(item.id); }}
                className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all border border-red-500/10"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 opacity-20">
            <Utensils size={64} className="mx-auto" />
            <p className="font-black uppercase tracking-widest text-[9px] mt-4">No matching meals</p>
          </div>
        )}
      </div>

      {/* Add New Item Modal */}
      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Dining Dish">
        <form 
          onSubmit={(e: any) => { e.preventDefault(); handleCreate(); }} 
          className="space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar pb-2"
        >
          <Input 
            label="Dish Title / Name" 
            placeholder="e.g. Chicken Pastil Overload" 
            value={form.name} 
            onChange={(e: any) => setForm({ ...form, name: e.target.value })} 
          />
          
          <div className="grid grid-cols-2 gap-3">
            <Input 
              label="Standard Price (₱)" 
              type="number" 
              value={form.price} 
              onChange={(e: any) => setForm({ ...form, price: Number(e.target.value) })} 
            />
            
            <div className="space-y-1">
              <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Category</label>
              <select 
                value={form.category} 
                onChange={(e: any) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#1A1F2C] border border-white/10 rounded-xl px-3 py-2.5 text-[10px] font-bold text-white focus:outline-none"
              >
                {['Meals', 'Drinks', 'Chicken Meals', 'Beverages', 'Rice Meals', 'Snacks', 'Coffee', 'Seasalt Series', 'Street Food'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Store Stall affiliation</label>
            <select 
              value={form.stallId} 
              onChange={(e: any) => {
                const s = stalls.find(st => st.id === e.target.value);
                setForm({ ...form, stallId: e.target.value, stallName: s?.name || '' });
              }}
              className="w-full bg-[#1A1F2C] border border-white/10 rounded-xl px-3 py-2.5 text-[10px] font-bold text-white focus:outline-none"
            >
              {stalls.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <Input 
            label="Short Meal Description" 
            placeholder="Describe the meal ingredients, flavor, serving size etc." 
            value={form.description} 
            onChange={(e: any) => setForm({ ...form, description: e.target.value })} 
          />

          <Input 
            label="Dish Photo URL link" 
            placeholder="Unsplash food image link or public URL" 
            value={form.image} 
            onChange={(e: any) => setForm({ ...form, image: e.target.value })} 
          />

          {/* Special Tags */}
          <div className="space-y-2 pt-2">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Special Diet Parameters</p>
            <div className="flex gap-2">
              {[
                { key: 'isPopular', label: 'Feature (Top)' },
                { key: 'isSpicy', label: 'Contains Chili' },
                { key: 'isVeg', label: 'Vegetarian friendly' },
              ].map(tag => (
                <button
                  type="button"
                  key={tag.key}
                  onClick={() => setForm({ ...form, [tag.key]: !form[tag.key as keyof MenuItem] })}
                  className={`flex-1 py-1.5 rounded-xl text-[8px] font-black uppercase text-center border transition-all ${
                    form[tag.key as keyof MenuItem] 
                    ? 'bg-[#FF671F]/10 border-[#FF671F] text-[#FF671F]' 
                    : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 sticky bottom-0 bg-[#1A1F2C]">
            <Button type="submit" className="w-full h-12 rounded-xl text-xs">
              Submit to Inventory
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Item Modal */}
      <Modal isOpen={!!editingItem} onClose={() => setEditingItem(null)} title="Update Dish Parameters">
        {editingItem && (
          <form 
            onSubmit={(e: any) => { e.preventDefault(); handleSaveEdit(); }} 
            className="space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar pb-2"
          >
            <Input 
              label="Dish Title / Name" 
              value={editingItem.name || ''} 
              onChange={(e: any) => setEditingItem((prev: any) => prev ? { ...prev, name: e.target.value } : null)} 
            />
            
            <div className="grid grid-cols-2 gap-3">
              <Input 
                label="Standard Price (₱)" 
                type="number" 
                value={editingItem.price || 0} 
                onChange={(e: any) => setEditingItem((prev: any) => prev ? { ...prev, price: Number(e.target.value) } : null)} 
              />
              
              <div className="space-y-1">
                <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Category</label>
                <select 
                  value={editingItem.category || 'Meals'} 
                  onChange={(e: any) => setEditingItem((prev: any) => prev ? { ...prev, category: e.target.value } : null)}
                  className="w-full bg-[#1A1F2C] border border-white/10 rounded-xl px-3 py-2.5 text-[10px] font-bold text-white focus:outline-none"
                >
                  {['Meals', 'Drinks', 'Chicken Meals', 'Beverages', 'Rice Meals', 'Snacks', 'Coffee', 'Seasalt Series', 'Street Food'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Store Stall affiliation</label>
              <select 
                value={editingItem.stallId || ''} 
                onChange={(e: any) => {
                  const s = stalls.find(st => st.id === e.target.value);
                  setEditingItem((prev: any) => prev ? { ...prev, stallId: e.target.value, stallName: s?.name || '' } : null);
                }}
                className="w-full bg-[#1A1F2C] border border-white/10 rounded-xl px-3 py-2.5 text-[10px] font-bold text-white focus:outline-none"
              >
                {stalls.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <Input 
              label="Short Meal Description" 
              value={editingItem.description || ''} 
              onChange={(e: any) => setEditingItem((prev: any) => prev ? { ...prev, description: e.target.value } : null)} 
            />

            <Input 
              label="Dish Photo URL link" 
              value={editingItem.image || ''} 
              onChange={(e: any) => setEditingItem((prev: any) => prev ? { ...prev, image: e.target.value } : null)} 
            />

            {/* Special Tags */}
            <div className="space-y-2 pt-2">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Special Diet Parameters</p>
              <div className="flex gap-2">
                {[
                  { key: 'isPopular', label: 'Feature (Top)' },
                  { key: 'isSpicy', label: 'Contains Chili' },
                  { key: 'isVeg', label: 'Vegetarian friendly' },
                ].map(tag => (
                  <button
                    type="button"
                    key={tag.key}
                    onClick={() => setEditingItem((prev: any) => prev ? { ...prev, [tag.key]: !prev[tag.key as keyof MenuItem] } : null)}
                    className={`flex-1 py-1.5 rounded-xl text-[8px] font-black uppercase text-center border transition-all ${
                      editingItem[tag.key as keyof MenuItem] 
                      ? 'bg-[#FF671F]/10 border-[#FF671F] text-[#FF671F]' 
                      : 'bg-white/5 border-white/10 text-slate-500'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 sticky bottom-0 bg-[#1A1F2C]">
              <Button type="submit" className="w-full h-12 rounded-xl text-xs">
                Apply Modifications
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};


// --- STAFF GLOBAL ORDERS MANAGER ---
export const StaffOrderManager: React.FC<{
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}> = ({ orders, onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'preparing' | 'ready' | 'history'>('pending');

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'pending') return o.status === OrderStatus.PENDING;
    if (activeTab === 'preparing') return o.status === OrderStatus.PREPARING;
    if (activeTab === 'ready') return o.status === OrderStatus.READY;
    return o.status === OrderStatus.COMPLETED || o.status === OrderStatus.CANCELLED;
  });

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-xl font-black text-white">Live Operations Counter</h2>
        <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">Accept, Prepare and Dispatch Orders</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 text-[8px] font-black uppercase">
        {[
          { key: 'pending', label: 'Pending' },
          { key: 'preparing', label: 'Serving' },
          { key: 'ready', label: 'Ready' },
          { key: 'history', label: 'Done' }
        ].map(t => {
          const count = orders.filter(o => {
            if (t.key === 'pending') return o.status === OrderStatus.PENDING;
            if (t.key === 'preparing') return o.status === OrderStatus.PREPARING;
            if (t.key === 'ready') return o.status === OrderStatus.READY;
            return o.status === OrderStatus.COMPLETED || o.status === OrderStatus.CANCELLED;
          }).length;

          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              className={`flex-1 py-3 rounded-xl transition-all relative ${
                activeTab === t.key 
                ? 'bg-[#FF671F] text-white shadow-md' 
                : 'text-slate-500 hover:text-white'
              }`}
            >
              {t.label} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Orders Grid */}
      <div className="space-y-4">
        {filteredOrders.map(o => (
          <div key={o.id} className={`${THEME.surface} p-6 rounded-[2.5rem] relative space-y-4`}>
            {/* Timestamp & Payment Badge */}
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <div>
                <span className="font-mono text-xs text-blue-400 font-bold">#{o.id.slice(-6)}</span>
                <span className="text-[8px] text-slate-500 font-bold ml-3 uppercase">
                  {new Date(o.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <span className="text-[7px] font-black uppercase tracking-widest text-[#FF671F] bg-[#FF671F]/10 px-2.5 py-1 rounded-full border border-[#FF671F]/20">
                {o.paymentMethod}
              </span>
            </div>

            {/* Customer Information */}
            <div>
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Customer</p>
              <h4 className="text-sm font-black text-white">{o.customerName || 'BUPC Customer'}</h4>
            </div>

            {/* Cart Items List */}
            <div className="space-y-2.5 bg-black/30 p-4 rounded-2xl">
              {o.items.map(i => (
                <div key={i.id} className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF671F] font-black text-[10px] shrink-0 bg-[#FF671F]/10 px-2 py-0.5 rounded-md">{i.quantity}x</span>
                    <span className="text-slate-200 line-clamp-1">{i.name}</span>
                  </div>
                  <span className="text-slate-400 shrink-0">₱{i.price * i.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="flex justify-between items-center pt-2 text-xs font-black">
              <span className="text-slate-500 uppercase">Subtotal: ₱{o.subtotal}</span>
              <span className="text-white text-base">Total: ₱{o.total}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 justify-end">
              {o.status === OrderStatus.PENDING && (
                <>
                  <button
                    onClick={() => onUpdateStatus(o.id, OrderStatus.CANCELLED)}
                    className="flex-1 max-w-[120px] h-11 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-black uppercase text-[8px] tracking-widest rounded-xl transition-all border border-red-500/10"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => onUpdateStatus(o.id, OrderStatus.PREPARING)}
                    className="flex-1 h-11 bg-[#0033A0] hover:bg-[#002f90] text-white font-black uppercase text-[8px] tracking-widest rounded-xl transition-all"
                  >
                    Accept & Prepare
                  </button>
                </>
              )}

              {o.status === OrderStatus.PREPARING && (
                <button
                  onClick={() => onUpdateStatus(o.id, OrderStatus.READY)}
                  className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase text-[8px] tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <Check size={12} strokeWidth={3} /> Mark Ready for Pickup
                </button>
              )}

              {o.status === OrderStatus.READY && (
                <button
                  onClick={() => onUpdateStatus(o.id, OrderStatus.COMPLETED)}
                  className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-[8px] tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle size={12} strokeWidth={3} /> Complete Service & Dispatch
                </button>
              )}

              {(o.status === OrderStatus.COMPLETED || o.status === OrderStatus.CANCELLED) && (
                <div className="w-full text-center py-2 text-[9px] font-black uppercase text-slate-500 tracking-widest">
                  Order was {o.status}
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-24 opacity-15">
            <ClipboardList size={72} className="mx-auto" />
            <p className="font-black uppercase tracking-widest text-[9px] mt-4">No {activeTab} orders active</p>
          </div>
        )}
      </div>
    </div>
  );
};
