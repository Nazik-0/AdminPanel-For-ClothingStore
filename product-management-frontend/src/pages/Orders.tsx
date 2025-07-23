import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Search, 
  Filter, 
  Eye,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Download
} from 'lucide-react';
import { mockOrders } from '../data/mockData';
import { format } from 'date-fns';

export const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: { variant: 'warning' as const, icon: Clock, color: 'text-yellow-600' },
      processing: { variant: 'info' as const, icon: Package, color: 'text-blue-600' },
      shipped: { variant: 'info' as const, icon: Truck, color: 'text-blue-600' },
      delivered: { variant: 'success' as const, icon: CheckCircle, color: 'text-green-600' },
      cancelled: { variant: 'danger' as const, icon: XCircle, color: 'text-red-600' },
      returned: { variant: 'default' as const, icon: XCircle, color: 'text-gray-600' },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const orderStats = [
    {
      title: 'Total Orders',
      value: mockOrders.length,
      icon: Package,
      color: 'text-blue-600',
    },
    {
      title: 'Pending',
      value: mockOrders.filter(o => o.status === 'pending').length,
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Processing',
      value: mockOrders.filter(o => o.status === 'processing').length,
      icon: Package,
      color: 'text-blue-600',
    },
    {
      title: 'Shipped',
      value: mockOrders.filter(o => o.status === 'shipped').length,
      icon: Truck,
      color: 'text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer orders and fulfillment
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {orderStats.map((stat, index) => (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
            </select>
            
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Order</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Customer</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Date</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Items</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Total</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {order.paymentMethod.toUpperCase()}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.customer.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {order.customer.email}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-gray-900 dark:text-white">
                          {format(new Date(order.createdAt), 'MMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {format(new Date(order.createdAt), 'HH:mm')}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-900 dark:text-white">
                        {order.items.length} items
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                        <Badge variant={statusConfig.variant} className="capitalize">
                          {order.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <select className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option value="">Update Status</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
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