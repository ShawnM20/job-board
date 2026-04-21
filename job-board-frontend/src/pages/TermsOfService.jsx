import { useEffect } from 'react';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using JobBoard ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
              <p className="text-gray-600 leading-relaxed">
                JobBoard is a platform that connects job seekers with employers. Our Service includes:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600 ml-4">
                <li>Job posting and search functionality</li>
                <li>Job application management</li>
                <li>User profiles and professional networking</li>
                <li>Job bookmarking and saved searches</li>
                <li>Company profiles and employer tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">3.1 Account Registration</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To use certain features of the Service, you must register for an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 ml-4">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your information promptly</li>
                    <li>Maintain the security of your password</li>
                    <li>Accept all risks of unauthorized access</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">3.2 Account Responsibilities</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You are responsible for all activities under your account. You must notify us immediately of any unauthorized use.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">3.3 Account Termination</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We may terminate or suspend your account at any time for violation of these terms.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. User Conduct</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Post false, misleading, or fraudulent information</li>
                <li>Upload viruses or malicious code</li>
                <li>Spam, harass, or abuse other users</li>
                <li>Post inappropriate or offensive content</li>
                <li>Violate any applicable laws</li>
                <li>Infringe on intellectual property rights</li>
                <li>Discriminate based on protected characteristics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Job Postings and Applications</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">5.1 Employer Responsibilities</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Employers must ensure job postings are accurate, legal, and non-discriminatory. 
                    You are responsible for screening applicants and making hiring decisions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">5.2 Job Seeker Responsibilities</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Job seekers must provide accurate information and apply only for positions they're qualified for and interested in.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">5.3 No Hiring Guarantee</h3>
                  <p className="text-gray-600 leading-relaxed">
                    JobBoard does not guarantee employment or the quality of job postings. 
                    We are not responsible for hiring decisions or employer-employee relationships.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                The Service and its original content are owned by JobBoard and protected by copyright, trademark, and other laws. 
                You retain ownership of content you post but grant us license to use it for operating the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Disclaimers</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, 
                including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Accuracy or reliability of information</li>
                <li>Quality or safety of job postings</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Compatibility with your equipment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                In no event shall JobBoard be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
                for any reason, including breach of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. If we make material changes, we will notify you 
                by email or by posting a notice on our Site prior to the effective date of changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which our headquarters are located, 
                without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                Questions about these Terms should be sent to:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@jobboard.com<br />
                  <strong>Address:</strong> JobBoard Legal Department<br />
                  <strong>Phone:</strong> (555) 123-4567
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              By using JobBoard, you acknowledge that you have read and understood these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
