import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';

const Terms = () => {
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
              Terms of Service
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl opacity-90 max-w-2xl mx-auto"
            >
              Please read these terms carefully before using our services.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
                <p className="text-gray-700 mb-4">
                  Permission is granted to temporarily download one copy of the materials on {businessInfo.name}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Terms</h2>
                <p className="text-gray-700 mb-4">
                  Our services are provided "as is" and we make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Accounts</h2>
                <p className="text-gray-700 mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Uses</h2>
                <p className="text-gray-700 mb-4">
                  You may not use our services:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  In no event shall {businessInfo.name} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if {businessInfo.name} or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
                <p className="text-gray-700 mb-4">
                  You agree to defend, indemnify, and hold harmless {businessInfo.name} and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
                <p className="text-gray-700 mb-4">
                  We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
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
                  These terms of service are designed to be comprehensive and legally sound. 
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

export default Terms;