import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

const { 
  FiUsers, 
  FiFileText, 
  FiImage, 
  FiActivity, 
  FiTrendingUp, 
  FiMail, 
  FiEye,
  FiClock
} = FiIcons;

const AdminDashboard = () => {
  const { users, media, content } = useData();
  const { user } = useAuth();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const stats = [
    {
      name: 'Total Users',
      value: users.length,
      icon: FiUsers,
      color: 'blue',
      change: '+12%'
    },
    {
      name: 'Content Pages',
      value: content.services.length + 2, // Services + Hero + Testimonials
      icon: FiFileText,
      color: 'green',
      change: '+5%'
    },
    {
      name: 'Media Files',
      value: media.length,
      icon: FiImage,
      color: 'purple',
      change: '+8%'
    },
    {
      name: 'Active Sessions',
      value: 1,
      icon: FiActivity,
      color: 'orange',
      change: '+2%'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'User login',
      user: user?.username || 'Admin',
      timestamp: new Date().toLocaleString(),
      icon: FiUsers,
      color: 'blue'
    },
    {
      id: 2,
      action: 'Content updated',
      user: 'System',
      timestamp: new Date(Date.now() - 3600000).toLocaleString(),
      icon: FiFileText,
      color: 'green'
    },
    {
      id: 3,
      action: 'Media uploaded',
      user: 'Admin',
      timestamp: new Date(Date.now() - 7200000).toLocaleString(),
      icon: FiImage,
      color: 'purple'
    }
  ];

  const quickActions = [
    {
      name: 'Add New User',
      description: 'Create a new user account',
      icon: FiUsers,
      color: 'blue',
      href: '/admin/users'
    },
    {
      name: 'Edit Content',
      description: 'Update website content',
      icon: FiFileText,
      color: 'green',
      href: '/admin/content'
    },
    {
      name: 'Upload Media',
      description: 'Add new media files',
      icon: FiImage,
      color: 'purple',
      href: '/admin/media'
    },
    {
      name: 'View Analytics',
      description: 'Check site performance',
      icon: FiTrendingUp,
      color: 'orange',
      href: '/admin/analytics'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white',
      orange: 'bg-orange-500 text-white',
      red: 'bg-red-500 text-white'
    };
    return colors[color] || colors.blue;
  };

  const getBackgroundClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      orange: 'bg-orange-50 border-orange-200',
      red: 'bg-red-50 border-red-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.username}!</h1>
        <p className="opacity-90">Here's what's happening with your website today.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            variants={fadeInUp}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <SafeIcon icon={FiActivity} className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(activity.color)}`}>
                  <SafeIcon icon={activity.icon} className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <div
                key={action.name}
                className={`p-4 rounded-lg border-2 border-dashed cursor-pointer hover:border-solid transition-all duration-200 ${getBackgroundClasses(action.color)}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(action.color)}`}>
                    <SafeIcon icon={action.icon} className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{action.name}</p>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Website</p>
              <p className="text-xs text-gray-600">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Database</p>
              <p className="text-xs text-gray-600">Connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Security</p>
              <p className="text-xs text-gray-600">Protected</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;