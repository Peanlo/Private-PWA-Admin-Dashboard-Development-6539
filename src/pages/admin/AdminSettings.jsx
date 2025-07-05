import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

const { 
  FiSave, 
  FiSettings, 
  FiShield, 
  FiDatabase, 
  FiLock, 
  FiEye, 
  FiEyeOff,
  FiBell,
  FiMoon,
  FiSun
} = FiIcons;

const AdminSettings = () => {
  const { settings, updateSettings } = useData();
  const { changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: FiSettings },
    { id: 'security', name: 'Security', icon: FiShield },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'backup', name: 'Backup', icon: FiDatabase }
  ];

  const onSubmitGeneral = (data) => {
    updateSettings({
      siteName: data.siteName,
      siteDescription: data.siteDescription,
      theme: data.theme
    });
    toast.success('General settings updated successfully!');
  };

  const onSubmitSecurity = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const result = await changePassword(data.currentPassword, data.newPassword);
      
      if (result.success) {
        toast.success('Password changed successfully!');
        reset();
      } else {
        toast.error(result.error || 'Failed to change password');
      }
    } catch (error) {
      toast.error('Password change failed');
    }

    // Update other security settings
    updateSettings({
      security: {
        ...settings.security,
        twoFactorAuth: data.twoFactorAuth || false,
        sessionTimeout: parseInt(data.sessionTimeout) || 60,
        passwordExpiry: parseInt(data.passwordExpiry) || 90
      }
    });
  };

  const onSubmitNotifications = (data) => {
    updateSettings({
      notifications: {
        email: data.email || false,
        push: data.push || false,
        sms: data.sms || false
      }
    });
    toast.success('Notification settings updated successfully!');
  };

  const onSubmitBackup = (data) => {
    updateSettings({
      backup: {
        autoBackup: data.autoBackup || false,
        backupFrequency: data.backupFrequency || 'daily',
        retentionPeriod: parseInt(data.retentionPeriod) || 30
      }
    });
    toast.success('Backup settings updated successfully!');
  };

  const newPassword = watch('newPassword');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Manage system configuration and preferences.</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
              <form onSubmit={handleSubmit(onSubmitGeneral)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    {...register('siteName', { required: 'Site name is required' })}
                    type="text"
                    defaultValue={settings.siteName}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.siteName && (
                    <p className="mt-1 text-sm text-red-600">{errors.siteName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    {...register('siteDescription')}
                    rows="3"
                    defaultValue={settings.siteDescription}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <select
                    {...register('theme')}
                    defaultValue={settings.theme}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="light">
                      Light
                    </option>
                    <option value="dark">
                      Dark
                    </option>
                    <option value="auto">
                      Auto
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Save General Settings</span>
                </button>
              </form>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
              <form onSubmit={handleSubmit(onSubmitSecurity)} className="space-y-6">
                {/* Password Change Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          {...register('currentPassword', { required: 'Current password is required' })}
                          type={showCurrentPassword ? 'text' : 'password'}
                          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          <SafeIcon
                            icon={showCurrentPassword ? FiEyeOff : FiEye}
                            className="w-5 h-5 text-gray-400"
                          />
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          {...register('newPassword', { 
                            required: 'New password is required',
                            minLength: {
                              value: 8,
                              message: 'Password must be at least 8 characters'
                            }
                          })}
                          type={showNewPassword ? 'text' : 'password'}
                          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          <SafeIcon
                            icon={showNewPassword ? FiEyeOff : FiEye}
                            className="w-5 h-5 text-gray-400"
                          />
                        </button>
                      </div>
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          {...register('confirmPassword', { 
                            required: 'Please confirm your password',
                            validate: value => value === newPassword || 'Passwords do not match'
                          })}
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          <SafeIcon
                            icon={showConfirmPassword ? FiEyeOff : FiEye}
                            className="w-5 h-5 text-gray-400"
                          />
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      {...register('sessionTimeout')}
                      type="number"
                      min="5"
                      max="480"
                      defaultValue={settings.security?.sessionTimeout}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Expiry (days)
                    </label>
                    <input
                      {...register('passwordExpiry')}
                      type="number"
                      min="30"
                      max="365"
                      defaultValue={settings.security?.passwordExpiry}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    {...register('twoFactorAuth')}
                    type="checkbox"
                    defaultChecked={settings.security?.twoFactorAuth}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Enable Two-Factor Authentication
                  </label>
                </div>

                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <SafeIcon icon={FiLock} className="w-4 h-4" />
                  <span>Update Security Settings</span>
                </button>
              </form>
            </motion.div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
              <form onSubmit={handleSubmit(onSubmitNotifications)} className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      {...register('email')}
                      type="checkbox"
                      defaultChecked={settings.notifications?.email}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label className="ml-3 text-sm text-gray-700">
                      Email Notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      {...register('push')}
                      type="checkbox"
                      defaultChecked={settings.notifications?.push}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label className="ml-3 text-sm text-gray-700">
                      Push Notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      {...register('sms')}
                      type="checkbox"
                      defaultChecked={settings.notifications?.sms}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label className="ml-3 text-sm text-gray-700">
                      SMS Notifications
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <SafeIcon icon={FiBell} className="w-4 h-4" />
                  <span>Save Notification Settings</span>
                </button>
              </form>
            </motion.div>
          )}

          {/* Backup Settings */}
          {activeTab === 'backup' && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Backup Settings</h2>
              <form onSubmit={handleSubmit(onSubmitBackup)} className="space-y-4">
                <div className="flex items-center mb-4">
                  <input
                    {...register('autoBackup')}
                    type="checkbox"
                    defaultChecked={settings.backup?.autoBackup}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    Enable Automatic Backups
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Backup Frequency
                    </label>
                    <select
                      {...register('backupFrequency')}
                      defaultValue={settings.backup?.backupFrequency}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retention Period (days)
                    </label>
                    <input
                      {...register('retentionPeriod')}
                      type="number"
                      min="1"
                      max="365"
                      defaultValue={settings.backup?.retentionPeriod}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <SafeIcon icon={FiSave} className="w-4 h-4" />
                    <span>Save Backup Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toast.success('Backup started successfully!')}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <SafeIcon icon={FiDatabase} className="w-4 h-4" />
                    <span>Create Backup Now</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSettings;