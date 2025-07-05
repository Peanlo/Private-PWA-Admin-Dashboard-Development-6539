import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useData } from '../../contexts/DataContext';

const { FiSave, FiClock, FiMapPin, FiPhone, FiMail, FiGlobe, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } = FiIcons;

const AdminBusiness = () => {
  const { businessInfo, updateBusinessInfo } = useData();
  const [activeTab, setActiveTab] = useState('general');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const tabs = [
    { id: 'general', name: 'General Info', icon: FiMapPin },
    { id: 'hours', name: 'Operating Hours', icon: FiClock },
    { id: 'social', name: 'Social Media', icon: FiFacebook }
  ];

  const onSubmitGeneral = (data) => {
    updateBusinessInfo(data);
    toast.success('Business information updated successfully!');
  };

  const onSubmitHours = (data) => {
    const operatingHours = {};
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    days.forEach(day => {
      operatingHours[day] = {
        open: data[`${day}_open`],
        close: data[`${day}_close`],
        closed: data[`${day}_closed`] || false
      };
    });
    
    updateBusinessInfo({ operatingHours });
    toast.success('Operating hours updated successfully!');
  };

  const onSubmitSocial = (data) => {
    const socialMedia = {
      facebook: data.facebook || '',
      twitter: data.twitter || '',
      instagram: data.instagram || '',
      linkedin: data.linkedin || ''
    };
    
    updateBusinessInfo({ socialMedia });
    toast.success('Social media links updated successfully!');
  };

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Business Settings</h1>
        <p className="text-gray-600">Manage your business information and settings.</p>
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
          {/* General Information */}
          {activeTab === 'general' && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">General Information</h2>
              <form onSubmit={handleSubmit(onSubmitGeneral)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      {...register('name', { required: 'Business name is required' })}
                      type="text"
                      defaultValue={businessInfo.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      defaultValue={businessInfo.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      type="tel"
                      defaultValue={businessInfo.phone}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      {...register('website')}
                      type="url"
                      defaultValue={businessInfo.website}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    {...register('address')}
                    rows="3"
                    defaultValue={businessInfo.address}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows="4"
                    defaultValue={businessInfo.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </form>
            </motion.div>
          )}

          {/* Operating Hours */}
          {activeTab === 'hours' && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Operating Hours</h2>
              <form onSubmit={handleSubmit(onSubmitHours)} className="space-y-4">
                {days.map((day) => (
                  <div key={day.key} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{day.label}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        {...register(`${day.key}_closed`)}
                        type="checkbox"
                        defaultChecked={businessInfo.operatingHours[day.key]?.closed}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <label className="text-sm text-gray-700">Closed</label>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Open</label>
                      <input
                        {...register(`${day.key}_open`)}
                        type="time"
                        defaultValue={businessInfo.operatingHours[day.key]?.open}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Close</label>
                      <input
                        {...register(`${day.key}_close`)}
                        type="time"
                        defaultValue={businessInfo.operatingHours[day.key]?.close}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Save Hours</span>
                </button>
              </form>
            </motion.div>
          )}

          {/* Social Media */}
          {activeTab === 'social' && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h2>
              <form onSubmit={handleSubmit(onSubmitSocial)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <SafeIcon icon={FiFacebook} className="w-4 h-4 text-blue-600" />
                      <span>Facebook</span>
                    </label>
                    <input
                      {...register('facebook')}
                      type="url"
                      placeholder="https://facebook.com/yourpage"
                      defaultValue={businessInfo.socialMedia?.facebook}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <SafeIcon icon={FiTwitter} className="w-4 h-4 text-blue-400" />
                      <span>Twitter</span>
                    </label>
                    <input
                      {...register('twitter')}
                      type="url"
                      placeholder="https://twitter.com/youraccount"
                      defaultValue={businessInfo.socialMedia?.twitter}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <SafeIcon icon={FiInstagram} className="w-4 h-4 text-pink-600" />
                      <span>Instagram</span>
                    </label>
                    <input
                      {...register('instagram')}
                      type="url"
                      placeholder="https://instagram.com/youraccount"
                      defaultValue={businessInfo.socialMedia?.instagram}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <SafeIcon icon={FiLinkedin} className="w-4 h-4 text-blue-700" />
                      <span>LinkedIn</span>
                    </label>
                    <input
                      {...register('linkedin')}
                      type="url"
                      placeholder="https://linkedin.com/company/yourcompany"
                      defaultValue={businessInfo.socialMedia?.linkedin}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Save Social Links</span>
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminBusiness;