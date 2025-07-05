import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';

const { FiMenu, FiLogOut, FiUser } = FiIcons;

const AdminHeader = ({ onMenuClick, currentPath }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getPageTitle = (path) => {
    switch (path) {
      case '/admin':
        return 'Dashboard';
      case '/admin/content':
        return 'Content Management';
      case '/admin/users':
        return 'User Management';
      case '/admin/media':
        return 'Media Library';
      case '/admin/business':
        return 'Business Settings';
      case '/admin/settings':
        return 'System Settings';
      default:
        return 'Admin Panel';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="text-gray-500 hover:text-gray-700 md:hidden"
          >
            <SafeIcon icon={FiMenu} className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            {getPageTitle(currentPath)}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <SafeIcon icon={FiUser} className="w-4 h-4" />
            <span>Welcome, {user?.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiLogOut} className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;