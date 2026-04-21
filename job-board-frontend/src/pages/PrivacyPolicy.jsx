import { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">1.1 Personal Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you register for JobBoard, we collect:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>Name and email address</li>
                    <li>Phone number (optional)</li>
                    <li>Profile information (bio, location, experience, skills)</li>
                    <li>Resume and portfolio links</li>
                    <li>Profile picture</li>
                    <li>Account preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">1.2 Company Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    For employer accounts, we collect:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>Company name and description</li>
                    <li>Industry and company size</li>
                    <li>Contact information</li>
                    <li>Company website and social media</li>
                    <li>Posted job listings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">1.3 Usage Data</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We automatically collect:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>IP address and location data</li>
                    <li>Browser type and operating system</li>
                    <li>Pages visited and time spent</li>
                    <li>Search queries and filters used</li>
                    <li>Device identifiers</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">2.1 Service Provision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We use your information to:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>Create and manage your account</li>
                    <li>Connect job seekers with employers</li>
                    <li>Process job applications</li>
                    <li>Provide personalized job recommendations</li>
                    <li>Enable profile and job bookmarking</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">2.2 Communication</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We use your contact information to:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>Send job application notifications</li>
                    <li>Respond to customer support requests</li>
                    <li>Send important account updates</li>
                    <li>Share relevant job opportunities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">2.3 Analytics and Improvement</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We analyze usage data to:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>Improve our services and features</li>
                    <li>Optimize user experience</li>
                    <li>Prevent fraud and abuse</li>
                    <li>Generate anonymized usage statistics</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">3.1 With Your Consent</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We share your information when:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>You apply to a job (with the employer)</li>
                    <li>You make your profile public (with other users)</li>
                    <li>You connect social media accounts</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">3.2 Service Providers</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We share data with trusted third-party services for:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>Cloud hosting and data storage</li>
                    <li>Email delivery services</li>
                    <li>Analytics and monitoring</li>
                    <li>Payment processing (if applicable)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">3.3 Legal Requirements</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We may disclose information when required by law or to:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>Comply with legal processes</li>
                    <li>Protect our rights and property</li>
                    <li>Prevent fraud or security threats</li>
                    <li>Protect user safety</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We implement security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li><strong>Encryption:</strong> Data transmitted using SSL/TLS</li>
                <li><strong>Access Controls:</strong> Limited access to user data</li>
                <li><strong>Regular Audits:</strong> Security assessments and testing</li>
                <li><strong>Data Minimization:</strong> Only collect necessary information</li>
                <li><strong>Secure Storage:</strong> Encrypted database storage</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">5.1 Access and Correction</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Update your profile details</li>
                    <li>Delete your account and data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">5.2 Data Portability</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You can request a copy of your data in a machine-readable format.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">5.3 Marketing Communications</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You can opt out of marketing communications at any time through your account settings.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies and Tracking</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">6.1 Essential Cookies</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We use essential cookies for:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>Keeping you logged in</li>
                    <li>Maintaining shopping cart (if applicable)</li>
                    <li>Security and fraud prevention</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">6.2 Analytics Cookies</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We use analytics tools to understand how users interact with our service.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">6.3 Cookie Management</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You can control cookies through your browser settings. Disabling cookies may affect functionality.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Third-Party Links</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Our Service may contain links to third-party websites. We are not responsible for their privacy practices.
                Review their privacy policies before providing personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your information for as long as necessary to provide our services, comply with legal obligations,
                resolve disputes, and enforce our agreements. Account deletion removes personal data from active databases.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                JobBoard is not intended for children under 13. We do not knowingly collect personal information 
                from children under 13. If we become aware of such collection, we will delete it immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. International Data Transfers</h2>
              <p className="text-gray-600 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate 
                safeguards are in place to protect your data in accordance with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                <li>Email notification</li>
                <li>Posting on our website</li>
                <li>In-app notifications</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                Your continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@jobboard.com<br />
                  <strong>Address:</strong> JobBoard Privacy Department<br />
                  <strong>Phone:</strong> (555) 123-4567
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              This Privacy Policy is effective as of {new Date().toLocaleDateString()} and was last updated on this date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
