import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useData } from '../../contexts/DataContext';

const { FiSave, FiEdit, FiPlus, FiTrash2, FiEye } = FiIcons;

const AdminContent = () => {
  const { content, updateContent } = useData();
  const [activeTab, setActiveTab] = useState('hero');
  const [editingService, setEditingService] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const tabs = [
    { id: 'hero', name: 'Hero Section', icon: FiEye },
    { id: 'services', name: 'Services', icon: FiEdit },
    { id: 'testimonials', name: 'Testimonials', icon: FiPlus }
  ];

  const onSubmitHero = (data) => {
    updateContent({
      ...content,
      hero: { ...content.hero, ...data }
    });
    toast.success('Hero section updated successfully!');
  };

  const onSubmitService = (data) => {
    const services = [...content.services];
    
    if (editingService !== null) {
      services[editingService] = { ...services[editingService], ...data };
      setEditingService(null);
    } else {
      services.push({
        id: Date.now(),
        ...data,
        features: data.features.split('\n').filter(f => f.trim())
      });
    }
    
    updateContent({
      ...content,
      services
    });
    
    toast.success('Service updated successfully!');
    reset();
  };

  const onSubmitTestimonial = (data) => {
    const testimonials = [...content.testimonials];
    
    if (editingTestimonial !== null) {
      testimonials[editingTestimonial] = { ...testimonials[editingTestimonial], ...data };
      setEditingTestimonial(null);
    } else {
      testimonials.push({
        id: Date.now(),
        ...data,
        rating: parseInt(data.rating)
      });
    }
    
    updateContent({
      ...content,
      testimonials
    });
    
    toast.success('Testimonial updated successfully!');
    reset();
  };

  const deleteService = (index) => {
    const services = content.services.filter((_, i) => i !== index);
    updateContent({
      ...content,
      services
    });
    toast.success('Service deleted successfully!');
  };

  const deleteTestimonial = (index) => {
    const testimonials = content.testimonials.filter((_, i) => i !== index);
    updateContent({
      ...content,
      testimonials
    });
    toast.success('Testimonial deleted successfully!');
  };

  const editService = (index) => {
    const service = content.services[index];
    setEditingService(index);
    setValue('title', service.title);
    setValue('description', service.description);
    setValue('icon', service.icon);
    setValue('features', service.features.join('\n'));
  };

  const editTestimonial = (index) => {
    const testimonial = content.testimonials[index];
    setEditingTestimonial(index);
    setValue('name', testimonial.name);
    setValue('role', testimonial.role);
    setValue('content', testimonial.content);
    setValue('rating', testimonial.rating);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h1>
        <p className="text-gray-600">Manage your website content, services, and testimonials.</p>
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
          {/* Hero Section */}
          {activeTab === 'hero' && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
              <form onSubmit={handleSubmit(onSubmitHero)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    defaultValue={content.hero.title}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    {...register('subtitle', { required: 'Subtitle is required' })}
                    type="text"
                    defaultValue={content.hero.subtitle}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.subtitle && (
                    <p className="mt-1 text-sm text-red-600">{errors.subtitle.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows="4"
                    defaultValue={content.hero.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Button Text
                  </label>
                  <input
                    {...register('ctaText', { required: 'CTA text is required' })}
                    type="text"
                    defaultValue={content.hero.ctaText}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.ctaText && (
                    <p className="mt-1 text-sm text-red-600">{errors.ctaText.message}</p>
                  )}
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

          {/* Services Section */}
          {activeTab === 'services' && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Services</h2>
                <button
                  onClick={() => {
                    setEditingService(null);
                    reset();
                  }}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Service List */}
                <div className="space-y-4">
                  {content.services.map((service, index) => (
                    <div key={service.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{service.title}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editService(index)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <SafeIcon icon={FiEdit} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteService(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Service Form */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">
                    {editingService !== null ? 'Edit Service' : 'Add New Service'}
                  </h3>
                  <form onSubmit={handleSubmit(onSubmitService)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        {...register('description', { required: 'Description is required' })}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon
                      </label>
                      <select
                        {...register('icon', { required: 'Icon is required' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select an icon</option>
                        <option value="briefcase">Briefcase</option>
                        <option value="code">Code</option>
                        <option value="headphones">Headphones</option>
                        <option value="settings">Settings</option>
                        <option value="shield">Shield</option>
                      </select>
                      {errors.icon && (
                        <p className="mt-1 text-sm text-red-600">{errors.icon.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features (one per line)
                      </label>
                      <textarea
                        {...register('features', { required: 'Features are required' })}
                        rows="4"
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                      {errors.features && (
                        <p className="mt-1 text-sm text-red-600">{errors.features.message}</p>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <SafeIcon icon={FiSave} className="w-4 h-4" />
                        <span>{editingService !== null ? 'Update' : 'Add'} Service</span>
                      </button>
                      {editingService !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingService(null);
                            reset();
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* Testimonials Section */}
          {activeTab === 'testimonials' && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Testimonials</h2>
                <button
                  onClick={() => {
                    setEditingTestimonial(null);
                    reset();
                  }}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Testimonial List */}
                <div className="space-y-4">
                  {content.testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                          <div className="flex items-center">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editTestimonial(index)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <SafeIcon icon={FiEdit} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTestimonial(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{testimonial.role}</p>
                      <p className="text-sm text-gray-800 italic">"{testimonial.content}"</p>
                    </div>
                  ))}
                </div>

                {/* Testimonial Form */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">
                    {editingTestimonial !== null ? 'Edit Testimonial' : 'Add New Testimonial'}
                  </h3>
                  <form onSubmit={handleSubmit(onSubmitTestimonial)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <input
                        {...register('role', { required: 'Role is required' })}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Testimonial
                      </label>
                      <textarea
                        {...register('content', { required: 'Testimonial is required' })}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                      {errors.content && (
                        <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <select
                        {...register('rating', { required: 'Rating is required' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select rating</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                      {errors.rating && (
                        <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <SafeIcon icon={FiSave} className="w-4 h-4" />
                        <span>{editingTestimonial !== null ? 'Update' : 'Add'} Testimonial</span>
                      </button>
                      {editingTestimonial !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTestimonial(null);
                            reset();
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminContent;