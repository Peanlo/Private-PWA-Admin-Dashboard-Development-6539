import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState({
    name: 'My New website',
    email: 'peter@redhotteam.app',
    phone: '12345',
    website: 'https://redhotteam.com',
    address: '',
    description: 'Welcome to our private business portal.',
    logo: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    operatingHours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: true }
    }
  });

  const [content, setContent] = useState({
    hero: {
      title: 'Welcome to My New Website',
      subtitle: 'Your trusted partner for professional services',
      description: 'We provide exceptional solutions tailored to your needs. Our team is dedicated to delivering quality results that exceed expectations.',
      ctaText: 'Get Started',
      backgroundImage: ''
    },
    services: [
      {
        id: 1,
        title: 'Consulting',
        description: 'Expert consulting services to help grow your business',
        icon: 'briefcase',
        features: ['Strategic Planning', 'Market Analysis', 'Growth Strategies']
      },
      {
        id: 2,
        title: 'Development',
        description: 'Custom software development solutions',
        icon: 'code',
        features: ['Web Applications', 'Mobile Apps', 'API Development']
      },
      {
        id: 3,
        title: 'Support',
        description: '24/7 technical support and maintenance',
        icon: 'headphones',
        features: ['Technical Support', 'System Maintenance', 'Updates & Patches']
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'John Smith',
        role: 'CEO, Tech Corp',
        content: 'Excellent service and professional team. Highly recommended!',
        rating: 5
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        role: 'Marketing Director',
        content: 'They delivered exactly what we needed on time and within budget.',
        rating: 5
      }
    ]
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString()
    }
  ]);

  const [media, setMedia] = useState([]);

  const [settings, setSettings] = useState({
    siteName: 'My New Website',
    siteDescription: 'Private business portal',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 60,
      passwordExpiry: 90
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30
    }
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBusinessInfo = localStorage.getItem('businessInfo');
    const savedContent = localStorage.getItem('content');
    const savedUsers = localStorage.getItem('users');
    const savedMedia = localStorage.getItem('media');
    const savedSettings = localStorage.getItem('settings');

    if (savedBusinessInfo) setBusinessInfo(JSON.parse(savedBusinessInfo));
    if (savedContent) setContent(JSON.parse(savedContent));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedMedia) setMedia(JSON.parse(savedMedia));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('businessInfo', JSON.stringify(businessInfo));
  }, [businessInfo]);

  useEffect(() => {
    localStorage.setItem('content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('media', JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const updateBusinessInfo = (newInfo) => {
    setBusinessInfo(prev => ({ ...prev, ...newInfo }));
  };

  const updateContent = (newContent) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (id, updates) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const addMedia = (mediaItem) => {
    const newMedia = {
      ...mediaItem,
      id: Date.now(),
      uploadedAt: new Date().toISOString()
    };
    setMedia(prev => [...prev, newMedia]);
    return newMedia;
  };

  const deleteMedia = (id) => {
    setMedia(prev => prev.filter(item => item.id !== id));
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const value = {
    businessInfo,
    content,
    users,
    media,
    settings,
    updateBusinessInfo,
    updateContent,
    addUser,
    updateUser,
    deleteUser,
    addMedia,
    deleteMedia,
    updateSettings
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};