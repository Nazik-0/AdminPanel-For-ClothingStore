export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'inventory_manager' | 'sales_manager';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  discount: number;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  tags: string[];
  sizes: string[];
  colors: Array<{ name: string; hex: string }>;
  stock: number;
  status: 'active' | 'inactive'|'draft'|'archived';
  createdAt: string;
  updatedAt: string;
}


export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string| 'draft' | 'archived';
  };
  items: Array<{
    product: Product;
    quantity: number;
    price: number;
    size: string;
    color: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  paymentMethod: 'cod' | 'card' | 'paypal';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'blocked';
  createdAt: string;
  lastLogin?: string;
}


export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  status: 'active' | 'inactive';
  createdAt: string;
  productsCount?: number;
  lastUpdated?: string;
}

export interface DashboardStats {
  todaySales: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockItems: number;
  pendingOrders: number;
  totalRevenue: number;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: string;
}

// Add to existing types
export type CategoryStatus = 'active' | 'inactive';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  children?: Category[];
  status: CategoryStatus;
  image?: string;
  productCount: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// Add these interfaces to your types file
export interface SalesData {
  name: string;
  sales: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}