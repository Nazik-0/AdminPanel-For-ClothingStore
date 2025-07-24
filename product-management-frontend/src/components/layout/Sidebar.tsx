import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  Tag, 
  Truck,
  FileText,
  Activity,
  Store
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { clsx } from 'clsx';

interface SidebarProps {
  isCollapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const { user } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['super_admin', 'inventory_manager', 'sales_manager'] },
    { name: 'Products', href: '/products', icon: Package, roles: ['super_admin', 'inventory_manager'] },
    { name: 'Orders', href: '/orders', icon: ShoppingCart, roles: ['super_admin', 'sales_manager'] },
    { name: 'Customers', href: '/customers', icon: Users, roles: ['super_admin', 'sales_manager'] },
    { name: 'Categories', href: '/categories', icon: Tag, roles: ['super_admin', 'inventory_manager'] },
    { name: 'Brands', href: '/brands', icon: Store, roles: ['super_admin', 'inventory_manager'] },
    { name: 'Inventory', href: '/inventory', icon: Truck, roles: ['super_admin', 'inventory_manager'] },
    { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['super_admin'] },
    { name: 'Content', href: '/content', icon: FileText, roles: ['super_admin'] },
    { name: 'Activity', href: '/activity', icon: Activity, roles: ['super_admin'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['super_admin'] },
  ];

  const filteredItems = navigationItems.filter(item =>                    
    user?.role && item.roles.includes(user.role)
  );

  return (
    <aside className={clsx(
      'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full transition-all duration-300 flex flex-col',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                ClothingStore
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={clsx(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group',
                isActive 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className={clsx(
                'flex-shrink-0',
                isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3',
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              )} />
              {!isCollapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};