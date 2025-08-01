// src/data/mockData.ts
import { Product, Order, Customer, Category, Brand, DashboardStats, ActivityLog, SalesData, CategoryData } from '../types';

import { 
  // ... existing imports ...
  File, 
  FileText, 
  Layout, 
  Megaphone} from 'lucide-react';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt perfect for everyday wear',
    sku: 'TSH-001',
    price: 29.99,
    discount: 10,
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=400',
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?w=400',
    ],
    category: 'Clothing',
    subcategory: 'T-Shirts',
    brand: 'ComfortWear',
    tags: ['casual', 'cotton', 'basic'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#1F2937' },
      { name: 'Red', hex: '#EF4444' },
    ],
    stock: 150,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Denim Jacket',
    description: 'Vintage-style denim jacket with modern fit',
    sku: 'JKT-002',
    price: 89.99,
    discount: 15,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?w=400',
    ],
    category: 'Clothing',
    subcategory: 'Jackets',
    brand: 'UrbanStyle',
    tags: ['denim', 'vintage', 'casual'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Light Blue', hex: '#93C5FD' },
      { name: 'Dark Blue', hex: '#1E40AF' },
    ],
    stock: 8,
    status: 'inactive',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
  },
  {
    id: '3',
    name: 'Summer Red Dress',
    description: 'Lightweight summer dress with floral pattern',
    sku: 'DRS-003',
    price: 65.00,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?w=400',
    ],
    category: 'Clothing',
    subcategory: 'Dresses',
    brand: 'SummerBreeze',
    tags: ['summer', 'dress', 'floral'],
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'Red', hex: '#EF4444' },
      { name: 'Yellow', hex: '#FBBF24' },
    ],
    stock: 15,
    status: 'draft',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
  },
  {
    id: '4',
    name: 'Leather Belt',
    description: 'Genuine leather belt with metal buckle',
    sku: 'BLT-004',
    price: 35.00,
    discount: 5,
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?w=400',
    ],
    category: 'Accessories',
    subcategory: 'Belts',
    brand: 'LeatherCraft',
    tags: ['leather', 'belt', 'accessory'],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Brown', hex: '#78350F' },
      { name: 'Black', hex: '#000000' },
    ],
    stock: 0,
    status: 'active',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '5',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with cushioning',
    sku: 'SHO-005',
    price: 120.00,
    discount: 20,
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=400',
    ],
    category: 'Footwear',
    subcategory: 'Sneakers',
    brand: 'RunFast',
    tags: ['running', 'shoes', 'sports'],
    sizes: ['8', '9', '10', '11'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Blue', hex: '#3B82F6' },
    ],
    stock: 25,
    status: 'active',
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z',
  },
  {
    id: '6',
    name: 'Wool Beanie',
    description: 'Warm wool beanie for cold weather',
    sku: 'ACC-006',
    price: 22.50,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/35185/hats-fedora-hat-manufacture-stack.jpg?w=400',
    ],
    category: 'Accessories',
    subcategory: 'Hats',
    brand: 'WinterWarm',
    tags: ['winter', 'hat', 'wool'],
    sizes: ['One Size'],
    colors: [
      { name: 'Gray', hex: '#6B7280' },
      { name: 'Navy', hex: '#1E40AF' },
      { name: 'Burgundy', hex: '#9D174D' },
    ],
    stock: 42,
    status: 'archived',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-19T00:00:00Z',
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: {
      id: '1',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      phone: '+1-234-567-8901',
    },
    items: [
      {
        product: mockProducts[0],
        quantity: 2,
        price: 29.99,
        size: 'M',
        color: 'White',
      },
      {
        product: mockProducts[4],
        quantity: 1,
        price: 120.00,
        size: '9',
        color: 'Black',
      }
    ],
    total: 179.98,
    status: 'processing',
    paymentMethod: 'card',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1-987-654-3210',
    },
    items: [
      {
        product: mockProducts[1],
        quantity: 1,
        price: 89.99,
        size: 'L',
        color: 'Light Blue',
      }
    ],
    total: 89.99,
    status: 'shipped',
    paymentMethod: 'paypal',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
    },
    createdAt: '2024-01-16T11:15:00Z',
    updatedAt: '2024-01-17T09:45:00Z',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: {
      id: '3',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1-555-123-4567',
    },
    items: [
      {
        product: mockProducts[2],
        quantity: 1,
        price: 65.00,
        size: 'S',
        color: 'Red',
      },
      {
        product: mockProducts[5],
        quantity: 2,
        price: 22.50,
        size: 'One Size',
        color: 'Gray',
      }
    ],
    total: 110.00,
    status: 'delivered',
    paymentMethod: 'card',
    shippingAddress: {
      street: '789 Pine Rd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60007',
      country: 'USA',
    },
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-18T16:30:00Z',
  },
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    phone: '+1-234-567-8901',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    totalOrders: 12,
    totalSpent: 1250.00,
    status: 'active',
    createdAt: '2023-06-15T00:00:00Z',
    lastLogin: '2024-01-15T09:00:00Z',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1-987-654-3210',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
    },
    totalOrders: 8,
    totalSpent: 875.50,
    status: 'active',
    createdAt: '2023-08-22T00:00:00Z',
    lastLogin: '2024-01-16T14:30:00Z',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1-555-123-4567',
    address: {
      street: '789 Pine Rd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60007',
      country: 'USA',
    },
    totalOrders: 5,
    totalSpent: 420.75,
    status: 'active',
    createdAt: '2023-11-05T00:00:00Z',
    lastLogin: '2024-01-14T11:20:00Z',
  },
  {
    id: '4',
    name: 'David Miller',
    email: 'david@example.com',
    phone: '+1-333-444-5555',
    address: {
      street: '321 Elm St',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'USA',
    },
    totalOrders: 3,
    totalSpent: 275.25,
    status: 'blocked',
    createdAt: '2023-12-10T00:00:00Z',
    lastLogin: '2023-12-20T16:45:00Z',
  },
];

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'ComfortWear',
    description: 'Premium comfortable clothing',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=400',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastUpdated: '2024-06-15T14:30:00Z',
    productsCount: 2
  },
  {
    id: '2',
    name: 'UrbanStyle',
    description: 'Modern urban fashion',
    logo: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?w=400',
    status: 'active',
    createdAt: '2024-01-05T00:00:00Z',
    lastUpdated: '2024-06-10T09:15:00Z',
    productsCount: 1
  },
  {
    id: '3',
    name: 'DenimCo',
    description: 'Specialists in premium denim',
    logo: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?w=400',
    status: 'inactive',
    createdAt: '2024-02-10T00:00:00Z',
    lastUpdated: '2024-05-22T16:45:00Z',
    productsCount: 0
  },
  {
    id: '4',
    name: 'SummerBreeze',
    description: 'Lightweight summer clothing',
    logo: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?w=400',
    status: 'active',
    createdAt: '2024-01-08T00:00:00Z',
    lastUpdated: '2024-06-12T11:20:00Z',
    productsCount: 1
  },
  {
    id: '5',
    name: 'RunFast',
    description: 'Performance athletic wear',
    logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=400',
    status: 'active',
    createdAt: '2024-01-03T00:00:00Z',
    lastUpdated: '2024-06-18T08:45:00Z',
    productsCount: 1
  },
];

