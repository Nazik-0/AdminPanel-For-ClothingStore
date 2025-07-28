import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Download,
  RefreshCw,
  Filter,
  Calendar,
  //BarChart2,
  ShoppingBag,
  DollarSign,
  Tag,
  Users,
  ArrowUp,
  ArrowDown,
  Badge
} from 'lucide-react';
import { 
  mockSalesData, 
  mockCategoryData,
  mockDashboardStats,
  mockOrders
} from '../data/mockData';
import { format } from 'date-fns';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';



export const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  });
  const [reportType, setReportType] = useState('sales');
  const [groupBy, setGroupBy] = useState('day');

  // Chart data based on selections
  const getChartData = () => {
    if (reportType === 'sales') {
      return mockSalesData;
    }
    return mockCategoryData;
  };

  // Summary stats
  const reportStats = [
    {
      title: 'Total Sales',
      value: `$${mockDashboardStats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      title: 'Orders Completed',
      value: mockDashboardStats.totalOrders.toString(),
      icon: ShoppingBag,
      change: '+8.3%',
      changeType: 'positive',
    },
    {
      title: 'Top Category',
      value: mockCategoryData[0].name,
      icon: Tag,
      change: `${mockCategoryData[0].value}%`,
      changeType: 'neutral',
    },
    {
      title: 'New Customers',
      value: '42',
      icon: Users,
      change: '-2.1%',
      changeType: 'negative',
    },
  ];

  // Report types
  const reportTypes = [
    { id: 'sales', name: 'Sales Report' },
    { id: 'inventory', name: 'Inventory Report' },
    { id: 'customer', name: 'Customer Insights' },
    { id: 'marketing', name: 'Marketing ROI' },
  ];

  // Group by options
  const groupOptions = [
    { id: 'day', name: 'Daily' },
    { id: 'week', name: 'Weekly' },
    { id: 'month', name: 'Monthly' },
    { id: 'quarter', name: 'Quarterly' },
  ];

  // Format date for display
  const formatDate = (date: Date) => format(date, 'MMM dd, yyyy');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze store performance and customer insights
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reportStats.map((stat, index) => (
          <Card key={index}>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-3 flex items-center">
                    {stat.changeType === 'positive' ? (
                    <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : stat.changeType === 'negative' ? (
                    <ArrowDown className="w-4 h-4 text-red-600 mr-1" />
                    ) : null}
                <span 
                  className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs last period</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Date Range
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    type="date"
                    value={format(dateRange.start, 'yyyy-MM-dd')}
                    onChange={(e) => 
                      setDateRange({...dateRange, start: new Date(e.target.value)})
                    }
                  />
                  <Calendar className="w-4 h-4 absolute right-3 top-2.5 text-gray-500 pointer-events-none" />
                </div>
                <span className="flex items-center">to</span>
                <div className="relative flex-1">
                  <Input
                    type="date"
                    value={format(dateRange.end, 'yyyy-MM-dd')}
                    onChange={(e) => 
                      setDateRange({...dateRange, end: new Date(e.target.value)})
                    }
                  />
                  <Calendar className="w-4 h-4 absolute right-3 top-2.5 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {reportTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Group By
              </label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {groupOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {/* Sales Performance Chart */}
        <Card>
            <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <p className="text-sm text-gray-500">
                {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
                </p>
            </CardHeader>
         <CardContent>
            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={mockSalesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                    dataKey="name" 
                    stroke="#6b7280" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                    stroke="#6b7280" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}
                    formatter={(value) => [`$${value}`, 'Sales']}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    activeDot={{ r: 8, fill: '#1d4ed8' }}
                    name="Daily Sales"
                />
                </LineChart>
            </ResponsiveContainer>
            </div>
         </CardContent>
        </Card>

{/* Category Distribution Chart */}
        <Card>
            <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <p className="text-sm text-gray-500">
                Percentage of total sales by category
                </p>
            </CardHeader>
         <CardContent>
            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={mockCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    nameKey="name"
                >
                    {mockCategoryData.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="#e5e7eb"
                        strokeWidth={1}
                    />
                    ))}
                </Pie>
                <Tooltip 
                    formatter={(value, name, props) => [`${value}%`, name]}
                    contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}
                />
                <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    formatter={(value, entry, index) => (
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {mockCategoryData[index].name}
                    </span>
                    )}
                />
                </PieChart>
            </ResponsiveContainer>
            </div>
         </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Detailed Sales Data</CardTitle>
            <p className="text-sm text-gray-500">
              {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
            </p>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Date</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Product</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Category</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Units Sold</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Revenue</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Avg. Price</th>
              </tr>
            </thead>
            <tbody>
                {mockOrders.slice(0, 8).map((order, index) => {
                    const firstItem = order.items[0];
                    const product = firstItem.product;
                    
                    return (
                    <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-4 text-gray-900 dark:text-white">
                        {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                        </td>
                        <td className="p-4">
                        <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                            <span className="font-medium">{product.name}</span>
                        </div>
                        </td>
                        <td className="p-4">
                            <span className="px-2 py-1 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 capitalize">
                            {product.category}
                            </span>
                        </td>
                        <td className="p-4 font-medium">
                        {firstItem.quantity}
                        </td>
                        <td className="p-4 font-medium text-green-600">
                        ${firstItem.price * firstItem.quantity}
                        </td>
                        <td className="p-4 text-gray-500">
                        ${firstItem.price.toFixed(2)}
                        </td>
                    </tr>
                    );
                })}
                </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing 8 of {mockSalesData.length} records
          </p>
          <Button variant="outline">
            View Full Report
          </Button>
        </div>
      </Card>
    </div>
  );
};