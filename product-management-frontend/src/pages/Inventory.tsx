import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Search, 
  //Filter, 
  Plus,
  Box,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Download,
  Edit,
  Trash2
} from 'lucide-react';
import { mockProducts } from '../data/mockData';

export const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedStock, setSelectedStock] = useState('all');

  // Filter products based on selections
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    // Stock level filtering
    let matchesStock = true;
    if (selectedStock === 'out') {
      matchesStock = product.stock === 0;
    } else if (selectedStock === 'low') {
      matchesStock = product.stock > 0 && product.stock <= 10;
    } else if (selectedStock === 'healthy') {
      matchesStock = product.stock > 10;
    }
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  });

  // Inventory summary stats
  const inventoryStats = [
    {
      title: 'Total Products',
      value: mockProducts.length,
      icon: Box,
      color: 'text-blue-600',
    },
    {
      title: 'Out of Stock',
      value: mockProducts.filter(p => p.stock === 0).length,
      icon: AlertCircle,
      color: 'text-red-600',
    },
    {
      title: 'Low Stock',
      value: mockProducts.filter(p => p.stock > 0 && p.stock <= 10).length,
      icon: AlertTriangle,
      color: 'text-yellow-600',
    },
    {
      title: 'Active Products',
      value: mockProducts.filter(p => p.status === 'active').length,
      icon: CheckCircle,
      color: 'text-green-600',
    },
  ];

  // Get stock level display config
  const getStockConfig = (stock: number) => {
    if (stock === 0) {
      return { text: 'Out of stock', color: 'text-red-600' };
    } else if (stock <= 10) {
      return { text: `Low (${stock})`, color: 'text-yellow-600' };
    } else {
      return { text: `${stock} in stock`, color: 'text-green-600' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Inventory
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your products and stock levels
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {inventoryStats.map((stat, index) => (
          <Card key={index}>
            <div className="p-4">
              <div className="flex items-center">
                <stat.icon className={`w-8 h-8 ${stat.color} mr-3`} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
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
              <option value="Outerwear">Outerwear</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stock Levels</option>
              <option value="out">Out of Stock</option>
              <option value="low">Low Stock</option>
              <option value="healthy">Healthy Stock</option>
            </select>
          </div>
        </div>
      </Card>

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
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Category</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Stock</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Price</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const stockConfig = getStockConfig(product.stock);
                
                return (
                  <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="p-4">
                      <div className="flex items-center">
                        {product.images && product.images.length > 0 && (
                            <img 
                                src={product.images[0]}  // Use first image from array
                                alt={product.name} 
                                className="w-10 h-10 rounded-md object-cover mr-3"
                            />
                            )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            SKU: {product.sku}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-900 dark:text-white">
                        {product.category}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className={`font-medium ${stockConfig.color}`}>
                        {stockConfig.text}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </p>
                    </td>
                    <td className="p-4">
                     <Badge 
                        variant={
                            product.status === 'active' 
                            ? 'success' 
                            : product.status === 'draft'    // Use 'draft' instead of 'inactive'
                                ? 'warning' 
                                : 'default'                   // For 'archived'
                                /* : 'secondary'  // Changed to 'secondary' for archived */
                        } 
                        className="capitalize"
                        >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
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