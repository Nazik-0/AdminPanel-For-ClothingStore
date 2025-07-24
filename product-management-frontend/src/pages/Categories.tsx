import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Search, 
  Plus, 
  Folder,
  FolderOpen,
  Image,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Save,
  X,
  Globe
} from 'lucide-react';
import { mockCategories } from '../data/mockData';
import { Category } from '../types';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState<Partial<Category>>({
    name: '',
    slug: '',
    status: 'active',
    parentId: null,
    image: '',
    metaTitle: '',
    metaDescription: ''
  });

  // Initialize with mock data
  useEffect(() => {
    setCategories(mockCategories);
    setFilteredCategories(mockCategories);
    setExpandedCategories(['root']);
  }, []);

  // Build hierarchical category structure
  const buildCategoryTree = (categories: Category[], parentId: string | null = null): Category[] => {
    return categories
      .filter(category => category.parentId === parentId)
      .map(category => ({
        ...category,
        children: buildCategoryTree(categories, category.id)
      }));
  };

  // Toggle category expansion
  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  // Filter categories
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCategories(categories);
      return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const filtered = categories.filter(cat => 
      cat.name.toLowerCase().includes(searchLower) || 
      (cat.description && cat.description.toLowerCase().includes(searchLower))
    );
    
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  // Handle category selection
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditing(false);
    setNewCategoryData({
      ...category,
      parentId: category.parentId || null
    });
    
    if (!expandedCategories.includes(category.id)) {
      toggleExpand(category.id);
    }
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCategoryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  // Handle name change with auto-slug generation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewCategoryData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  // Save category
  const handleSave = () => {
    if (!newCategoryData.name) return;

    // In a real app, you would make an API call here
    if (isEditing && selectedCategory) {
      // Update existing category
      setCategories(prev => 
        prev.map(cat => 
          cat.id === selectedCategory.id 
            ? { ...cat, ...newCategoryData } as Category 
            : cat
        )
      );
    } else {
      // Add new category
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name: newCategoryData.name || '',
        slug: newCategoryData.slug || '',
        status: newCategoryData.status || 'active',
        parentId: newCategoryData.parentId || null,
        productCount: 0,
        image: newCategoryData.image || '',
        description: newCategoryData.description || '',
        metaTitle: newCategoryData.metaTitle || '',
        metaDescription: newCategoryData.metaDescription || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setCategories(prev => [...prev, newCategory]);
      setSelectedCategory(newCategory);
    }
    
    setIsEditing(false);
  };

  // Delete category
  const handleDelete = (categoryId: string) => {
    // In a real app, you would make an API call here
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory(null);
    }
  };

  // Create new category
  const handleNewCategory = (parentId: string | null = null) => {
    setSelectedCategory(null);
    setIsEditing(true);
    setNewCategoryData({
      name: '',
      slug: '',
      status: 'active',
      parentId,
      image: '',
      metaTitle: '',
      metaDescription: ''
    });
  };

  // Recursive category tree rendering
  const renderCategoryTree = useCallback((categories: Category[], level = 0) => {
    return categories.map(category => {
      const hasChildren = category.children && category.children.length > 0;
      const isExpanded = expandedCategories.includes(category.id);
      
      return (
        <div key={category.id} className="ml-4">
          <div 
            className={`flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
              selectedCategory?.id === category.id 
                ? 'bg-blue-100 dark:bg-blue-900' 
                : ''
            }`}
          >
            {hasChildren ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleExpand(category.id)}
                className="mr-1"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            ) : (
              <div className="w-9" />
            )}
            
            <div 
              className="flex items-center flex-1 cursor-pointer py-1"
              onClick={() => handleSelectCategory(category)}
            >
              <div className="mr-2">
                {isExpanded ? (
                  <FolderOpen className="w-5 h-5 text-blue-500" />
                ) : (
                  <Folder className="w-5 h-5 text-blue-500" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{category.name}</span>
                  <Badge 
                    variant={category.status === 'active' ? 'success' : 'danger'} 
                    className="text-xs"
                  >
                    {category.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {category.productCount} products
                </div>
              </div>
            </div>
            
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNewCategory(category.id);
                }}
                title="Add subcategory"
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCategory(category);
                  setIsEditing(true);
                }}
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(category.id);
                }}
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
          
          {hasChildren && isExpanded && (
            <div className="border-l border-gray-200 dark:border-gray-700 ml-3 pl-2">
              {renderCategoryTree(category.children || [], level + 1)}
            </div>
          )}
        </div>
      );
    });
  }, [expandedCategories, selectedCategory]);

  const categoryTree = buildCategoryTree(filteredCategories, null);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product categories
          </p>
        </div>
        <Button onClick={() => handleNewCategory(null)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Category Tree */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
              
              <div className="mt-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                {categoryTree.length > 0 ? (
                  renderCategoryTree(categoryTree)
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No categories found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Panel - Category Details */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {isEditing 
                    ? (selectedCategory ? "Edit Category" : "Add New Category") 
                    : (selectedCategory ? selectedCategory.name : "Category Details")}
                </CardTitle>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              {selectedCategory || isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Category Name *
                      </label>
                      <Input
                        name="name"
                        value={newCategoryData.name || ''}
                        onChange={handleNameChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        URL Slug *
                      </label>
                      <div className="flex">
                    <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md text-gray-500 dark:text-gray-400">
                        /categories/
                    </div>
                    <Input
                        name="slug"
                        value={newCategoryData.slug || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="flex-1 rounded-l-none"
                    />
                    </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Parent Category
                      </label>
                      <select
                        name="parentId"
                        value={newCategoryData.parentId || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      >
                        <option value="">None (Top Level)</option>
                        {categories
                          .filter(cat => !cat.parentId)
                          .map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Status
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="active"
                            checked={newCategoryData.status === 'active'}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="mr-2"
                          />
                          <Badge variant="success">Active</Badge>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="inactive"
                            checked={newCategoryData.status === 'inactive'}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="mr-2"
                          />
                          <Badge variant="danger">Inactive</Badge>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={newCategoryData.description || ''}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category Image
                    </label>
                    <div className="flex items-center space-x-4">
                      {newCategoryData.image ? (
                        <div className="relative">
                          <img 
                            src={newCategoryData.image} 
                            alt="Category" 
                            className="w-20 h-20 rounded-md object-cover"
                          />
                          {isEditing && (
                            <Button 
                                variant="danger"
                                size="sm"
                                className="absolute -top-2 -right-2"
                                onClick={() => setNewCategoryData(prev => ({ ...prev, image: '' }))}
                                >
                                <X className="w-4 h-4" />
                                </Button>
                          )}
                        </div>
                      ) : (
                        <div className="border-2 border-dashed rounded-md w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      {isEditing && (
                        <div>
                          <Button variant="outline">
                            Upload Image
                          </Button>
                          <p className="text-xs text-gray-500 mt-1">
                            Recommended size: 400x400px
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <h3 className="font-medium">SEO Settings</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Meta Title
                        </label>
                        <Input
                          name="metaTitle"
                          value={newCategoryData.metaTitle || ''}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Meta Description
                        </label>
                        <textarea
                          name="metaDescription"
                          value={newCategoryData.metaDescription || ''}
                          onChange={handleChange}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Folder className="w-16 h-16 mx-auto text-gray-400" />
                  <h3 className="mt-4 font-medium text-gray-900 dark:text-white">
                    No category selected
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Select a category from the list or create a new one
                  </p>
                  <Button 
                    className="mt-4"
                    onClick={() => handleNewCategory(null)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Category
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Categories;