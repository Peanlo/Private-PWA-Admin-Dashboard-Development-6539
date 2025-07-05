import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiHome, 
  FiFileText, 
  FiUsers, 
  FiImage, 
  FiBriefcase, 
  FiSettings, 
  FiX 
} = FiIcons;

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Content', href: '/admin/content', icon: FiFileText },
    { name: 'Users', href: '/admin/users', icon: FiUsers },
    { name: 'Media', href: '/admin/media', icon: FiImage },
    { name: 'Business', href: '/admin/business', icon: FiBriefcase },
    { name: 'Settings', href: '/admin/settings', icon: FiSettings },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform md:relative md:translate-x-0 md:shadow-none admin-sidebar"
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">MW</span>
            </div>
            <span className="text-white font-semibold">Admin Panel</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 md:hidden"
          >
            <SafeIcon icon={FiX} className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 admin-nav-item ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500 admin-nav-item active'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default AdminSidebar;