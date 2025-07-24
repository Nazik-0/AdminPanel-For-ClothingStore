import { Product, Order, Customer, Category, Brand, DashboardStats, ActivityLog } from '../types';

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
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
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
    ],
    total: 59.98,
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
];

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'ComfortWear',
    description: 'Premium comfortable clothing',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=400',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const mockDashboardStats: DashboardStats = {
  todaySales: 2845.67,
  totalOrders: 156,
  totalCustomers: 1247,
  lowStockItems: 23,
  pendingOrders: 18,
  totalRevenue: 125890.45,
};

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    user: 'John Admin',
    action: 'Created Product',
    details: 'Added new product "Classic Cotton T-Shirt"',
    timestamp: '2024-01-15T14:30:00Z',
  },
  {
    id: '2',
    user: 'Sarah Manager',
    action: 'Updated Stock',
    details: 'Updated stock for SKU: JKT-002 to 8 units',
    timestamp: '2024-01-15T13:45:00Z',
  },
];

export const mockSalesData = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 1900 },
  { name: 'Wed', sales: 1700 },
  { name: 'Thu', sales: 2100 },
  { name: 'Fri', sales: 2800 },
  { name: 'Sat', sales: 3200 },
  { name: 'Sun', sales: 2400 },
];

export const mockCategoryData = [
  { name: 'T-Shirts', value: 35, color: '#3B82F6' },
  { name: 'Jeans', value: 25, color: '#10B981' },
  { name: 'Jackets', value: 20, color: '#F97316' },
  { name: 'Shoes', value: 15, color: '#8B5CF6' },
  { name: 'Accessories', value: 5, color: '#EF4444' },
];

// Add to mockData.ts
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