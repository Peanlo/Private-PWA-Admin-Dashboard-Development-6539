import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';

const Privacy = () => {
  const { businessInfo } = useData();

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl opacity-90 max-w-2xl mx-auto"
            >
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="bg-white rounded-lg shadow-lg p-8 md:p-12"
          >
            <motion.div variants={fadeInUp} className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Fill out contact forms on our website</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Communicate with us via email or phone</li>
                  <li>Use our services or products</li>
                </ul>
                <p className="text-gray-700">
                  This information may include your name, email address, phone number, and any other information you choose to provide.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you updates about our services (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>With service providers who help us operate our business</li>
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and property</li>
                  <li>With your explicit consent</li>
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
                <p className="text-gray-700 mb-4">
                  Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this privacy policy, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> {businessInfo.email}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {businessInfo.phone}</p>
                  {businessInfo.address && (
                    <p className="text-gray-700"><strong>Address:</strong> {businessInfo.address}</p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-t pt-8">
                <p className="text-sm text-gray-500">
                  This privacy policy is designed to be compliant with general privacy regulations. 
                  For specific legal requirements in your jurisdiction, please consult with a legal professional.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;