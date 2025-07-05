import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../contexts/DataContext';

const { FiMail, FiPhone, FiGlobe, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } = FiIcons;

const Footer = () => {
  const { businessInfo } = useData();

  const socialLinks = [
    { icon: FiFacebook, href: businessInfo.socialMedia.facebook, label: 'Facebook' },
    { icon: FiTwitter, href: businessInfo.socialMedia.twitter, label: 'Twitter' },
    { icon: FiInstagram, href: businessInfo.socialMedia.instagram, label: 'Instagram' },
    { icon: FiLinkedin, href: businessInfo.socialMedia.linkedin, label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MW</span>
              </div>
              <span className="text-xl font-bold">{businessInfo.name}</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {businessInfo.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{businessInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{businessInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiGlobe} className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{businessInfo.website}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                social.href && (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <SafeIcon icon={social.icon} className="w-6 h-6" />
                  </a>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Private Portal - Not indexed by search engines
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;