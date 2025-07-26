import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Search, 
  Filter, 
  Plus,
  Edit,
  Trash,
  Activity,
  CheckCircle,
  XCircle,
  Download,
  Sliders,
  X
} from 'lucide-react';
import { mockBrands, brandStats } from '../data/mockData';
import { format } from 'date-fns';
import { BrandLogoUploader } from '../components/ui/BrandLogoUploader';
import { Brand } from '../types';
import { utils, writeFile } from 'xlsx';

const Brands: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [form, setForm] = useState({
        name: '',
        description: '',
        status: 'active' as 'active' | 'inactive',
        logo: '',
        });

  const resetForm = () =>
     setForm({ name: '', description: '', status: 'active', logo: '' });

  // Filter brands based on search and status
  const filteredBrands = mockBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || brand.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Status configuration
  const getStatusConfig = (status: 'active' | 'inactive') => {
    return status === 'active' 
      ? { variant: 'success' as const, icon: CheckCircle, color: 'text-green-600' }
      : { variant: 'danger' as const, icon: XCircle, color: 'text-red-600' };
  };

  // Open modal for adding new brand
    const openAddModal = () => {
        resetForm();
        setLogoFile(null);
        setCurrentBrand(null);
        setIsModalOpen(true);
    };

  // Open modal for editing existing brand
  const openEditModal = (brand: Brand) => {
    setCurrentBrand(brand);
    setLogoFile(null);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log('Submitting brand:', currentBrand);
    console.log('Logo file:', logoFile);
    setIsModalOpen(false);
  };

  // Handle delete brand
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      console.log('Deleting brand with ID:', id);
      // In a real app, this would call an API
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Brands
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage clothing brands and their details
          </p>
        </div>
        <div className="flex space-x-3">
            <Button
                variant="outline"
                onClick={() => {
                // Build the rows to export (only visible brands)
                const rows = filteredBrands.map(b => ({
                    Name: b.name,
                    Description: b.description,
                    Status: b.status,
                    'Product Count': b.productsCount,
                    'Last Updated': format(
                    new Date(b.lastUpdated || b.createdAt),
                    'yyyy-MM-dd'
                    ),
                }));

                // Create workbook & sheet
                const wb = utils.book_new();
                const ws = utils.json_to_sheet(rows);
                utils.book_append_sheet(wb, ws, 'Brands');

                // Trigger download
                writeFile(wb, `brands-${format(new Date(), 'yyyyMMdd')}.csv`);
                }}
            >
                <Download className="w-4 h-4 mr-2" />
                Export
            </Button>
          <Button onClick={openAddModal}>
            <Plus className="w-4 h-4 mr-2" />
            Add Brand
          </Button>
        </div>
      </div>

      {/* Brand Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Brands</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {brandStats.totalBrands}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Brands</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {brandStats.activeBrands}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Top Brands by Products</p>
              <div className="space-y-1">
                {brandStats.topBrands.map((brand, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-900 dark:text-white">{brand.name}</span>
                    <span className="font-medium">{brand.productCount} products</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
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

      {/* Brands Table */}
      <Card>
        <CardHeader>
          <CardTitle>Brand List</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Logo</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Brand</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Products</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Last Updated</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand) => {
                const statusConfig = getStatusConfig(brand.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={brand.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                        {brand.logo ? (
                          <img 
                            src={brand.logo} 
                            alt={brand.name} 
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <div className="text-gray-400 text-xs text-center">No logo</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {brand.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {brand.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {brand.productsCount}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-900 dark:text-white">
                        {format(new Date(brand.lastUpdated || brand.createdAt), 'MMM d, yyyy')}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(brand.lastUpdated || brand.createdAt), 'HH:mm')}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                        <Badge variant={statusConfig.variant} className="capitalize">
                          {brand.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditModal(brand)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(brand.id)}
                        >
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredBrands.length === 0 && (
            <div className="py-12 text-center">
              <Sliders className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No brands found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Add/Edit Brand Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
                {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentBrand ? 'Edit Brand' : 'Add New Brand'}
                </h2>
          <button
            onClick={() => {
              setIsModalOpen(false);
              resetForm();          // clear form on close
            }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
                {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Logo uploader */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Brand Logo
                    </label>
                    <BrandLogoUploader 
                      onFileChange={setLogoFile}
                      initialPreview={currentBrand?.logo}
                    />
                  </div>

                  {/* Name & Status */}
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Brand Name
                      </label>
                       <Input
                  placeholder="Enter brand name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                        <select
                    value={form.status}
                    onChange={(e) =>
                        setForm({ ...form, status: e.target.value as 'active' | 'inactive' })
                    }
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  {/* Description (full width row) */}
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                        placeholder="Enter brand description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        required
                    />
                  </div>
                </div>
                
                {/* Footer buttons */}
                <div className="mt-8 flex justify-end space-x-3">
                    <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                        setIsModalOpen(false);
                        resetForm();
                    }}
                    >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {currentBrand ? 'Update Brand' : 'Add Brand'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;