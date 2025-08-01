import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Search, 
  Filter, 
  RefreshCw,
  Download,
  User,
  Edit,
  Trash2,
  Plus,
  Package,
  ShoppingBag,
  Calendar,
  Clock
} from 'lucide-react';
import { mockActivityLogs } from '../data/mockData';
import { format, parseISO } from 'date-fns';
import { ActivityLog } from '../types';

export const ActivityLogComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>(mockActivityLogs);

  // Toggle auto refresh
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        // In a real app, this would fetch new data from API
        // For now, we'll just add a mock log to simulate new activity
        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          user: 'System',
          action: 'Auto Refresh',
          details: 'Activity logs refreshed automatically',
          timestamp: new Date().toISOString(),
          ipAddress: '127.0.0.1'
        };
        
        setLogs(prev => [newLog, ...prev]);
      }, 30000); // Refresh every 30 seconds
    }
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Get unique users for filter dropdown
  const uniqueUsers = Array.from(new Set(logs.map(log => log.user)));


  // Filter logs based on selections
    const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    
    // Date range filtering
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const logDate = new Date(log.timestamp);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59); // Include entire end day
      
      matchesDate = logDate >= startDate && logDate <= endDate;
    }
    
    return matchesSearch && matchesAction && matchesUser && matchesDate;
  });

  // Get action icon based on action type
 const getActionIcon = (action: string) => {
    const actionIcons: Record<string, React.ReactNode> = {
      'Created Product': <Plus className="w-4 h-4" />,
      'Updated Product': <Edit className="w-4 h-4" />,
      'Deleted Product': <Trash2 className="w-4 h-4" />,
      'Created Order': <ShoppingBag className="w-4 h-4" />,
      'Updated Order': <Edit className="w-4 h-4" />,
      'Updated Stock': <Package className="w-4 h-4" />,
      'Auto Refresh': <RefreshCw className="w-4 h-4" />,
      'default': <Edit className="w-4 h-4" />
    };
    
    return actionIcons[action] || actionIcons.default;
  };

  // Get action badge variant
  const getActionVariant = (action: string) => {
    if (action.includes('Created')) return 'success';
    if (action.includes('Updated')) return 'info';
    if (action.includes('Deleted')) return 'danger';
    if (action.includes('Refresh')) return 'default';
    return 'default';
  };

 
  // Activity summary stats
  const activityStats = [
    {
      title: 'Total Activities',
      value: logs.length,
      icon: Clock,
      color: 'text-blue-600',
    },
    {
      title: 'Today',
      value: logs.filter(log => {
        const logDate = new Date(log.timestamp);
        const today = new Date();
        return logDate.toDateString() === today.toDateString();
      }).length,
      icon: Calendar,
      color: 'text-green-600',
    },
    {
      title: 'This Week',
      value: logs.filter(log => {
        const logDate = new Date(log.timestamp);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return logDate > oneWeekAgo;
      }).length,
      icon: RefreshCw,
      color: 'text-purple-600',
    },
    {
      title: 'Active Users',
      value: uniqueUsers.length,
      icon: User,
      color: 'text-yellow-600',
    },
  ];

 return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Activity Log
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track all user activities and system events
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant={autoRefresh ? 'success' : 'outline'}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'Auto Refresh On' : 'Auto Refresh'}
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {activityStats.map((stat, index) => (
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
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
            
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Actions</option>
              <option value="Created Product">Created Product</option>
              <option value="Updated Product">Updated Product</option>
              <option value="Deleted Product">Deleted Product</option>
              <option value="Created Order">Created Order</option>
              <option value="Updated Order">Updated Order</option>
              <option value="Updated Stock">Updated Stock</option>
              <option value="Auto Refresh">Auto Refresh</option>
            </select>
            
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Users</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
            
            <div className="flex space-x-2">
              <Input
                type="date"
                placeholder="Start Date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              />
              <Input
                type="date"
                placeholder="End Date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">User</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Action</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Details</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Date & Time</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr 
                  key={log.id} 
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                  onClick={() => setSelectedLog(log)}
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                        <User className="w-4 h-4" />
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {log.user}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="mr-2">
                        {getActionIcon(log.action)}
                      </div>
                      <Badge 
                        variant={getActionVariant(log.action)} 
                        className="capitalize"
                      >
                        {log.action}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-900 dark:text-white">
                      {log.details}
                    </p>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-gray-900 dark:text-white">
                        {format(parseISO(log.timestamp), 'MMM d, yyyy')}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {format(parseISO(log.timestamp), 'HH:mm:ss')}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {log.ipAddress || 'N/A'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Activity Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Activity Details</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedLog(null)}
                >
                  <span className="text-xl">×</span>
                </Button>
              </div>
            </CardHeader>
            <div className="p-6 space-y-4">
              <div className="flex items-center">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">{selectedLog.user}</p>
                  <p className="text-gray-500 dark:text-gray-400">{selectedLog.ipAddress || 'IP not recorded'}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Action</p>
                  <div className="flex items-center mt-1">
                    <Badge variant={getActionVariant(selectedLog.action)}>
                      {selectedLog.action}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Details</p>
                  <p className="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    {selectedLog.details}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="mt-1 font-medium">
                    {format(parseISO(selectedLog.timestamp), 'MMM d, yyyy HH:mm:ss')}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Activity ID</p>
                  <p className="mt-1 font-mono text-sm">{selectedLog.id}</p>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedLog(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
};