export const brandStats = {
  totalBrands: 24,
  activeBrands: 18,
  topBrands: [
    { name: 'ComfortWear', productCount: 42 },
    { name: 'UrbanStyle', productCount: 38 },
    { name: 'DenimCo', productCount: 25 }
  ]
};


export const mockDashboardStats: DashboardStats = {
  todaySales: 2845.67,
  totalOrders: 156,
  totalCustomers: 1247,
  lowStockItems: 23,
  pendingOrders: 18,
  totalRevenue: 125890.45,
  totalContent: 42,        
  draftContent: 5,     
};

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    user: 'John Admin',
    action: 'Created Product',
    details: 'Added new product "Classic Cotton T-Shirt"',
    timestamp: '2024-01-15T14:30:00Z',
    ipAddress: '192.168.1.1'
  },
  {
    id: '2',
    user: 'Sarah Manager',
    action: 'Updated Stock',
    details: 'Updated stock for SKU: TSH-001 to 150 units',
    timestamp: '2024-01-15T13:45:00Z',
    ipAddress: '192.168.1.5'
  },
  {
    id: '3',
    user: 'Mike Editor',
    action: 'Updated Order',
    details: 'Changed status of ORD-2024-002 to "shipped"',
    timestamp: '2024-01-17T09:45:00Z',
    ipAddress: '192.168.1.3'
  },
  {
    id: '4',
    user: 'Emma Support',
    action: 'Created Order',
    details: 'Processed new order ORD-2024-005 for $89.99',
    timestamp: '2024-01-18T11:20:00Z',
    ipAddress: '192.168.1.7'
  },
  {
    id: '5',
    user: 'John Admin',
    action: 'Deleted Product',
    details: 'Removed product "Winter Jacket" from inventory',
    timestamp: '2024-01-16T16:30:00Z',
    ipAddress: '192.168.1.1'
  },
  {
    id: '6',
    user: 'Alex Developer',
    action: 'Updated Product',
    details: 'Modified pricing for "Denim Jacket" to $89.99',
    timestamp: '2024-01-14T10:15:00Z',
    ipAddress: '192.168.1.10'
  },
  {
    id: '7',
    user: 'Sarah Manager',
    action: 'Updated Stock',
    details: 'Adjusted stock for SKU: SHO-005 to 25 units',
    timestamp: '2024-01-19T14:20:00Z',
    ipAddress: '192.168.1.5'
  },
  {
    id: '8',
    user: 'Mike Editor',
    action: 'Created Product',
    details: 'Added new product "Summer Red Dress"',
    timestamp: '2024-01-10T08:30:00Z',
    ipAddress: '192.168.1.3'
  }
];

