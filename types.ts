
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stallName: string;
  stallId: string;
  rating: number;
  calories?: number;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVeg?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum OrderStatus {
  PENDING = 'Pending',
  PREPARING = 'Preparing',
  READY = 'Ready for Pickup',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export type PaymentMethod = 'Cash' | 'GCash' | 'PayMaya';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  fee: number;
  total: number;
  status: OrderStatus;
  date: Date;
  paymentMethod: PaymentMethod;
}

export interface Stall {
  id: string;
  name: string;
  image: string;
  description: string;
  phone: string;
  schedule: string; // e.g., "Mon-Fri"
  openTime: string; // "8:00 AM"
  closeTime: string; // "5:00 PM"
  location: string;
}

export type UserType = 'Student' | 'Faculty' | 'Staff';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  course?: string; // For students
  department?: string; // For faculty
  userType: UserType;
  age?: number;
  address?: string;
  phone?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'system';
  isRead: boolean;
  date: Date;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  targetId: string; // stallId or menuItemId
  targetType: 'stall' | 'menu_item';
  rating: number;
  comment: string;
  date: Date;
}
