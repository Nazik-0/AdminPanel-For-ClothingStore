import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  AlertTriangle,
  Download,
  Upload
} from 'lucide-react';
import { mockProducts } from '../data/mockData';

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', variant: 'danger' as const };
    if (stock < 10) return { label: 'Low Stock', variant: 'warning' as const };
    return { label: 'In Stock', variant: 'success' as const };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product catalog
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Clothing">Clothing</option>
              <option value="Shoes">Shoes</option>
              <option value="Accessories">Accessories</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-4">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {mockProducts.length}
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {mockProducts.filter(p => p.stock < 10).length}
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {mockProducts.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <div className="flex items-center">
              <Trash2 className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {mockProducts.filter(p => p.status === 'inactive').length}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Product</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">SKU</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Category</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Price</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Stock</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                
                return (
                  <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {product.sku}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-900 dark:text-white">
                        {product.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">
                        {product.subcategory}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${product.price}
                        </span>
                        {product.discount > 0 && (
                          <Badge variant="success" size="sm" className="ml-2">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900 dark:text-white">
                          {product.stock}
                        </span>
                        <Badge variant={stockStatus.variant} size="sm">
                          {stockStatus.label}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={product.status === 'active' ? 'success' : 'default'}
                        className="capitalize"
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};