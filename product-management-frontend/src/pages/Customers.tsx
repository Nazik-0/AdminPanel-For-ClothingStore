import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Search, 
  Filter, 
  Eye,
  Mail,
  Phone,
  UserCheck,
  UserX,
  Users,
  ShoppingBag,
  DollarSign,
  Calendar
} from 'lucide-react';
import { mockCustomers } from '../data/mockData';
import { format } from 'date-fns';

export const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const customerStats = [
    {
      title: 'Total Customers',
      value: mockCustomers.length,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Active Customers',
      value: mockCustomers.filter(c => c.status === 'active').length,
      icon: UserCheck,
      color: 'text-green-600',
    },
    {
      title: 'Blocked Customers',
      value: mockCustomers.filter(c => c.status === 'blocked').length,
      icon: UserX,
      color: 'text-red-600',
    },
    {
      title: 'Avg. Order Value',
      value: '$' + (mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0) || 0).toFixed(0),
      icon: DollarSign,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Customers
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer relationships and data
          </p>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {customerStats.map((stat, index) => (
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
              placeholder="Search customers..."
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
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
            
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Customer</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Contact</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Orders</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Total Spent</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Joined</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {customer.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {customer.address.city}, {customer.address.state}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="w-3 h-3 mr-1" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="w-3 h-3 mr-1" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <ShoppingBag className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900 dark:text-white">
                        {customer.totalOrders}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {customer.totalSpent.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900 dark:text-white">
                        {format(new Date(customer.createdAt), 'MMM yyyy')}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge 
                      variant={customer.status === 'active' ? 'success' : 'danger'}
                      className="capitalize"
                    >
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={customer.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                      >
                        {customer.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};