import { useState } from 'react';

const ApplyModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', coverLetter: '' });
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('jobId', job._id);
    data.append('applicantName', formData.name);
    data.append('applicantEmail', formData.email);
    data.append('coverLetter', formData.coverLetter);
    if (file) data.append('resume', file);

    try {
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setSent(true);
      } else {
        const err = await res.json();
        setError(err.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || 
          droppedFile.type === 'application/msword' || 
          droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        if (droppedFile.size <= 5 * 1024 * 1024) { // 5MB
          setFile(droppedFile);
          setError('');
        } else {
          setError('File size must be less than 5MB');
        }
      } else {
        setError('Please upload a PDF, DOC, or DOCX file');
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/msword' || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        if (selectedFile.size <= 5 * 1024 * 1024) { // 5MB
          setFile(selectedFile);
          setError('');
        } else {
          setError('File size must be less than 5MB');
        }
      } else {
        setError('Please upload a PDF, DOC, or DOCX file');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {sent ? (
          <div className="text-center py-12 px-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">Your application for <span className="font-semibold text-indigo-600">{job.title}</span> at <span className="font-semibold text-indigo-600">{job.company}</span> has been successfully submitted.</p>
            <p className="text-gray-500 text-sm mb-8">Good luck with your application! The hiring team will review your submission and contact you if your profile matches their requirements.</p>
            <button 
              onClick={onClose} 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply for Position</h2>
                  <p className="text-xl font-semibold text-indigo-600">{job.title}</p>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="John Doe" 
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="john@example.com" 
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea 
                  name="coverLetter"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  rows="4"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-colors"
                  value={formData.coverLetter}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Resume / CV (Optional)
                </label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
                    dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    className="hidden" 
                    onChange={handleFileChange}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="font-semibold text-gray-700 mb-1">
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max 5MB)</p>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;