export const mockSalesData: SalesData[] = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 1900 },
  { name: 'Wed', sales: 1700 },
  { name: 'Thu', sales: 2100 },
  { name: 'Fri', sales: 2800 },
  { name: 'Sat', sales: 3200 },
  { name: 'Sun', sales: 2400 },
];

export const mockCategoryData: CategoryData[] = [
  { name: 'T-Shirts', value: 35, color: '#3B82F6' },
  { name: 'Jeans', value: 25, color: '#10B981' },
  { name: 'Jackets', value: 20, color: '#F97316' },
  { name: 'Shoes', value: 15, color: '#8B5CF6' },
  { name: 'Accessories', value: 5, color: '#EF4444' },
];

export const mockCategories: Category[] = [
  {
    id: 'cat1',
    name: 'Men',
    slug: 'men',
    status: 'active',
    productCount: 42,
    createdAt: '2023-01-15',
    updatedAt: '2023-06-20',
  },
  {
    id: 'cat2',
    name: 'Women',
    slug: 'women',
    status: 'active',
    productCount: 36,
    createdAt: '2023-01-15',
    updatedAt: '2023-06-20',
  },
  {
    id: 'cat3',
    name: 'T-Shirts',
    slug: 't-shirts',
    parentId: 'cat1',
    status: 'active',
    productCount: 15,
    createdAt: '2023-02-10',
    updatedAt: '2023-05-15',
  },
  {
    id: 'cat4',
    name: 'Jeans',
    slug: 'jeans',
    parentId: 'cat1',
    status: 'active',
    productCount: 20,
    createdAt: '2023-02-12',
    updatedAt: '2023-06-01',
  },
  {
    id: 'cat5',
    name: 'Dresses',
    slug: 'dresses',
    parentId: 'cat2',
    status: 'active',
    productCount: 18,
    createdAt: '2023-03-05',
    updatedAt: '2023-06-18',
  },
  {
    id: 'cat6',
    name: 'Accessories',
    slug: 'accessories',
    status: 'inactive',
    productCount: 0,
    createdAt: '2023-04-22',
    updatedAt: '2023-04-22',
  },
];

export interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'post' | 'banner' | 'campaign';
  author: string;
  lastUpdated: string; // ISO string
  status: 'published' | 'draft' | 'archived';
  views: number;
}

export interface ContentStat {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  color: string;
}

export const mockContentItems = [
  {
    id: '1',
    title: 'Summer Collection Launch',
    type: 'page',
    author: 'Emma Johnson',
    lastUpdated: '2024-06-15T14:30:00Z',
    status: 'published',
    views: 1242,
  },
  {
    id: '2',
    title: 'How to Style Denim',
    type: 'post',
    author: 'Michael Chen',
    lastUpdated: '2024-06-10T09:15:00Z',
    status: 'published',
    views: 856,
  },
  {
    id: '3',
    title: 'Homepage Banner',
    type: 'banner',
    author: 'Sarah Williams',
    lastUpdated: '2024-06-18T11:20:00Z',
    status: 'draft',
    views: 0,
  },
  {
    id: '4',
    title: 'Sustainable Fashion Guide',
    type: 'post',
    author: 'David Miller',
    lastUpdated: '2024-05-22T16:45:00Z',
    status: 'published',
    views: 2103,
  },
  {
    id: '5',
    title: 'About Our Brand',
    type: 'page',
    author: 'Emma Johnson',
    lastUpdated: '2024-04-10T08:30:00Z',
    status: 'published',
    views: 542,
  },
  {
    id: '6',
    title: 'Holiday Sale Promo',
    type: 'banner',
    author: 'Michael Chen',
    lastUpdated: '2024-05-30T14:20:00Z',
    status: 'archived',
    views: 3210,
  },
];

export const contentStats = [
  {
    title: 'Total Pages',
    value: 12,
    iconName: 'File',
    color: 'text-blue-600',
  },
  {
    title: 'Blog Posts',
    value: 24,
    iconName: 'FileText',
    color: 'text-green-600',
  },
  {
    title: 'Active Banners',
    value: 3,
    iconName: 'Layout',
    color: 'text-purple-600',
  },
  {
    title: 'Marketing Campaigns',
    value: 5,
    iconName: 'Megaphone',
    color: 'text-orange-600',
  },
];


