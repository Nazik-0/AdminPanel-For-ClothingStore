import React from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  Package, 
  AlertTriangle,
  DollarSign 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  mockDashboardStats, 
  mockActivityLogs, 
  mockSalesData, 
  mockCategoryData 
} from '../data/mockData';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;

  const statCards = [
    {
      title: "Today's Sales",
      value: `$${stats.todaySales.toLocaleString()}`,
      icon: DollarSign,
      change: '+12%',
      changeType: 'positive' as const,
      color: 'text-green-600',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      change: '+8%',
      changeType: 'positive' as const,
      color: 'text-blue-600',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      change: '+15%',
      changeType: 'positive' as const,
      color: 'text-purple-600',
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockItems.toString(),
      icon: AlertTriangle,
      change: '-5%',
      changeType: 'negative' as const,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {format(new Date(), 'MMM d, yyyy HH:mm')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last week</span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
          </CardHeader>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Sales']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCategoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {mockCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Sales Share']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {mockActivityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{log.user}</span> {log.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {log.details}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {format(new Date(log.timestamp), 'MMM d, HH:mm')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions & Alerts</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {/* Low Stock Alert */}
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                <span className="font-medium text-orange-800 dark:text-orange-200">
                  {stats.lowStockItems} items are low in stock
                </span>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Review inventory and reorder soon
              </p>
            </div>

            {/* Pending Orders */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800 dark:text-blue-200">
                  {stats.pendingOrders} orders pending processing
                </span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Process orders to maintain customer satisfaction
              </p>
            </div>

            {/* Revenue Milestone */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800 dark:text-green-200">
                  Revenue milestone reached!
                </span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Total revenue: ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};