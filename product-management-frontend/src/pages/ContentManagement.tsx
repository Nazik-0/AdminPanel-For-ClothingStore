// src/pages/ContentManagement.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Plus, 
  RefreshCw, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  FileText as FileTextIcon,
  File as FileIcon,
  Layout as LayoutIcon,
  Megaphone as MegaphoneIcon,
  CheckCircle,
  Clock,
  Archive
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { mockContentItems, contentStats } from '../data/mockData';

/*
// Mock data - would normally import from '../data/mockData'
const mockContentItems = [
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

const contentStats = [
  {
    title: 'Total Pages',
    value: 12,
    icon: File,
    color: 'text-blue-600',
  },
  {
    title: 'Blog Posts',
    value: 24,
    icon: FileText,
    color: 'text-green-600',
  },
  {
    title: 'Active Banners',
    value: 3,
    icon: Layout,
    color: 'text-purple-600',
  },
  {
    title: 'Marketing Campaigns',
    value: 5,
    icon: Megaphone,
    color: 'text-orange-600',
  },
]; */

export const ContentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contentType, setContentType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredContent = mockContentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = contentType === 'all' || item.type === contentType;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

    const getStatusConfig = (status: string) => {
    const configs = {
        published: { variant: 'success' as const, icon: CheckCircle, color: 'text-green-600' },
        draft: { variant: 'warning' as const, icon: Clock, color: 'text-yellow-600' },
        archived: { variant: 'default' as const, icon: Archive, color: 'text-gray-600' },
    };
    return configs[status as keyof typeof configs] || configs.draft;
    };

  const getTypeConfig = (type: string) => {
    const configs = {
      page: { 
        icon: FileIcon, 
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' 
      },
      post: { 
        icon: FileTextIcon, 
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
      },
      banner: { 
        icon: LayoutIcon, 
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' 
      },
      campaign: { 
        icon: MegaphoneIcon, 
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' 
      },
    };
    
    return configs[type as keyof typeof configs] || configs.page;
  };


  return (
    <div className="space-y-6">
      {/* Create Content Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Create New Content</CardTitle>
              <p className="text-sm text-gray-500">
                Add new page, blog post, or promotional content
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <select className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="page">Page</option>
                    <option value="post">Blog Post</option>
                    <option value="banner">Promotional Banner</option>
                    <option value="campaign">Marketing Campaign</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input placeholder="Enter content title" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded-lg min-h-[200px] p-4 bg-white dark:bg-gray-700">
                    {/* Rich text editor placeholder */}
                    <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">
                      <p className="text-gray-500">Rich text editor will appear here</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateModalOpen(false)}>
                  Create Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Content Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage your website content
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Content
          </Button>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {contentStats.map((stat, index) => {
          // Get the icon component by name from the Icons object
          const IconComponent = Icons[stat.iconName as keyof typeof Icons] as 
            React.ComponentType<React.SVGProps<SVGSVGElement>>;
          
          return (
            <Card key={index}>
              <div className="p-4">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color.replace('text', 'bg')} mr-4`}>
                    {IconComponent && (
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input - now properly wrapped with label */}
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            
            {/* Content Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Content Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="page">Pages</option>
                <option value="post">Blog Posts</option>
                <option value="banner">Banners</option>
                <option value="campaign">Campaigns</option>
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            {/* More Filters Button */}
            <div className="flex flex-col justify-end">
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Content Table */}
      <Card>
        <CardHeader>
          <CardTitle>Content List</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Title</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Author</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Last Updated</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Views</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.map((item) => {
                const statusConfig = getStatusConfig(item.status);
                const StatusIcon = statusConfig.icon;
                const typeConfig = getTypeConfig(item.type);
                const TypeIcon = typeConfig.icon;
                
                return (
                  <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="p-4">
                      <Badge className={`inline-flex items-center ${typeConfig.color}`}>
                        <TypeIcon className="w-3 h-3 mr-1" />
                        <span className="capitalize">{item.type}</span>
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {item.author}
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium">
                      {item.views.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <StatusIcon className={`w-4 h-4 mr-2 ${statusConfig.color}`} />
                        <Badge variant={statusConfig.variant} className="capitalize">
                          {item.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" title="Preview">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-600" />
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